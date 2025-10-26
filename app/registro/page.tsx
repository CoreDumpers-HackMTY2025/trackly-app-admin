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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
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
    <section className="mx-auto max-w-md px-4 py-10 space-y-6">
      <header className="space-y-1 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Trackly</p>
        <h1 className="text-2xl font-semibold">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground">Únete para explorar misiones, mapa y recompensas.</p>
      </header>
      <Card className="bg-muted/40">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creando…' : 'Crear cuenta'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        ¿Ya tienes cuenta? <Link href="/login" className="underline">Inicia sesión</Link>
      </div>
    </section>
  )
}