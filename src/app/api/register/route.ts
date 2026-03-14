import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        subscription: {
          create: {
            plan: "LITE",
            price: 2000,
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
          },
        },
        configuration: {
          create: {
            imagesPerDay: 6,
          },
        },
      },
    });

    return NextResponse.json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
