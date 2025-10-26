"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, PlusCircle, Send, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const featuredTopics = [
  {
    id: "foro-movilidad",
    title: "Movilidad inteligente",
    description: "Comparte estrategias sobre rutas, congestion y oportunidades para micromovilidad.",
    participants: 128,
    newPosts: 4,
    tags: ["movilidad", "smart city"],
  },
  {
    id: "foro-comercio",
    title: "Comercio local",
    description: "Casos de éxito, activaciones de marca y hotspots con alta conversión.",
    participants: 214,
    newPosts: 9,
    tags: ["retail", "estrategia"],
  },
  {
    id: "foro-seguridad",
    title: "Seguridad urbana",
    description: "Reportes, iluminación y zonas que requieren intervención.",
    participants: 86,
    newPosts: 2,
    tags: ["seguridad", "alertas"],
  },
]

const communityFeed = [
  {
    id: "post-01",
    author: "Valeria R.",
    badge: "Embajadora Roma Norte",
    timeAgo: "hace 2 h",
    title: "Nuevos comercios en Plaza Aurora",
    content:
      "Se abrieron 3 locales de comida saludable en el último mes. Altas reseñas y tráfico constante entre 5pm y 8pm.",
    replies: 12,
    likes: 34,
    tags: ["comercio", "oportunidades"],
  },
  {
    id: "post-02",
    author: "Luis P.",
    badge: "Analista Trackly",
    timeAgo: "hace 5 h",
    title: "Rutas seguras nocturnas",
    content:
      "Probamos un circuito nuevo con iluminación reforzada. Reducción de incidentes y mayor permanencia de visitantes.",
    replies: 8,
    likes: 21,
    tags: ["seguridad", "movilidad"],
  },
]

export default function TracklyCommunityPage() {
  const [message, setMessage] = useState("")

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Comunidad Trackly</p>
        <h1 className="text-2xl font-semibold">Insights urbanos en tiempo real</h1>
        <p className="text-sm text-muted-foreground">
          Colabora con otros usuarios, comparte aprendizajes y fortalece la red de inteligencia urbana.
        </p>
      </header>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-base font-semibold">Topics destacados</CardTitle>
            <CardDescription>Participa en conversaciones activas para compartir hallazgos y validaciones.</CardDescription>
          </div>
          <Button size="sm" className="gap-1" asChild>
            <Link href="/trackly/comunidad/nuevo-post">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Nuevo post
            </Link>
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-3">
          {featuredTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/trackly/comunidad/${topic.id}`}
              className="rounded-2xl border border-border/60 bg-card px-4 py-4 transition hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {topic.participants} participantes
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden="true" />
                    {topic.newPosts} nuevos posts hoy
                  </div>
                  <h2 className="text-sm font-semibold leading-tight">{topic.title}</h2>
                  <p className="text-xs text-muted-foreground">{topic.description}</p>
                </div>
                <Badge variant="outline" className="text-[11px] uppercase tracking-wider">
                  Activo
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {topic.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[11px]">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Actividad reciente</CardTitle>
          <CardDescription>Aporta tus hallazgos estratégicos y valida los del resto de la comunidad.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-5 px-4 py-4">
          {communityFeed.map((post) => (
            <article key={post.id} className="space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{post.author}</span>
                  ·
                  <span>{post.badge}</span>
                  ·
                  <span>{post.timeAgo}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{post.content}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.replies} respuestas
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  Compartir
                </Button>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[11px]">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </CardContent>
        <Separator />
        <CardFooter>
          <form
            className="flex w-full items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              setMessage("")
            }}
          >
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Comparte una idea o descubrimiento..."
              className="flex-1"
            />
            <Button type="submit" disabled={!message} size="sm" className="gap-1">
              Publicar
            </Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  )
}