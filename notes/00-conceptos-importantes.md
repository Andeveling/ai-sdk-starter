---
post_title: Conceptos importantes de RAG y chatbots
author1: andres
post_slug: conceptos-importantes-rag-chatbots
microsoft_alias: andres
featured_image: ''
categories: ["IA", "Chatbots", "RAG"]
tags: ["RAG", "embeddings", "chunks", "vector store", "pipeline", "agent", "context window"]
ai_note: true
summary: Notas sobre los conceptos clave para construir chatbots con RAG, embeddings y recuperación aumentada por generación.
post_date: 2025-08-10
---

## Conceptos Importantes para RAG Chatbots

### RAG (Retrieval-Augmented Generation)
- **Definición:** Técnica que combina modelos generativos (LLMs) con recuperación de información de fuentes externas.
- **Propósito:** Permite respuestas precisas y actualizadas, incluso fuera de los datos de entrenamiento.
- **Flujo básico:**
	1. El usuario pregunta.
	2. El sistema recupera fragmentos relevantes.
	3. El modelo genera la respuesta usando esos fragmentos.

### Embeddings
- **Definición:** Vectores numéricos que representan el significado semántico de textos.
- **Uso:** Permiten comparar preguntas y documentos para encontrar relevancia semántica.

### Chunks
- **Definición:** Fragmentos pequeños de texto extraídos de documentos largos.
- **Motivo:** Mejoran la precisión y eficiencia de la recuperación.

### Vector Store (Almacén de Vectores)
- **Definición:** Base de datos para almacenar y buscar embeddings.
- **Función:** Permite búsquedas rápidas de los chunks más relevantes.

### Pipeline de RAG
1. **Chunking:** Dividir documentos en fragmentos.
2. **Embedding:** Convertir los chunks en vectores.
3. **Indexing:** Guardar los vectores en un vector store.
4. **Retrieval:** Buscar los chunks más relevantes para una consulta.
5. **Generation:** El LLM genera la respuesta usando los chunks recuperados.

### Agent (Agente)
- **Definición:** Orquesta el flujo de recuperación y generación, gestionando la interacción entre usuario, vector store y modelo generativo.

### Context Window
- **Definición:** Cantidad máxima de texto que el modelo puede procesar a la vez.
- **Importancia:** Limita cuántos chunks se pueden pasar al modelo para generar una respuesta.
