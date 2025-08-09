import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  CatalogWithFilters,
  type Video as UI_Video,
} from "@/components/catalog/CatalogWithFilters";
import type { Video as DbVideo } from "@prisma/client";

export const metadata: Metadata = {
  title: "Catalogo lezioni",
  description:
    "Sfoglia tutte le lezioni di Ari Yoga. Filtra per livello e durata.",
};

function mapToUI(v: DbVideo): UI_Video {
  return {
    slug: v.slug,
    title: v.title,
    durationMin: v.durationMin ?? 0,
    level: (v.level as UI_Video["level"]) ?? "Base",
    thumb: v.posterUrl ?? "https://picsum.photos/seed/fallback/800/450",
    premium: Boolean(v.premium),
    tags: [], // li aggiungeremo quando avremo i Tag
  };
}

export default async function CatalogPage() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  const initial = videos.map(mapToUI);

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
