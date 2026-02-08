#!/bin/sh
# entrypoint.sh

# Esperar a que el volumen esté listo (opcional, pero buena práctica)
echo "Starting application..."

# Ejecutar migraciones de Prisma
# Nota: Asegurarse de que DATABASE_URL apunte a la ubicación correcta en el volumen
if [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma migrations..."
  npx prisma migrate deploy
fi

# Iniciar la aplicación
echo "Starting Next.js server..."
exec node server.js
