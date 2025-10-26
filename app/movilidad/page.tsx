"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { InteractiveMap } from "@/components/interactive-map"
import { useEffect, useState } from "react"
import { useAuth, AdminGuard } from "@/components/auth-provider"
import { apiGet } from "@/lib/api"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { PieLabelRenderProps } from "recharts"

const distanceData = [
  { day: "Lun", km: 10 },
  { day: "Mar", km: 14 },
  { day: "Mié", km: 11 },
  { day: "Jue", km: 13 },
  { day: "Vie", km: 15 },
  { day: "Sáb", km: 12 },
  { day: "Dom", km: 8 },
]

const transportData = [
  { name: "Transporte Público", value: 65, color: "#8B1538" },
  { name: "Auto Propio", value: 38, color: "#C41E3A" },
  { name: "Carpool", value: 22, color: "#E91E63" },
  { name: "Alternativo", value: 45, color: "#F06292" },
]

const timeData = [
  { hour: "6-9", minutes: 45 },
  { hour: "9-12", minutes: 30 },
  { hour: "12-15", minutes: 25 },
  { hour: "15-18", minutes: 50 },
  { hour: "18-21", minutes: 40 },
  { hour: "21-24", minutes: 20 },
]

const mobilityMarkers = [
  { lat: 19.4326, lng: -99.1332, label: "Centro", color: "#8B1538", size: "large" as const },
  { lat: 19.442, lng: -99.145, label: "Zona Norte", color: "#C41E3A", size: "medium" as const },
  { lat: 19.42, lng: -99.12, label: "Zona Sur", color: "#E91E63", size: "medium" as const },
  { lat: 19.438, lng: -99.128, label: "Ruta 1", color: "#F06292", size: "small" as const },
  { lat: 19.428, lng: -99.138, label: "Ruta 2", color: "#F06292", size: "small" as const },
]

const renderTransportLabel = ({ payload, percent }: PieLabelRenderProps) => {
  const name =
    payload && typeof payload === "object" && "name" in payload
      ? String((payload as { name?: string }).name ?? "")
      : ""
  const percentage = typeof percent === "number" ? (percent * 100).toFixed(0) : "0"
  return name ? `${name}: ${percentage}%` : `${percentage}%`
}

export default function MovilidadPage() {
  const { session } = useAuth()
  const [mobility, setMobility] = useState<any | null>(null)

  useEffect(() => {
    const run = async () => {
      if (!session) return
      try {
        const data = await apiGet(`/api/mobility-patterns/${session.user.id}`, session.access_token)
        setMobility(data)
      } catch (e) {
        console.error("Error fetching mobility patterns", e)
      }
    }
    run()
  }, [session])

  const d = mobility?.distancias_recorre
  const t = mobility?.tiempo_de_recorridos

  return (
    <AdminGuard>
      <main className="min-h-screen bg-background p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight text-primary">Patrones de Movilidad</h1>
              <p className="text-lg text-muted-foreground">
                Análisis detallado de trayectorias y comportamiento de movilidad
              </p>
            </div>
          </div>
  
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Mapa de Trayectorias y Lugares Frecuentes</h2>
            <InteractiveMap markers={mobilityMarkers} height="500px" />
          </div>
  
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distancia Recorrida Semanal</CardTitle>
                <CardDescription>Kilómetros por día de la semana</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={distanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="km" fill="#8B1538" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Transporte</CardTitle>
                <CardDescription>Porcentaje de uso por tipo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={transportData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderTransportLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {transportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
  
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Tiempo de Recorrido por Franja Horaria</CardTitle>
                <CardDescription>Minutos promedio en tránsito</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="minutes" stroke="#C41E3A" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
  
          {/* KPIs Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <KPICard
              title="Distancia Promedio Diaria"
              value={`${d?.promedio_dia_km ?? "12.5"} km`}
              description="Promedio de distancia recorrida por día"
              trend="up"
              change="+8%"
            />
            <KPICard
              title="Distancia Promedio Semanal"
              value={`${d?.promedio_semana_km ?? "85"} km`}
              description="Total de kilómetros por semana"
              trend="up"
              change="+12%"
            />
            <KPICard
              title="Distancia Promedio Mensual"
              value={`${d?.promedio_mes_km ?? "340"} km`}
              description="Acumulado mensual de distancia"
              trend="up"
              change="+15%"
            />
            <KPICard
              title="Tiempo de Recorrido Diario"
              value={`${t?.promedio_dia_min ?? "90"} min`}
              description="Tiempo promedio en tránsito por día"
              trend="neutral"
              change="0%"
            />
            <KPICard
              title="Tiempo de Recorrido Semanal"
              value={`${t?.promedio_semana_min ?? "630"} min`}
              description="Total de minutos en tránsito por semana"
              trend="down"
              change="-3%"
            />
            <KPICard
              title="Tiempo de Recorrido Mensual"
              value={`${t?.promedio_mes_min ?? "2520"} min`}
              description="Acumulado mensual de tiempo en tránsito"
              trend="neutral"
              change="+1%"
            />
            <KPICard
              title="Uso de Transporte Público"
              value="65%"
              description="Porcentaje de usuarios que usan transporte público"
              trend="up"
              change="+8%"
            />
            <KPICard
              title="Uso de Carpool"
              value="22%"
              description="Usuarios que comparten viajes"
              trend="up"
              change="+5%"
            />
            <KPICard
              title="Usuarios con Auto Propio"
              value="38%"
              description="Porcentaje de usuarios con vehículo propio"
              trend="down"
              change="-2%"
            />
            <KPICard
              title="Lugares Frecuentes Promedio"
              value="5.2"
              description="Número promedio de lugares visitados frecuentemente"
              trend="neutral"
              change="0%"
            />
            <KPICard
              title="Coincidencias de Rutas"
              value="3.8"
              description="Promedio de coincidencias con otros usuarios"
              trend="up"
              change="+12%"
            />
            <KPICard
              title="Movilidad Alternativa"
              value="45%"
              description="Uso de bicicleta, patineta o a pie"
              trend="up"
              change="+18%"
            />
          </div>
        </div>
      </main>
    </AdminGuard>
  )
}

function KPICard({
  title,
  value,
  description,
  trend,
  change,
}: {
  title: string
  value: string
  description: string
  trend: "up" | "down" | "neutral"
  change: string
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
  const trendColor =
    trend === "up"
      ? "text-green-600 dark:text-green-400"
      : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground"

  return (
    <Card className="border-2 hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold">{value}</p>
          <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span>{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
