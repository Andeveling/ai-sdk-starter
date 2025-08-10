'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-center">AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={"flex " + (m.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={
                  "max-w-[70%] p-3 rounded-lg shadow-md " +
                  (m.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200')
                }
              >
                <div className="font-bold capitalize mb-1">
                  {m.role === 'user' ? 'Tú' : 'AI'}
                </div>
                {m.parts.map((part: any, index: number) => {
                  switch (part.type) {
                    case 'text':
                      return <p key={index} className="whitespace-pre-wrap">{part.text}</p>;
                    case 'tool-addResource':
                    case 'tool-getInformation':
                      return (
                        <div key={index} className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                          <Badge variant="secondary" className="mb-1">
                            Herramienta: {part.type.replace('tool-', '')}
                          </Badge>
                          <p className="text-gray-600 dark:text-gray-400">
                            {part.state === 'output-available' ? 'Herramienta ejecutada:' : 'Llamando herramienta:'}
                          </p>
                          <pre className="my-2 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-sm overflow-auto text-xs">
                            {JSON.stringify(part.input, null, 2)}
                          </pre>
                          {part.state === 'output-available' && part.output && (
                            <>
                              <p className="text-gray-600 dark:text-gray-400 mt-2">Salida:</p>
                              <pre className="my-2 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-sm overflow-auto text-xs">
                                {JSON.stringify(part.output, null, 2)}
                              </pre>
                            </>
                          )}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}
          {status === 'streaming' && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                <div className="font-bold capitalize mb-1">AI</div>
                <p className="animate-pulse">AI está escribiendo...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={e => setInput(e.currentTarget.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-grow"
              disabled={status === 'streaming'}
            />
            <Button type="submit" disabled={!input.trim() || status === 'streaming'}>
              Enviar
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

