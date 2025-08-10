## Vercel AI SDK RAG Starter

> **Note**
> This project is based on the [Vercel AI SDK Retrieval-Augmented Generation (RAG) guide](https://sdk.vercel.ai/docs/guides/rag-chatbot). See credits below.

Build a modern, production-ready chatbot that answers only from its knowledge base using Retrieval-Augmented Generation (RAG). This starter provides a robust foundation for customer support bots, knowledge assistants, and more.

---

## Features

- End-to-end RAG chatbot with context-aware responses
- Knowledge ingestion and retrieval pipeline
- Modern UI with [shadcn/ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com)
- [Next.js 14](https://nextjs.org) (App Router)
- [Vercel AI SDK](https://sdk.vercel.ai/docs) integration
- [OpenAI](https://openai.com) for embeddings and chat
- [Drizzle ORM](https://orm.drizzle.team) and [Postgres](https://www.postgresql.org/) with [pgvector](https://github.com/pgvector/pgvector)
- Easy local development with Docker Compose

---

## Quickstart

```bash
# 1. Clone the repo
git clone https://github.com/Andeveling/ai-sdk-starter.git
cd ai-sdk-starter

# 2. Install dependencies
pnpm install

# 3. Copy and edit environment variables
cp .env.example .env
# Edit .env with your OpenAI and Postgres credentials

# 4. Start Postgres (with pgvector) using Docker Compose
docker-compose up -d

# 5. Run database migrations
pnpm run db:migrate

# 6. Start the development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```text
├── app/                # Next.js app directory (routes, API, UI)
├── components/         # UI components (shadcn/ui)
├── docs/               # Project documentation
├── lib/                # Utilities, database, AI logic
├── public/             # Static assets
├── notes/              # Project notes and checklists
├── ...
```

---

## Configuration

- **Environment**: Configure `.env` with your OpenAI API key and Postgres connection string.
- **Database**: Uses Postgres with the `pgvector` extension for vector search. See `docker-compose.yml` for setup.
- **Migrations**: Managed with Drizzle ORM. See `lib/db/migrate.ts`.

---

## Usage

1. **Ingest Knowledge**: Add resources to the knowledge base using the provided UI or API.
2. **Chat**: Interact with the chatbot. It will only answer using information from the ingested resources.
3. **Extend**: Customize ingestion, retrieval, or UI as needed for your use case.

---

## Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [RAG Guide](https://sdk.vercel.ai/docs/guides/rag-chatbot)
- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- [pgvector](https://github.com/pgvector/pgvector)
- [shadcn/ui](https://ui.shadcn.com)

---

## Credits & Copyright

This project is adapted from the [Vercel AI SDK RAG Guide](https://sdk.vercel.ai/docs/guides/rag-chatbot). All rights to the guide and its content belong to Vercel, Inc. See the original guide for detailed explanations and further resources.
