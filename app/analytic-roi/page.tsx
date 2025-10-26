"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { InteractiveMap } from "@/components/interactive-map"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const opportunityData = [
  { zone: "Zona A", index: 0.85, clients: 3200 },
  { zone: "Zona B", index: 0.78, clients: 2800 },
  { zone: "Zona C", index: 0.72, clients: 2400 },
  { zone: "Zona D", index: 0.65, clients: 2100 },
  { zone: "Zona E", index: 0.58, clients: 1800 },
]

const demandData = [
  { category: "Cafeterías", demand: 52000 },
  { category: "Retail", demand: 68000 },
  { category: "Restaurantes", demand: 45000 },
  { category: "Servicios", demand: 38000 },
]

const roiTrendData = [
  { month: "Ene", roi: 145 },
  { month: "Feb", roi: 158 },
  { month: "Mar", roi: 165 },
  { month: "Abr", roi: 172 },
  { month: "May", roi: 180 },
  { month: "Jun", roi: 185 },
]

const roiMarkers = [
  { lat: 19.4326, lng: -99.1332, label: "Alta Oportunidad", color: "#16a34a", size: "large" as const },
  { lat: 19.442, lng: -99.145, label: "Media-Alta", color: "#84cc16", size: "large" as const },
  { lat: 19.42, lng: -99.12, label: "Media", color: "#eab308", size: "medium" as const },
  { lat: 19.438, lng: -99.128, label: "Cafetería Rec.", color: "#8B1538", size: "medium" as const },
  { lat: 19.428, lng: -99.138, label: "Retail Rec.", color: "#C41E3A", size: "medium" as const },
  { lat: 19.435, lng: -99.14, label: "Zona Comercial", color: "#E91E63", size: "small" as const },
]

export default function AnalyticROIPage() {
  return (
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
            <h1 className="text-4xl font-bold tracking-tight text-secondary">Analytic ROI</h1>
            <p className="text-lg text-muted-foreground">Análisis de oportunidades de negocio y retorno de inversión</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Mapa de Zonas Recomendadas y Análisis de Oportunidad</h2>
          <InteractiveMap markers={roiMarkers} height="500px" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Índice de Oportunidad por Zona</CardTitle>
              <CardDescription>Índice vs número de clientes potenciales</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={opportunityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8B1538" />
                  <YAxis yAxisId="right" orientation="right" stroke="#C41E3A" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="index" fill="#8B1538" name="Índice" />
                  <Bar yAxisId="right" dataKey="clients" fill="#C41E3A" name="Clientes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demanda por Categoría</CardTitle>
              <CardDescription>Gasto mensual promedio por tipo de negocio</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demandData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#C41E3A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Tendencia de ROI</CardTitle>
              <CardDescription>Evolución del retorno de inversión estimado (%)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roiTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="roi" stroke="#16a34a" strokeWidth={3} name="ROI %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <KPICard
            title="Índice de Oportunidad Promedio"
            value="0.68"
            description="Índice general de oportunidad de negocio"
            trend="up"
            change="+0.12"
          />
          <KPICard
            title="Zonas de Alta Oportunidad"
            value="8 zonas"
            description="Áreas con índice >= 0.75"
            trend="up"
            change="+3"
          />
          <KPICard
            title="Zonas de Oportunidad Media"
            value="15 zonas"
            description="Áreas con índice 0.40-0.74"
            trend="up"
            change="+5"
          />
          <KPICard
            title="Densidad de Clientes Potenciales"
            value="2,340/zona"
            description="Promedio de clientes potenciales por zona"
            trend="up"
            change="+18%"
          />
          <KPICard
            title="Demanda Promedio por Zona"
            value="$45,000"
            description="Gasto promedio mensual por zona"
            trend="up"
            change="+22%"
          />
          <KPICard
            title="Nivel de Competencia Promedio"
            value="Medio"
            description="Saturación de competidores en zonas"
            trend="down"
            change="-8%"
          />
          <KPICard
            title="Tiempo de Estancia Promedio"
            value="85 min"
            description="Tiempo que usuarios pasan en zonas comerciales"
            trend="up"
            change="+12%"
          />
          <KPICard
            title="Frecuencia de Visitas Semanal"
            value="4.2"
            description="Promedio de visitas por semana a zonas"
            trend="up"
            change="+15%"
          />
          <KPICard
            title="Gasto Promedio por Visita"
            value="$125"
            description="Ticket promedio en zonas comerciales"
            trend="up"
            change="+10%"
          />
          <KPICard
            title="Categorías Populares"
            value="6"
            description="Tipos de productos más demandados"
            trend="neutral"
            change="0"
          />
          <KPICard
            title="Horas Pico Comerciales"
            value="17:00-20:00"
            description="Franja horaria con mayor actividad"
            trend="neutral"
            change="—"
          />
          <KPICard
            title="Distancia Promedio Competencia"
            value="350 m"
            description="Separación entre negocios similares"
            trend="up"
            change="+25%"
          />
          <KPICard
            title="Zonas Recomendadas Cafeterías"
            value="3 zonas"
            description="Áreas óptimas para cafeterías"
            trend="up"
            change="+1"
          />
          <KPICard
            title="Zonas Recomendadas Retail"
            value="5 zonas"
            description="Áreas óptimas para tiendas retail"
            trend="up"
            change="+2"
          />
          <KPICard
            title="ROI Estimado Promedio"
            value="185%"
            description="Retorno de inversión proyectado"
            trend="up"
            change="+28%"
          />
        </div>
      </div>
    </main>
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
    <Card className="border-2 hover:border-secondary/50 transition-colors">
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
