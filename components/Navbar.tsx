"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalogo" },
  ];

  const isActive = (href: string) =>
    pathname === href ? "font-semibold" : "text-gray-700";

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          Ari Yoga
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${isActive(l.href)} hover:underline`}
            >
              {l.label}
            </Link>
          ))}

          {status !== "loading" && !session?.user && (
            <>
              <Link
                href="/login"
                className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
              >
                Accedi
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gray-900 px-3 py-1 text-sm text-white hover:bg-gray-800"
              >
                Registrati
              </Link>
            </>
          )}

          {session?.user && (
            <>
              <Link
                href="/account"
                className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
              >
                Account
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
              >
                Esci
              </button>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded border px-2 py-1"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`${isActive(l.href)} hover:underline`}
              >
                {l.label}
              </Link>
            ))}

            {status !== "loading" && !session?.user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Accedi
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded bg-gray-900 px-3 py-1 text-sm text-white"
                >
                  Registrati
                </Link>
              </>
            )}

            {session?.user && (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Account
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Esci
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
