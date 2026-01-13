import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function sessionCartIdMiddleware(req: NextRequest) {
  console.log("Session Cart ID Middleware executed");

  let sessionCartId = req.cookies.get("sessionCartId")?.value;
  const response = NextResponse.next();

  if (!sessionCartId) {
    sessionCartId = uuidv4();

    response.cookies.set("sessionCartId", sessionCartId, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return response;
}
