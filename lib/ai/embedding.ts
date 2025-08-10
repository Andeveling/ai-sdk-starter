import { embedMany, embed } from "ai"
import { openai } from "@ai-sdk/openai"
import { db } from "../db"
import { embeddings } from "../db/schema/embeddings"
import { cosineDistance, desc, gt, sql } from "drizzle-orm"

// Modelo de incrustación para texto
const embeddingModel = openai.embedding("text-embedding-ada-002")

/**
 * Divide un texto largo en fragmentos más pequeños usando el punto ('.') como delimitador.
 * Cada fragmento se limpia de espacios al inicio y final, y se descartan los fragmentos vacíos.
 *
 * @param input Texto completo a dividir en fragmentos.
 * @returns Un arreglo de fragmentos de texto, sin espacios extra y sin elementos vacíos.
 *
 * @example
 *   generateChunk("Hola. Esto es una prueba.  . Fin.")
 *   // Devuelve: ["Hola", "Esto es una prueba", "Fin"]
 */
export function generateChunk(input: string): string[] {
  return input
    .trim()
    .split(".")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
}

/**
 * Genera embeddings vectoriales para cada fragmento de un texto.
 *
 * 1. Divide el texto en fragmentos usando `generateChunk`.
 * 2. Genera un embedding para cada fragmento usando el modelo de OpenAI.
 * 3. Devuelve un arreglo de objetos con el fragmento original y su embedding.
 *
 * @param value Texto completo del que se quieren obtener embeddings.
 * @returns Promesa que resuelve a un arreglo de objetos con el fragmento de texto y su embedding numérico.
 *
 * @example
 *   const resultado = await generateEmbeddings("Hola. Esto es una prueba.")
 *   // resultado: [ { content: "Hola", embedding: [...] }, { content: "Esto es una prueba", embedding: [...] } ]
 */
export const generateEmbeddings = async (value: string): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunk(value)
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  })
  return embeddings.map((embedding, index) => ({ content: chunks[index], embedding }))
}

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ")
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  })
  return embedding
}

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedding = await generateEmbedding(userQuery)
  const similarity = sql<number>`1 - (${cosineDistance(embeddings.embedding, userQueryEmbedding)})`
  const similarGuides = await db
    .select({ name: embeddings
      .content, similarity
    })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy(t => desc(t.similarity))
    .limit(4).execute()
  return similarGuides
}
