// app/post-login/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export default async function PostLogin() {
  const session = await getServerSession(authOptions);

  // Non loggato → torna all'auth
  if (!session) redirect("/auth?tab=login");

  // Primo login (o profilo incompleto) → onboarding
  if (!session.user.profileCompleted) redirect("/onboarding");

  // Altrimenti home (o dove preferisci)
  redirect("/");
}
