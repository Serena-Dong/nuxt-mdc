import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import fs from "fs";

// Helper function to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineEventHandler(async (event) => {
  const contentDir = resolve("app/assets/content");
  console.log("Content Directory:", contentDir);

  try {
    const files = readdirSync(contentDir).filter((file) =>
      file.endsWith(".md")
    );

    const articles = files.map((file) => {
      const slug = file.replace(".md", "");
      const words = slug.split("-");
      // Capitalize only the first word
      const title = words
        .map((word, index) =>
          index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
        )
        .join(" ");

      const filePath = resolve(contentDir, file);
      const fileContent = readFileSync(filePath, "utf-8");
      const contentPreview = fileContent.substring(0, 400);
      console.log("File content:", fileContent);

      // Get file stats to determine creation date
      const stats = fs.statSync(filePath);

      return {
        slug,
        title,
        content: contentPreview,
        date: stats.birthtime, // File creation date
      };
    });

    // Sort articles by date (newest first)
    articles.sort((a, b) => b.date.getTime() - a.date.getTime());

    await delay(2000); // Simulate a network delay of 1 second
    return articles;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to read content directory",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
