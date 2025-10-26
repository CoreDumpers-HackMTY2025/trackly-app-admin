"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { LifeBuoy, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/auth-provider"

interface ChatMessage { role: "user" | "assistant"; content: string }

export default function SupportPopup() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hola, soy tu asistente de soporte Trackly. ¿En qué te puedo ayudar?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const userContext = useMemo(() => {
    const name = (user?.user_metadata as any)?.name || (user?.user_metadata as any)?.full_name
    const role = user?.user_metadata?.role || (user as any)?.app_metadata?.role
    const email = user?.email
    return { name, role, email }
  }, [user])

  useEffect(() => {
    // Autoscroll al final cuando cambian mensajes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: text }])
    setLoading(true)
    try {
      const resp = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, userContext }),
      })
      const data = await resp.json()
      const reply = data?.reply || "Lo siento, no pude responder en este momento."
      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Ha ocurrido un error. Intenta más tarde." }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-24 right-4 z-50 rounded-full shadow-lg"
          variant="default"
          size="sm"
        >
          <LifeBuoy className="h-4 w-4" aria-hidden="true" />
          <span className="ml-2">Soporte</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Soporte Trackly</DialogTitle>
          <DialogDescription>
            Consulta rápida con el asistente. Responde en español.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="text-xs text-muted-foreground">
            {userContext?.name ? (
              <span>Conectado como {userContext.name} {userContext.email ? `(${userContext.email})` : ""}</span>
            ) : (
              <span>Usuario invitado</span>
            )}
          </div>
          <ScrollArea className="h-64 rounded-md border">
            <div ref={scrollRef} className="space-y-3 p-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary/15" : "bg-muted/60"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-xl px-3 py-2 text-sm bg-muted/60">
                    Pensando…
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Escribe tu mensaje…"
            />
            <Button onClick={sendMessage} disabled={loading || !input.trim()} className="gap-1">
              Enviar
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}