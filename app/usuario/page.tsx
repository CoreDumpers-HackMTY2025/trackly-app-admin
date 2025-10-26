"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { users } from "@/lib/users-data"

export default function UsuarioPage() {
  const [visibleCount, setVisibleCount] = useState(10)
  const displayedUsers = users.slice(0, visibleCount)
  const hasMore = visibleCount < users.length

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
            <h1 className="text-4xl font-bold tracking-tight text-primary">Usuarios Registrados</h1>
            <p className="text-lg text-muted-foreground">Selecciona un usuario para ver sus KPIs detallados</p>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedUsers.map((user) => (
            <Link key={user.id} href={`/usuario/${user.id}`}>
              <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">ID</p>
                      <p className="font-semibold">{user.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Edad</p>
                      <p className="font-semibold">{user.age} años</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tipo</p>
                      <p className="font-semibold text-primary">{user.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Lifestyle</p>
                      <p className="font-semibold">{user.lifestyle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 5, users.length))}
              size="lg"
              className="gap-2"
            >
              Ver más usuarios
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}

        {/* Total Count */}
        <div className="text-center text-sm text-muted-foreground">
          Mostrando {displayedUsers.length} de {users.length} usuarios
        </div>
      </div>
    </main>
  )
}
