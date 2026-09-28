"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addLike } from "../services/blogs"
import { auth } from "@/auth"

export type FormState = {
  errors?: {
    title?: string
    author?: string
    url?: string
  }
  values?: {
    title: string
    author: string
    url: string
  },
  success?: boolean
}

export const createBlog = async (prevState: FormState, formData: FormData) => {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const errors: {
    title?: string
    author?: string
    url?: string
  } = {}

  const title = formData.get("title") as string
  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }

  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    errors.author = "Author name must be at least 5 characters long"
  }

  const url = formData.get("url") as string
  if (!url || url.length < 5) {
    errors.url = "Url must be at least 5 characters long"
  }

  const likes = Number(formData.get("likes"))

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  await addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  return {success: true}
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}