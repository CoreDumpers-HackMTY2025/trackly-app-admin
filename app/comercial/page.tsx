"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth, AdminGuard } from "@/components/auth-provider"
import { apiGet } from "@/lib/api"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const spendingData = [
  { month: "Ene", gasto: 850 },
  { month: "Feb", gasto: 920 },
  { month: "Mar", gasto: 880 },
  { month: "Abr", gasto: 950 },
  { month: "May", gasto: 900 },
  { month: "Jun", gasto: 980 },
]

const categoryData = [
  { category: "Alimentos", amount: 320 },
  { category: "Ropa", amount: 180 },
  { category: "Electrónicos", amount: 250 },
  { category: "Entretenimiento", amount: 150 },
]

const hourlyData = [
  { hour: "9-12", compras: 15 },
  { hour: "12-15", compras: 25 },
  { hour: "15-18", compras: 35 },
  { hour: "18-21", compras: 45 },
  { hour: "21-24", compras: 20 },
]

export default function ComercioPage() {
  const { session } = useAuth()
  const [commercial, setCommercial] = useState<any | null>(null)

  useEffect(() => {
    const run = async () => {
      if (!session) return
      try {
        const data = await apiGet(`/api/commercial-activity/${session.user.id}`, session.access_token)
        setCommercial(data)
      } catch (e) {
        console.error("Error fetching commercial activity", e)
      }
    }
    run()
  }, [session])

  const ingresos = commercial?.ingresos
  const ventas = commercial?.ventas
  const trafico = commercial?.trafico
  const conversion = commercial?.conversion
  const ventasOnline = commercial?.ventas_online

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
            <h1 className="text-4xl font-bold tracking-tight text-secondary">Actividades Comerciales y Compras</h1>
            <p className="text-lg text-muted-foreground">Análisis de comportamiento de compra y gasto</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Gasto Mensual</CardTitle>
              <CardDescription>Evolución del gasto en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="gasto" stroke="#8B1538" fill="#C41E3A" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gasto por Categoría</CardTitle>
              <CardDescription>Distribución del gasto mensual</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#C41E3A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Actividad de Compras por Hora</CardTitle>
              <CardDescription>Número de compras por franja horaria</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="compras" stroke="#8B1538" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <KPICard
            title="Gasto Promedio Diario"
            value="$35.50"
            description="Promedio de gasto por día"
            trend="up"
            change="+10%"
          />
          <KPICard
            title="Gasto Promedio Semanal"
            value="$210"
            description="Total de gasto por semana"
            trend="up"
            change="+12%"
          />
          <KPICard
            title="Gasto Promedio Mensual"
            value="$900"
            description="Acumulado mensual de gasto"
            trend="up"
            change="+15%"
          />
          <KPICard
            title="Compras en Línea Mensuales"
            value="15"
            description="Número de compras online por mes"
            trend="up"
            change="+22%"
          />
          <KPICard
            title="Tiempo Promedio en Tiendas"
            value="40 min"
            description="Duración promedio de visita a tiendas"
            trend="down"
            change="-5%"
          />
          <KPICard
            title="Tiempo por Tienda Individual"
            value="25 min"
            description="Tiempo promedio en cada tienda"
            trend="neutral"
            change="0%"
          />
          <KPICard
            title="Días de Mayor Actividad"
            value="Vie-Sáb"
            description="Días con más actividad comercial"
            trend="neutral"
            change="—"
          />
          <KPICard
            title="Horas Pico de Compra"
            value="18:00-21:00"
            description="Franja horaria con más compras"
            trend="neutral"
            change="—"
          />
          <KPICard
            title="Usuarios Bancarizados"
            value="78%"
            description="Porcentaje con tarjetas bancarias"
            trend="up"
            change="+3%"
          />
          <KPICard
            title="Preferencia Tiendas Físicas"
            value="62%"
            description="Usuarios que prefieren compras presenciales"
            trend="down"
            change="-8%"
          />
          <KPICard
            title="Uso de Tarjeta de Débito"
            value="55%"
            description="Método de pago más usado"
            trend="neutral"
            change="+1%"
          />
          <KPICard
            title="Categorías de Gasto Principales"
            value="4.2"
            description="Promedio de categorías por usuario"
            trend="up"
            change="+5%"
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
