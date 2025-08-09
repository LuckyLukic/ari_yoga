// app/api/playlists/[id]/update/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  visibility: z.enum(["public", "unlisted", "private"]).optional(),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pl = await prisma.playlist.findUnique({ where: { id: params.id } });
  if (!pl) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = pl.ownerId === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) {
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

  const updated = await prisma.playlist.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json({ ok: true, playlist: updated });
}
