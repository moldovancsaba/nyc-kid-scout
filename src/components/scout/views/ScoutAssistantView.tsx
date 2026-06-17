import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PROVIDERS } from "@/data/providers";
import { ProviderCard } from "@/components/scout/ProviderCard";
import type { Provider } from "@/types/provider";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scout-assistant`;

const STARTERS = [
  "Help me plan my fall schedule for my 5-year-old",
  "Summer camps in the UES for a 7-year-old",
  "Fun birthday party ideas in Queens",
  "Drop-in art studios near the Upper West Side",
];

const PROVIDERS_PAYLOAD = PROVIDERS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  borough: p.borough,
  neighborhood: p.neighborhood,
  activityTypes: p.activityTypes,
  ageRanges: p.ageRanges,
  dayTimeTags: p.dayTimeTags,
  pricePerClass: p.pricePerClass,
  short: p.shortDescription,
}));

const PROVIDER_BY_ID = new Map(PROVIDERS.map((p) => [p.id, p]));
const MARKER_RE = /\[\[\s*PROVIDERS\s*:\s*([^\]]+)\]\]/i;

function extractProviders(content: string): { text: string; providers: Provider[] } {
  const m = content.match(MARKER_RE);
  if (!m) return { text: content, providers: [] };
  const ids = m[1]
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const providers = ids
    .map((id) => PROVIDER_BY_ID.get(id))
    .filter((p): p is Provider => Boolean(p))
    .slice(0, 6);
  const text = content.replace(MARKER_RE, "").trim();
  return { text, providers };
}

interface Props {
  initialQuery?: string | null;
  onConsumedInitial?: () => void;
  onOpenProvider?: (p: Provider) => void;
  onShareProvider?: (p: Provider) => void;
}

export function ScoutAssistantView({
  initialQuery,
  onConsumedInitial,
  onOpenProvider,
  onShareProvider,
}: Props = {}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next, providers: PROVIDERS_PAYLOAD }),
      });

      if (resp.status === 429) {
        toast({ title: "Slow down", description: "Too many requests — please try again in a moment." });
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast({ title: "Out of credits", description: "Please add AI credits to continue." });
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let nlIdx: number;
        while ((nlIdx = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, nlIdx);
          textBuffer = textBuffer.slice(nlIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Something went wrong", description: "Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !autoSentRef.current) {
      autoSentRef.current = true;
      send(initialQuery);
      onConsumedInitial?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  return (
    <div className="mx-auto flex h-[calc(100vh-12rem)] max-w-3xl flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-teal text-teal-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold">Scout AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Your AI guide to NYC kids' classes, camps, parties, and drop-ins.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border bg-card p-4 sm:p-6"
      >
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ask me anything — I can suggest programs by age, borough, schedule, or budget.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-border bg-secondary/50 p-3 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => {
          if (m.role === "user") {
            return (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl bg-foreground px-4 py-2.5 text-sm text-background">
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            );
          }
          const { text, providers } = extractProviders(m.content);
          return (
            <div key={i} className="space-y-3">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-secondary px-4 py-2.5 text-sm text-foreground">
                  <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-headings:font-display">
                    <ReactMarkdown>{text || "…"}</ReactMarkdown>
                  </div>
                </div>
              </div>
              {providers.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {providers.map((p) => (
                    <ProviderCard
                      key={p.id}
                      provider={p}
                      onOpen={(prov) => onOpenProvider?.(prov)}
                      onShare={(prov) => onShareProvider?.(prov)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-secondary px-4 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-4 flex items-end gap-2"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask Scout AI Assistant…"
          rows={1}
          className="min-h-[48px] resize-none rounded-xl bg-card"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="h-12 rounded-xl bg-teal text-teal-foreground hover:bg-teal/90"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}