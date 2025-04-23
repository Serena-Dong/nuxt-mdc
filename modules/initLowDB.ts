import { readdirSync, readFileSync, statSync } from "fs";
import { $fetch } from "ofetch";
import { join, resolve } from "path";
import type { BlogCardProps } from "~/components/Molecules/BlogCard.props";
import { defineNuxtModule, createResolver, addServerHandler } from "@nuxt/kit";
import { JSONFilePreset } from "lowdb/node";

type DBPost = {
  postInfo: BlogCardProps;
  content: string;
};

type DBSnippet = {
  id: string;
  name: string;
  content: string;
};

type JsonDBData = {
  posts: DBPost[];
  snippets: DBSnippet[];
  inlineSnippets: DBSnippet[];
};

export default defineNuxtModule({
  setup: async (options, nuxt) => {
    const resolver = createResolver(import.meta.url);

    const defaultData = await getDefaultData();

    console.log("Default Data:", defaultData);

    // Initialize database
    const db = await JSONFilePreset<JsonDBData>("db.json", defaultData);

    // Add server API endpoint to access DB
    addServerHandler({
      route: "/api/db",
      handler: resolver.resolve("./runtime/server/api/db"),
    });
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
