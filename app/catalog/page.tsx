import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  CatalogWithFilters,
  type Video,
} from "@/components/catalog/CatalogWithFilters";

export const metadata: Metadata = {
  title: "Catalogo lezioni",
  description:
    "Sfoglia tutte le lezioni di Ari Yoga. Filtra per livello e durata, scopri playlist e percorsi guidati.",
};

// Mock temporaneo: poi verrà dal DB
const MOCK: Video[] = [
  {
    slug: "hatha-base-15",
    title: "Hatha base per iniziare",
    durationMin: 15,
    level: "Base",
    premium: false,
    thumb: "https://picsum.photos/seed/v1/800/450",
    tags: ["hatha", "base"],
  },
  {
    slug: "vinyasa-energia-25",
    title: "Vinyasa energia mattutina",
    durationMin: 25,
    level: "Intermedio",
    premium: true,
    thumb: "https://picsum.photos/seed/v2/800/450",
    tags: ["vinyasa", "energia"],
  },
  {
    slug: "yin-rilassamento-35",
    title: "Yin per rilassamento profondo",
    durationMin: 35,
    level: "Base",
    premium: true,
    thumb: "https://picsum.photos/seed/v3/800/450",
    tags: ["yin", "rilassamento"],
  },
  {
    slug: "power-avanzato-40",
    title: "Power yoga avanzato full body",
    durationMin: 40,
    level: "Avanzato",
    premium: true,
    thumb: "https://picsum.photos/seed/v4/800/450",
    tags: ["power", "avanzato"],
  },
];

export default function CatalogPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <h1 className="text-2xl font-bold">Catalogo</h1>
          <p className="mt-1 text-gray-600">
            Filtra per livello, durata e cerca tra le lezioni. Alcuni contenuti
            sono gratuiti.
          </p>

          <CatalogWithFilters initial={MOCK} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
