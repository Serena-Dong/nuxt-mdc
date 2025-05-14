import getDB from '~~/server/utils/getDB'

export default defineEventHandler(async _event => {
  try {
    const { db } = getDB()

    await db.read()
    const posts = db.data?.posts

    if (!posts) {
      throw createError({
        statusCode: 404,
        message: 'Posts not found',
        data: 'No posts found in the database.',
      })
    }

    return posts
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: (error as any).statusCode ?? 500,
        statusMessage: 'Error during /api/posts/ GET',
        data: (error as any).data ?? error.message,
      })
    } else
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: `${error}`,
      })
  }
})
