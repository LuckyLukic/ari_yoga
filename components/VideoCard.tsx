import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  duration: string; // "15 min"
  level: "Base" | "Intermedio" | "Avanzato";
  thumb: string; // url immagine
  isPremium?: boolean;
};

export function VideoCard({
  slug,
  title,
  duration,
  level,
  thumb,
  isPremium,
}: Props) {
  return (
    <Link
      href={`/v/${slug}`}
      className="group rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={thumb}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
        />
        {isPremium && (
          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white">
            Premium
          </span>
        )}
      </div>
      <h3 className="mt-3 line-clamp-2 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {level} · {duration}
      </p>
    </Link>
  );
}
