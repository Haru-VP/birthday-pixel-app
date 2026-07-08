import sharp from "sharp"

const src = "public/images/pastel-chroma.png"
const out = "public/images/pastel-limpio.png"

const img = sharp(src).ensureAlpha()
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

for (let i = 0; i < data.length; i += channels) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  // pixel verde chroma: verde dominante y alto
  if (g > 110 && g > r * 1.35 && g > b * 1.35) {
    data[i + 3] = 0
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(out)

console.log("[v0] chroma done ->", out)
