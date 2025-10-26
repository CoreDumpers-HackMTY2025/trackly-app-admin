import type { Metadata } from "next"
import type { ReactNode } from "react"

import { MobileShell } from "@/components/trackly/mobile-shell"
import { AuthGuard } from "@/components/auth-provider"

export const metadata: Metadata = {
  title: "Trackly",
  description: "Estrategia urbana personalizada con misiones, mapa de hotspots y recompensas."
}

export default function TracklyLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <MobileShell>{children}</MobileShell>
    </AuthGuard>
  )
}