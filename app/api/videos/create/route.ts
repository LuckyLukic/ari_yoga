// app/api/videos/create/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  durationMin: z.number().int().positive().optional(),
  level: z.string().optional(),
  premium: z.boolean().default(false),
  posterUrl: z.string().url().optional(),
  srcUrl: z.string().url().optional(),
  visibility: z.enum(["public", "unlisted", "private"]).default("public"),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const video = await prisma.video.create({
    data: {
      ...data,
      uploaderId: session.user.id,
      tags: data.tags ?? [],
    },
  });

  return NextResponse.json({ ok: true, video });
}
