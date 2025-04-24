import { resolve, join } from "path";
import { readFileSync } from "fs";

export default defineEventHandler(async (event) => {
  const { name } = getRouterParams(event);

  // The 'inline' query param determines where the server api will look for the snippet files
  const query = getQuery(event);
  const directory = query.inline === "true" ? "inline-snippets" : "snippets";

  try {
    const filePath = resolve(join(`app/assets/${directory}`, `${name}.md`));
    const fileContent = readFileSync(filePath, "utf-8");

    return fileContent;
  } catch (error) {
    if (error instanceof Error) {
      throw createError(error);
    } else
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: `An unexpected error occurred while fetching snippet ${name}`,
      });
  }
});
