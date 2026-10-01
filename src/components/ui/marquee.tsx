import { useRef } from "react"
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface MarqueeProps {
    items: string[]
    duration?: number
    className?: string
    itemClassName?: string
    starClassName?: string
}

const wrap = (min: number, max: number, v: number) => {
    const range = max - min
    return ((((v - min) % range) + range) % range) + min
}

/**
 * Infinite ticker that reacts to scrolling: it speeds up with scroll velocity and
 * flips direction when the page scrolls up. Hover eases it to a stop.
 * Content is duplicated once so the -50% wrap is seamless.
 */
export function Marquee({ items, duration = 40, className, itemClassName, starClassName }: MarqueeProps) {
    const reduced = useReducedMotion()
    const x = useMotionValue(0)
    const direction = useRef(1)
    const hoverFactor = useMotionValue(1)
    const hover = useSpring(hoverFactor, { stiffness: 120, damping: 30 })

    const { scrollY } = useScroll()
    const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
    const boost = useTransform(velocity, [-2000, 0, 2000], [5, 0, 5], { clamp: false })

    // percent of the doubled track travelled per second at rest
    const baseSpeed = 50 / duration

    useAnimationFrame((_, delta) => {
        if (reduced) return
        const v = velocity.get()
        if (v < -5) direction.current = -1
        else if (v > 5) direction.current = 1

        const speed = baseSpeed * (1 + Math.abs(boost.get())) * hover.get()
        x.set(wrap(-50, 0, x.get() - direction.current * speed * (delta / 1000)))
    })

    const translateX = useTransform(x, (v) => `${v}%`)

    const row = (hidden: boolean) => (
        <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
            {items.map((item) => (
                <li key={item} className={cn("eyebrow flex items-center gap-6 whitespace-nowrap px-6 md:gap-10 md:px-10", itemClassName)}>
                    <span aria-hidden className={cn("text-primary", starClassName)}>✦</span>
                    {item}
                </li>
            ))}
        </ul>
    )

    return (
        <div
            className={cn("relative flex overflow-hidden border-y border-border", className)}
            style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
            onMouseEnter={() => hoverFactor.set(0.15)}
            onMouseLeave={() => hoverFactor.set(1)}
        >
            <motion.div className="flex w-max will-change-transform" style={{ x: translateX }}>
                {row(false)}
                {row(true)}
            </motion.div>
        </div>
    )
}
