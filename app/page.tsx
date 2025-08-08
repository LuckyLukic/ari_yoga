import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="text-3xl font-bold md:text-5xl">
              Pratica yoga online con{" "}
              <span className="whitespace-nowrap">Ari Yoga</span>
            </h1>
            <p className="mt-4 text-gray-600">
              Playlist e percorsi guidati per ogni livello. Inizia gratis con
              due lezioni complete.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/catalog"
                className="rounded-full bg-gray-900 px-5 py-2 text-white"
              >
                Guarda i video free
              </Link>
              <Link href="/upgrade" className="rounded-full border px-5 py-2">
                Passa a Premium
              </Link>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Nessuna carta richiesta per i contenuti free.
            </p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
              alt="Lezione di yoga"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* TEASER VIDEO FREE */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Inizia gratis</h2>
          <p className="mt-1 text-gray-600">
            Due lezioni disponibili senza registrazione.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Link
                key={i}
                href={`/v/free-${i}`}
                className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={`https://picsum.photos/seed/free-${i}/800/450`}
                    alt={`Video free ${i}`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-medium">Lezione gratuita #{i}</h3>
                <p className="text-sm text-gray-600">
                  Hatha · 15 min · Livello Base
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/catalog" className="text-sm underline">
              Vedi tutto il catalogo
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT / CHI SONO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop"
              alt="Ari — insegnante di yoga"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Ciao, sono Ari</h2>
            <p className="mt-3 text-gray-600">
              Insegno yoga da 10 anni. Qui trovi lezioni guidate, playlist per
              ogni livello e percorsi mensili per creare una pratica costante.
            </p>
            <ul className="mt-4 list-disc pl-5 text-gray-600">
              <li>Lezioni Hatha, Vinyasa, Yin</li>
              <li>Programmi per principianti e avanzati</li>
              <li>Nuovi contenuti ogni mese</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA UPGRADE */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
          <div className="rounded-2xl border bg-gradient-to-br from-gray-50 to-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold">Pronto a fare sul serio?</h2>
            <p className="mt-1 text-gray-600">
              Sblocca l’area Premium: playlist complete, progresso salvato e
              nuove lezioni ogni mese.
            </p>
            <Link
              href="/upgrade"
              className="mt-5 inline-block rounded-full bg-gray-900 px-6 py-2 text-white"
            >
              Passa a Premium
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
