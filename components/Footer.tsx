import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Ari Yoga. Tutti i diritti riservati.
          </p>
          <nav className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/termini">Termini</Link>
            <Link href="/contatti">Contatti</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
