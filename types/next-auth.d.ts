// /types/next-auth.d.ts
import "next-auth"; // import "puro" per augmentare Session
import "next-auth/jwt"; // import "puro" per augmentare JWT

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan?: "free" | "premium";
      profileCompleted?: boolean;
      role?: "user" | "admin";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    plan?: "free" | "premium";
    profileCompleted?: boolean;
    role?: "user" | "admin";
  }
}
