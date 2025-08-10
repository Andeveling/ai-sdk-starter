import { createResource } from "@/lib/actions/resources"
import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, UIMessage, tool, stepCountIs } from "ai"
import { z } from "zod"
import { findRelevantContent } from "@/lib/ai/embedding"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

type MessagesUI = {
  messages: UIMessage[]
}

export async function POST(req: Request) {
  const { messages }: MessagesUI = await req.json()
  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
    Allow Spanish responses.
    `,
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      addResource: tool({
        description: "Add a new resource to the knowledge base.",
        inputSchema: z.object({
          content: z.string().describe("The content or resource to add to the knowledge base."),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        inputSchema: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  })

  return result.toUIMessageStreamResponse()
}
