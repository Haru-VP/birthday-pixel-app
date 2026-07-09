"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function FiestaPage() {
  const [giftOpen, setGiftOpen] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [entering, setEntering] = useState(true)

  // El humo de entrada se disipa y luego se retira del DOM
  useEffect(() => {
    const timer = window.setTimeout(() => setEntering(false), 1800)
    return () => window.clearTimeout(timer)
  }, [])

  const handleGiftClick = () => {
    setGiftOpen(true)
    window.setTimeout(() => setShowCard(true), 1500)
  }

  const cats = [
    { src: "/images/oreogorrito.png", delay: "0.8s", floatDelay: "1.5s", floatDur: "3.2s" },
    { src: "/images/sakuragorrito.png", delay: "0.9s", floatDelay: "1.7s", floatDur: "3.6s" },
    { src: "/images/sask.png", delay: "1s", floatDelay: "1.6s", floatDur: "3.4s" },
    { src: "/images/jazz.png", delay: "1.1s", floatDelay: "1.8s", floatDur: "3.8s" },
  ]

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#f4ccb1]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/fondo_fiesta.png"
          alt="Fondo de fiesta"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center sm:object-bottom lg:object-contain lg:object-top"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,247,231,0.66),transparent_58%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.12)] via-transparent to-[rgba(95,34,16,0.18)]" aria-hidden="true" />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-end px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="relative w-full max-w-6xl flex-1">
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-[rgba(95,34,16,0.16)] to-transparent" aria-hidden="true" />

          <div className="absolute bottom-24 left-[1%] sm:bottom-20 sm:left-[6%]">
            <div className="fx-rise-in" style={{ animationDelay: "0.5s" }}>
              <div className="fx-float" style={{ animationDelay: "1.4s", animationDuration: "4s" }}>
                <Image
                  src="/images/avatarchico.png"
                  alt="Santi"
                  width={260}
                  height={260}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="w-[40vw] max-w-[220px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.28)] sm:w-[42vw] sm:max-w-[320px]"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-20 right-[1%] sm:bottom-16 sm:right-[6%]">
            <div className="fx-rise-in" style={{ animationDelay: "0.65s" }}>
              <div className="fx-float" style={{ animationDelay: "1.6s", animationDuration: "4.4s" }}>
                <Image
                  src="/images/avatarchica.png"
                  alt="Tú"
                  width={260}
                  height={260}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="w-[40vw] max-w-[220px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.28)] sm:w-[42vw] sm:max-w-[320px]"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-end gap-1.5 sm:bottom-8 sm:gap-4">
            {cats.map((cat) => (
              <div key={cat.src} className="fx-rise-in" style={{ animationDelay: cat.delay }}>
                <div
                  className="fx-float"
                  style={{ animationDelay: cat.floatDelay, animationDuration: cat.floatDur }}
                >
                  <Image
                    src={cat.src}
                    alt="Gatito"
                    width={140}
                    height={140}
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 22vw, 14vw"
                    className="w-[18vw] max-w-[110px] drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)] sm:w-[20vw] sm:max-w-[150px]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-[38%] -translate-x-1/2 sm:top-[32%]">
            <div className="fx-pop-in" style={{ animationDelay: "1.1s" }}>
              <div
                className="relative animate-[float-soft_3s_ease-in-out_infinite]"
                style={{ animationDelay: "1.8s" }}
              >
                <div className="absolute inset-x-4 bottom-2 h-4 rounded-full bg-[rgba(0,0,0,0.22)] blur-md" aria-hidden="true" />
                <button
                  type="button"
                  onClick={handleGiftClick}
                  className="relative block rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/70"
                  aria-label={giftOpen ? "Cerrar regalo" : "Abrir regalo"}
                >
                  <Image
                    src={giftOpen ? "/images/regaloabierto.png" : "/images/regalocerrado.png"}
                    alt={giftOpen ? "Regalo abierto" : "Regalo sorpresa"}
                    width={220}
                    height={220}
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 32vw, 20vw"
                    className={`relative w-[30vw] max-w-[170px] drop-shadow-[0_18px_30px_rgba(0,0,0,0.28)] transition-all duration-500 sm:w-[32vw] sm:max-w-[240px] ${giftOpen ? "scale-[1.02]" : "scale-100"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {giftOpen && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {[
                "/images/globoamarillo1.png",
                "/images/globoazul1.png",
                "/images/globorojo1.png",
                "/images/globoverde1.png",
                "/images/globoamarillo1.png",
                "/images/globoazul1.png",
                "/images/globorojo1.png",
                "/images/globoverde1.png",
                "/images/globoamarillo1.png",
                "/images/globoazul1.png",
                "/images/globorojo1.png",
                "/images/globoverde1.png",
              ].map((src, index) => {
                const positions = [
                  "left-[4%] top-[82%]",
                  "left-[14%] top-[84%]",
                  "left-[24%] top-[79%]",
                  "left-[34%] top-[86%]",
                  "left-[46%] top-[83%]",
                  "left-[58%] top-[87%]",
                  "left-[70%] top-[81%]",
                  "left-[82%] top-[85%]",
                  "left-[8%] top-[77%]",
                  "left-[20%] top-[80%]",
                  "left-[64%] top-[78%]",
                  "left-[76%] top-[76%]",
                ]
                const widths = [
                  "w-[10vw] max-w-[44px] sm:w-[8vw] sm:max-w-[58px]",
                  "w-[9vw] max-w-[40px] sm:w-[7vw] sm:max-w-[54px]",
                  "w-[11vw] max-w-[48px] sm:w-[8vw] sm:max-w-[60px]",
                  "w-[10vw] max-w-[44px] sm:w-[7vw] sm:max-w-[56px]",
                  "w-[9vw] max-w-[40px] sm:w-[7vw] sm:max-w-[54px]",
                  "w-[10vw] max-w-[44px] sm:w-[8vw] sm:max-w-[58px]",
                  "w-[9vw] max-w-[40px] sm:w-[7vw] sm:max-w-[54px]",
                  "w-[11vw] max-w-[48px] sm:w-[8vw] sm:max-w-[60px]",
                  "w-[10vw] max-w-[44px] sm:w-[8vw] sm:max-w-[58px]",
                  "w-[9vw] max-w-[40px] sm:w-[7vw] sm:max-w-[54px]",
                  "w-[10vw] max-w-[44px] sm:w-[8vw] sm:max-w-[58px]",
                  "w-[9vw] max-w-[40px] sm:w-[7vw] sm:max-w-[54px]",
                ]
                const durations = ["2.3s", "2.7s", "2.1s", "2.5s", "2.8s", "2.2s", "2.6s", "2.4s", "2.9s", "2.3s", "2.5s", "2.7s"]

                return (
                  <div
                    key={`${src}-${index}`}
                    className={`absolute ${positions[index]} ${widths[index]} opacity-100`}
                    style={{
                      animation: `balloon-rise ${durations[index]} ease-out forwards`,
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={90}
                      height={90}
                      className="w-full"
                    />
                  </div>
                )
              })}
            </div>
          )}

          {showCard && (
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
              {Array.from({ length: 40 }).map((_, i) => {
                const colors = [
                  "oklch(0.74 0.15 12)", // rojo/rosa fuerte
                  "oklch(0.82 0.13 75)", // amarillo cálido
                  "oklch(0.8 0.12 350)", // rosita
                  "oklch(0.72 0.14 145)", // verde
                  "oklch(0.75 0.13 240)", // azul
                  "oklch(0.97 0.04 70)", // crema
                ]
                const left = (i * 97) % 100
                const size = 6 + (i % 4) * 2
                const duration = 3.4 + (i % 5) * 0.6
                const delay = -((i * 0.37) % 4)
                const sway = 1.6 + (i % 3) * 0.5
                const isHeart = i % 5 === 0
                const isRose = i % 5 === 2
                const rounded = i % 3 === 0 ? "9999px" : "1px"

                if (isHeart || isRose) {
                  return (
                    <img
                      key={i}
                      src={isHeart ? "/images/pixel-heart.png" : "/images/pixel-rose.png"}
                      alt=""
                      className="confetti-piece"
                      style={{
                        left: `${left}%`,
                        width: `${size + 8}px`,
                        height: "auto",
                        animation: `confetti-fall ${duration}s linear ${delay}s infinite, confetti-sway ${sway}s ease-in-out ${delay}s infinite`,
                      }}
                    />
                  )
                }

                return (
                  <span
                    key={i}
                    className="confetti-piece block"
                    style={{
                      left: `${left}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: rounded,
                      backgroundColor: colors[i % colors.length],
                      animation: `confetti-fall ${duration}s linear ${delay}s infinite, confetti-sway ${sway}s ease-in-out ${delay}s infinite`,
                    }}
                  />
                )
              })}
            </div>
          )}

          {showCard && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4 py-6 sm:px-6">
              <div className="fx-card-pop relative w-full max-w-xl rounded-[1.5rem] border-[6px] border-[oklch(0.4_0.08_20)] bg-[oklch(0.97_0.04_70)] p-4 shadow-[10px_10px_0_oklch(0.4_0.08_20/0.45)] sm:p-6">
                <div className="absolute inset-0 rounded-[1.2rem] border-[4px] border-white/60" aria-hidden="true" />

                {/* Decoración pixel art: corazones y rositas en el borde */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  {/* Esquinas */}
                  <img src="/images/pixel-heart.png" alt="" className="pixelated absolute -left-3 -top-3 w-7 -rotate-12 sm:w-9" />
                  <img src="/images/pixel-heart.png" alt="" className="pixelated absolute -right-3 -top-3 w-7 rotate-12 sm:w-9" />
                  <img src="/images/pixel-rose.png" alt="" className="pixelated absolute -bottom-3 -left-3 w-7 rotate-6 sm:w-9" />
                  <img src="/images/pixel-rose.png" alt="" className="pixelated absolute -bottom-3 -right-3 w-7 -rotate-6 sm:w-9" />

                  {/* Borde superior */}
                  {[22, 40, 60, 78].map((leftPct, i) => (
                    <img
                      key={`top-${leftPct}`}
                      src={i % 2 === 0 ? "/images/pixel-rose.png" : "/images/pixel-heart.png"}
                      alt=""
                      className="pixelated absolute -top-3 w-5 sm:w-6"
                      style={{ left: `${leftPct}%` }}
                    />
                  ))}

                  {/* Borde inferior */}
                  {[22, 40, 60, 78].map((leftPct, i) => (
                    <img
                      key={`bottom-${leftPct}`}
                      src={i % 2 === 0 ? "/images/pixel-heart.png" : "/images/pixel-rose.png"}
                      alt=""
                      className="pixelated absolute -bottom-3 w-5 sm:w-6"
                      style={{ left: `${leftPct}%` }}
                    />
                  ))}

                  {/* Bordes laterales */}
                  <img src="/images/pixel-heart.png" alt="" className="pixelated absolute -left-3 top-1/2 w-5 -translate-y-1/2 sm:w-6" />
                  <img src="/images/pixel-heart.png" alt="" className="pixelated absolute -right-3 top-1/2 w-5 -translate-y-1/2 sm:w-6" />
                </div>

                <div className="relative z-10 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[oklch(0.46_0.08_20)] sm:text-[12px]">
                    Carta de cumpleaños
                  </p>
                  <h2 className="mt-3 text-xl font-black uppercase tracking-[0.24em] text-[oklch(0.4_0.08_20)] sm:text-2xl">
                    ¡Mi nene, Felices 22!
                  </h2>
                  <div className="mx-auto mt-4 max-w-lg space-y-2 text-[11px] leading-6 text-[oklch(0.38_0.08_20)] sm:text-sm sm:leading-7" style={{ fontFamily: "var(--font-pixel-title)" }}>
                    <p>Hice este pequeño detallito con mucho amor para ti</p>
                    <p>Espero que te guste mucho y que te haga muy feliz en este día tan especial</p>
                    <p>Para mi gatito lindo, con todo mi corazon, de tu Haru.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/"
          className="fx-rise-in mt-4 rounded-full border border-[oklch(0.4_0.08_20)] bg-[oklch(0.74_0.15_12)] px-3 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[oklch(0.98_0.03_70)] shadow-[3px_3px_0_oklch(0.4_0.08_20/0.4)] transition-transform hover:-translate-y-0.5 sm:mt-6 sm:px-4 sm:text-sm"
          style={{ animationDelay: "1.3s" }}
        >
          Volver a encender la vela
        </Link>
      </div>

      {/* Entrada: el humo gris heredado de la transición se disipa revelando la fiesta */}
      {entering && (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden" aria-hidden="true">
          <div className="scene-enter-veil absolute inset-0" />
          <span className="scene-enter-puff scene-enter-puff-1" />
          <span className="scene-enter-puff scene-enter-puff-2" />
          <span className="scene-enter-puff scene-enter-puff-3" />
        </div>
      )}
    </main>
  )
}
