import { Fragment, useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { SectionLabel } from "@/components/ui/section-label"
import { Reveal } from "@/components/ui/reveal"
import { MaskLines } from "@/components/ui/mask-lines"
import { experience } from "@/data/portfolio"
import { LogoMark } from "@/components/ui/logo-mark"

// Outcome figures like "90%", "20+", "<0.1%", "≈3s" get highlighted so impact is scannable
const METRIC = /((?:[<≈~]\s?)?\d+(?:\.\d+)?(?:%|\+|s\b))/g

function Emphasize({ text }: { text: string }) {
    return (
        <>
            {text.split(METRIC).map((part, i) =>
                i % 2 === 1 ? (
                    <span key={i} className="font-semibold text-primary">
                        {part}
                    </span>
                ) : (
                    <Fragment key={i}>{part}</Fragment>
                )
            )}
        </>
    )
}

export function Experience() {
    const listRef = useRef<HTMLOListElement>(null)
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] })
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
    return (
        <section id="experience" className="mx-auto max-w-[1440px] border-t border-border px-6 py-24 md:px-20 md:py-36">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                    <SectionLabel index="03" label="Experience" />
                    <MaskLines
                        className="display mt-10 text-5xl md:text-7xl"
                        lines={[
                            <>
                                Where I've <span className="text-muted-foreground/40">shipped.</span>
                            </>,
                        ]}
                    />
                </div>
                <p className="max-w-xs text-[15px] leading-relaxed text-muted-foreground md:text-right">
                    Production backends, data pipelines and AI work across fintech and enterprise teams.
                </p>
            </div>

            <ol ref={listRef} className="relative mt-20 border-t border-border md:pl-10">
                {/* Rail that fills as you read down the roles */}
                <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-border md:block" />
                <motion.span
                    aria-hidden
                    className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-[linear-gradient(to_bottom,hsl(var(--primary)),hsl(var(--accent-2)),hsl(var(--accent-3)))] md:block"
                    style={{ scaleY: fill }}
                />
                {experience.map((job, index) => (
                    <li key={job.company + job.role}>
                        <Reveal className="group grid gap-8 border-b border-border py-12 md:grid-cols-[3rem_17rem_1fr] md:gap-10 md:py-16">
                            <span className="eyebrow pt-2 text-primary">{String(index + 1).padStart(2, "0")}</span>

                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="grid h-12 w-12 shrink-0 place-items-center">
                                        <LogoMark src={job.logo} mono={"logoMono" in job} />
                                    </div>
                                    <p className="eyebrow text-[9px] text-muted-foreground">{job.duration}</p>
                                </div>
                                <h3 className="display mt-6 text-2xl leading-tight md:text-3xl">{job.role}</h3>
                                <p className="mt-2 text-sm font-medium text-muted-foreground">{job.company}</p>
                                <p className="eyebrow mt-3 text-[9px] text-muted-foreground/70">{job.location}</p>
                            </div>

                            <div>
                                <ul className="space-y-4 text-[15px] leading-[1.85] text-muted-foreground">
                                    {job.description.map((d, i) => (
                                        <li key={i} className="relative pl-6">
                                            <span aria-hidden className="absolute left-0 top-[0.85em] h-px w-3 bg-primary/60" />
                                            <Emphasize text={d} />
                                        </li>
                                    ))}
                                </ul>
                                <ul className="mt-8 flex flex-wrap gap-2">
                                    {job.tech.map((t) => (
                                        <li key={t} className="border border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </section>
    )
}
