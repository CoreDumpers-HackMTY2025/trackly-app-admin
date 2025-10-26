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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const sustainabilityData = [
  { category: "Transporte", score: 6.8 },
  { category: "Alimentación", score: 7.5 },
  { category: "Consumo", score: 6.2 },
  { category: "Energía", score: 7.0 },
  { category: "Residuos", score: 5.5 },
  { category: "Tecnología", score: 4.2 },
]

const co2Data = [
  { month: "Ene", co2: 52 },
  { month: "Feb", co2: 48 },
  { month: "Mar", co2: 45 },
  { month: "Abr", co2: 43 },
  { month: "May", co2: 42 },
  { month: "Jun", co2: 45 },
]

const recyclingData = [
  { week: "S1", rate: 62 },
  { week: "S2", rate: 65 },
  { week: "S3", rate: 68 },
  { week: "S4", rate: 68 },
]

const sustainabilityMarkers = [
  { lat: 19.4326, lng: -99.1332, label: "Zona Verde", color: "#22c55e", size: "large" as const },
  { lat: 19.442, lng: -99.145, label: "Reciclaje", color: "#16a34a", size: "medium" as const },
  { lat: 19.42, lng: -99.12, label: "Transporte Eco", color: "#15803d", size: "medium" as const },
  { lat: 19.438, lng: -99.128, label: "Mercado Local", color: "#84cc16", size: "small" as const },
  { lat: 19.428, lng: -99.138, label: "Energía Solar", color: "#eab308", size: "small" as const },
]

export default function SustentabilidadPage() {
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
            <h1 className="text-4xl font-bold tracking-tight text-accent">Sustentable y Uso Responsable</h1>
            <p className="text-lg text-muted-foreground">Métricas de sostenibilidad y huella ambiental</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Mapa de Zonas Sustentables y Contexto Ambiental</h2>
          <InteractiveMap markers={sustainabilityMarkers} height="500px" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Índice de Sostenibilidad por Categoría</CardTitle>
              <CardDescription>Puntuación de 0 a 10 por área</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={sustainabilityData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} />
                  <Radar name="Sostenibilidad" dataKey="score" stroke="#8B1538" fill="#C41E3A" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reducción de CO₂</CardTitle>
              <CardDescription>Emisiones mensuales en kg</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={co2Data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="co2" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Tasa de Reciclaje Semanal</CardTitle>
              <CardDescription>Porcentaje de residuos reciclados</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recyclingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <KPICard
            title="Índice de Sostenibilidad General"
            value="7.2/10"
            description="Puntuación general de sostenibilidad"
            trend="up"
            change="+0.5"
          />
          <KPICard
            title="CO₂ Promedio Mensual"
            value="45 kg"
            description="Emisiones de carbono por mes"
            trend="down"
            change="-18%"
          />
          <KPICard
            title="Huella de Transporte"
            value="6.8/10"
            description="Impacto ambiental del transporte"
            trend="down"
            change="-12%"
          />
          <KPICard
            title="Porcentaje de Reciclaje"
            value="68%"
            description="Tasa de reciclaje de residuos"
            trend="up"
            change="+12%"
          />
          <KPICard
            title="Residuos Mensuales"
            value="32 kg"
            description="Generación de residuos por mes"
            trend="down"
            change="-8%"
          />
          <KPICard
            title="Huella de Residuos"
            value="5.5/10"
            description="Impacto de generación de residuos"
            trend="down"
            change="-10%"
          />
          <KPICard
            title="Productos Ecológicos"
            value="42%"
            description="Porcentaje de compras ecológicas"
            trend="up"
            change="+15%"
          />
          <KPICard
            title="Uso de Transporte Público"
            value="65%"
            description="Usuarios que usan transporte público"
            trend="up"
            change="+8%"
          />
          <KPICard
            title="Uso de Vehículo Eléctrico"
            value="12%"
            description="Usuarios con vehículos eléctricos"
            trend="up"
            change="+25%"
          />
          <KPICard
            title="Consumo de Energía Mensual"
            value="180 kWh"
            description="Promedio de consumo eléctrico"
            trend="down"
            change="-5%"
          />
          <KPICard
            title="Uso de Paneles Solares"
            value="8%"
            description="Usuarios con energía solar"
            trend="up"
            change="+30%"
          />
          <KPICard
            title="Huella Digital Estimada"
            value="4.2/10"
            description="Impacto del uso tecnológico"
            trend="neutral"
            change="+2%"
          />
          <KPICard
            title="Compras de Segunda Mano"
            value="18/mes"
            description="Número de compras de productos usados"
            trend="up"
            change="+22%"
          />
          <KPICard
            title="Uso de Reutilizables"
            value="73%"
            description="Usuarios que usan productos reutilizables"
            trend="up"
            change="+10%"
          />
          <KPICard
            title="Comida Local"
            value="58%"
            description="Porcentaje de alimentos locales"
            trend="up"
            change="+7%"
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
        ? "text-destructive"
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
