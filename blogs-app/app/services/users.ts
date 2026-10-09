import { db } from "../../db";
import { users, blogs } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserById = async (id: number) => {
  const user = db.query.users.findFirst({
    where: eq(users.id, id),
  });
  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = db.query.users.findFirst({
    where: eq(users.username, username),
  });
  return user;
};

export const getBlogsByUserId = async (id: number) => {
  return db.query.blogs.findMany({
    where: eq(blogs.userId, id),
  });
};

export const getUserAndBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const generateAndSaveToken = async (id: number) => {
  const newToken = crypto.randomUUID();
  await db.update(users).set({ token: newToken }).where(eq(users.id, id));
  return newToken;
};

export const authorizeToken = async (token: string) => {
  const user = db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  });
  return user;
};
