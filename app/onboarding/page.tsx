import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import OnboardingForm from "./_components/OnboardingForm";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  if (session.user.profileCompleted) redirect("/account");
  return <OnboardingForm />;
}
