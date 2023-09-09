import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismadb";

export async function POST(req: NextRequest) {
  const { email, name, password } = await req.json();

  console.log("Resigter POST", email, name, password);

  if (!email || !name || !password) {
    return new Response("Bad Request", { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return new Response("Email taken", { status: 422 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image: "",
      emailVerified: new Date(),
    },
  });

  return NextResponse.json(user);
}
