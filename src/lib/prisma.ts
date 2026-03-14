import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Proxy para inicialización perezosa (Lazy Load)
// Esto evita que Prisma se inicialice durante la fase de "Collecting page data" del build
export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (!globalThis.prismaGlobal) {
      globalThis.prismaGlobal = prismaClientSingleton();
    }
    return (globalThis.prismaGlobal as any)[prop];
  }
});
