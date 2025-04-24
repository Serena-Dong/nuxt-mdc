export default defineEventHandler(async (event) => {
  try {
    const { db } = getDB();
    const { slug } = getRouterParams(event);

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
        statusCode: error.statusCode,
        statusMessage: "Internal Server Error during /api/posts/ GET",
        data: error.message,
      });
    } else
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        data: `${error}`,
      });
  }
});
