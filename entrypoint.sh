#!/bin/sh
# entrypoint.sh

# Esperar a que el volumen esté listo (opcional, pero buena práctica)
# Debugging: Listar binarios para encontrar Prisma
ls -la /app/node_modules/.bin
ls -la /app/node_modules/prisma

# Esperar a que el volumen esté listo (opcional, pero buena práctica)
echo "Starting application..."

# Ejecutar migraciones de Prisma
# Nota: Asegurarse de que DATABASE_URL apunte a la ubicación correcta en el volumen
if [ -n "$DATABASE_URL" ]; then
  echo "Syncing database schema (db push)..."
  npx prisma db push --accept-data-loss
fi

# Iniciar la aplicación
echo "Starting Next.js server..."
exec node server.js
