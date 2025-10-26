"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Map,
  Target,
  Trophy,
  Users,
  type LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  {
    href: "/trackly",
    label: "Inicio",
    icon: Home
  },
  {
    href: "/trackly/misiones",
    label: "Misiones",
    icon: Target
  },
  {
    href: "/trackly/mapa",
    label: "Mapa",
    icon: Map
  },
  {
    href: "/trackly/comunidad",
    label: "Comunidad",
    icon: Users
  },
  {
    href: "/trackly/recompensas",
    label: "Rewards",
    icon: Trophy
  }
] as const

interface MobileShellProps {
  children: ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-muted/20 font-sans text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(215,38,91,0.18)_0%,_rgba(7,3,17,0)_55%)]" />
      <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 pb-28 pt-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-6">{children}</div>
      </main>
      <BottomNavigation />
    </div>
  )
}

function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto grid h-20 w-full max-w-md grid-cols-5">
        {NAV_ITEMS.map((item) => (
          <BottomNavigationLink key={item.href} pathname={pathname} {...item} />
        ))}
      </div>
    </nav>
  )
}

interface BottomNavigationLinkProps {
  href: string
  label: string
  icon: LucideIcon
  pathname: string | null
}

function BottomNavigationLink({ href, label, icon: Icon, pathname }: BottomNavigationLinkProps) {
  const isActive =
    pathname === href || (href !== "/trackly" && pathname?.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card shadow-sm transition-all group-hover:scale-[1.02]",
          isActive
            ? "border-primary/20 bg-primary/10 text-primary shadow-primary/20"
            : "bg-muted/60 text-muted-foreground"
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>{label}</span>
      {isActive && (
        <span className="absolute inset-x-5 bottom-1 h-1 rounded-full bg-primary/80" aria-hidden="true" />
      )}
    </Link>
  )
}