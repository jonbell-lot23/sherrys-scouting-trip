"use client";

import { useState, useRef, useEffect, useMemo } from "react";

function renderMarkdown(text: string) {
  // Split into paragraphs on double newlines
  const blocks = text.split(/\n\n+/);

  return blocks.map((block, bi) => {
    const trimmed = block.trim();

    // Check if block is a list
    const lines = trimmed.split("\n");
    const isList = lines.every((l) => /^[-*•]\s/.test(l.trim()));

    if (isList) {
      return (
        <ul key={bi} className="list-disc pl-4 space-y-1">
          {lines.map((line, li) => (
            <li key={li}>{renderInline(line.replace(/^[-*•]\s+/, ""))}</li>
          ))}
        </ul>
      );
    }

    // Check if block is a numbered list
    const isNumbered = lines.every((l) => /^\d+[.)]\s/.test(l.trim()));
    if (isNumbered) {
      return (
        <ol key={bi} className="list-decimal pl-4 space-y-1">
          {lines.map((line, li) => (
            <li key={li}>
              {renderInline(line.replace(/^\d+[.)]\s+/, ""))}
            </li>
          ))}
        </ol>
      );
    }

    // Regular paragraph (preserve single newlines as <br>)
    return (
      <p key={bi}>
        {lines.map((line, li) => (
          <span key={li}>
            {li > 0 && <br />}
            {renderInline(line)}
          </span>
        ))}
      </p>
    );
  });
}

function renderInline(text: string) {
  // Bold, italic, inline code
  const parts: (string | React.ReactElement)[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(
        <code key={key++} className="bg-stone-100 dark:bg-stone-800 px-1 rounded text-xs">
          {match[4]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

function Markdown({ content }: { content: string }) {
  const rendered = useMemo(() => renderMarkdown(content), [content]);
  return <div className="space-y-2">{rendered}</div>;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "sherry-chat-history";

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // storage full or unavailable
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMessages(loadMessages());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveMessages(messages);
  }, [messages, mounted]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect. Check your internet and try again.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function clearChat() {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100dvh - 120px)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Ask Claude</h1>
          <p className="text-xs text-[var(--muted)]">
            Sydney, IoT, trade &amp; neighborhood tips
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)]"
          >
            Clear chat
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <p className="text-4xl">🦘</p>
            <p className="text-sm text-[var(--muted)]">
              Ask anything about Sydney, IoT opportunities, neighborhoods, or
              Oceania trade.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Best area for IoT retail?",
                "How to get around Sydney?",
                "Where to find tech meetups?",
                "Aussie business etiquette?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs bg-[var(--card)] border border-stone-200 dark:border-stone-700 rounded-full px-3 py-1.5 hover:border-[var(--accent)]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[var(--accent)] text-white rounded-br-sm"
                  : "bg-[var(--card)] border border-stone-200 dark:border-stone-700 rounded-bl-sm"
              }`}
            >
              {m.role === "assistant" ? (
                <Markdown content={m.content} />
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--card)] border border-stone-200 dark:border-stone-700 rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="text-sm text-[var(--muted)] animate-pulse">
                Thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-stone-200 dark:border-stone-700">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Ask about Sydney..."
          rows={1}
          className="flex-1 resize-none rounded-xl border border-stone-200 dark:border-stone-700 bg-[var(--card)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-[var(--accent)] text-white rounded-xl px-4 py-3 text-sm font-medium disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
