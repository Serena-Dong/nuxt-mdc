import { readBody } from "h3";
import { promises as fs } from "fs";
import type { DBPost } from "~~/modules/initLowDB";

export default defineEventHandler(async (event) => {
  try {
    // Parse the request body as FormValues
    const body = await readBody(event);

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
