import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export default async function middleware(request: NextRequest) {
  console.log("Middleware executed");

  const response = NextResponse.next();
  const sessionCartId = request.cookies.get("sessionCartId")?.value;

  if (!sessionCartId) {
    const newSessionCartId: string = uuidv4();
    response.cookies.set("sessionCartId", newSessionCartId, {
      path: request.url,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });
    console.log("New Session Cart ID set:", newSessionCartId);
    return response;
  }
}
