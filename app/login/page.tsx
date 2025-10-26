"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { LogIn, ShieldCheck, Flame, Target } from 'lucide-react'

export default function LoginPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      const { data } = await supabase.auth.getUser()
      const role = data.user?.user_metadata?.role ?? (data.user as any)?.app_metadata?.role
      if (role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/trackly')
      }
    } catch (err: any) {
      setError(err?.message ?? 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10 space-y-6">
      <header className="space-y-1 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Trackly</p>
        <h1 className="text-2xl font-semibold">Ingresar a tu cuenta</h1>
        <p className="text-sm text-muted-foreground">Accede a tu radar urbano y continua tu progreso.</p>
      </header>
      <Card className="bg-muted/40">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-3">
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
              {loading ? 'Ingresando…' : 'Ingresar'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        ¿Aún no tienes cuenta? <Link href="/registro" className="underline">Regístrate</Link>
      </div>
    </section>
  )
}