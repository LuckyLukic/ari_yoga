// app/api/playlists/create/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  visibility: z.enum(["public", "unlisted", "private"]).optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const isAdmin = session.user.role === "admin";
  const isPremium = session.user.plan === "premium";
  if (!isAdmin && !isPremium) {
    return NextResponse.json(
      { error: "Only premium can create playlists" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const playlist = await prisma.playlist.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description ?? null,
      ownerId: session.user.id,
      isSystem: isAdmin ? true : false,
      visibility: isAdmin ? parsed.data.visibility ?? "public" : "private",
    },
  });

  return NextResponse.json({ ok: true, playlist });
}
