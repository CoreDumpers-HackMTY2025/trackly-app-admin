import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta OPENROUTER_API_KEY en variables de entorno" },
        { status: 500 }
      )
    }

    const { messages, userContext, model }: { messages: Array<{ role: string; content: string }>; userContext?: any; model?: string } = await req.json()

    const system = {
      role: "system",
      content:
        `Eres el asistente de soporte de Trackly. Responde SIEMPRE en español, sé conciso y útil.
        Puedes usar este contexto del usuario si está disponible: ${JSON.stringify(userContext ?? {})}.
        Si el usuario pregunta por funciones de la app, referencia Misiones, Mapa y Recompensas.
        Si no conoces un dato, explica cómo conseguirlo dentro de la app.`,
    }

    const payload = {
      model: model || process.env.OPENROUTER_MODEL || "openrouter/chatgpt-5-nano",
      messages: [system, ...(Array.isArray(messages) ? messages : [])],
    }

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Estos headers son recomendados por OpenRouter (referer y title opcionales)
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004/",
        "X-Title": "Trackly Support",
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ error: "Error en OpenRouter", details: text }, { status: resp.status })
    }

    const data = await resp.json()
    const reply = data?.choices?.[0]?.message?.content ?? "Lo siento, no pude generar una respuesta."
    return NextResponse.json({ reply, raw: data })
  } catch (e: any) {
    return NextResponse.json({ error: "Error interno", details: e?.message ?? String(e) }, { status: 500 })
  }
}