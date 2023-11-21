import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/service/user";
import { AuthErrorList } from "@/util/error";

export async function POST(req: NextRequest) {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return new Response("Bad Request", { status: 400 });
  }

  const user = await getUserByEmail(email);

  if (user) {
    return new Response(AuthErrorList.EMAIL_TAKEN_ERROR, { status: 422 });
  }

  return createUser({ email, name, password }) //
    .then((res) => NextResponse.json(res));
}
