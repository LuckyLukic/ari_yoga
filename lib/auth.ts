// lib/auth.ts
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth"; // solo tipo ok in v4

const withGoogle =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(creds) {
      if (!creds?.email || !creds?.password) return null;
      // TODO: sostituisci con la tua logica di verifica
      const user = await prisma.user.findUnique({
        where: { email: creds.email },
      });
      if (!user) return null;
      // password check fuori scope
      return { id: user.id, email: user.email, name: user.name };
    },
  }),
  ...(withGoogle
    ? [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ]
    : []),
];

const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // on first sign-in attach userId
      if (user && !token.userId) token.userId = user.id as string;

      if (token.userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId },
          select: { plan: true, profileCompleted: true, role: true },
        });
        if (dbUser) {
          token.plan = dbUser.plan as "free" | "premium";
          token.profileCompleted = dbUser.profileCompleted;
          token.role = dbUser.role as "user" | "admin";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.plan = token.plan as "free" | "premium" | undefined;
        session.user.profileCompleted = token.profileCompleted;
        session.user.role = token.role as "user" | "admin" | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};

export default authOptions;
