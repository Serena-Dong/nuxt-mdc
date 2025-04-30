import { readdirSync, readFileSync, statSync } from "fs";
import { join, resolve } from "path";
import type { BlogCardProps } from "~/components/Molecules/BlogCard.props";
import { defineNuxtModule, createResolver, addServerHandler } from "@nuxt/kit";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";

export type DBPost = {
  postInfo: BlogCardProps;
  content: string;
};

type DBSnippet = {
  id: string;
  name: string;
  content: string;
};

export type JsonDBData = {
  posts: DBPost[];
  snippets: DBSnippet[];
  inlineSnippets: DBSnippet[];
};

export default defineNuxtModule({
  setup: async (options, nuxt) => {
    const defaultData = await getDefaultData();

    // Initialize adapter
    const dbFilePath = resolve("./db.json");
    const adapter = new JSONFile<JsonDBData>(dbFilePath);

    console.log("Adapter initialized with path:", dbFilePath);

    // Initialize database
    const db = new Low<JsonDBData>(adapter, defaultData);
    await db.write();
  },
});

const getDefaultData = async (): Promise<JsonDBData> => {
  const posts = await getDefaultPosts();
  const snippets = getDefaultSnippets("snippets");
  const inlineSnippets = getDefaultSnippets("inline-snippets");

  return {
    posts,
    snippets,
    inlineSnippets,
  };
};

const getDefaultPosts = async (): Promise<DBPost[]> => {
  const contentDir = resolve("app/assets/content");
  try {
    const files = readdirSync(contentDir).filter((file) =>
      file.endsWith(".md")
    );

    const articles = files
      .map((file, index) => {
        const slug = file.replace(".md", "");
        const words = slug.split("-");
        // Capitalize only the first word
        const title = words
          .map((word, idx) =>
            idx === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
          )
          .join(" ");

        const filePath = resolve(contentDir, file);

        // Get file stats to determine creation date
        const stats = statSync(filePath);

        const articleInfo: BlogCardProps = {
          postNumber: 0,
          slug,
          title,
          date: stats.birthtime.toISOString(), // File creation date
        };

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

        const fileContent = readFileSync(filePath, "utf-8");

        return areAllPropertiesPresent && fileContent
          ? { postInfo: articleInfo, content: fileContent }
          : null;
      })
      .filter((article) => article !== null) as DBPost[];

    // Sort articles by date (newest first) -> the dates need to be converted from ISO to Date objects
    articles.sort(
      (a, b) =>
        new Date(b.postInfo.date).getTime() -
        new Date(a.postInfo.date).getTime()
    );

    // Assign post numbers based on the sorted order
    articles.map((article, index, articlesArray) => {
      article.postInfo.postNumber = articlesArray.length - index; // Assign post number
      return article;
    });

    return articles;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to read content directory",
      message: error instanceof Error ? error.message : `${error}`,
    });
  }
};

const getDefaultSnippets = (dirName: string): DBSnippet[] => {
  const snippetDir = join("app/assets/", dirName);
  const snippetNamesList = readdirSync(snippetDir).filter((file) =>
    file.endsWith(".md")
  );

  return snippetNamesList.map((snippet, index) => ({
    id: `${index + 1}`,
    name: snippet.replace(".md", ""),
    content: readFileSync(resolve(snippetDir, snippet), "utf-8"),
  }));
};
