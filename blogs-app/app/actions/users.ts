"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type FormState = {
  values?: {
    username: string,
    name: string,
    password: string
  },
  errors?: {
    username?: string,
    name?: string,
    password?: string
  }
  success: boolean
}

export const registerUser = async (prevState: FormState, formData: FormData) => {
  const errors: {
    username?: string
    name?: string
    password?: string
  } = {}

  const username = (formData.get("username") as string)?.trim()
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if (existingUser) {
    errors.username = "Username already exists"
  }

  const name = (formData.get("name") as string)?.trim()
  if (!name || name.length < 4) {
    errors.name = "Name must be at least 4 characters long"
  }

  const password = formData.get("password") as string
  const password2 = formData.get("password2") as string
  if (password != password2) {
    errors.password = "Passwords not matching"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password }, success: false }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  revalidatePath("/login")
  return {success: true}
}