"use client"

import Image from "next/image"
import { PixelFlame } from "./pixel-flame"

type CandleCakeProps = {
  lit: boolean
}

export function CandleCake({ lit }: CandleCakeProps) {
  return (
    <div className="animate-float relative w-[62vw] max-w-[320px] min-w-[200px]">
      <div className="relative aspect-square w-full">
        <Image
          src="/images/pastel-limpio.png"
          alt="Pastel de cumpleaños de dos pisos con velas del número 22"
          fill
          priority
          sizes="(max-width: 640px) 62vw, 320px"
          className="pixelated object-contain drop-shadow-[0_8px_0_oklch(0.4_0.08_20/0.35)]"
        />

        {/* Las dos velas del "22" */}
        <PixelFlame left="44%" top="16%" state={lit ? "lit" : "out"} />
        <PixelFlame left="55.5%" top="15.5%" state={lit ? "lit" : "out"} />
      </div>
    </div>
  )
}
