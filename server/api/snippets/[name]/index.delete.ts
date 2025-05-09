import { set } from "@nuxt/ui/runtime/utils/index.js";

export default defineEventHandler(async (event) => {
  try {
    const { db } = getDB();
    const { name } = event.context.params as { name: string };

    if (!name.length) {
      throw new Error("[DELETE] 400: Invalid parameter, 'name' is empty");
    }
    await db.read();
    let snippets = db.data?.snippets;
    if (!snippets) {
      throw new Error("[DELETE] 404: snippets not found");
    }

    db.data.snippets = snippets.filter((snippet) => snippet.name !== name);
    await db.write();

    setResponseStatus(event, 200);
    return {
      status: "success",
      message: `snippet ${name} deleted successfully`,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error while deleting snippet",
      cause: error,
    });
  }
});
