import { useEffect, useRef, type RefObject } from "react"
import { onThemeClassChange } from "@/lib/utils"

interface Streak {
    x: number
    y: number
    px: number
    py: number
    speed: number
}

/**
 * Hyperspace starburst: streaks are born at the center and accelerate outward,
 * leaving motion-blur trails. `boostRef` (>= 1) multiplies the speed and is
 * eased back to 1 every frame, so a scroll kick surges and then settles into
 * a calm idle flow. Static frame under reduced motion.
 */
export function WarpField({ boostRef, className }: { boostRef?: RefObject<number>; className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let bg = ""
        let hue0 = 0
        let hue1 = 0
        let sat = ""
        let light = 0
        let dark = true
        const readColors = () => {
            const styles = getComputedStyle(document.documentElement)
            bg = styles.getPropertyValue("--background").trim()
            const primary = styles.getPropertyValue("--primary").trim().split(" ")
            hue0 = parseFloat(primary[0])
            hue1 = parseFloat(styles.getPropertyValue("--accent-2").trim())
            sat = primary[1]
            light = parseFloat(primary[2])
            dark = parseFloat(bg.split(" ")[2]) < 50
        }
        readColors()

        let w = 0
        let h = 0
        let raf = 0
        let last = -1
        let speed = 1
        let visible = false

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = canvas.offsetWidth
            h = canvas.offsetHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const respawn = (s: Streak) => {
            const a = Math.random() * Math.PI * 2
            const r = Math.random() * 24
            s.x = s.px = w / 2 + Math.cos(a) * r
            s.y = s.py = h / 2 + Math.sin(a) * r
            s.speed = 0.35 + Math.random() * 2.2
        }

        resize()
        // Seed across the disc so the first frame isn't an empty center
        const streaks: Streak[] = Array.from({ length: 240 }, () => {
            const s = { x: 0, y: 0, px: 0, py: 0, speed: 0 }
            respawn(s)
            const a = Math.random() * Math.PI * 2
            const r = Math.random() * Math.min(w, h) * 0.52
            s.x = s.px = w / 2 + Math.cos(a) * r
            s.y = s.py = h / 2 + Math.sin(a) * r
            return s
        })

        const frame = (t: number) => {
            if (last < 0) last = t
            const dt = Math.min((t - last) / 16.67, 2.5)
            last = t

            const boost = boostRef?.current ?? 1
            speed += (boost - speed) * 0.06
            if (boostRef) boostRef.current += (1 - boostRef.current) * 0.04
            // 0 at idle, 1 at full surge: streaks get brighter, thicker, bluer
            const surge = Math.min((speed - 1) / 5, 1)

            // Translucent wash instead of clear = motion-blur trails
            ctx.fillStyle = `hsl(${bg} / ${dark ? 0.14 : 0.22})`
            ctx.fillRect(0, 0, w, h)

            for (const s of streaks) {
                const dx = s.x - w / 2
                const dy = s.y - h / 2
                const dist = Math.hypot(dx, dy)
                s.px = s.x
                s.py = s.y

                const v = s.speed * (0.85 + dist / 280) * dt * speed
                s.x += dx * 0.024 * v
                s.y += dy * 0.024 * v

                if (s.x < -8 || s.x > w + 8 || s.y < -8 || s.y > h + 8) {
                    respawn(s)
                    continue
                }
                const mx = s.x - s.px
                const my = s.y - s.py
                if (mx * mx + my * my < 0.4) continue

                const alpha = Math.min(0.78, dist / 100) * (dark ? 0.6 + 0.3 * surge : 0.75 + 0.25 * surge)
                const hue = hue0 + (hue1 - hue0) * surge
                // On black, lift streaks toward white-cyan; on light, keep them at full ink
                const lightness = dark ? light + 18 * (1 - surge) : light
                ctx.beginPath()
                ctx.moveTo(s.px, s.py)
                ctx.lineTo(s.x, s.y)
                ctx.strokeStyle = `hsl(${hue} ${sat} ${lightness}% / ${alpha})`
                ctx.lineWidth = 0.85 + 0.6 * surge
                ctx.stroke()
            }

            if (!reduced && visible) raf = requestAnimationFrame(frame)
        }

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            cancelAnimationFrame(raf)
            last = -1
            if (visible && !reduced) raf = requestAnimationFrame(frame)
        })

        if (reduced) {
            // Draw a still burst
            for (let i = 0; i < 40; i++) frame(i * 16.67)
        }
        io.observe(canvas)
        window.addEventListener("resize", resize)
        const stopThemeWatch = onThemeClassChange(() => {
            readColors()
            // Wipe old-theme trails instead of letting them fade through
            ctx.clearRect(0, 0, w, h)
            if (reduced) for (let i = 0; i < 40; i++) frame(i * 16.67)
        })

        return () => {
            cancelAnimationFrame(raf)
            io.disconnect()
            stopThemeWatch()
            window.removeEventListener("resize", resize)
        }
    }, [boostRef])

    return <canvas ref={canvasRef} aria-hidden className={className} />
}
