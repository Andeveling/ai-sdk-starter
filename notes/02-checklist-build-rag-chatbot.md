# Checklist y Guía de Apuntes: Construcción de un RAG Chatbot

Basado en la sección "Build" de la guía oficial de ai-sdk.dev.

---

## 1. Conceptos Fundamentales
- [x] **¿Qué es RAG (Retrieval Augmented Generation)?**
	- Es una técnica que combina modelos de lenguaje (LLM) con recuperación de información relevante externa, permitiendo que el modelo responda usando datos fuera de su entrenamiento.

- [x] **¿Por qué es importante RAG?**
	- Los LLM tienen un conocimiento limitado a sus datos de entrenamiento. RAG permite responder preguntas sobre información nueva, privada o específica, mejorando la utilidad y precisión del modelo.

- [x] **¿Qué son los embeddings y para qué sirven?**
	- Son representaciones numéricas (vectores) de palabras, frases o documentos en un espacio de alta dimensión. Permiten medir similitud semántica y buscar información relevante mediante comparación de vectores.

- [x] **¿Qué es el chunking y por qué es necesario?**
	- Es el proceso de dividir textos largos en fragmentos pequeños (chunks) para que puedan ser embebidos y buscados eficientemente. Mejora la calidad de la recuperación y la precisión de las respuestas.

## 2. Preparación del Proyecto
- [ ] Clonar el repositorio base (`ai-sdk-rag-starter`)
- [ ] Instalar dependencias (`pnpm install`)
- [ ] Configurar la base de datos Postgres (Vercel o local)
- [ ] Copiar y editar el archivo `.env` (`DATABASE_URL`, `OPENAI_API_KEY`)
- [ ] Ejecutar migraciones iniciales (`pnpm db:migrate`)

## 3. Construcción del Agente RAG
### a) Embeddings
- [ ] Crear la tabla `embeddings` en la base de datos
- [ ] Añadir lógica para chunking y generación de embeddings al crear recursos
- [ ] Implementar la función para dividir texto en chunks
- [ ] Instalar e importar el AI SDK y el proveedor de OpenAI
- [ ] Implementar la función para generar embeddings de los chunks

### b) Acciones del Servidor
- [ ] Actualizar la acción del servidor para crear recursos y almacenar embeddings

### c) Interfaz de Usuario
- [ ] Crear o actualizar la página principal para el chat
- [ ] Implementar el hook `useChat` para gestionar mensajes y estado

### d) API y Lógica de Chat
- [ ] Crear el endpoint `/api/chat` usando route handlers de Next.js
- [ ] Añadir instrucciones de sistema para restringir respuestas solo a información conocida
- [ ] Implementar herramientas (tools) para que el modelo pueda agregar y consultar información
- [ ] Añadir el tool `addResource` para guardar nuevos conocimientos
- [ ] Mejorar la UX con multi-step calls usando `stopWhen`
- [ ] Añadir el tool `getInformation` para buscar información relevante en la base de datos

## 4. Pruebas y Validación
- [ ] Probar la creación y consulta de recursos desde la UI
- [ ] Verificar que los embeddings y recursos se almacenan correctamente en la base de datos
- [ ] Validar que el modelo responde solo con información de la base de datos

## 5. Troubleshooting
- [ ] Revisar la sección de troubleshooting para errores de migración
- [ ] Consultar recursos adicionales si es necesario

---

> Usa esta checklist para guiar tus apuntes y asegurarte de cubrir cada paso clave en la construcción de un RAG Chatbot.
