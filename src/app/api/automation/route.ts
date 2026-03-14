```javascript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Esta API será consumida por n8n para obtener quién debe publicar ahora
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  // Validación básica de seguridad para la comunicación con n8n
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0 = Domingo, 1 = Lunes...

  try {
    // Buscamos usuarios que tengan programado publicar a esta hora y día
    const configs = await prisma.configuration.findMany({
      where: {
        scheduledDays: { contains: currentDay.toString() },
        scheduledHours: { contains: currentHour.toString() },
        user: {
          subscription: {
            status: "ACTIVE",
            endDate: { gte: now },
          }
        }
      },
      include: {
        user: {
          include: {
            subscription: true
          }
        }
      }
    });

    // Filtramos para asegurar que no se pasen de su límite diario (ej. 6 para LITE)
    const activeTasks = await Promise.all(configs.map(async (config) => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const publicationsToday = await prisma.publication.count({
        where: {
          userId: config.userId,
          timestamp: { gte: todayStart }
        }
      });

      if (publicationsToday < config.imagesPerDay) {
        return {
          userId: config.userId,
          userName: config.user.name,
          fbToken: config.fbToken,
          fbPageId: config.fbPageId,
          niche: config.niche,
          watermark: config.watermark,
          plan: config.user.subscription?.plan,
          remainingToday: config.imagesPerDay - publicationsToday
        };
      }
      return null;
    }));

    return NextResponse.json(activeTasks.filter(task => task !== null));
  } catch (error) {
    console.error("Error en Automation API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Endpoint para que n8n notifique cuando una publicación sea exitosa
export async function POST(req: Request) {
  const { userId, caption, imageUrl, fbPostId, secret } = await req.json();

  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // @ts-ignore
    const publication = await (prisma.publication.create as any)({
      data: {
        userId,
        caption,
        imageUrl,
        fbPostId,
        status: "SUCCESS"
      }
    });

    return NextResponse.json({ success: true, id: publication.id });
  } catch (error) {
    return NextResponse.json({ error: "Error al registrar publicación" }, { status: 500 });
  }
}
