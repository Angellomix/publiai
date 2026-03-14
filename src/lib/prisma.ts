import { PrismaClient } from "@prisma/client";

// Forzar que este archivo solo se ejecute en el servidor
import "server-only";

const prismaClientSingleton = () => {
  console.log("🛠️ Inicializando Prisma Client...");
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Inicialización perezosa para evitar errores durante el build estático
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
