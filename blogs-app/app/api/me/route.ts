import { NextResponse } from "next/server";
import { authorizeToken } from "@/app/services/users";

export const GET = async (request: Request) => {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const token = authorization?.replace("Bearer ", "");
  const authorizedUser = await authorizeToken(token);

  if (!authorizedUser) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }

  return NextResponse.json(authorizedUser);
};
