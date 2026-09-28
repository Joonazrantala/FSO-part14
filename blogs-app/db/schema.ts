import { int } from "drizzle-orm/mysql-core"
import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const blogs = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer().notNull(),
  userId: integer("user_id").notNull().references(() => users.id)
  }
)

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default("")
  }
)

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}))

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}))