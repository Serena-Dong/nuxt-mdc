/**
 * @description API endpoint to fetch all snippets
 * @requires `inline` query parameter set to `true` to filter inline snippets
 */

export default defineEventHandler(async event => {
  try {
    const { db } = getDB()

    const { name } = getRouterParams(event)
    const { inline } = getQuery(event)
    const isInline = inline === 'true'

    if (!name || !name.length) {
      throw new Error("[DELETE] 400: Invalid parameter, 'name' is empty")
    }
    await db.read()
    const snippets = db.data?.snippets
    const inlineSnippets = db.data?.inlineSnippets

    if (!snippets && !inlineSnippets) {
      throw new Error('[DELETE] 404: snippets or inlineSnippets not found')
    }

    if (isInline) {
      db.data.inlineSnippets = inlineSnippets.filter(
        snippet => snippet.name !== name
      )
    } else {
      db.data.snippets = snippets.filter(snippet => snippet.name !== name)
    }

    await db.write()

    setResponseStatus(event, 200)
    return {
      status: 'success',
      message: `snippet ${name} deleted successfully`,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error while deleting snippet',
      cause: error,
    })
  }
})
