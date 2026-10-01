import { useRef } from "react"
import {
    motion,
    useInView,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    type MotionValue,
} from "framer-motion"
import { WarpField } from "@/components/ui/warp-field"
import { SectionLabel } from "@/components/ui/section-label"
import { cn } from "@/lib/utils"
import { personalDetails } from "@/data/portfolio"

const { principles } = personalDetails
const ease = [0.16, 1, 0.3, 1] as const

// Resting slot, scroll window for the fly-in, scroll drift and mouse-parallax depth per card
const slots = [
    { className: "left-[26%] top-[13%]", range: [0.1, 0.24], drift: [170, -170], depth: 38 },
    { className: "right-[5%] top-[30%]", range: [0.2, 0.34], drift: [110, -230], depth: 24 },
    { className: "bottom-[15%] left-[6%]", range: [0.3, 0.44], drift: [70, -110], depth: 30 },
] as const

const accents = ["--primary", "--accent-2", "--accent-3"]

function Card({ index, title, body, className }: { index: number; title: string; body: string; className?: string }) {
    const accent = `var(${accents[index]})`
    return (
        <article
            className={cn("group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 shadow-elevated backdrop-blur-xl", className)}
        >
            <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, hsl(${accent} / 0.55), transparent)` }}
            />
            {/* Accent glow on hover */}
            <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, hsl(${accent} / 0.09), transparent 70%)` }}
            />
            <div className="relative flex items-start justify-between gap-4">
                <h3 className="display text-sm uppercase tracking-tight">{title}</h3>
                <span className="font-mono text-[9px]" style={{ color: `hsl(${accent} / 0.65)` }}>
                    [0{index + 1}]
                </span>
            </div>
            <p className="relative mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-muted-foreground/80">{body}</p>
        </article>
    )
}

function FloatingCard({
    index,
    progress,
    mx,
    my,
}: {
    index: number
    progress: MotionValue<number>
    mx: MotionValue<number>
    my: MotionValue<number>
}) {
    const { className, range, drift, depth } = slots[index]
    const reveal = useTransform(progress, [...range], [0, 1])
    const scale = useTransform(reveal, [0, 1], [0.6, 1])
    const filter = useTransform(reveal, [0, 1], ["blur(14px)", "blur(0px)"])
    const y = useTransform(progress, [0, 1], [...drift])
    const px = useTransform(mx, (v) => v * depth)
    const py = useTransform(my, (v) => v * depth)

    return (
        <motion.div style={{ opacity: reveal, scale, filter, y }} className={cn("absolute z-20 hidden lg:block", className)}>
            <motion.div
                style={{ x: px, y: py }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="max-w-[300px]"
            >
                <Card index={index} {...principles[index]} />
            </motion.div>
        </motion.div>
    )
}

export function Approach() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.12 })
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

    // Scroll speed kicks the warp; the canvas eases it back to idle on its own
    const boost = useRef(1)
    const velocity = useVelocity(scrollYProgress)
    useMotionValueEvent(velocity, "change", (v) => {
        boost.current = Math.min(1 + Math.abs(v) * 9, 6)
    })

    // Big type drifts up through the section, swelling and brightest at center
    const textY = useTransform(scrollYProgress, [0, 1], [110, -110])
    const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.06, 1.24])
    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 1, 0.45])

    // Mouse parallax, normalised to -0.5..0.5 and softened by a spring
    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)
    const mx = useSpring(rawX, { stiffness: 50, damping: 18 })
    const my = useSpring(rawY, { stiffness: 50, damping: 18 })
    const textPx = useTransform(mx, (v) => v * -18)
    const textPy = useTransform(my, (v) => v * -18)

    return (
        <section
            ref={ref}
            id="approach"
            aria-labelledby="approach-title"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                rawX.set((e.clientX - rect.left) / rect.width - 0.5)
                rawY.set((e.clientY - rect.top) / rect.height - 0.5)
            }}
            onMouseLeave={() => {
                rawX.set(0)
                rawY.set(0)
            }}
            className="relative min-h-screen overflow-clip bg-background"
        >
            <WarpField boostRef={boost} className="absolute inset-0 h-full w-full" />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, hsl(var(--background) / 0.55) 100%)" }}
            />

            <motion.div
                className="absolute left-6 top-12 z-20 md:left-20"
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease }}
            >
                <SectionLabel index="05" label="Principles" />
            </motion.div>

            <motion.div
                style={{ y: textY, scale: textScale, opacity: textOpacity }}
                className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex h-[80svh] select-none items-center justify-center lg:inset-y-0 lg:h-auto"
            >
                <motion.h2
                    id="approach-title"
                    style={{
                        x: textPx,
                        y: textPy,
                        fontSize: "clamp(5rem, 16vw, 22rem)",
                        backgroundImage:
                            "linear-gradient(155deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--accent-2) / 0.1) 55%, hsl(var(--foreground) / 0.02) 100%)",
                    }}
                    className="display bg-clip-text text-center uppercase leading-[0.85] text-transparent"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, ease }}
                >
                    How
                    <br />I ship
                </motion.h2>
            </motion.div>

            {principles.map((p, i) => (
                <FloatingCard key={p.title} index={i} progress={scrollYProgress} mx={mx} my={my} />
            ))}

            {/* Below lg: cards stack under the heading and the section grows to fit */}
            <div className="relative z-20 space-y-2.5 px-5 pb-16 pt-[62svh] lg:hidden">
                {principles.map((p, i) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 18 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.28 + i * 0.1, duration: 0.6, ease }}
                    >
                        <Card index={i} {...p} className="rounded-xl p-4" />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
