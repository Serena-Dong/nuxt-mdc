import { readFileSync } from "fs";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { resolve } from "path";
import type { JsonDBData } from "~~/modules/initLowDB";

export default function getDB() {
  const dbFilePath = resolve("./db.json");
  const adapter = new JSONFile<JsonDBData>(dbFilePath);

  // Read file as string and parse as JSON, or use empty object as default
  let defaultData: JsonDBData;
  try {
    const fileContent = readFileSync(dbFilePath, "utf8");
    defaultData = JSON.parse(fileContent);
  } catch (error) {
    defaultData = {} as JsonDBData;
    console.error("Error reading or parsing db.json:", error);
  }

  const db = new Low<JsonDBData>(adapter, defaultData);
  return { db };
}
