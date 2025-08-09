// app/account/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  if (!session.user.profileCompleted) redirect("/onboarding");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Account</h1>
      {/* <ProfileForm /> <DeleteAccountButton /> */}
    </div>
  );
}
