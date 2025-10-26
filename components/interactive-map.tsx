"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface MapMarker {
  lat: number
  lng: number
  label: string
  color: string
  size?: "small" | "medium" | "large"
}

interface InteractiveMapProps {
  markers: MapMarker[]
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
}

export function InteractiveMap({
  markers,
  center = { lat: 19.4326, lng: -99.1332 },
  zoom = 12,
  height = "500px",
}: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw map background
    ctx.fillStyle = "#f5f5f5"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw markers
    markers.forEach((marker, index) => {
      const x = canvas.width / 2 + (marker.lng - center.lng) * 5000
      const y = canvas.height / 2 - (marker.lat - center.lat) * 5000

      const radius = marker.size === "large" ? 12 : marker.size === "small" ? 6 : 8

      // Draw marker shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.beginPath()
      ctx.arc(x + 2, y + 2, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw marker
      ctx.fillStyle = marker.color
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw marker border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw label
      ctx.fillStyle = "#1a1a1a"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(marker.label, x, y - radius - 5)
    })
  }, [markers, center, zoom])

  return (
    <Card className="overflow-hidden">
      <canvas ref={canvasRef} style={{ width: "100%", height }} className="cursor-move" />
    </Card>
  )
}
