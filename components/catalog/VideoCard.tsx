import Image from "next/image";
import Link from "next/link";

export function VideoCard({
  slug,
  title,
  duration,
  level,
  thumb,
  isPremium,
}: {
  slug: string;
  title: string;
  duration: string;
  level: string;
  thumb: string;
  isPremium?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition">
      <Link href={`/v/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={thumb}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {isPremium && (
            <span className="absolute top-2 right-2 rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-white">
              Premium
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">
            {level} · {duration}
          </p>
        </div>
      </Link>
    </div>
  );
}
