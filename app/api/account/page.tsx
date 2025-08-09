import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DeleteAccountButton } from "@/components/account/DeleteAccountButton";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    // torna al login e poi rimbalza su /account dopo il login
    redirect(`/login?callbackUrl=${encodeURIComponent("/account")}`);
  }

  const user = session.user;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold">Il tuo account</h1>
      <p className="mt-1 text-gray-600">Gestisci profilo, piano e sicurezza.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Profilo */}
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Profilo</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Nome</dt>
              <dd className="text-gray-900">{user.name ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Email</dt>
              <dd className="text-gray-900">{user.email}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <Link href="/catalog" className="text-sm underline">
              Vai al catalogo
            </Link>
          </div>
        </div>

        {/* Piano (placeholder per quando aggiungiamo Stripe) */}
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Piano</h2>
          <p className="mt-2 text-sm text-gray-600">
            Stato:{" "}
            <span className="rounded bg-gray-100 px-2 py-0.5">Freemium</span>
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/upgrade"
              className="rounded bg-gray-900 px-4 py-2 text-sm text-white"
            >
              Passa a Premium
            </Link>
            <button
              className="rounded border px-4 py-2 text-sm"
              disabled
              title="In arrivo"
            >
              Sospendi abbonamento
            </button>
          </div>
        </div>

        {/* Sicurezza (placeholder) */}
        <div className="rounded-2xl border bg-white p-5 md:col-span-2">
          <h2 className="text-lg font-semibold">Sicurezza</h2>
          <p className="mt-2 text-sm text-gray-600">
            A breve potrai cambiare password e gestire l'accesso Google.
          </p>

          {/* Danger zone */}
          <div className="mt-6 rounded-xl border border-red-300/80 bg-red-50 p-5">
            <h3 className="font-semibold text-red-800">Danger Zone</h3>
            <p className="mt-1 text-sm text-red-700">
              Eliminazione definitiva dell’account (diritto all’oblio).
            </p>
            <DeleteAccountButton />
          </div>
        </div>
      </div>
    </section>
  );
}
