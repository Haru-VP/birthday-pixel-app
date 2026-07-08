"use client"

type PixelFlameProps = {
  /** posición horizontal dentro del pastel (%) */
  left: string
  /** posición vertical dentro del pastel (%) */
  top: string
  /** estado de la llama */
  state: "lit" | "out"
}

export function PixelFlame({ left, top, state }: PixelFlameProps) {
  const isLit = state === "lit"

  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
      style={{ left, top }}
      aria-hidden="true"
    >
      {/* Resplandor cálido detrás de la llama */}
      {isLit && (
        <div className="absolute left-1/2 top-1/2 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70 blur-md animate-glow" />
      )}

      {/* Llama encendida */}
      {isLit && (
        <div className="animate-flicker">
          <div className="relative h-7 w-4">
            {/* capa exterior naranja */}
            <div className="absolute bottom-0 left-1/2 h-7 w-4 -translate-x-1/2 rounded-[45%_45%_50%_50%/60%_60%_40%_40%] bg-[oklch(0.72_0.19_45)]" />
            {/* capa media amarilla */}
            <div className="absolute bottom-0 left-1/2 h-5 w-2.5 -translate-x-1/2 rounded-[45%_45%_50%_50%/60%_60%_40%_40%] bg-[oklch(0.88_0.17_85)]" />
            {/* núcleo blanco */}
            <div className="absolute bottom-0 left-1/2 h-2.5 w-1.5 -translate-x-1/2 rounded-full bg-[oklch(0.98_0.03_95)]" />
          </div>
        </div>
      )}

      {/* Humo al apagarse */}
      {!isLit && (
        <div className="relative h-7 w-4">
          <span className="absolute bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[oklch(0.75_0.02_60)]/60 animate-smoke" />
          <span
            className="absolute bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[oklch(0.7_0.02_60)]/50 animate-smoke"
            style={{ animationDelay: "0.4s" }}
          />
          <span
            className="absolute bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[oklch(0.65_0.02_60)]/40 animate-smoke"
            style={{ animationDelay: "0.9s" }}
          />
        </div>
      )}
    </div>
  )
}
