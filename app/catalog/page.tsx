import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import {
  CatalogWithFilters,
  type Video as UI_Video,
} from "@/components/catalog/CatalogWithFilters";

export const metadata: Metadata = {
  title: "Catalogo lezioni",
  description:
    "Sfoglia tutte le lezioni di Ari Yoga. Filtra per livello e durata.",
};

type DbVideoMinimal = {
  slug: string;
  title: string;
  durationMin: number | null;
  level: string | null;
  posterUrl: string | null;
  premium: boolean;
};

function mapToUI(v: DbVideoMinimal): UI_Video {
  return {
    slug: v.slug,
    title: v.title + (v.premium ? " ⭐" : ""),
    durationMin: v.durationMin ?? 0,
    level: (v.level as UI_Video["level"]) ?? "Base",
    thumb: v.posterUrl ?? "https://picsum.photos/seed/fallback/800/450",
    premium: v.premium,
    tags: v.premium ? ["Premium"] : [],
  };
}

export default async function CatalogPage() {
  const session = await getServerSession(authOptions);
  const isPremium = session?.user.plan === "premium";

  const videos = await prisma.video.findMany({
    where: isPremium ? {} : { premium: false },
    orderBy: { createdAt: "desc" },
    take: 60,
    select: {
      slug: true,
      title: true,
      durationMin: true,
      level: true,
      posterUrl: true,
      premium: true,
    },
  });

  const initial = videos.map((v) => mapToUI(v as DbVideoMinimal));

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold">Catalogo</h1>
        <p className="mt-1 text-gray-600">
          Filtra per livello, durata e cerca tra le lezioni. Alcuni contenuti
          sono gratuiti.
        </p>
        <CatalogWithFilters initial={initial} />
      </div>
    </section>
  );
}
