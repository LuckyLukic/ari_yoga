// app/(auth)/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (confirm && password !== confirm) {
      setLoading(false);
      setErr("Le password non coincidono");
      return;
    }

    // 1) crea utente
    const res = await fetch("/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);

    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || "Registrazione fallita");
      return;
    }

    // 2) login automatico e smistamento su /post-login
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/post-login",
    });

    if (login?.error) {
      // se richiedi verifica email → torna al login
      r.push("/auth?tab=login");
      return;
    }

    r.push(login?.url || "/post-login");
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Crea account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          name="name"
          placeholder="Nome (opzionale)"
          className="w-full rounded border p-2"
        />
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
        {/* facoltativo: conferma password */}
        <input
          name="confirm"
          type="password"
          placeholder="Conferma password"
          className="w-full rounded border p-2"
        />

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          disabled={loading}
          className="w-full rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Creazione..." : "Registrati"}
        </button>
      </form>

      <div className="my-6 h-px w-full bg-gray-200" />

      <p className="text-sm text-gray-700">
        Hai già un account?{" "}
        <Link href="/login" className="font-medium underline">
          Accedi
        </Link>
      </p>
    </section>
  );
}
