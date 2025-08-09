import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // onDelete: Cascade nelle relazioni cancellerà account/sessions/playlistItems legati all'utente se previsti.
  // Qui cancelliamo l'utente.
  await prisma.user.delete({ where: { email } });

  return NextResponse.json({ ok: true });
}
