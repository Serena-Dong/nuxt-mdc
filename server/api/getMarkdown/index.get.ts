import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import fs from "fs";
import { BlogCardProps } from "~/components/Molecules/BlogCard.props";

// Helper function to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineEventHandler(async (event) => {
  const contentDir = resolve("app/assets/content");
  try {
    const files = readdirSync(contentDir).filter((file) =>
      file.endsWith(".md")
    );

    const articles = files
      .map((file) => {
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

        // Get file stats to determine creation date
        const stats = fs.statSync(filePath);

        const articleInfo: BlogCardProps = {
          slug,
          title,
          description: contentPreview,
          date: stats.birthtime.toISOString(), // File creation date
        };

        // Check if the object is valued for all properties and print a log for the missing ones
        const areAllPropertiesPresent = Object.entries(articleInfo).every(
          ([propertyKey, propertyValue]) => {
            const hasValue =
              propertyValue !== null && propertyValue !== undefined;

            if (!hasValue) {
              console.error(
                `Property ${propertyKey} is missing for file: ${file}`
              );
            }

            return hasValue;
          }
        );

        // If one of the property is missing, return null
        return areAllPropertiesPresent ? articleInfo : null;
      }) // Filter out null values from the article list
      .filter((article) => article !== null) as BlogCardProps[];

    // Sort articles by date (newest first) -> the dates need to be converted from ISO to Date objects
    articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    await delay(2000); // Simulate a network delay of 2 second seconds
    return articles;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to read content directory",
      message: error instanceof Error ? error.message : `${error}`,
    });
  }
});
