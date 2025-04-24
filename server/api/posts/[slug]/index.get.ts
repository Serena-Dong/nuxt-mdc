export default defineEventHandler(async (event) => {
  try {
    const { db } = getDB();
    const { slug } = getRouterParams(event);

    if (!slug) {
      throw createError({
        statusCode: 400,
        message: "Bad Request",
        data: "Post slug parameter is required",
      });
    }

    await db.read();

    const foundPost = db.data?.posts.find(
      (post) => post.postInfo.slug === slug
    );

    if (!foundPost) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found",
        data: `Post with slug ${slug} not found`,
      });
    }

    return foundPost;
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: (error as any).statusCode ?? 500,
        statusMessage: "Internal Server Error during /api/posts/[slug] GET",
        data: (error as any).data ?? error.message,
      });
    } else
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        data: `${error}`,
      });
  }
});
