import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { prisma } from "@/lib/prisma";

type Props = { params: { slug: string } };

async function getVideo(slug: string) {
  return prisma.video.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await getVideo(params.slug);
  if (!v) return { title: "Video non trovato" };
  const title = `${v.title} • Ari Yoga`;
  const description = `${v.level} · ${v.durationMin ?? 0} min — ${
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
            <VideoPlayer
              src={v.srcUrl ?? ""}
              poster={v.posterUrl ?? undefined}
            />
            <h1 className="mt-4 text-2xl font-bold">{v.title}</h1>
            <p className="mt-1 text-sm text-gray-600">
              {v.level} · {v.durationMin ?? 0} min {v.premium && "· Premium"}
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

            {v.premium && (
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
