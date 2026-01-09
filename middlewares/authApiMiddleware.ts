import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function authApiMiddleware(req: NextRequest) {
  try {
    const verifiedToken = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });

    if (verifiedToken) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: "No valid authentication token found" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Token validation failed" },
      { status: 401 }
    );
  }
}
