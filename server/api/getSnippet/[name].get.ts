import { resolve, join } from "path";
import { readFileSync } from "fs";

export default defineEventHandler(async (event) => {
  const { name } = getRouterParams(event);

  const filePath = resolve(join("app/assets/snippets", `${name}.md`));
  const fileContent = readFileSync(filePath, "utf-8");

  return fileContent;
});
