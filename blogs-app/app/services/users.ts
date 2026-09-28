import { db } from "../../db"
import { users, blogs } from "../../db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  const blog = db.query.users.findFirst({
    where: eq(users.id, id)
  })
  return blog
}

export const getUserByUsername = async (username: string) => {
  const user = db.query.users.findFirst({
    where: eq(users.username, username)
  })
  return user
}

export const getBlogsByUserId = async (id: number) => {
  return db.query.blogs.findMany({
    where: eq(blogs.userId, id)
  })
}

export const getUserAndBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}