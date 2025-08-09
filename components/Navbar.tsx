// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // chiudi dropdown cliccando fuori
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [open]);

  const isLoading = status === "loading";
  const isLoggedIn = !!session;
  const plan = session?.user?.plan ?? "free";
  const profileCompleted = !!session?.user?.profileCompleted;

  return (
    <nav className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          Ari Yoga
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/catalog" className="text-sm hover:underline">
            Catalogo
          </Link>

          {isLoading ? (
            <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
          ) : !isLoggedIn ? (
            // 🔒 SLOGGATO: UN SOLO BOTTONE
            <Link
              href="/auth?tab=login"
              className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Login / Registrati
            </Link>
          ) : (
            // 🔓 LOGGATO
            <>
              <span className="rounded-full border px-2 py-0.5 text-xs">
                {plan === "premium" ? "Premium" : "Free"}
              </span>

              {!profileCompleted && (
                <Link
                  href="/onboarding"
                  className="rounded bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                >
                  Completa profilo
                </Link>
              )}

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  <span className="inline-block h-6 w-6 rounded-full bg-gray-200" />
                  <span className="max-w-[10rem] truncate">
                    {session.user?.name ?? session.user?.email ?? "Account"}
                  </span>
                </button>

                {open && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border bg-white shadow-lg"
                  >
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      Dati personali
                    </Link>
                    <button
                      onClick={() => {
                        setOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Esci
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
