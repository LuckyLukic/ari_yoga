// app/auth/page.tsx
"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

type Tab = "login" | "register";

function useAuthErrorMessage() {
  const sp = useSearchParams();
  const code = sp.get("error");
  return useMemo(() => {
    switch (code) {
      case "OAuthAccountNotLinked":
        return "Questa email è già registrata con un altro metodo. Accedi con email e password, poi collega Google da Account.";
      case "CredentialsSignin":
        return "Credenziali non valide o email non verificata.";
      case "AccessDenied":
        return "Accesso negato.";
      default:
        return null;
    }
  }, [code]);
}

export default function AuthPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const initialTab = (sp.get("tab") as Tab) || "login";
  const [tab, setTab] = useState<Tab>(initialTab);
  const globalError = useAuthErrorMessage();

  // mantieni la query tab sincronizzata nell'URL
  useEffect(() => {
    const qs = new URLSearchParams(Array.from(sp.entries()));
    qs.set("tab", tab);
    router.replace(`/auth?${qs.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-bold text-center">Accedi o Registrati</h1>

        {globalError && (
          <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            {globalError}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border">
          <button
            className={`py-2 text-sm ${
              tab === "login" ? "bg-gray-900 text-white" : "hover:bg-gray-50"
            }`}
            onClick={() => setTab("login")}
          >
            Accedi
          </button>
          <button
            className={`py-2 text-sm ${
              tab === "register" ? "bg-gray-900 text-white" : "hover:bg-gray-50"
            }`}
            onClick={() => setTab("register")}
          >
            Registrati
          </button>
        </div>

        <div className="mt-6">
          {tab === "login" ? (
            <LoginForm onSwitch={() => setTab("register")} />
          ) : (
            <RegisterForm onSwitch={() => setTab("login")} />
          )}
        </div>
      </div>
    </section>
  );
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    startTransition(async () => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenziali non valide o email non verificata.");
        return;
      }

      router.push("/"); // i guard su /onboarding /account gestiranno i redirect
      router.refresh();
    });
  }

  return (
    <div className="rounded-2xl border p-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-gray-900 px-4 py-2 text-white hover:bg-black disabled:opacity-60"
        >
          {pending ? "Accesso in corso…" : "Accedi"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
        <div className="h-px flex-1 bg-gray-200" />
        oppure
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full rounded border px-4 py-2 text-sm hover:bg-gray-50"
      >
        Continua con Google
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Non hai un account?{" "}
        <button onClick={onSwitch} className="underline">
          Registrati gratis
        </button>
      </p>
    </div>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    if (password !== confirm) {
      setError("Le password non coincidono.");
      return;
    }

    startTransition(async () => {
      try {
        // 1) registrazione
        const res = await fetch("/api/account/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          setError(j?.error || "Registrazione fallita.");
          return;
        }

        // 2) login automatico (se non richiedi verifica email)
        const login = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (login?.error) {
          // se richiedi verifica email, riportiamo al login
          router.push("/auth?tab=login");
          return;
        }

        // 3) onboarding
        router.push("/onboarding");
        router.refresh();
      } catch {
        setError("Errore di rete. Riprova.");
      }
    });
  }

  return (
    <div className="rounded-2xl border p-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Nome</label>
          <input
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Conferma password</label>
          <input
            name="confirm"
            type="password"
            required
            minLength={8}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-gray-900 px-4 py-2 text-white hover:bg-black disabled:opacity-60"
        >
          {pending ? "Registrazione…" : "Registrati"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
        <div className="h-px flex-1 bg-gray-200" />
        oppure
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
        className="w-full rounded border px-4 py-2 text-sm hover:bg-gray-50"
      >
        Registrati con Google
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Hai già un account?{" "}
        <button onClick={onSwitch} className="underline">
          Accedi
        </button>
      </p>
    </div>
  );
}
