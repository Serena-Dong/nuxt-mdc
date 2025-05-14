import type { DBSnippet } from '~~/modules/initLowDB'
import * as v from 'valibot'
import { console } from 'inspector'
/**
 * @description API endpoint to fetch all snippets
 * @requires `inline` query parameter set to `true` to filter inline snippets
 */
const validateBodyProperty = (property: string) =>
  v.pipe(
    v.string(`'${property}' must be a string`),
    v.nonEmpty(`'${property}' cannot be empty`)
  )

const newSnippetBodySchema = v.object({
  name: validateBodyProperty('name'),
  content: validateBodyProperty('content'),
})

export default defineEventHandler(async event => {
  try {
    const { inline } = getQuery(event)
    const isInline = inline === 'true'

    // Parse the request body as FormValues
    const body = await readValidatedBody(event, body =>
      v.parse(newSnippetBodySchema, body)
    )

    const { db } = getDB()

    // Read the existing db.json
    await db.read()

    const newSnippet: DBSnippet = {
      name: body.name,
      content: body.content,
    }

    console.log('New snippet:', newSnippet)

    // Push post
    db.update(data =>
      isInline
        ? data.inlineSnippets.unshift(newSnippet)
        : data.snippets.unshift(newSnippet)
    )

    // Return the created post with a 201 status code
    setResponseStatus(event, 201)
    return { success: true, post: newSnippet }
  } catch (error) {
    // Initialize with empty posts array if file doesn't exist
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating new snippet',
      cause: error,
    })
  }
})
