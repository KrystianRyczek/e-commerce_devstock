import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { authApiMiddleware } from "./middlewares/authApiMiddleware";
export default async function middleware(req: NextRequest, res: NextResponse) {
  
  console.log("Middleware executed");
  
  const url = (await req).url;

  if (url.includes("/api/")) {
    return authApiMiddleware(req);
  }

  const response = NextResponse.next();
  const sessionCartId = req.cookies.get("sessionCartId")?.value;

  if (!sessionCartId) {
    const newSessionCartId: string = uuidv4();
    response.cookies.set("sessionCartId", newSessionCartId, {
      path: req.url,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });
    console.log("New Session Cart ID set:", newSessionCartId);
    return response;
  }
}
