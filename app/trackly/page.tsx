"use client"

import { useMemo } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ChevronRight, Crown, Flame, MapPin, Plus, Sparkles, Target, Users } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type QuickActionProps = {
  href: string
  icon: LucideIcon
  label: string
  description: string
}

function QuickAction({ href, icon: Icon, label, description }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 transition hover:border-primary/50 hover:shadow-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-semibold leading-none">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground transition group-hover:text-primary" aria-hidden="true" />
    </Link>
  )
}

const upcomingMissions = [
  {
    id: "mision-01",
    title: "Explora tu zona de confort",
    description: "Registra 3 hotspots con potencial comercial en tu colonia.",
    xp: 120,
    streakImpact: "+1 día",
  },
  {
    id: "mision-02",
    title: "Mapa colaborativo",
    description: "Valida 5 reportes de la comunidad y sugiere mejoras.",
    xp: 90,
    streakImpact: "+2 recompensas",
  },
]

const highlightHotspots = [
  {
    name: "Plaza Central",
    impact: "+18%",
    status: "En auge",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Mercado Aurora",
    impact: "+9%",
    status: "Oportunidad",
    color: "bg-amber-100 text-amber-600",
  },
  {
    name: "Corredor Norte",
    impact: "+12%",
    status: "Expansión",
    color: "bg-emerald-100 text-emerald-600",
  },
]

const activityFeed = [
  {
    type: "streak",
    title: "Racha activa",
    detail: "5 días completando misiones",
    icon: Flame,
    accent: "bg-orange-500",
  },
  {
    type: "rank",
    title: "Nueva posición",
    detail: "Subiste al top 10 del barrio Roma",
    icon: Crown,
    accent: "bg-amber-500",
  },
  {
    type: "community",
    title: "Validación comunitaria",
    detail: "Tu reporte de movilidad fue validado",
    icon: Sparkles,
    accent: "bg-primary",
  },
]

export default function TracklyHomePage() {
  const { user } = useAuth()

  const displayName = useMemo(() => {
    const profileName = (user?.user_metadata as Record<string, string> | undefined)?.full_name
    if (profileName) return profileName.split(" ")[0]
    return user?.email?.split("@")[0] ?? "Trackler"
  }, [user])

  const level = 7
  const currentXP = 320
  const nextLevelXP = 500
  const xpProgress = (currentXP / nextLevelXP) * 100

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Trackly · Tu radar urbano</p>
        <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-primary/15 via-background to-background p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
            Racha de 5 días · Nivel {level}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Hola, {displayName}</h1>
            <p className="text-sm text-muted-foreground">
              Sigue optimizando tu zona. Tenemos nuevas oportunidades esperando.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Progreso hacia nivel {level + 1}</span>
              <span>
                {currentXP} / {nextLevelXP} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2 bg-muted" />
          </div>
        </div>
      </header>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-base font-semibold">Acciones rápidas</CardTitle>
          <p className="text-xs text-muted-foreground">
            Completa misiones diarias, registra hotspots o comparte insights con tu comunidad.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <QuickAction
            href="/trackly/misiones"
            icon={Target}
            label="Misiones activas"
            description="Completa retos y gana XP"
          />
          <QuickAction
            href="/trackly/mapa"
            icon={MapPin}
            label="Explorar mapa"
            description="Nuevos hotspots en base a tus intereses"
          />
          <QuickAction
            href="/trackly/comunidad"
            icon={Users}
            label="Comunidad"
            description="Únete a la conversación local"
          />
          <QuickAction
            href="/trackly/recompensas"
            icon={Crown}
            label="Recompensas"
            description="Canjea tus puntos Trackly"
          />
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Misiones sugeridas</h2>
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link href="/trackly/misiones">
              Ver todas
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3">
          {upcomingMissions.map((mission) => (
            <Card key={mission.id} className="border-primary/10">
              <CardContent className="flex items-start gap-3 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold leading-snug">{mission.title}</h3>
                    <Badge variant="outline" className="border-primary/30 text-xs text-primary">
                      {mission.xp} XP
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{mission.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-primary" aria-hidden="true" />
                    Impacto en racha: {mission.streakImpact}
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Hotspots en seguimiento</h2>
          <Badge variant="outline" className="text-foreground">
            3 prioridades
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {highlightHotspots.map((spot) => (
            <Card key={spot.name} className="relative overflow-hidden border-border/60">
              <CardContent className="space-y-3 px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{spot.name}</p>
                  <span className={cn("rounded-full px-3 py-1 text-xs", spot.color)}>{spot.status}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Oportunidad proyectada
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-semibold">{spot.impact}</span>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/trackly/mapa">Ver detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Actividad reciente</CardTitle>
            <p className="text-xs text-muted-foreground">Resumen de tu impacto en la última semana.</p>
          </div>
          <Badge variant="secondary" className="gap-1 text-xs">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Insight personalizado
          </Badge>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 px-4 py-4">
          {activityFeed.map((item) => (
            <div key={item.type} className="flex items-center gap-3">
              <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white", item.accent)}>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}