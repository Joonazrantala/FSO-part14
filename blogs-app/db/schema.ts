import { int } from "drizzle-orm/mysql-core"
import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer().notNull()
  }
)