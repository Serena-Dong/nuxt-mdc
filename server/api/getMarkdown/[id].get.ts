import { resolve } from "path";
import { readFileSync } from "fs";

// Helper function to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const filePath = resolve(`app/assets/content/${id}.md`);
  await delay(1000); // Simulate a network delay of 1 second
  const fileContent = readFileSync(filePath, "utf-8");

  return fileContent;
});
