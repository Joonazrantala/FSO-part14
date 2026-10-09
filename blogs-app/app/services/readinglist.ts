import { eq } from "drizzle-orm";
import { db } from "../../db";
import { readingList } from "@/db/schema";
import { getCurrentUser } from "./session";

export const getReadingList = async (userId: number) => {
  return await db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  });
};

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  console.log("blog, user", blogId, user.id);
  await db.insert(readingList).values({ blogId, userId: user.id });
};

export const changeReadStatus = async (blogId: number) => {
  const blog = await db.query.readingList.findFirst({
    where: eq(readingList.blogId, blogId),
  });
  if (blog) {
    await db
      .update(readingList)
      .set({ read: !blog.read })
      .where(eq(readingList.blogId, blogId));
  }
};
