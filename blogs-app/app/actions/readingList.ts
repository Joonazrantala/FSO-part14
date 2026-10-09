"use server";

import { addToReadingList, changeReadStatus } from "../services/readinglist";
import { revalidatePath } from "next/cache";

export const addBlogToReadingList = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await addToReadingList(id);
  revalidatePath("/blogs");
};

export const markBlogAsRead = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await changeReadStatus(id);
  revalidatePath("/me");
};
