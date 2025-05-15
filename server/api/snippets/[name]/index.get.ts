import getDB from '~~/server/utils/getDB'

/**
 * @description API endpoint to fetch all snippets
 * @requires `inline` query parameter set to `true` to filter inline snippets
 */
export default defineEventHandler(async event => {
  try {
    const { name } = getRouterParams(event)

    if (!name) {
      throw createError({
        statusCode: 400,
        message: 'Bad Request',
        data: 'Snippet name parameter is required',
      })
    }

    const { inline } = getQuery(event)
    const getInlineSnippets = inline === 'true'

    const { db } = getDB()
    await db.read()

    const snippetList = getInlineSnippets
      ? db.data?.inlineSnippets
      : db.data?.snippets

    const foundSnippet = snippetList?.find(snippet => snippet.name === name)

    if (!foundSnippet) {
      throw createError({
        statusCode: 404,
        message: 'Snippet not found',
        data: `Snippet with name ${name} not found`,
      })
    }

    return foundSnippet
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: (error as any).statusCode ?? 500,
        statusMessage: 'Error during /api/snippets/[name] GET',
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
