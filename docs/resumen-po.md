# Resumen para el Product Owner

Este documento explica cómo funciona el sistema de chat basado en RAG (Retrieval-Augmented Generation), cómo Vercel AI SDK facilita su implementación y qué sería necesario construir sin esta herramienta.

---

## ¿Cómo funciona el sistema?

1. **Base de datos de vectores (Vector DB):**
   - Usamos Postgres con la extensión pgvector para almacenar fragmentos de información (chunks) y sus representaciones numéricas (embeddings).
   - Esto permite buscar información relevante de manera eficiente.

2. **Modelo de lenguaje (LLM):**
   - Utilizamos un modelo como OpenAI GPT-4 para interpretar mensajes, responder preguntas y decidir qué información guardar.

3. **Backend con herramientas (tools):**
   - El backend define herramientas que el modelo puede usar dinámicamente:
     - `addResource`: para guardar información nueva.
     - `getInformation`: para buscar información relevante en la base de datos.
   - El modelo decide automáticamente cuándo usar estas herramientas según el contexto.

4. **Frontend de chat:**
   - Interfaz donde los usuarios interactúan con el chat.
   - Los usuarios pueden ser anónimos y acceder mediante una URL única (por ejemplo, para cada curso o actividad).

5. **Flujo de trabajo:**
   - Cada usuario o grupo accede a través de una URL única.
   - Toda la información relevante para esa URL se guarda y se consulta usando esa clave.
   - Esto permite que el sistema "recuerde" el contexto y el conocimiento asociado a esa URL.

---

## ¿Cómo facilita Vercel AI SDK la implementación?

1. **Orquestación automática:**
   - Permite definir herramientas (tools) que el modelo puede invocar dinámicamente, sin necesidad de programar la lógica de decisión desde cero.

2. **Integración sencilla:**
   - Integra fácilmente modelos de OpenAI y la gestión de embeddings, evitando manejar APIs y formatos manualmente.

3. **Manejo de contexto y flujo:**
   - Gestiona el flujo de la conversación, el streaming de respuestas y la integración de resultados de herramientas.

4. **Frontend listo para usar:**
   - Proporciona hooks como `useChat` para integrar el chat en el frontend de manera rápida y eficiente.

5. **Escalabilidad:**
   - Sigue patrones modernos y escalables, permitiendo agregar nuevas herramientas o flujos sin reescribir la arquitectura.

---

## ¿Qué sería necesario construir sin Vercel AI SDK?

1. **Lógica de herramientas:**
   - Decidir manualmente cuándo guardar o buscar información relevante.

2. **Integración con APIs:**
   - Manejar manualmente las APIs de modelos de lenguaje y generación de embeddings.

3. **Gestión de base de datos:**
   - Implementar la lógica de chunking y búsqueda semántica en la base de datos de vectores.

4. **Flujo conversacional:**
   - Construir desde cero el flujo de conversación, manejo de estados y streaming de mensajes.

5. **Gestión de contexto:**
   - Implementar la lógica para asociar conversaciones y conocimiento a URLs únicas o usuarios.

---

**Conclusión:**

Vercel AI SDK simplifica enormemente la implementación del sistema, permitiendo enfocarse en la lógica de negocio y la experiencia de usuario. Sin el SDK, sería necesario construir e integrar manualmente cada parte, lo que implicaría más tiempo, complejidad y riesgo de errores.
