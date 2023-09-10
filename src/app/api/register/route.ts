import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prismadb";
import { createUser, getUserByEmail } from "@/service/user";

export async function POST(req: NextRequest) {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return new Response("Bad Request", { status: 400 });
  }

  const user = await getUserByEmail(email);

  if (user) {
    return new Response("Email taken", { status: 422 });
  }

  return createUser({ email, name, password }) //
    .then((res) => NextResponse.json(res));
}
