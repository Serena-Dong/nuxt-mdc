import { resolve } from "path";
import { readFileSync } from "fs";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const filePath = resolve("public/testMarkdownText.md");
  const fileContent = readFileSync(filePath, "utf-8");

  const contentHeader = `# Article ${id}\n`;

  return contentHeader + fileContent;
});
