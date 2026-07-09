// Motor de música sintetizada con Web Audio API.
// Toca la melodía de "Happy Birthday to You" (dominio público) en dos versiones:
//  - "soft": suave, tipo caja de música (senoidal, lenta, con brillo de octava)
//  - "party": alegre y más rápida (triangular + brillo cuadrado, con bajo por compás)

const NOTE = {
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  // graves para el bajo de la versión alegre
  C3: 130.81,
  G3: 196.0,
  F3: 174.61,
}

// [frecuencia, duración en pulsos] siguiendo el compás de vals (3/4)
const MELODY: Array<[number, number]> = [
  [NOTE.G4, 0.5], [NOTE.G4, 0.5], [NOTE.A4, 1], [NOTE.G4, 1], [NOTE.C5, 1], [NOTE.B4, 2],
  [NOTE.G4, 0.5], [NOTE.G4, 0.5], [NOTE.A4, 1], [NOTE.G4, 1], [NOTE.D5, 1], [NOTE.C5, 2],
  [NOTE.G4, 0.5], [NOTE.G4, 0.5], [NOTE.G5, 1], [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.B4, 1], [NOTE.A4, 2],
  [NOTE.F5, 0.5], [NOTE.F5, 0.5], [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.D5, 1], [NOTE.C5, 2],
]

export type MusicVoice = "soft" | "party"

export class BirthdayMusic {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private timer: ReturnType<typeof setTimeout> | null = null
  private stopped = true
  private muted = false
  private current: MusicVoice = "soft"
  private gen = 0

  private ensure(): AudioContext {
    if (!this.ctx) {
      const AC: typeof AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.muted ? 0 : 1
      this.master.connect(this.ctx.destination)
    }
    return this.ctx
  }

  /** Inicia (o cambia a) una versión. Devuelve true si el audio quedó sonando. */
  async play(voice: MusicVoice): Promise<boolean> {
    const ctx = this.ensure()
    if (ctx.state === "suspended") {
      try {
        await ctx.resume()
      } catch {
        // el navegador aún no permite audio; se reintenta con la primera interacción
      }
    }
    this.current = voice
    this.stopped = false
    this.gen += 1
    const myGen = this.gen
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.scheduleLoop(myGen)
    return ctx.state === "running"
  }

  private scheduleLoop(gen: number) {
    if (this.stopped || gen !== this.gen || !this.ctx) return
    const soft = this.current === "soft"
    const bpm = soft ? 100 : 168
    const beat = 60 / bpm
    const ctx = this.ctx
    let t = ctx.currentTime + 0.1

    MELODY.forEach(([freq, beats], i) => {
      const dur = beats * beat
      this.playNote(freq, t, dur, soft)
      // Bajo por compás en la versión alegre (cada 3 pulsos ~ inicio de frase)
      if (!soft && (i === 0 || i === 6 || i === 12 || i === 19)) {
        const bass = [NOTE.C3, NOTE.G3, NOTE.C3, NOTE.F3][[0, 6, 12, 19].indexOf(i)]
        this.playBass(bass, t, beat * 2)
      }
      t += dur
    })

    const totalMs = (t - ctx.currentTime) * 1000
    const gapMs = soft ? 900 : 450
    this.timer = setTimeout(() => this.scheduleLoop(gen), totalMs + gapMs)
  }

  private playNote(freq: number, start: number, dur: number, soft: boolean) {
    if (!this.ctx || !this.master) return
    const ctx = this.ctx
    const peak = soft ? 0.16 : 0.24

    const gain = ctx.createGain()
    gain.connect(this.master)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(peak, start + (soft ? 0.04 : 0.015))
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur * (soft ? 0.98 : 0.9))

    const osc = ctx.createOscillator()
    osc.type = soft ? "sine" : "triangle"
    osc.frequency.value = freq
    osc.connect(gain)
    osc.start(start)
    osc.stop(start + dur + 0.05)

    // Capa de brillo
    const gain2 = ctx.createGain()
    gain2.connect(this.master)
    gain2.gain.setValueAtTime(0.0001, start)
    gain2.gain.exponentialRampToValueAtTime(peak * (soft ? 0.35 : 0.3), start + (soft ? 0.05 : 0.02))
    gain2.gain.exponentialRampToValueAtTime(0.0001, start + dur * (soft ? 0.9 : 0.82))

    const osc2 = ctx.createOscillator()
    if (soft) {
      osc2.type = "sine"
      osc2.frequency.value = freq * 2 // octava para brillo de caja de música
    } else {
      osc2.type = "square"
      osc2.frequency.value = freq
      osc2.detune.value = 8
    }
    osc2.connect(gain2)
    osc2.start(start)
    osc2.stop(start + dur + 0.05)
  }

  private playBass(freq: number, start: number, dur: number) {
    if (!this.ctx || !this.master) return
    const ctx = this.ctx
    const gain = ctx.createGain()
    gain.connect(this.master)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.9)

    const osc = ctx.createOscillator()
    osc.type = "triangle"
    osc.frequency.value = freq
    osc.connect(gain)
    osc.start(start)
    osc.stop(start + dur + 0.05)
  }

  stop() {
    this.stopped = true
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.04)
    }
  }

  isMuted() {
    return this.muted
  }

  isRunning() {
    return !this.stopped && this.ctx?.state === "running"
  }

  dispose() {
    this.stop()
    if (this.ctx) {
      this.ctx.close().catch(() => {})
      this.ctx = null
      this.master = null
    }
  }
}
