"use client"

import Link from "next/link"
import { CheckCircle2, Compass, Flame, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const dailyMissions = [
  {
    id: "daily-1",
    title: "Validar 3 hotspots",
    description: "Asegúrate que los hotspots más activos siguen vigentes.",
    progress: 66,
    reward: 80,
    category: "Verificación",
  },
  {
    id: "daily-2",
    title: "Detectar oportunidad verde",
    description: "Registra puntos de sombra y áreas con potencial para arbolado.",
    progress: 20,
    reward: 120,
    category: "Sustentable",
  },
]

const weeklyMission = {
  title: "Plan semanal Trackly",
  description: "Diseña una ruta ideal que combine movilidad, comercio y espacios seguros.",
  reward: 400,
  checkpoints: [
    { name: "Diagnóstico de flujo", status: "completed" },
    { name: "Mapa de hotspots", status: "current" },
    { name: "Estrategia de acciones", status: "pending" },
  ],
}

export default function TracklyMissionsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Misiones Trackly</p>
        <h1 className="text-2xl font-semibold">Planifica tu impacto</h1>
        <p className="text-sm text-muted-foreground">
          Completa retos diarios, avanza en tu misión semanal y gana XP para desbloquear recompensas.
        </p>
      </header>

      <Card className="overflow-hidden border-primary/20">
        <CardHeader className="bg-primary/10 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="outline" className="border-primary/40 text-primary">
                Plan semanal
              </Badge>
              <CardTitle className="text-lg font-semibold">{weeklyMission.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{weeklyMission.description}</p>
            </div>
            <Button variant="secondary" size="sm" className="gap-1">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Iniciar ruta
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-4 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
            Completa los 3 pasos esta semana para duplicar tu racha.
          </div>
          <div className="space-y-3">
            {weeklyMission.checkpoints.map((step) => (
              <div key={step.name} className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-primary/40 bg-background"
                >
                  {step.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  ) : step.status === "current" ? (
                    <Target className="h-4 w-4 text-primary" aria-hidden="true" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  )}
                </span>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{step.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {step.status === "completed"
                      ? "Completado"
                      : step.status === "current"
                      ? "En progreso"
                      : "Pendiente"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm">
            <span>Recompensa total</span>
            <Badge>{weeklyMission.reward} XP</Badge>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Misiones diarias</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/trackly/misiones?filter=daily">Ver historial</Link>
          </Button>
        </div>
        <div className="grid gap-3">
          {dailyMissions.map((mission) => (
            <Card key={mission.id} className="border-border/70">
              <CardContent className="space-y-3 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-border/40 text-[10px] uppercase tracking-wide">
                        {mission.category}
                      </Badge>
                      <Badge variant="secondary">{mission.reward} XP</Badge>
                    </div>
                    <h3 className="text-sm font-semibold leading-tight">{mission.title}</h3>
                    <p className="text-xs text-muted-foreground">{mission.description}</p>
                  </div>
                  <Button size="sm" className="gap-1">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Abrir misión
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progreso</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <Progress value={mission.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </section>
  )
}