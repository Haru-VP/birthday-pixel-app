"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CandleCake } from "./candle-cake"

type Phase = "lit" | "out" | "leaving"

export function PantallaInicio() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("lit")
  const [motionActive, setMotionActive] = useState(false)
  const [needsMotionPermission, setNeedsMotionPermission] = useState(false)

  const phaseRef = useRef<Phase>("lit")
  const lastAccel = useRef<{ x: number; y: number; z: number } | null>(null)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  // Secuencia de apagado: humo -> humo llena pantalla -> segunda pantalla
  const extinguish = useCallback(() => {
    if (phaseRef.current !== "lit") return
    phaseRef.current = "out"
    setPhase("out")

    window.setTimeout(() => {
      setPhase("leaving")
    }, 1400)

    window.setTimeout(() => {
      router.push("/fiesta")
    }, 3000)
  }, [router])

  // Detectar si el dispositivo necesita permiso de sensor (iOS)
  useEffect(() => {
    const anyMotion = (window as unknown as {
      DeviceMotionEvent?: { requestPermission?: () => Promise<string> }
    }).DeviceMotionEvent
    if (anyMotion && typeof anyMotion.requestPermission === "function") {
      setNeedsMotionPermission(true)
    } else if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      startMotion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity
      if (!acc || acc.x == null || acc.y == null || acc.z == null) return
      const prev = lastAccel.current
      lastAccel.current = { x: acc.x, y: acc.y, z: acc.z }
      if (!prev) return
      const delta =
        Math.abs(acc.x - prev.x) + Math.abs(acc.y - prev.y) + Math.abs(acc.z - prev.z)
      if (delta > 28) {
        extinguish()
      }
    },
    [extinguish],
  )

  const startMotion = useCallback(() => {
    window.addEventListener("devicemotion", handleMotion)
    setMotionActive(true)
  }, [handleMotion])

  const requestMotionPermission = useCallback(async () => {
    const DME = (window as unknown as {
      DeviceMotionEvent?: { requestPermission?: () => Promise<string> }
    }).DeviceMotionEvent
    try {
      const res = await DME?.requestPermission?.()
      if (res === "granted") {
        setNeedsMotionPermission(false)
        startMotion()
      }
    } catch {
      // el usuario podrá usar el botón como respaldo
    }
  }, [startMotion])

  useEffect(() => {
    return () => {
      window.removeEventListener("devicemotion", handleMotion)
    }
  }, [handleMotion])

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      {/* Fondo pixel art */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/fondo_principal.png')", imageRendering: "pixelated" }}
        aria-hidden="true"
      />
      {/* Velo cálido para dar sensación de calidez/romance */}
      <div className="absolute inset-0 bg-[oklch(0.55_0.12_15)]/10" aria-hidden="true" />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-between px-4 py-6">
        {/* Título */}
        <header className="animate-title-pop mt-3 w-full max-w-lg text-center">
          <p
            className="pixel-title text-[oklch(0.97_0.05_60)] text-lg sm:text-xl"
            style={{ fontFamily: "var(--font-pixel-title)" }}
          >
            ¡Feliz cumpleaños
          </p>
          <h1
            className="pixel-title-big my-2 text-[oklch(0.9_0.16_45)] text-6xl sm:text-8xl"
            style={{ fontFamily: "var(--font-pixel-title)" }}
          >
            22
          </h1>
          <p
            className="pixel-title text-[oklch(0.82_0.16_5)] text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-pixel-title)" }}
          >
            Santi!
          </p>
        </header>

        {/* Pastel */}
        <div className="flex flex-1 items-center justify-center py-4">
          <CandleCake lit={phase === "lit"} />
        </div>

        {/* Controles / instrucciones */}
        <footer className="w-full max-w-md pb-2 text-center">
          {phase === "lit" ? (
            <div className="flex flex-col items-center gap-4">
              <p className="pixel-text-shadow text-pretty text-base font-medium text-[oklch(0.97_0.04_70)] sm:text-lg">
                Agita el teléfono para apagar la vela
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {needsMotionPermission && (
                  <button
                    type="button"
                    onClick={requestMotionPermission}
                    className="pixel-text-shadow text-sm font-bold text-[oklch(0.92_0.09_75)] underline-offset-4 transition-opacity hover:underline active:opacity-70"
                  >
                    Activar movimiento
                  </button>
                )}
                <button
                  type="button"
                  onClick={extinguish}
                  className="pixel-text-shadow text-base font-bold text-[oklch(0.9_0.16_45)] underline-offset-4 transition-opacity hover:underline active:opacity-70"
                >
                  Apagar la vela
                </button>
              </div>
              <p className="pixel-text-shadow text-xs text-[oklch(0.9_0.03_70)]/80">
                {motionActive ? "Sensor activo" : ""}
              </p>
            </div>
          ) : (
            <p className="pixel-text-shadow animate-pulse text-pretty text-lg font-medium text-[oklch(0.97_0.05_70)]">
              Pide un deseo...
            </p>
          )}
        </footer>
      </div>

      {/* Transición de humo gris hacia la segunda pantalla */}
      {(phase === "out" || phase === "leaving") && (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden" aria-hidden="true">
          <div className="smoke-veil absolute inset-0" data-active={phase === "leaving"} />
          {/* Bocanadas de humo que suben desde el centro (la vela) */}
          <span className="smoke-puff smoke-puff-1" />
          <span className="smoke-puff smoke-puff-2" />
          <span className="smoke-puff smoke-puff-3" />
          <span className="smoke-puff smoke-puff-4" />
          <span className="smoke-puff smoke-puff-5" />
        </div>
      )}
    </main>
  )
}
