"use client"

import Link from "next/link"
import { Gift, Medal, ScanLine, Sparkles, Star, Ticket } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const rewardHighlights = [
  {
    id: "reward-01",
    title: "Bonos de consumo en comercios aliados",
    description: "Canjea tus puntos Trackly por descuentos en restaurantes y tiendas locales.",
    points: 850,
    icon: Gift,
    tier: "Disponible",
  },
  {
    id: "reward-02",
    title: "Experiencia VIP en hotspot destacado",
    description: "Accede a eventos exclusivos en zonas con alta actividad.",
    points: 1200,
    icon: Star,
    tier: "Premium",
  },
]

const loyaltyLevels = [
  {
    name: "Explorador",
    range: "0 - 999 XP",
    benefits: ["Acceso a misiones estándar", "Alertas básicas"],
    progress: 100,
  },
  {
    name: "Curador",
    range: "1000 - 2499 XP",
    benefits: ["Eventos locales", "Bonos en comercios asociados"],
    progress: 60,
  },
  {
    name: "Embajador",
    range: "2500+ XP",
    benefits: ["Experiencias Trackly Labs", "Mentoría personalizada"],
    progress: 20,
  },
]

const vouchers = [
  {
    id: "voucher-01",
    partner: "Café Aurora",
    description: "Café gratis en tu próxima visita",
    points: 450,
    expires: "vence en 5 días",
  },
  {
    id: "voucher-02",
    partner: "Casa Mobility",
    description: "10% off en renta de scooters",
    points: 600,
    expires: "vence en 10 días",
  },
]

export default function TracklyRewardsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Recompensas Trackly</p>
        <h1 className="text-2xl font-semibold">Conecta tus insights con experiencias exclusivas</h1>
        <p className="text-sm text-muted-foreground">
          Canjea tus puntos por beneficios, desbloquea niveles de fidelidad y accede a recompensas únicas en tu ciudad.
        </p>
      </header>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-base font-semibold">Recompensas disponibles</CardTitle>
            <CardDescription>Elige la recompensa que se alinee con tus intereses y planea tu canje.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <Link href="/trackly/recompensas/historial">
              <ScanLine className="h-4 w-4" aria-hidden="true" />
              Historial de canjes
            </Link>
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-3">
          {rewardHighlights.map((reward) => (
            <article
              key={reward.id}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card px-4 py-4"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <reward.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-semibold leading-snug">{reward.title}</h2>
                  <Badge variant="outline" className="text-[11px] uppercase tracking-wider">
                    {reward.tier}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{reward.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-semibold text-muted-foreground">{reward.points} TrackPoints</span>
                <Button size="sm">Canjear</Button>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Tu nivel actual</CardTitle>
          <CardDescription>Incrementa tu XP completando misiones de alto impacto.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 px-4 py-4">
          {loyaltyLevels.map((level, index) => (
            <div key={level.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Medal className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="font-medium text-foreground">{level.name}</span>
                </div>
                <span>{level.range}</span>
              </div>
              <Progress value={level.progress} className="h-2 bg-muted" />
              <div className="flex flex-wrap gap-2">
                {level.benefits.map((benefit) => (
                  <Badge key={benefit} variant="secondary" className="text-[11px]">
                    {benefit}
                  </Badge>
                ))}
              </div>
              {index < loyaltyLevels.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Vouchers activos</CardTitle>
            <CardDescription>Utiliza los códigos generados desde Trackly App en comercios aliados.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link href="/trackly/recompensas/aliados">
              <Ticket className="h-4 w-4" aria-hidden="true" />
              Ver aliados
            </Link>
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 px-4 py-4">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-background px-4 py-3">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold leading-tight">{voucher.partner}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{voucher.description}</p>
                <Badge variant="outline" className="text-[11px] uppercase tracking-wider">
                  {voucher.expires}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-muted-foreground">{voucher.points} TrackPoints</p>
                <Button variant="default" size="sm" className="mt-2">
                  Obtener código
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-center bg-muted/40 py-4">
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <Link href="/trackly/recompensas/beneficios">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Explorar más beneficios
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}