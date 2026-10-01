import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { ParticleMorph } from "@/components/ui/particle-morph"
import { Marquee } from "@/components/ui/marquee"
import { CountUp } from "@/components/ui/count-up"
import { experience, personalDetails, projects, publications, skills } from "@/data/portfolio"

const EASE = [0.16, 1, 0.3, 1] as const

const stats = [
    { value: "3+", label: "Years exp" },
    { value: `${projects.length}`, label: "Projects built" },
    { value: `${publications.length}`, label: "Publication" },
]

const marqueeItems = Array.from(new Set(skills.flatMap((s) => s.items))).slice(0, 24)

function RoleCycler({ roles }: { roles: string[] }) {
    const [i, setI] = useState(0)
    useEffect(() => {
        const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2500)
        return () => clearInterval(t)
    }, [roles.length])

    return (
        <span className="relative inline-flex h-5 items-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={roles[i]}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="block bg-[linear-gradient(90deg,hsl(var(--accent-3)),hsl(var(--primary)),hsl(var(--accent-2)))] bg-clip-text font-mono text-[11px] uppercase tracking-[0.24em] text-transparent"
                >
                    {roles[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

/** Types `text` out one character at a time. Key it to restart. */
function Typed({ text, speed = 18 }: { text: string; speed?: number }) {
    const [n, setN] = useState(0)
    useEffect(() => {
        const t = setInterval(() => setN((c) => (c >= text.length ? (clearInterval(t), c) : c + 1)), speed)
        return () => clearInterval(t)
    }, [text, speed])
    return (
        <>
            <span>{text.slice(0, n)}</span>
            <span className="invisible">{text.slice(n)}</span>
        </>
    )
}

function useIsMobile() {
    const [mobile, setMobile] = useState(() => window.innerWidth < 768)
    useEffect(() => {
        const onResize = () => setMobile(window.innerWidth < 768)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])
    return mobile
}

export function Hero() {
    const { headlineLines, heroPhases, titles, socials, location } = personalDetails
    const latest = experience[0]
    const isMobile = useIsMobile()
    const [phase, setPhase] = useState(0)

    // Scroll-out: the particle stage drifts up, zooms and fades; content lifts away faster
    const ref = useRef<HTMLElement>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
    const stageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-18%"])
    const stageScale = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 1.12])
    const stageOpacity = useTransform(scrollYProgress, [0, 0.55], [1, reduced ? 1 : 0])
    const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", reduced ? "0%" : "-10%"])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, reduced ? 1 : 0])

    return (
        <section ref={ref} id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-clip">
            <motion.div className="absolute inset-0 -z-10" style={{ y: stageY, scale: stageScale, opacity: stageOpacity }}>
                <ParticleMorph className="h-full w-full" isMobile={isMobile} onPhase={setPhase} />
                {/* Fade the cloud out behind the headline and along the edges */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: [
                            "radial-gradient(ellipse 70% 78% at 64% 42%, transparent 12%, hsl(var(--background) / 0.72) 55%, hsl(var(--background)) 80%)",
                            // Left fade only matters when the cloud sits beside the headline
                            !isMobile && "linear-gradient(to right, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.5) 38%, transparent 68%)",
                            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.65) 30%, transparent 58%)",
                            "linear-gradient(to bottom, hsl(var(--background) / 0.5) 0%, transparent 20%)",
                        ]
                            .filter(Boolean)
                            .join(", "),
                    }}
                />
            </motion.div>

            {/* Caption synced to the particle shape */}
            <div className="pointer-events-none absolute bottom-[26%] right-6 z-10 hidden text-right md:right-20 md:block" aria-live="polite">
                <div className="mb-4 flex justify-end gap-1.5" aria-hidden>
                    {heroPhases.map((_, i) => (
                        <span
                            key={i}
                            className="h-px transition-all duration-500"
                            style={{ width: i === phase ? 28 : 14, background: i === phase ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.15)" }}
                        />
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: EASE }}
                    >
                        <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.3em] text-primary/80">
                            <Typed text={heroPhases[phase].tag} />
                        </p>
                        <p className="ml-auto max-w-[250px] text-sm leading-relaxed text-muted-foreground">{heroPhases[phase].line}</p>
                    </motion.div>
                </AnimatePresence>
                <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.26em] text-muted-foreground/60">✦ Drag / click the particles</p>
            </div>

            <motion.div
                className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-6 pb-10 pt-28 md:px-20 lg:pb-14"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <h1 className="display mb-4" style={{ fontSize: "clamp(2.4rem, 5.2vw, 7rem)", letterSpacing: "-0.028em", lineHeight: 0.95 }}>
                    {headlineLines.map((line, i) => (
                        <span key={line} className="block overflow-hidden pb-1">
                            <motion.span
                                className="block"
                                initial={{ y: "115%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
                            >
                                {line}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mb-5 flex items-center gap-5">
                    <span aria-hidden className="h-px w-10 shrink-0 bg-foreground/25" />
                    <RoleCycler roles={titles} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.9 }}
                    className="mb-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7"
                >
                    <div className="max-w-xs space-y-1.5">
                        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                            <motion.span
                                aria-hidden
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2.2, repeat: Infinity }}
                            />
                            Open to work · {location}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            <span className="font-medium text-foreground/80">{latest.role}</span>, prev.{" "}
                            <span className="font-medium text-foreground/80">CRED</span> · MEng CS, University of Cincinnati
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-5">
                        <a
                            href="#projects"
                            className="group flex items-center gap-2.5 whitespace-nowrap rounded-full bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                        >
                            View work
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                        </a>
                        <div className="flex items-center gap-1 text-foreground">
                            {[
                                { href: socials.github, label: "GitHub", Icon: Github },
                                { href: socials.linkedin, label: "LinkedIn", Icon: Linkedin },
                                { href: `mailto:${socials.email}`, label: "Email", Icon: Mail },
                            ].map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                                    className="grid h-9 w-9 place-items-center opacity-35 transition-opacity duration-200 hover:opacity-90"
                                >
                                    <Icon className="h-[18px] w-[18px]" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex items-center gap-8 border-t border-foreground/10 pt-5"
                >
                    <dl className="flex items-center gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="flex flex-col-reverse gap-1.5">
                                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/80">{s.label}</dt>
                                <dd className="display text-3xl leading-none tracking-tight md:text-4xl">
                                    <CountUp value={s.value} />
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <a href="#about" className="ml-auto hidden flex-col items-center gap-2 opacity-30 transition-opacity hover:opacity-70 lg:flex" aria-label="Scroll to About">
                        <motion.span
                            aria-hidden
                            className="h-12 w-px origin-top bg-foreground"
                            animate={{ scaleY: [0.2, 1, 0.2] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="font-mono text-[8px] uppercase tracking-[0.24em]">Scroll</span>
                    </a>
                </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="relative z-10">
                <Marquee
                    items={marqueeItems}
                    duration={55}
                    className="border-b-0 border-t-foreground/[0.06] py-3.5"
                    itemClassName="font-mono text-[11px] font-normal tracking-[0.22em] text-foreground/30"
                    starClassName="text-[8px] text-primary/40"
                />
            </motion.div>
        </section>
    )
}
