"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { users } from "@/lib/users-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AdminGuard } from "@/components/auth-provider"

export default function DashboardPage() {
  return (
    <AdminGuard>
      <main className="min-h-screen bg-background p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-balance">Panel de Control de Usuarios</h1>
          <p className="text-lg text-muted-foreground text-pretty">Análisis de datos de usuarios de aplicación móvil</p>
        </div>

        {/* KPI Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Patrones de Movilidad */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-primary">Patrones de Movilidad</CardTitle>
              <Link href="/movilidad">
                <Button variant="ghost" size="sm" className="gap-2">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <KPIItem label="Distancia Promedio Mensual" value="340 km" trend="up" change="+12%" />
              <KPIItem label="Tiempo de Recorrido Diario" value="90 min" trend="neutral" change="0%" />
              <KPIItem label="Uso de Transporte Público" value="65%" trend="up" change="+8%" />
            </CardContent>
          </Card>

          {/* Actividades Comerciales */}
          <Card className="border-2 hover:border-secondary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-secondary">Actividades Comerciales</CardTitle>
              <Link href="/comercial">
                <Button variant="ghost" size="sm" className="gap-2">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <KPIItem label="Gasto Promedio Mensual" value="$900" trend="up" change="+15%" />
              <KPIItem label="Compras en Línea" value="15/mes" trend="up" change="+22%" />
              <KPIItem label="Tiempo en Tiendas" value="40 min" trend="down" change="-5%" />
            </CardContent>
          </Card>

          {/* Sustentable y Uso Responsable */}
          <Card className="border-2 hover:border-accent/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-accent">Sustentable y Uso Responsable</CardTitle>
              <Link href="/sustentabilidad">
                <Button variant="ghost" size="sm" className="gap-2">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <KPIItem label="Índice de Sostenibilidad" value="7.2/10" trend="up" change="+0.5" />
              <KPIItem label="CO₂ Mensual" value="45 kg" trend="down" change="-18%" />
              <KPIItem label="Porcentaje de Reciclaje" value="68%" trend="up" change="+12%" />
            </CardContent>
          </Card>

          {/* Usuario */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-primary">Usuario</CardTitle>
              <Link href="/usuario">
                <Button variant="ghost" size="sm" className="gap-2">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {users.slice(0, 3).map((user) => (
                <Link key={user.id} href={`/usuario/${user.id}`}>
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 hover:bg-muted transition-colors cursor-pointer">
                    <Avatar className="h-10 w-10 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-primary">{user.type}</p>
                      <p className="text-xs text-muted-foreground">{user.age} años</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Analytic ROI - Full Width */}
          <Card className="border-2 hover:border-secondary/50 transition-colors md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-secondary">Analytic ROI</CardTitle>
              <Link href="/analytic-roi">
                <Button variant="ghost" size="sm" className="gap-2">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <KPIItem label="Índice de Oportunidad Promedio" value="0.68" trend="up" change="+0.12" />
              <KPIItem label="Zonas de Alta Oportunidad" value="8 zonas" trend="up" change="+3" />
              <KPIItem label="Densidad de Clientes Potenciales" value="2,340/zona" trend="up" change="+18%" />
            </CardContent>
          </Card>
        </div>
        </div>
      </main>
    </AdminGuard>
  )
}

function KPIItem({
  label,
  value,
  trend,
  change,
}: {
  label: string
  value: string
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
    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
        <TrendIcon className="h-4 w-4" />
        <span>{change}</span>
      </div>
    </div>
  )
}
