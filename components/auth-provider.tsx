"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase-client'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Lock } from 'lucide-react'

interface AuthContextValue {
  session: Session | null
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setLoading(false)
    }
    init()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null)
      setUser(newSession?.user ?? null)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const isAdmin = useMemo(() => {
    const role = user?.user_metadata?.role ?? (user as any)?.app_metadata?.role
    return role === 'admin'
  }, [user])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value: AuthContextValue = {
    session,
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading, session } = useAuth()

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Spinner />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-4">
        <Card className="w-full max-w-lg rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <CardTitle className="text-lg">Autenticación requerida</CardTitle>
                <CardDescription>
                  Para continuar en Trackly, inicia sesión o crea tu cuenta.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/registro">Registrarme</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { loading, session, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner />
      </div>
    )
  }

  if (!session) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Autenticación requerida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Debes iniciar sesión para acceder a este módulo.
          </p>
          <Button asChild>
            <Link href="/login">Ir a iniciar sesión</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!isAdmin) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Acceso restringido</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tu cuenta no tiene el rol <span className="font-semibold">admin</span>. Contacta al administrador.
          </p>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}