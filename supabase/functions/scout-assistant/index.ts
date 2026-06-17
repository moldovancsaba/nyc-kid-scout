import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BASE_SYSTEM_PROMPT = `You are Scout AI Assistant, a friendly, knowledgeable local guide for NYC families looking for kids' classes, camps, birthday party providers, and drop-in activities across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.

Tone: warm, concise, parent-friendly. Use short paragraphs. Ask one clarifying question only when truly necessary (age, borough, budget). Confirm that schedules, pricing, and availability should be verified directly with the provider when relevant.

IMPORTANT — Recommending providers:
You will be given a JSON list of REAL providers from the Class Scout NY database. ONLY recommend providers from that list, referenced by their exact "id". Never invent providers.

When the parent's request is a discovery/recommendation query (find / suggest / show me / what about / help me choose), do this:
1. Write a short 1–2 sentence intro explaining the match.
2. On its OWN line, output a marker exactly in this format with 1–5 ids:
   [[PROVIDERS: id1, id2, id3]]
3. After the marker, optionally add one short follow-up question or tip (no bullet list of the providers — the UI renders cards from the marker).

If nothing in the list fits, say so plainly and suggest nearby alternatives that DO exist in the list, still using the marker. If the parent is just chatting (no recommendation needed), skip the marker.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, providers } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const providersBlock = Array.isArray(providers) && providers.length
      ? `\n\nAvailable providers (JSON):\n${JSON.stringify(providers).slice(0, 60000)}`
      : "";
    const systemPrompt = BASE_SYSTEM_PROMPT + providersBlock;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...(messages ?? []),
          ],
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("scout-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});