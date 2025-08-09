import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  duration: string;
  level: string;
  thumb: string;
  premium?: boolean;
};

export function VideoCard({
  slug,
  title,
  duration,
  level,
  thumb,
  premium,
}: Props) {
  return (
    <Link
      href={`/v/${slug}`}
      className="group overflow-hidden rounded-2xl border bg-white transition hover:shadow-md"
      aria-label={`Apri ${title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Badge Premium sopra il thumbnail */}
        {premium && (
          <span className="absolute left-2 top-2 z-10 rounded bg-yellow-400/95 px-2 py-0.5 text-[11px] font-semibold text-black shadow">
            Premium
          </span>
        )}

        <Image
          src={thumb || "https://picsum.photos/seed/fallback/800/450"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority={false}
        />
      </div>

      <div className="space-y-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
            {title}
          </h3>
          {/* Badge pill vicino al titolo */}
          {premium && (
            <span className="shrink-0 rounded border border-yellow-400 bg-yellow-50 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-700">
              Premium
            </span>
          )}
        </div>
        <p className="text-xs text-gray-600">
          {level} · {duration}
        </p>
      </div>
    </Link>
  );
}
