import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByEmail } from "@/service/user";

export default async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !user.email) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getUserByEmail(user.email) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
