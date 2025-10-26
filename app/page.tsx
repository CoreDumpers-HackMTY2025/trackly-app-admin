"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Map, Users, Trophy } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1 text-xs uppercase tracking-[0.25em]">Bienvenido</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Trackly: Explora, juega y mejora tu ciudad</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Misiones, mapas dinámicos y recompensas para tu comunidad. Panel de administración para analítica avanzada.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 pt-2">
            <Button asChild className="gap-2">
              <Link href="/trackly">
                Comenzar en Trackly
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/admin">
                Entrar al panel
                <Map className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 text-sm">
            <Link href="/login" className="underline underline-offset-4">Ingresar</Link>
            <Separator orientation="vertical" className="hidden sm:block" />
            <Link href="/registro" className="underline underline-offset-4">Registrarme</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2">
            <CardContent className="p-6 space-y-3">
              <Map className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Mapa dinámico</h3>
              <p className="text-sm text-muted-foreground">Hotspots, capas urbanas y alertas en tiempo real.</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-6 space-y-3">
              <Trophy className="h-6 w-6 text-secondary" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Misiones y recompensas</h3>
              <p className="text-sm text-muted-foreground">Suma puntos completando retos y canjea beneficios.</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-6 space-y-3">
              <Users className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Comunidad</h3>
              <p className="text-sm text-muted-foreground">Comparte ideas y coordina acciones con tu equipo.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border bg-muted/40 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold">¿Listo para empezar?</h2>
          <p className="text-sm text-muted-foreground">Crea tu cuenta o entra y descubre tu ciudad con Trackly.</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
            <Button asChild className="gap-2">
              <Link href="/registro">
                Registrarme
                <Users className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Ingresar</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}