---
description: Guía paso a paso para guardar cambios en Git de forma automática y segura.
---
# Workflow: Actualizar Git

Este skill automatiza el proceso de guardar cambios en el repositorio para mantener el historial al día.

## Pasos de Ejecución

1.  **Revisar Estado Local**
    // turbo
    Ejecuta `git status` para ver qué archivos han cambiado.

2.  **Preparar Cambios (Stage)**
    // turbo
    Ejecuta `git add .` para incluir todos los archivos modificados y nuevos.

3.  **Confirmar Cambios (Commit)**
    // turbo
    Ejecuta `git commit -m "chore: actualización automática de funcionalidad"` (o usa un mensaje descriptivo de lo que hiciste).

4.  **Subir al Repositorio (Push)**
    // turbo
    Ejecuta `git push origin main` (o tu rama actual) para sincronizar con el servidor.

> [!TIP]
> Si recibes un error de "Conflictos", detente y resuelve manualmente antes de forzar cualquier subida.
