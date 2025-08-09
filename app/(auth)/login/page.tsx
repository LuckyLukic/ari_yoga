"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const r = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.get("email"),
      password: form.get("password"),
      callbackUrl: (params.get("callbackUrl") as string) ?? "/",
    });
    setLoading(false);
    if (!res || res.error) {
      setErr("Credenziali non valide");
      return;
    }
    r.push(res.url || "/");
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Accedi</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded border p-2"
        />

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          disabled={loading}
          className="w-full rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </form>
      {/* Divider */}
      <div className="my-6 h-px w-full bg-gray-200" />

      {/* Google Login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="mt-4 w-full rounded border px-4 py-2"
      >
        Accedi con Google
      </button>
      {/* Callout per la registrazione */}
      <p className="text-sm text-gray-700">
        Non hai un account?{" "}
        <Link href="/register" className="font-medium underline">
          Registrati
        </Link>
      </p>
    </section>
  );
}
