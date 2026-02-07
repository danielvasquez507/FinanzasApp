---
description: Guía de revisión técnica para garantizar que el código es estable antes de un despliegue.
---
# Workflow: Revisión Pre-Despliegue

Este skill realiza un chequeo integral del estado de la aplicación para asegurar que la versión Premium 2.1 (y superiores) se despliegue sin errores.

## 1. Verificación de Integridad de Tipos (TypeScript)
// turbo
1.  Ejecuta `npx tsc --noEmit` para verificar que no haya errores de tipos en todo el proyecto.

## 2. Validación de Base de Datos
// turbo
1.  Ejecuta `npx prisma validate` para asegurar que el esquema es correcto.
// turbo
2.  Ejecuta `npx prisma generate` para asegurar que el cliente está sincronizado con el último esquema (Safe Delete & Audit Log).

## 3. Simulación de Compilación Productiva
// turbo
1.  Ejecuta `npm run build` para generar el paquete de producción. Esto detectará errores que el servidor de desarrollo (`next dev`) a veces ignora.

## 4. Auditoría de Seguridad de Datos
1.  Verifica manualmente en `pages/api` que los nuevos endpoints (Transactions, Recurring, Categories) incluyan la protección `deletedAt`.
2.  Asegúrate de que no haya llaves `{` o `}` mal cerradas (como el error anterior).

> [!IMPORTANT]
> Si cualquiera de los pasos anteriores falla con un código de error, el despliegue se considera **FALLIDO**. No subas cambios a producción hasta que todos los checks estén en verde.
