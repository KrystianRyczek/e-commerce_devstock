import { handlers } from "@/auth";
export const { GET, POST } = handlers;

// import { getSession } from "next-auth";

// export default async (req, res) => {
//   const session = await getSession({ req })
//   if (session) {
//     // Signed in
//     console.log("Session", JSON.stringify(session, null, 2))
//   } else {
//     // Not Signed in
//     res.status(401)
//   }
//   res.end()
// }
// import jwt from "next-auth"
// import { NextRequest } from "next/server";

// const secret = process.env.SECRET

// export default async (req:Request, res:Response) => {
//   const token = await jwt.getToken({ req, secret })
//   if (token) {
//     // Signed in
//     console.log("JSON Web Token", JSON.stringify(token, null, 2))
//   } else {
//     // Not Signed in
//     res.status(401)
//   }
//   res.end()
// }
