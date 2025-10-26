import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { users } from "@/lib/users-data"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id)

  if (!user) {
    notFound()
  }

  // Chart data based on user
  const activityData = [
    { day: "Lun", hours: user.dailyConnectionTime * 0.9 },
    { day: "Mar", hours: user.dailyConnectionTime * 1.1 },
    { day: "Mié", hours: user.dailyConnectionTime * 0.95 },
    { day: "Jue", hours: user.dailyConnectionTime * 1.05 },
    { day: "Vie", hours: user.dailyConnectionTime * 1.15 },
    { day: "Sáb", hours: user.dailyConnectionTime * 0.8 },
    { day: "Dom", hours: user.dailyConnectionTime * 0.7 },
  ]

  const deviceUsage = [
    { name: "Smartphone", value: 100, color: "#8B1538" },
    { name: "Laptop", value: user.devices > 2 ? 85 : 45, color: "#C41E3A" },
    { name: "Tablet", value: user.devices > 3 ? 60 : 20, color: "#E91E63" },
    { name: "Smartwatch", value: user.devices > 4 ? 40 : 10, color: "#F06292" },
  ]

  const profileRadar = [
    { category: "Tech Savvy", value: user.techSavvy ? 90 : 40 },
    {
      category: "Actividad",
      value:
        user.activityLevel === "Muy Alto"
          ? 95
          : user.activityLevel === "Alto"
            ? 75
            : user.activityLevel === "Medio"
              ? 50
              : 25,
    },
    { category: "Bancarización", value: user.bancarization === "Alto" ? 90 : user.bancarization === "Medio" ? 60 : 30 },
    { category: "Recompensas", value: user.rewardsParticipation },
    { category: "Dispositivos", value: (user.devices / 7) * 100 },
    { category: "Urbano", value: user.urbanZone ? 100 : 30 },
  ]

  const spendingTrend = [
    { month: "Ene", amount: user.income * 0.3 },
    { month: "Feb", amount: user.income * 0.32 },
    { month: "Mar", amount: user.income * 0.35 },
    { month: "Abr", amount: user.income * 0.33 },
    { month: "May", amount: user.income * 0.36 },
    { month: "Jun", amount: user.income * 0.38 },
  ]

  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/usuario">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="h-16 w-16 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-2xl">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight text-primary">{user.name}</h1>
              <p className="text-lg text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        {/* User Summary Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Resumen del Usuario</CardTitle>
            <CardDescription>Información general y clasificación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">ID de Usuario</p>
                <p className="text-lg font-bold">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Edad</p>
                <p className="text-lg font-bold">{user.age} años</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Usuario</p>
                <p className="text-lg font-bold text-primary">{user.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lifestyle</p>
                <p className="text-lg font-bold">{user.lifestyle}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tiempo de Conexión Semanal</CardTitle>
              <CardDescription>Horas conectadas por día</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#C41E3A" strokeWidth={2} name="Horas" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfil de Usuario</CardTitle>
              <CardDescription>Análisis multidimensional</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={profileRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Perfil" dataKey="value" stroke="#8B1538" fill="#C41E3A" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uso de Dispositivos</CardTitle>
              <CardDescription>Distribución por tipo de dispositivo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Gasto</CardTitle>
              <CardDescription>Gasto mensual en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8B1538" name="Gasto ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <KPICard
            title="Ingreso Mensual"
            value={`$${user.income.toLocaleString()}`}
            description="Ingreso promedio mensual"
            trend="up"
            change="+8%"
          />
          <KPICard
            title="Tipo de Empleo"
            value={user.employment}
            description="Situación laboral actual"
            trend="neutral"
            change="0%"
          />
          <KPICard
            title="Nivel de Bancarización"
            value={user.bancarization}
            description="Acceso a servicios bancarios"
            trend="up"
            change="+3%"
          />
          <KPICard
            title="Dispositivos Conectados"
            value={user.devices.toString()}
            description="Número de dispositivos activos"
            trend="up"
            change="+12%"
          />
          <KPICard
            title="Tech Savvy"
            value={user.techSavvy ? "Sí" : "No"}
            description="Nivel de adopción tecnológica"
            trend={user.techSavvy ? "up" : "neutral"}
            change={user.techSavvy ? "+10%" : "0%"}
          />
          <KPICard
            title="Zona Urbana"
            value={user.urbanZone ? "Sí" : "No"}
            description="Ubicación geográfica"
            trend="neutral"
            change="0%"
          />
          <KPICard
            title="Personas a Cargo"
            value={user.dependents.toString()}
            description="Número de dependientes"
            trend="neutral"
            change="0%"
          />
          <KPICard
            title="Nivel de Actividad"
            value={user.activityLevel}
            description="Índice de actividad social"
            trend="up"
            change="+5%"
          />
          <KPICard
            title="Tiempo de Conexión Diario"
            value={`${user.dailyConnectionTime.toFixed(1)} hrs`}
            description="Promedio de horas conectadas"
            trend="up"
            change="+6%"
          />
          <KPICard
            title="Frecuencia de Hotspot"
            value={user.hotspotFrequency}
            description="Activación de hotspot móvil"
            trend="neutral"
            change="0%"
          />
          <KPICard
            title="Participación en Recompensas"
            value={`${user.rewardsParticipation}%`}
            description="Uso del programa de recompensas"
            trend="up"
            change="+18%"
          />
          <KPICard
            title="Tiempo de Ocio Diario"
            value={`${user.leisureTime.toFixed(1)} hrs`}
            description="Promedio de tiempo libre"
            trend="neutral"
            change="+1%"
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
