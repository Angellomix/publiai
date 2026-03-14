import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const config = await prisma.configuration.findFirst({
    where: { user: { email: session.user.email } },
  });

  return NextResponse.json(config);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { fbToken, fbPageId, watermark, niche } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const updatedConfig = await prisma.configuration.upsert({
    where: { userId: user.id },
    update: { fbToken, fbPageId, watermark, niche },
    create: {
      userId: user.id,
      fbToken,
      fbPageId,
      watermark,
      niche,
    },
  });

  return NextResponse.json(updatedConfig);
}
