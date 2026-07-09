import sharp from "sharp"

const files = ["public/images/pixel-heart.png", "public/images/pixel-rose.png"]

for (const file of files) {
  const img = sharp(file).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const out = Buffer.from(data)

  for (let i = 0; i < width * height; i++) {
    const p = i * channels
    const r = data[p]
    const g = data[p + 1]
    const b = data[p + 2]

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min // 0 = perfectamente gris

    // El fondo es una cuadrícula de grises (baja saturación).
    // Lo volvemos transparente; el arte (rosa/verde/oscuro saturado) se conserva.
    if (sat <= 22) {
      out[p + 3] = 0
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 1 })
    .toFile(file)

  console.log("[v0] procesado", file)
}
