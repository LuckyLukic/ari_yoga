// app/api/account/update/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  address: z.string().min(3),
  city: z.string().min(2),
  zip: z.string().min(4).max(10),
  taxCode: z.string().min(11).max(16), // CF
  phone: z.string().min(6),
  consents: z.object({
    terms: z.boolean(),
    marketing: z.boolean().optional(),
  }),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      address: data.address,
      city: data.city,
      zip: data.zip,
      taxCode: data.taxCode,
      phone: data.phone,
      consents: data.consents as any,
      profileCompleted: true,
    },
  });

  return NextResponse.json({ ok: true });
}
