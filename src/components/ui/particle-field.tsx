import { useEffect, useRef } from "react"
import { onThemeClassChange } from "@/lib/utils"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    r: number
    tone: "fg" | "primary" | "violet"
}

/**
 * Canvas particle field scoped to its parent. Particles drift, link up when close,
 * flee the cursor, and burst outward on click. Static frame under reduced motion.
 */
export function ParticleField({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let fg = ""
        let primary = ""
        let violet = ""
        const readColors = () => {
            const styles = getComputedStyle(document.documentElement)
            fg = styles.getPropertyValue("--foreground").trim()
            primary = styles.getPropertyValue("--primary").trim()
            violet = styles.getPropertyValue("--accent-3").trim()
        }
        readColors()
        const color = (t: Particle["tone"]) => (t === "primary" ? primary : t === "violet" ? violet : fg)

        const pointer = { x: -9999, y: -9999 }
        let particles: Particle[] = []
        let raf = 0
        let w = 0
        let h = 0

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const rect = canvas.getBoundingClientRect()
            w = rect.width
            h = rect.height
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const count = Math.round(Math.min(110, (w * h) / 12000))
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.4,
                tone: (() => {
                    const r = Math.random()
                    return r < 0.12 ? "primary" : r < 0.17 ? "violet" : "fg"
                })(),
            }))
        }

        const draw = () => {
            ctx.clearRect(0, 0, w, h)

            for (const p of particles) {
                if (!reduced) {
                    const dx = p.x - pointer.x
                    const dy = p.y - pointer.y
                    const dist = Math.hypot(dx, dy)
                    if (dist < 140 && dist > 0) {
                        const force = (140 - dist) / 140
                        p.vx += (dx / dist) * force * 0.6
                        p.vy += (dy / dist) * force * 0.6
                    }
                    p.vx *= 0.96
                    p.vy *= 0.96
                    // keep a gentle baseline drift
                    if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.05
                    if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.05
                    p.x += p.vx
                    p.y += p.vy
                    if (p.x < 0) p.x = w
                    if (p.x > w) p.x = 0
                    if (p.y < 0) p.y = h
                    if (p.y > h) p.y = 0
                }

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = p.tone === "fg" ? `hsl(${fg} / 0.4)` : `hsl(${color(p.tone)} / 0.9)`
                ctx.fill()
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i]
                    const b = particles[j]
                    const d = Math.hypot(a.x - b.x, a.y - b.y)
                    if (d < 110) {
                        const tone = a.tone !== "fg" ? a.tone : b.tone
                        ctx.strokeStyle = `hsl(${color(tone)} / ${(tone === "fg" ? 0.1 : 0.16) * (1 - d / 110)})`
                        ctx.lineWidth = 0.6
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.stroke()
                    }
                }
            }

            if (!reduced) raf = requestAnimationFrame(draw)
        }

        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            pointer.x = e.clientX - rect.left
            pointer.y = e.clientY - rect.top
        }
        const onLeave = () => {
            pointer.x = -9999
            pointer.y = -9999
        }
        const onClick = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            const cx = e.clientX - rect.left
            const cy = e.clientY - rect.top
            for (const p of particles) {
                const dx = p.x - cx
                const dy = p.y - cy
                const dist = Math.hypot(dx, dy) || 1
                if (dist < 260) {
                    const force = ((260 - dist) / 260) * 9
                    p.vx += (dx / dist) * force
                    p.vy += (dy / dist) * force
                }
            }
        }

        const section = canvas.closest("section") ?? canvas.parentElement ?? canvas
        resize()
        draw()
        window.addEventListener("resize", resize)
        section.addEventListener("pointermove", onMove)
        section.addEventListener("pointerleave", onLeave)
        section.addEventListener("pointerdown", onClick)
        const stopThemeWatch = onThemeClassChange(() => {
            readColors()
            if (reduced) draw()
        })

        return () => {
            stopThemeWatch()
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
            section.removeEventListener("pointermove", onMove)
            section.removeEventListener("pointerleave", onLeave)
            section.removeEventListener("pointerdown", onClick)
        }
    }, [])

    return <canvas ref={canvasRef} aria-hidden className={className} />
}
