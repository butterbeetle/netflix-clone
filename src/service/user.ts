import bcrypt from "bcrypt";
import { prisma } from "../lib/prismadb";

interface User {
  email: string;
  name: string;
  password: string;
}
export async function createUser({ email, name, password }: User) {
  const hashedPassword = await bcrypt.hash(password, 12);

  return await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image: "",
      emailVerified: new Date(),
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
