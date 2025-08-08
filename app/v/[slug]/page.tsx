import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return MOCK.map((v) => ({ slug: v.slug }));
}

// Mock: in futuro verrà dal DB
const MOCK = [
  {
    slug: "hatha-base-15",
    title: "Hatha base per iniziare",
    minutes: 15,
    level: "Base",
    premium: false,
    tags: ["hatha", "base"],
    poster: "https://picsum.photos/seed/v1/1200/675",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description:
      "Lezione introduttiva di Hatha Yoga per sciogliere il corpo e concentrarsi sul respiro.",
  },
  {
    slug: "vinyasa-energia-25",
    title: "Vinyasa energia mattutina",
    minutes: 25,
    level: "Intermedio",
    premium: true,
    tags: ["vinyasa", "energia"],
    poster: "https://picsum.photos/seed/v2/1200/675",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description:
      "Flusso Vinyasa dinamico per risvegliare la muscolatura e iniziare la giornata.",
  },
] as const;

function getVideo(slug: string) {
  return MOCK.find((v) => v.slug === slug);
}

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const v = getVideo(params.slug);
  if (!v) return { title: "Video non trovato" };
  const title = `${v.title} • Ari Yoga`;
  const description = `${v.level} · ${v.minutes} min — ${v.description}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "video.other",
      images: v.poster ? [{ url: v.poster }] : undefined,
    },
  };
}

export default function VideoPage({ params }: Props) {
  const v = getVideo(params.slug);
  if (!v) return notFound();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        {/* Breadcrumb */}
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
            <VideoPlayer src={v.src} poster={v.poster} />

            <h1 className="mt-4 text-2xl font-bold">{v.title}</h1>
            <p className="mt-1 text-sm text-gray-600">
              {v.level} · {v.minutes} min {v.premium && "· Premium"}
            </p>

            <p className="mt-4 text-gray-700">{v.description}</p>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border p-4">
              <h3 className="font-semibold">Tag</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2 py-0.5 text-xs"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

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
