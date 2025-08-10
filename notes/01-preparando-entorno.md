---
post_title: "Apuntes sobre entorno local para RAG con Vercel AI SDK"
author1: "andres"
post_slug: "apuntes-entorno-local-rag-vercel-ai-sdk"
microsoft_alias: "andres"
featured_image: ""
categories: ["ai", "nextjs", "postgres"]
tags: ["rag", "docker", "pgvector", "vercel-ai-sdk"]
ai_note: "Sí, se usó AI para la creación de este post."
summary: "Notas personales sobre cómo configurar y levantar un entorno local para un chatbot RAG usando Vercel AI SDK, Next.js, Postgres y pgvector."
post_date: "2025-08-10"
---

## Entorno local para RAG con Vercel AI SDK

### Objetivo

- Aprender a levantar un entorno local para experimentar con Retrieval-Augmented Generation (RAG) usando el stack recomendado en la guía de Vercel AI SDK.

### Stack utilizado

- Next.js 14 (App Router)
- Vercel AI SDK
- OpenAI
- Drizzle ORM
- Postgres + pgvector
- shadcn-ui y TailwindCSS

### Pasos realizados

1. **Configuración de Docker Compose**
   - Se creó un archivo `docker-compose.yml` para levantar un contenedor de Postgres con pgvector.
   - Variables de entorno: usuario, contraseña y base de datos personalizadas.

2. **Archivo `.env`**
   - Se agregó la variable `DATABASE_URL` para conectar la app a la base de datos local.

3. **Levantamiento de la base de datos**
   - Comando:  
     ```bash
     docker compose up -d
     ```
   - Conexión a la base de datos usando cliente SQL.
   - Ejecución de la extensión pgvector:
     ```sql
     CREATE EXTENSION IF NOT EXISTS vector;
     ```

4. **Migración y prueba de la app**
   - Comando para migrar la base de datos:
     ```bash
     pnpm db:migrate
     ```
   - Comando para iniciar la app:
     ```bash
     pnpm run dev
     ```

### Recursos útiles

- [Guía oficial RAG Chatbot](https://ai-sdk.dev/cookbook/guides/rag-chatbot#rag-agent-guide)
- [Documentación pgvector](https://github.com/pgvector/pgvector)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

### Notas adicionales

- Es importante habilitar la extensión pgvector después de crear la base de datos.
- El archivo [.env](http://_vscodecontentref_/1) debe mantenerse fuera del control de versiones por seguridad.
