import { readBody } from "h3";
import type { DBPost } from "~~/modules/initLowDB";
import * as v from "valibot";

const validateBodyProperty = (property: string) =>
  v.pipe(
    v.string(`'${property}' must be a string`),
    v.nonEmpty(`'${property}' cannot be empty`)
  );

const newPostBodySchema = v.object({
  title: validateBodyProperty("title"),
  slug: validateBodyProperty("slug"),
  content: v.string(),
});

export default defineEventHandler(async (event) => {
  try {
    // Parse the request body as FormValues
    const body = await readValidatedBody(event, (body) =>
      v.parse(newPostBodySchema, body)
    );

    const { db } = getDB();

    // Read the existing db.json
    await db.read();
    const posts = db.data?.posts;

    const newPost: DBPost = {
      postInfo: {
        title: body.title,
        slug: body.slug,
        date: new Date().toISOString(),
        postNumber: posts ? posts.length + 1 : 1,
      },
      content: body.content,
    };

    // Push post
    db.update(({ posts }) => posts.push(newPost));

    // Return the created post with a 201 status code
    setResponseStatus(event, 201);
    return { success: true, post: newPost };
  } catch (error) {
    // Initialize with empty posts array if file doesn't exist
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating new post",
      cause: error,
    });
  }
});
