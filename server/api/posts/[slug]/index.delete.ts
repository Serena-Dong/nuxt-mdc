export default defineEventHandler(async event => {
  try {
    const { db } = getDB()
    const { slug } = event.context.params as { slug: string }

    if (!slug.length) {
      throw new Error("[DELETE] 400: Invalid parameter, 'slug' is empty")
    }
    await db.read()
    const posts = db.data?.posts
    if (!posts) {
      throw new Error('[DELETE] 404: Posts not found')
    }

    db.data.posts = posts.filter(post => post.postInfo.slug !== slug)
    await db.write()

    setResponseStatus(event, 200)
    return {
      status: 'success',
      message: `Post ${slug} deleted successfully`,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error while deleting post',
      cause: error,
    })
  }
})
