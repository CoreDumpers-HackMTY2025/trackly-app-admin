"use client"

import Link from "next/link"
import { CheckCircle2, Compass, Flame, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { apiGet, apiPost } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

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
  const { session } = useAuth()
  const [missions, setMissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [progressList, setProgressList] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const run = async () => {
      if (!session) return
      try {
        setLoading(true)
        const data = await apiGet(`/api/missions/list`, session.access_token)
        const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
        setMissions(arr)
      } catch (e) {
        console.warn("No se pudo cargar misiones", e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [session])

  useEffect(() => {
    const runProgress = async () => {
      if (!session) return
      try {
        const hist = await apiGet(`/api/missions/progress`, session.access_token)
        const arr = Array.isArray(hist?.data) ? hist.data : Array.isArray(hist) ? hist : []
        setProgressList(arr)
      } catch (e) {
        console.warn("No se pudo cargar historial de misiones", e)
      }
    }
    runProgress()
  }, [session])

  const handleComplete = async (missionId: number | string) => {
    if (!session) return
    try {
      const res = await apiPost(`/api/missions/complete`, { mission_id: missionId }, session.access_token)
      setMissions((prev) => prev.map((m) => (m.id === missionId ? { ...m, progreso: "completed" } : m)))
      toast({ title: "Misión completada", description: `Has ganado XP por la misión ${missionId}.` })
    } catch (e) {
      console.error("Error al completar misión", e)
      toast({ variant: "destructive", title: "No se pudo completar", description: "Intenta nuevamente." })
    }
  }

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
        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {(missions.length > 0 ? missions : dailyMissions).map((mission: any) => {
              const id = mission.id
              const title = mission.title ?? mission.nombre ?? mission.name ?? "Misión"
              const description = mission.description ?? mission.descripcion ?? mission.desc ?? ""
              const reward = mission.reward ?? mission.recompensa ?? 0
              const progress = mission.progress ?? (mission.progreso === "completed" ? 100 : 0)
              const category = mission.category ?? mission.categoria ?? "General"
              const isCompleted = progress >= 100
              return (
                <Card key={id} className="border-border/70">
                  <CardContent className="space-y-3 px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-border/40 text-[10px] uppercase tracking-wide">
                            {category}
                          </Badge>
                          <Badge variant="secondary">{reward} XP</Badge>
                        </div>
                        <h3 className="text-sm font-semibold leading-tight">{title}</h3>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                      <Button size="sm" className="gap-1" onClick={() => handleComplete(id)} disabled={isCompleted}>
                        <Target className="h-4 w-4" aria-hidden="true" />
                        {isCompleted ? "Completada" : "Abrir misión"}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progreso</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* Historial de misiones */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Historial</h2>
        {progressList.length > 0 ? (
          progressList.map((m: any) => (
            <div key={`${m.mission_id}-${m.fecha ?? m.updated_at ?? m.created_at ?? Math.random()}`} className="flex items-center justify-between rounded-xl border px-4 py-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Misión #{m.mission_id}</p>
                <p className="text-xs text-muted-foreground">{m.progreso ?? m.status ?? "completed"} · {new Date(m.fecha ?? Date.now()).toLocaleString()}</p>
              </div>
              <Badge variant="secondary">{m.recompensa ?? m.reward ?? 0} XP</Badge>
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground">Aún no tienes misiones registradas.</p>
        )}
      </section>
    </section>
  )
}