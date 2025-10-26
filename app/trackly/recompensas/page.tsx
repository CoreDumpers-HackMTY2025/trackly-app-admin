"use client"

import Link from "next/link"
import { Gift, Medal, ScanLine, Sparkles, Star, Ticket } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { apiGetPublic, apiGet, apiPost } from "@/lib/api"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

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
  const [shop, setShop] = useState<any[]>([])
  const [loadingShop, setLoadingShop] = useState(true)
  const [redeemingId, setRedeemingId] = useState<string | number | null>(null)
  const [wallet, setWallet] = useState<{ puntos: number; nivel: number } | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [filters, setFilters] = useState<{ q: string; category: string }>({ q: "", category: "all" })
  const [redeemedMap, setRedeemedMap] = useState<Record<string, { code: string; name: string; price: number; date: string }>>({})
  const { session } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('trackly_redeemed') : null
      if (raw) setRedeemedMap(JSON.parse(raw))
    } catch {}
  }, [])

  const saveRedeemed = (next: Record<string, { code: string; name: string; price: number; date: string }>) => {
    setRedeemedMap(next)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('trackly_redeemed', JSON.stringify(next))
      }
    } catch {}
  }

  const generateCode = () => {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = 'TRK-'
    for (let i = 0; i < 8; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)]
    return code
  }

  useEffect(() => {
    const run = async () => {
      try {
        setLoadingShop(true)
        const data = await apiGetPublic("/api/rewards/shop")
        const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
        setShop(arr)
      } catch (e) {
        console.warn("No se pudo cargar el catálogo de recompensas", e)
      } finally {
        setLoadingShop(false)
      }
    }
    run()
  }, [])

  useEffect(() => {
    const runProtected = async () => {
      if (!session) return
      try {
        const dash = await apiGet("/api/user/dashboard", session.access_token)
        const puntos = dash?.leaderboard?.puntos ?? dash?.puntos ?? 0
        const nivel = dash?.leaderboard?.nivel ?? dash?.nivel ?? Math.floor(Number(puntos) / 100)
        setWallet({ puntos: Number(puntos) || 0, nivel: Number(nivel) || 0 })

        const hist = await apiGet("/api/rewards/history", session.access_token)
        const arr = Array.isArray(hist?.data) ? hist.data : Array.isArray(hist) ? hist : []
        setHistory(arr)
      } catch (e) {
        console.warn("No se pudo cargar dashboard/historial", e)
      }
    }
    runProtected()
  }, [session])

  const handleRedeem = async (item: any) => {
    if (!session) {
      toast({ title: "Inicia sesión", description: "Necesitas una sesión para canjear." })
      return
    }
    const id = item.id
    const name = item.nombre ?? item.title ?? item.name ?? "Recompensa"
    const price = item.precio ?? item.points ?? item.price ?? 0
    const blocked = wallet ? Number(price) > wallet.puntos : false
    if (blocked) {
      toast({ variant: "destructive", title: "Saldo insuficiente", description: "No tienes puntos suficientes." })
      return
    }
    setRedeemingId(id)
    try {
      // Intento de canje real si hay sesión, pero generamos código mock en cualquier caso
      if (session) {
        try {
          await apiPost("/api/rewards/redeem", { reward_id: id }, session.access_token)
        } catch {}
      }
      const code = generateCode()
      const date = new Date().toISOString()
      const next = { ...redeemedMap, [id]: { code, name, price: Number(price) || 0, date } }
      saveRedeemed(next)
      toast({ title: "Canje generado", description: `Código ${code} listo para usar.` })
      setHistory((prev) => [
        { nombre: name, estado: "reclamado", fecha: date, precio: price },
        ...prev,
      ])
      setWallet((w) => (w ? { ...w, puntos: Math.max(0, w.puntos - Number(price || 0)) } : w))
    } catch (e) {
      toast({ variant: "destructive", title: "Error al canjear", description: "Intenta más tarde." })
    } finally {
      setRedeemingId(null)
    }
  }

  const categories = Array.from(
    new Set(shop.map((s: any) => s.categoria ?? s.category ?? "General"))
  )
  const filteredShop = shop.filter((item: any) => {
    const name = item.nombre ?? item.title ?? item.name ?? ""
    const category = item.categoria ?? item.category ?? "General"
    const qOk = filters.q ? name.toLowerCase().includes(filters.q.toLowerCase()) : true
    const cOk = filters.category === "all" ? true : category === filters.category
    return qOk && cOk
  })

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
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Saldo: {wallet?.puntos ?? 0} TrackPoints</span>
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href="/trackly/recompensas/historial">Ver historial</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Buscar recompensa"
              value={filters.q}
              onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
              className="h-8 w-[220px]"
            />
            <Select
              value={filters.category}
              onValueChange={(v) => setFilters((prev) => ({ ...prev, category: v }))}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loadingShop ? (
            <div className="grid gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : filteredShop.length > 0 ? (
            filteredShop.map((item: any) => {
              const id = item.id
              const name = item.nombre ?? item.title ?? item.name ?? "Recompensa"
              const description = item.descripcion ?? item.description ?? item.desc ?? ""
              const price = item.precio ?? item.points ?? item.price ?? 0
              const category = item.categoria ?? item.category ?? "General"
              const blocked = wallet ? Number(price) > wallet.puntos : false
              const claimed = Boolean(redeemedMap[id])
              const code = redeemedMap[id]?.code
              return (
                <article
                  key={id}
                  className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card px-4 py-4"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Gift className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold leading-snug">{name}</h2>
                      <Badge variant="outline" className="text-[11px] uppercase tracking-wider">
                        {category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                    {claimed && (
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="secondary">Reclamado</Badge>
                        <span className="font-mono">Código: {code}</span>
                        <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(code!)}>
                          Copiar
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-semibold text-muted-foreground">{price} TrackPoints</span>
                    <Button
                      size="sm"
                      disabled={redeemingId === id || blocked || claimed}
                      onClick={() => handleRedeem(item)}
                    >
                      {blocked ? "Insuficiente" : claimed ? "Reclamado" : redeemingId === id ? "Procesando…" : "Canjear"}
                    </Button>
                  </div>
                </article>
              )
            })
          ) : (
            // Fallback a contenido estático cuando no hay catálogo
            rewardHighlights.map((reward) => (
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
            ))
          )}
        </CardContent>
      </Card>

      {/* Historial de canjes */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">Historial de canjes</CardTitle>
            <CardDescription>Últimas solicitudes de canje.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.length > 0 ? (
            history.map((h: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border px-4 py-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{h.nombre ?? h.name ?? h.titulo ?? "Recompensa"}</p>
                  <p className="text-xs text-muted-foreground">
                    {h.estado ?? h.status ?? "pendiente"} · {new Date(h.fecha ?? Date.now()).toLocaleString()}
                  </p>
                </div>
                <Badge variant="secondary">{h.precio ?? h.points ?? h.price ?? 0} XP</Badge>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">Aún no tienes canjes registrados.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Tu nivel actual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wallet ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Nivel</span>
                <Badge variant="outline">{wallet.nivel}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Puntos</span>
                <Badge variant="secondary">{wallet.puntos} XP</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progreso al siguiente nivel</span>
                  <span>{Math.floor((wallet.puntos % 100) / 100 * 100)}%</span>
                </div>
                <Progress value={(wallet.puntos % 100)} className="h-2" />
              </div>
            </div>
          ) : (
            // Fallback a niveles de lealtad si no tenemos datos
            loyaltyLevels.map((lvl) => (
              <div key={lvl.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{lvl.name}</p>
                  <Badge variant="outline">{lvl.range}</Badge>
                </div>
                <ul className="text-xs text-muted-foreground list-disc pl-4">
                  {lvl.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Progress value={lvl.progress} className="h-2" />
                <Separator />
              </div>
            ))
          )}
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