import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const providers = [
  Credentials({
    name: "Email e Password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (creds) => {
      if (!creds?.email || !creds?.password) return null;
      const user = await prisma.user.findUnique({
        where: { email: creds.email },
      });
      if (!user || !user.passwordHash) return null;
      const ok = await bcrypt.compare(creds.password, user.passwordHash);
      return ok
        ? {
            id: user.id,
            email: user.email ?? undefined,
            name: user.name ?? undefined,
          }
        : null;
    },
  }),
] as any[];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // @ts-expect-error adapter types
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers,
  callbacks: {
    async session({ session, user }) {
      if (session.user) (session.user as any).id = user.id;
      return session;
    },
  },
  trustHost: true,
});
