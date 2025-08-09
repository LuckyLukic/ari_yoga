"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link href="/">Ari Yoga</Link>
      {status === "loading" ? null : session ? (
        <div className="flex items-center gap-3">
          {session.user.plan && (
            <span className="rounded-full border px-2 py-0.5 text-xs">
              {session.user.plan === "premium" ? "Premium" : "Free"}
            </span>
          )}
          <Link href="/account" className="underline">
            Account
          </Link>
          <button onClick={() => signOut()} className="underline">
            Esci
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={() => signIn()} className="underline">
            Accedi
          </button>
          <Link href="/auth" className="underline">
            Registrati
          </Link>
        </div>
      )}
    </nav>
  );
}
