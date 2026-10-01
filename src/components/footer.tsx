import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { personalDetails } from "@/data/portfolio"

function RisingLetter({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
    const start = (index / total) * 0.35
    const y = useTransform(progress, [start, start + 0.6], ["70%", "0%"])
    return (
        <motion.span className="inline-block" style={{ y }}>
            {char}
        </motion.span>
    )
}

export function Footer() {
    const firstName = personalDetails.name.split(" ")[0]
    const nameRef = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: nameRef, offset: ["start end", "end end"] })

    return (
        <footer>
            {/* Split CTA band */}
            <div className="grid border-y border-border md:grid-cols-2">
                <p className="display flex items-center justify-center px-6 py-12 text-center text-4xl uppercase md:py-16 md:text-5xl">
                    Ready to hire?
                </p>
                <a
                    href={`mailto:${personalDetails.socials.email}`}
                    className="group relative flex items-center justify-center gap-6 overflow-hidden bg-[linear-gradient(110deg,hsl(var(--primary)),hsl(var(--accent-2)))] px-6 py-12 text-primary-foreground md:py-16"
                >
                    <span aria-hidden className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,hsl(0_0%_100%/0.25)_50%,transparent_70%)] transition-transform duration-1000 group-hover:translate-x-full" />
                    <span className="display relative text-4xl uppercase md:text-5xl">Let's talk</span>
                    <span className="relative flex gap-3" aria-hidden>
                        {[0, 1, 2].map((i) => (
                            <ArrowUpRight
                                key={i}
                                strokeWidth={3}
                                className="h-8 w-8 animate-nudge md:h-10 md:w-10"
                                style={{ animationDelay: `${i * 0.15}s`, opacity: 1 - i * 0.25 }}
                            />
                        ))}
                    </span>
                </a>
            </div>

            {/* Oversized name */}
            <div ref={nameRef} className="relative overflow-hidden pt-16">
                <p
                    aria-hidden
                    className="display select-none whitespace-nowrap text-center text-[27vw] uppercase leading-[0.78] text-foreground/[0.14]"
                    style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
                >
                    {reduced
                        ? firstName
                        : firstName.split("").map((c, i) => (
                              <RisingLetter key={i} char={c} index={i} total={firstName.length} progress={scrollYProgress} />
                          ))}
                </p>
                <div className="eyebrow absolute inset-x-0 bottom-6 mx-auto flex max-w-[1440px] flex-col gap-2 px-6 font-semibold sm:flex-row sm:justify-between md:px-20">
                    <span>© {new Date().getFullYear()} {personalDetails.name}</span>
                    <span className="text-muted-foreground">Built with React · TypeScript · Framer Motion</span>
                    <a href="#home" className="group inline-flex items-center gap-2 transition-colors hover:text-primary">
                        Back to top
                        <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
                    </a>
                </div>
            </div>
        </footer>
    )
}
