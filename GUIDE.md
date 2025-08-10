---
post_title: "Guía para crear un agente RAG con AI SDK"
author1: "Andres Develing"
post_slug: "guia-agente-rag-ai-sdk"
microsoft_alias: "andresdev"
featured_image: "https://ai-sdk.dev/og.png"
categories: ["AI SDK", "RAG", "Next.js", "PostgreSQL"]
tags: ["RAG", "AI SDK", "Next.js", "Embeddings", "pgvector", "OpenAI"]
ai_note: "Esta guía fue adaptada y traducida con ayuda de IA."
summary: "Aprende a construir un agente de Recuperación Aumentada por Generación (RAG) usando AI SDK, Next.js y PostgreSQL."
post_date: "2025-08-10"
---

## ¿Qué es RAG?

RAG significa "Recuperación Aumentada por Generación". Es una técnica que permite a un modelo de lenguaje grande (LLM) responder usando información relevante y específica, proporcionada como contexto adicional al prompt.

## ¿Por qué es importante RAG?

Los LLMs solo pueden razonar sobre los datos con los que fueron entrenados. Si preguntas por información fuera de ese alcance (por ejemplo, datos privados o eventos recientes), el modelo no podrá responder correctamente. RAG soluciona esto recuperando información relevante y pasándola como contexto al modelo.

**Ejemplo:**

```
input: ¿Cuál es mi comida favorita?
generación: No tengo acceso a información personal sobre individuos, incluyendo sus comidas favoritas.
```

Pero si le das contexto:

```
input: Responde usando solo el contexto proporcionado. user prompt: '¿Cuál es mi comida favorita?' context: al usuario le encantan los nuggets de pollo
generación: ¡Tu comida favorita son los nuggets de pollo!
```

## Embeddings

Los [embeddings](https://ai-sdk.dev/docs/ai-sdk-core/embeddings) son representaciones vectoriales de palabras, frases o imágenes en un espacio de alta dimensión. Palabras similares están cerca entre sí, y la distancia (por ejemplo, la similitud coseno) indica cuán relacionadas están.

## Chunking (Fragmentación)

Fragmentar significa dividir el material fuente en partes más pequeñas (por ejemplo, por oraciones). Esto permite crear embeddings de mejor calidad y almacenarlos junto al texto original en una base de datos vectorial como PostgreSQL con pgvector.

## ¿Cómo funciona todo junto?

RAG permite que el modelo responda usando información fuera de sus datos de entrenamiento: se embebe la consulta del usuario, se buscan los fragmentos más similares en la base de datos y se pasan como contexto al modelo para generar la respuesta.

---

## Configuración del Proyecto

### 1. Clona el repositorio base

```bash
git clone https://github.com/vercel/ai-sdk-rag-starter
cd ai-sdk-rag-starter
pnpm install
```

### 2. Crea la base de datos

Puedes usar [Vercel + Neon](https://vercel.com/integrations/neon) para una base de datos PostgreSQL gratuita, o instalar PostgreSQL localmente. Copia la variable `DATABASE_URL` en tu archivo `.env`.

### 3. Migra la base de datos

```bash
cp .env.example .env
# Edita .env y agrega tu DATABASE_URL
pnpm db:migrate
```

### 4. Agrega tu clave de OpenAI

Obtén una API key en [platform.openai.com](https://platform.openai.com/) y colócala en `.env` como `OPENAI_API_KEY`.

---

## Construcción paso a paso

### 1. Crea la tabla de embeddings

Crea `lib/db/schema/embeddings.ts` con la siguiente estructura:

```typescript
import { nanoid } from '@/lib/utils';
import { index, pgTable, text, varchar, vector } from 'drizzle-orm/pg-core';
import { resources } from './resources';

export const embeddings = pgTable(
	'embeddings',
	{
		id: varchar('id', { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
		resourceId: varchar('resource_id', { length: 191 }).references(() => resources.id, { onDelete: 'cascade' }).notNull(),
		content: text('content').notNull(),
		embedding: vector('embedding', { dimensions: 1536 }).notNull(),
	},
	table => ({
		embeddingIndex: index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
	})
);
```

Ejecuta:

```bash
pnpm db:push
```

### 2. Lógica de embeddings y fragmentación

Crea `lib/ai/embedding.ts` con funciones para fragmentar texto, generar embeddings y buscar contenido relevante.

### 3. Actualiza la acción de servidor

En `lib/actions/resources.ts`, modifica la función `createResource` para que, al crear un recurso, también genere y almacene los embeddings de sus fragmentos.

### 4. Interfaz de chat

En `app/page.tsx`, usa el hook `useChat` de AI SDK para crear la UI conversacional.

### 5. Ruta API para el chat

Crea `app/api/chat/route.ts` para manejar los mensajes y conectar con el modelo y las tools.

---

## Uso de Tools

Una [tool](https://ai-sdk.dev/docs/foundations/tools) es una función que el modelo puede invocar para realizar tareas específicas, como agregar o consultar información. Se definen con una descripción, un esquema de entrada (usando Zod) y una función `execute`.

Ejemplo de tool para agregar recursos:

```typescript
addResource: tool({
	description: 'Agrega un recurso a la base de conocimiento.',
	inputSchema: z.object({
		content: z.string().describe('Contenido a agregar'),
	}),
	execute: async ({ content }) => createResource({ content }),
})
```

También puedes crear una tool para buscar información relevante (`getInformation`).

---

## Mejorando la experiencia

Puedes usar la opción `stopWhen` para permitir que el modelo realice múltiples pasos (por ejemplo, llamar una tool y luego resumir la acción al usuario).

---

## Conclusión

¡Felicidades! Ahora tienes un agente RAG capaz de almacenar y recuperar información usando AI SDK, Next.js y PostgreSQL. Puedes expandirlo agregando más tools, mejorando la UI o integrando otros modelos.

---

## Recursos

- [Documentación AI SDK](https://ai-sdk.dev/docs)
- [Guía original en inglés](https://ai-sdk.dev/cookbook/guides/rag-chatbot#rag-agent-guide)
- [Ejemplo de repositorio](https://github.com/vercel/ai-sdk-rag-starter)
