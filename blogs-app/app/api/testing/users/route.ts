import { NextResponse } from "next/server"
import { db } from "../../../../db";
import { blogs, users, readingList } from "../../../../db/schema";
import bcrypt from "bcryptjs";

export const DELETE = async(req: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
      )
    }
  const { username, name, password } = await req.json()

  if (
    typeof username !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !name.trim() ||
    !password
  ) {
    return NextResponse.json(
      { error: "Invalid user details" },
      { status: 400 }
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const [user] = await db.insert(users)
    .values({
      username,
      name,
      passwordHash
    })
    .returning({
      id: users.id,
      username: users.username,
      name: users.name
    })

  return NextResponse.json(user, { status: 201 })
}