#!/bin/bash
echo "🚀 Iniciando despliegue de PubliAI..."

# 1. Bajar cambios de GitHub
git reset --hard origin/main
git pull origin main

# 2. Limpiar cache y dependencias
rm -rf .next node_modules package-lock.json

# 3. Instalar todo de nuevo
npm install

# 4. Generar motor de Prisma (Forzando modo servidor)
export PRISMA_CLIENT_ENGINE_TYPE='library'
npx prisma generate

# 5. Compilar la web (Forzando build normal sin Turbopack si es posible)
NEXT_TELEMETRY_DISABLED=1 npm run build

echo "✅ Build completado. Ahora puedes correr: npm run start -- -p 3001"
