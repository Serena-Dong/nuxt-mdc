import getDB from "~~/server/utils/getDB";

export default defineEventHandler(async (event) => {
  const { db } = getDB();

  await db.read();
  const posts = db.data?.posts;
  return posts;
});
