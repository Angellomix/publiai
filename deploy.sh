#!/bin/bash
set -e
echo "🚀 Iniciando despliegue de PubliAI..."

# 1. Bajar cambios de GitHub
git reset --hard origin/main
git pull origin main

# 2. Limpiar cache y dependencias
rm -rf .next node_modules package-lock.json

# 3. Instalar todo de nuevo
npm install

# 4. Preparar Base de Datos y Motor
export PRISMA_CLIENT_ENGINE_TYPE='library'
npx prisma generate
npx prisma migrate deploy

# 5. Compilar la web
NEXT_TELEMETRY_DISABLED=1 npm run build

echo "📦 Limpiando procesos antiguos..."
fuser -k 3001/tcp || true

echo "✅ DESPLIEGUE EXITOSO."
echo "Para arrancar: npm run start"
