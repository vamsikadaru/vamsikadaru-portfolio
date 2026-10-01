import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

/** Animates the numeric part of a value like "42+" or "3" once it scrolls into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "-10% 0px" })
    const reduced = useReducedMotion()
    const match = value.match(/^(\d+)(.*)$/)

    useEffect(() => {
        const el = ref.current
        if (!el || !match || !inView || reduced) return
        const [, num, suffix] = match
        const controls = animate(0, Number(num), {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
                el.textContent = `${Math.round(v)}${suffix}`
            },
        })
        return () => controls.stop()
    }, [inView, reduced, match])

    return (
        <span ref={ref} className={className}>
            {value}
        </span>
    )
}
