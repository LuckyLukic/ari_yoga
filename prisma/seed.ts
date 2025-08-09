// prisma/seed.ts
import { PrismaClient, Role, Plan } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@ari.yoga" },
    update: {
      role: Role.admin,
      plan: Plan.premium,
      profileCompleted: true,
    },
    create: {
      email: "admin@ari.yoga",
      name: "Admin",
      role: Role.admin,
      plan: Plan.premium,
      profileCompleted: true,
    },
  });

  const v1 = await prisma.video.upsert({
    where: { slug: "saluto-al-sole-a" },
    update: {},
    create: {
      title: "Saluto al Sole A",
      slug: "saluto-al-sole-a",
      description: "Sequenza base",
      durationMin: 10,
      level: "Base",
      premium: false,
      posterUrl: "https://picsum.photos/seed/saluto-a/800/450",
      srcUrl: "https://example.com/video/saluto-a.mp4",
      uploaderId: admin.id,
      tags: ["base", "riscaldamento"],
    },
  });

  const v2 = await prisma.video.upsert({
    where: { slug: "respiro-consapevole" },
    update: {},
    create: {
      title: "Respiro Consapevole",
      slug: "respiro-consapevole",
      description: "Pranayama introduttivo",
      durationMin: 8,
      level: "Base",
      premium: false,
      posterUrl: "https://picsum.photos/seed/respiro/800/450",
      srcUrl: "https://example.com/video/respiro.mp4",
      uploaderId: admin.id,
      tags: ["pranayama", "principianti"],
    },
  });

  const v3 = await prisma.video.upsert({
    where: { slug: "flow-vinyasa-intermedio" },
    update: {},
    create: {
      title: "Flow Vinyasa Intermedio",
      slug: "flow-vinyasa-intermedio",
      description: "Classe completa",
      durationMin: 30,
      level: "Intermedio",
      premium: true,
      posterUrl: "https://picsum.photos/seed/flow/800/450",
      srcUrl: "https://example.com/video/flow.mp4",
      uploaderId: admin.id,
      tags: ["vinyasa", "intermedio"],
    },
  });

  const pl = await prisma.playlist.upsert({
    where: { slug: "inizia-da-qui" },
    update: {},
    create: {
      title: "Inizia da qui",
      slug: "inizia-da-qui",
      description: "Percorso consigliato per iniziare",
      ownerId: admin.id,
    },
  });

  await prisma.playlistItem.upsert({
    where: { playlistId_videoId: { playlistId: pl.id, videoId: v1.id } },
    update: {},
    create: { playlistId: pl.id, videoId: v1.id, position: 1 },
  });

  await prisma.playlistItem.upsert({
    where: { playlistId_videoId: { playlistId: pl.id, videoId: v2.id } },
    update: {},
    create: { playlistId: pl.id, videoId: v2.id, position: 2 },
  });

  await prisma.playlistItem.upsert({
    where: { playlistId_videoId: { playlistId: pl.id, videoId: v3.id } },
    update: {},
    create: { playlistId: pl.id, videoId: v3.id, position: 3 },
  });

  console.log("Seed completato ✔");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
