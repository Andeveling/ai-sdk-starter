# Arquitectura y Flujo RAG Chatbot

Esta documentación explica cómo se conecta cada parte del proyecto RAG (Retrieval-Augmented Generation) siguiendo la guía oficial de Vercel.

---

## 1. Base de datos y ORM
- **Postgres** (con extensión pgvector) almacena recursos y sus embeddings.
- Tablas principales:
  - `resources`: contenido original.
  - `embeddings`: chunks (fragmentos) y sus vectores de embedding.

## 2. Chunking y Embeddings
- Al agregar un recurso, el texto se divide en chunks.
- Cada chunk se convierte en un embedding usando OpenAI (`text-embedding-ada-002`).
- Los embeddings y chunks se guardan en la tabla `embeddings`.

## 3. Server Actions
- [`lib/actions/resources.ts`](../lib/actions/resources.ts):
  - Función `createResource` valida, inserta y genera embeddings.

## 4. API Route
- [`app/api/chat/route.ts`](../app/api/chat/route.ts):
  - Maneja solicitudes de chat.
  - Usa el modelo de OpenAI y define herramientas:
    - `addResource`: agrega conocimiento.
    - `getInformation`: busca información relevante usando embeddings.
  - Orquesta la conversación y llamadas a herramientas.

## 5. Frontend
- [`app/page.tsx`](../app/page.tsx):
  - UI del chat usando el hook `useChat` de AI SDK.
  - Muestra mensajes y llamadas a herramientas.

## 6. Flujo de trabajo

```mermaid
graph TD;
    Usuario--&gt;Frontend;
    Frontend--&gt;API_Chat;
    API_Chat--&gt;Herramientas;
    Herramientas--addResource--&gt;DB;
    Herramientas--getInformation--&gt;DB;
    DB--&gt;Herramientas;
    Herramientas--&gt;API_Chat;
    API_Chat--&gt;Frontend;
    Frontend--&gt;Usuario;
```

1. El usuario escribe en el chat.
2. El mensaje va a `/api/chat`.
3. El modelo decide si llama a una herramienta:
   - Si es información nueva, usa `addResource`.
   - Si es una pregunta, usa `getInformation` para buscar en la base de datos.
4. El resultado se pasa al modelo, que responde.
5. La respuesta se muestra en el frontend.

---

**Archivos clave:**
- [`app/page.tsx`](../app/page.tsx)
- [`app/api/chat/route.ts`](../app/api/chat/route.ts)
- [`lib/actions/resources.ts`](../lib/actions/resources.ts)
- [`lib/ai/embedding.ts`](../lib/ai/embedding.ts)
- [`lib/db/schema/embeddings.ts`](../lib/db/schema/embeddings.ts)
- [`lib/db/schema/resources.ts`](../lib/db/schema/resources.ts)

---

Para más detalles, consulta la [guía oficial de Vercel](https://ai-sdk.dev/cookbook/guides/rag-chatbot#rag-agent-guide).
