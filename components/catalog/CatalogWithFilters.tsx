"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { VideoCard } from "@/components/VideoCard";

export type Video = {
  slug: string;
  title: string;
  durationMin: number;
  level: "Base" | "Intermedio" | "Avanzato";
  thumb: string;
  premium?: boolean;
  tags: string[];
};

function filterVideos(
  data: Video[],
  filters: { level: string; duration: string; query: string }
) {
  const { level, duration, query } = filters;
  let out = [...data];

  if (level) out = out.filter((v) => v.level === (level as Video["level"]));
  if (duration) {
    const [min, max] = duration.split("-").map((n) => parseInt(n, 10));
    out = out.filter((v) => v.durationMin >= min && v.durationMin <= max);
  }
  if (query) {
    const q = query.toLowerCase();
    out = out.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  return out;
}

export function CatalogWithFilters({ initial }: { initial: Video[] }) {
  const [filters, setFilters] = useState({
    level: "",
    duration: "",
    query: "",
  });
  const filtered = useMemo(
    () => filterVideos(initial, filters),
    [initial, filters]
  );

  return (
    <div className="mt-6 space-y-4">
      <FilterBar onChange={setFilters} />

      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((v) => (
          <VideoCard
            key={v.slug}
            slug={v.slug}
            title={v.title}
            duration={`${v.durationMin} min`}
            level={v.level}
            thumb={v.thumb}
            isPremium={v.premium}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>{filtered.length} risultati</span>
        <div className="flex gap-2">
          <button className="rounded border px-3 py-1">← Prev</button>
          <button className="rounded border px-3 py-1">Next →</button>
        </div>
      </div>
    </div>
  );
}
