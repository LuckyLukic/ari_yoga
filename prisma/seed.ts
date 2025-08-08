// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // pulizia per evitare duplicati
  await prisma.playlistItem.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.video.deleteMany();

  // video demo
  await prisma.video.createMany({
    data: [
      {
        slug: "hatha-base-15",
        title: "Hatha base per iniziare",
        durationMin: 15,
        level: "Base",
        premium: false,
        posterUrl: "https://picsum.photos/seed/v1/1200/675",
        srcUrl:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        description:
          "Lezione introduttiva di Hatha Yoga per sciogliere il corpo e il respiro.",
      },
      {
        slug: "vinyasa-energia-25",
        title: "Vinyasa energia mattutina",
        durationMin: 25,
        level: "Intermedio",
        premium: true,
        posterUrl: "https://picsum.photos/seed/v2/1200/675",
        srcUrl:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        description: "Flusso Vinyasa dinamico per risvegliare la muscolatura.",
      },
      {
        slug: "yin-rilassamento-35",
        title: "Yin per rilassamento profondo",
        durationMin: 35,
        level: "Base",
        premium: true,
        posterUrl: "https://picsum.photos/seed/v3/1200/675",
        srcUrl:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        description: "Sequenza Yin per distendere e allungare in profondità.",
      },
      {
        slug: "power-avanzato-40",
        title: "Power yoga avanzato full body",
        durationMin: 40,
        level: "Avanzato",
        premium: true,
        posterUrl: "https://picsum.photos/seed/v4/1200/675",
        srcUrl:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        description: "Lezione intensa per lavorare su forza e resistenza.",
      },
    ],
  });

  // playlist demo
  const playlist = await prisma.playlist.create({
    data: {
      slug: "starter",
      title: "Starter — Inizia da qui",
      description: "Una piccola raccolta per iniziare la pratica.",
    },
  });

  // collega due video alla playlist
  const v1 = await prisma.video.findUnique({
    where: { slug: "hatha-base-15" },
  });
  const v2 = await prisma.video.findUnique({
    where: { slug: "vinyasa-energia-25" },
  });

  if (v1 && v2) {
    await prisma.playlistItem.createMany({
      data: [
        { playlistId: playlist.id, videoId: v1.id, position: 1 },
        { playlistId: playlist.id, videoId: v2.id, position: 2 },
      ],
    });
  }

  console.log("✅ Seed completato!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
