"use client"

import Link from "next/link"
import { AlertTriangle, Layers, MapPinned, PlusCircle } from "lucide-react"

import { InteractiveMap } from "@/components/interactive-map"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const hotspots = [
  {
    lat: 19.4326,
    lng: -99.1332,
    label: "Centro Histórico",
    color: "#7F56D9",
    size: "large" as const,
  },
  {
    lat: 19.4207,
    lng: -99.1639,
    label: "Zona Roma",
    color: "#F97316",
    size: "medium" as const,
  },
  {
    lat: 19.425,
    lng: -99.15,
    label: "Corredor Reforma",
    color: "#22C55E",
    size: "medium" as const,
  },
]

const layers = [
  {
    name: "Movilidad",
    description: "Flujos de transporte y aforo peatonal",
    active: true,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Comercio",
    description: "Puntos con incremento de consumo",
    active: true,
    color: "bg-amber-100 text-amber-600",
  },
  {
    name: "Seguridad",
    description: "Reportes de incidentes recientes",
    active: false,
    color: "bg-destructive/10 text-destructive",
  },
]

const alerts = [
  {
    title: "Alta demanda en Zona Roma",
    description: "Incremento de 15% en visitas el último fin de semana.",
    urgency: "media",
  },
  {
    title: "Seguridad nocturna",
    description: "2 reportes de iluminación deficiente en corredor Reforma.",
    urgency: "alta",
  },
]

export default function TracklyMapPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Mapa Trackly</p>
        <h1 className="text-2xl font-semibold">Hotspots y capas urbanas</h1>
        <p className="text-sm text-muted-foreground">
          Visualiza oportunidades y alertas estratégicas en tiempo real. Filtra por capas y comparte insights con tu equipo.
        </p>
      </header>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-4 bg-muted/40 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">Mapa dinámico</CardTitle>
            <p className="text-xs text-muted-foreground">
              Posiciona hotspots, monitorea el pulso urbano y actúa según recomendaciones de Trackly.
            </p>
          </div>
          <Button size="sm" className="w-full gap-1 sm:w-auto" asChild>
            <Link href="/trackly/mapa/nuevo-reporte">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Nuevo reporte
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 px-3 py-4">
          <InteractiveMap
            center={{ lat: 19.4326, lng: -99.1332 }}
            markers={hotspots}
            zoom={12}
            height="320px"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {layers.map((layer) => (
              <div
                key={layer.name}
                className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background px-4 py-3 sm:flex-row sm:flex-wrap sm:items-start"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={layer.color}>
                      {layer.name}
                    </Badge>
                    {layer.active ? (
                      <span className="text-[11px] font-medium text-emerald-600">Activa</span>
                    ) : (
                      <span className="text-[11px] font-medium text-muted-foreground">Desactivada</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground break-words">{layer.description}</p>
                </div>
                <Button
                  variant={layer.active ? "default" : "outline"}
                  size="sm"
                  className="w-full sm:w-auto sm:self-start sm:ml-auto sm:shrink"
                >
                  {layer.active ? "Filtrando" : "Activar"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Alertas recientes</CardTitle>
            <p className="text-xs text-muted-foreground">Incidencias y oportunidades para actuar.</p>
          </div>
          <Button variant="ghost" size="sm" className="w-full gap-1 sm:w-auto" asChild>
            <Link href="/trackly/mapa/alertas">
              <MapPinned className="h-4 w-4" aria-hidden="true" />
              Ver histórico
            </Link>
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 px-4 py-4">
          {alerts.map((alert) => (
            <div
              key={alert.title}
              className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background px-4 py-3 sm:flex-row sm:items-start"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive self-start sm:self-center">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="w-full flex-1 space-y-1">
                <p className="text-sm font-medium leading-tight">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <Badge variant="outline" className="text-[11px] uppercase tracking-wider">
                  Urgencia {alert.urgency}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}