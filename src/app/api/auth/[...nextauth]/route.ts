import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/prismadb";
import { compare } from "bcrypt";
import { AuthErrorList } from "@/util/error";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(AuthErrorList.REQUIRED_ERROR);
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error(AuthErrorList.EMAIL_NOT_EXISTS_ERROR);
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error(AuthErrorList.INCORRECT_PASSWORD_ERROR);
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("SIGNIN@@@@@@@@@@@@@@@@@@@@@@@", user);
      // if (account?.type === "oauth") {
      //   if (!profile?.email || !profile?.name) return false;
      //   createUser({
      //     email: profile?.email,
      //     name: profile?.name,
      //   });
      // }
      console.log("User:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
      return true;
    },
    async session({ session }) {
      // console.log("SESSION@@@@@@@@@@@@@@@@@@@@@@@@", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/api/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
