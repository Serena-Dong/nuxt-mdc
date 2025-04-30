import getDB from "~~/server/utils/getDB";

/**
 * @description API endpoint to fetch all snippets
 * @requires `inline` query parameter set to `true` to filter inline snippets
 */
export default defineEventHandler(async (event) => {
  try {
    const { db } = getDB();
    const { inline } = getQuery(event);
    const getInlineSnippets = inline === "true";

    await db.read();
    const snippets = getInlineSnippets
      ? db.data?.inlineSnippets
      : db.data?.snippets;

    if (!snippets) {
      throw createError({
        statusCode: 404,
        message: "Snippets not found",
        data: "No snippets found in the database.",
      });
    }

    return snippets;
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: (error as any).statusCode ?? 500,
        statusMessage: "Error during /api/snippets/ GET",
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
