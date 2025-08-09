import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { prisma } from "@/lib/prisma";

type Props = { params: { slug: string } };

type DbVideoMinimal = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  durationMin: number | null;
  level: string | null;
  premium: boolean;
  posterUrl: string | null;
  srcUrl: string | null;
};

async function getVideo(slug: string): Promise<DbVideoMinimal | null> {
  return prisma.video.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      durationMin: true,
      level: true,
      premium: true,
      posterUrl: true,
      srcUrl: true,
    },
  }) as Promise<DbVideoMinimal | null>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await getVideo(params.slug);
  if (!v) return { title: "Video non trovato" };
  const title = `${v.title} • Ari Yoga`;
  const description = `${v.level ?? ""} · ${v.durationMin ?? 0} min — ${
    v.description ?? ""
  }`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "video.other",
      images: v.posterUrl ? [{ url: v.posterUrl }] : undefined,
    },
  };
}

export default async function VideoPage({ params }: Props) {
  const v = await getVideo(params.slug);
  if (!v) return notFound();

  const session = await getServerSession(authOptions);
  const isPremiumUser = session?.user.plan === "premium";
  const locked = v.premium && !isPremiumUser;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <nav className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:underline">
            Catalogo
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{v.title}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {locked ? (
              <div className="aspect-video rounded-xl border bg-gray-50 grid place-items-center">
                <div className="text-center p-6">
                  <p className="text-lg font-semibold">Contenuto Premium</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {session
                      ? "Aggiorna il piano per sbloccare questa lezione."
                      : "Accedi o abbonati per sbloccare questa lezione."}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    {!session && (
                      <Link href="/auth" className="rounded border px-4 py-2">
                        Accedi
                      </Link>
                    )}
                    <Link
                      href="/upgrade"
                      className="rounded bg-gray-900 px-4 py-2 text-white"
                    >
                      Passa a Premium
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <VideoPlayer
                src={v.srcUrl ?? ""}
                poster={v.posterUrl ?? undefined}
              />
            )}

            <h1 className="mt-4 text-2xl font-bold flex items-center gap-2">
              {v.title}
              {v.premium && (
                <span className="inline-block rounded bg-yellow-400 px-2 py-0.5 text-xs font-semibold text-black">
                  Premium
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {v.level ?? "Base"} · {v.durationMin ?? 0} min{" "}
              {v.premium && "· Premium"}
            </p>
            {v.description && (
              <p className="mt-4 text-gray-700">{v.description}</p>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border p-4">
              <h3 className="font-semibold">Prossimi passi</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                <li>
                  <Link href="/playlist/starter" className="underline">
                    Vai alla playlist Starter
                  </Link>
                </li>
                <li>
                  <Link href="/catalog" className="underline">
                    Torna al catalogo
                  </Link>
                </li>
              </ul>
            </div>

            {v.premium && !isPremiumUser && (
              <div className="rounded-2xl border p-4">
                <h3 className="font-semibold">Area Premium</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Abbonati per sbloccare tutte le lezioni Premium.
                </p>
                <Link
                  href="/upgrade"
                  className="mt-3 inline-block rounded bg-gray-900 px-4 py-2 text-white"
                >
                  Passa a Premium
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
