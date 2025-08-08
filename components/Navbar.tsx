"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/catalogo", label: "Catalogo" },
    { href: "/playlist", label: "Playlist" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          Ari Yoga
        </Link>

        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm hover:underline ${
                pathname === l.href ? "font-medium" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/login" className="rounded-full border px-3 py-1 text-sm">
            Accedi
          </Link>
        </nav>

        <button
          className="md:hidden rounded border px-3 py-1 text-sm"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded border px-3 py-1 text-sm w-max"
            >
              Accedi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
