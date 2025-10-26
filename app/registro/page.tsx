"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Sparkles, MapPinned, Trophy } from 'lucide-react'

export default function RegistroPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role: 'user' },
        },
      })
      if (error) throw error
      router.push('/trackly')
    } catch (err: any) {
      setError(err?.message ?? 'Error al registrarte')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-rose-50 to-background dark:from-rose-950/20 p-6 md:p-10 flex items-center justify-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,var(--primary),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,var(--primary),transparent_60%)]" />
      <Card className="w-full max-w-md border-2 ring-1 ring-destructive/25 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-destructive">
            <Users className="h-5 w-5" aria-hidden="true" />
            Crear cuenta
          </CardTitle>
          <p className="text-xs text-muted-foreground">Únete a Trackly y gana recompensas explorando tu ciudad.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full gap-2" variant="destructive">
              {loading ? 'Creando…' : 'Crear cuenta'}
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
          <div className="mt-6 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/40 px-2 py-1">
              <MapPinned className="h-3 w-3 text-destructive" aria-hidden="true" />
              <span>Mapa</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/40 px-2 py-1">
              <Trophy className="h-3 w-3 text-destructive" aria-hidden="true" />
              <span>Rewards</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/40 px-2 py-1">
              <Sparkles className="h-3 w-3 text-destructive" aria-hidden="true" />
              <span>Misiones</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="font-medium text-destructive underline-offset-4 hover:underline">Ingresar</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}