import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * Ring cursor that trails the pointer and grows over links/buttons.
 * Uses motion values (no React re-render per mousemove) and is skipped on touch devices.
 */
export const CustomCursor = () => {
    const [enabled] = useState(() => window.matchMedia("(pointer: fine)").matches)
    const [hovering, setHovering] = useState(false)
    const [visible, setVisible] = useState(false)

    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 })
    const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 })

    useEffect(() => {
        if (!enabled) return

        const move = (e: MouseEvent) => {
            x.set(e.clientX)
            y.set(e.clientY)
            setVisible(true)
        }
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement
            setHovering(Boolean(t.closest("a, button, input, textarea, [role=button]")))
        }
        const leave = () => setVisible(false)

        window.addEventListener("mousemove", move)
        window.addEventListener("mouseover", over)
        document.documentElement.addEventListener("mouseleave", leave)
        return () => {
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mouseover", over)
            document.documentElement.removeEventListener("mouseleave", leave)
        }
    }, [enabled, x, y])

    if (!enabled) return null

    return (
        <>
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
                style={{ x, y, opacity: visible ? 1 : 0 }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-primary"
                style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
                animate={{ width: hovering ? 56 : 32, height: hovering ? 56 : 32, backgroundColor: hovering ? "hsl(var(--primary) / 0.08)" : "hsl(var(--primary) / 0)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
        </>
    )
}
