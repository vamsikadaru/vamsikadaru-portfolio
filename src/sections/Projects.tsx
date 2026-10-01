import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Reveal } from "@/components/ui/reveal"
import { MaskLines } from "@/components/ui/mask-lines"
import { Marquee } from "@/components/ui/marquee"
import { personalDetails, projects } from "@/data/portfolio"
import { cn } from "@/lib/utils"

type Project = (typeof projects)[number]

const hasDemo = (url?: string) => Boolean(url && url !== "#")
const allTech = Array.from(new Set(projects.flatMap((p) => p.tech)))

/** Screenshot when we have one, otherwise a typographic cover built from the project name. */
function Preview({ project }: { project: Project }) {
    const href = hasDemo(project.links.demo) ? project.links.demo : project.links.github
    const image = "image" in project ? project.image : undefined

    // Content inside the frame travels slower than the page: a window-onto-depth parallax
    const ref = useRef<HTMLAnchorElement>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-7%", "7%"])
    const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [28, -28])

    return (
        <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="group/preview relative block aspect-[16/10] overflow-hidden shadow-elevated rounded-xl border border-border bg-card transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-primary/40"
        >
            {image ? (
                <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: imageY }}>
                    <img
                        src={image}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover/preview:scale-[1.04]"
                    />
                </motion.div>
            ) : (
                <div className="@container relative flex h-full w-full flex-col justify-between p-6 md:p-8">
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.05)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                    />
                    <div aria-hidden className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.22),hsl(var(--accent-3)/0.12)_55%,transparent_70%)] blur-2xl transition-opacity duration-700 group-hover/preview:opacity-100 md:opacity-60" />
                    <span className="eyebrow relative text-[9px] text-muted-foreground">{project.category}</span>
                    <motion.span
                        className="display relative text-[clamp(1.75rem,12cqi,4rem)] text-foreground/90 [overflow-wrap:normal]"
                        style={{ y: titleY }}
                    >
                        {project.title.replace(/-/g, " ")}
                    </motion.span>
                    <span className="eyebrow relative flex items-center gap-2 text-[9px] text-muted-foreground">
                        <Github className="h-3.5 w-3.5" aria-hidden /> View source
                    </span>
                </div>
            )}
        </a>
    )
}

export function Projects() {
    return (
        <section id="projects" className="mx-auto grid max-w-[1440px] border-t border-border md:grid-cols-[30%_1fr]">
            <div className="border-border px-6 py-24 md:border-r md:px-20 md:py-36">
                <div className="md:sticky md:top-32">
                    <SectionLabel index="04" label="Work" />
                    <MaskLines
                        className="display mt-10 text-6xl md:text-7xl"
                        lines={["Things", "I've", <span className="text-muted-foreground/40">built.</span>]}
                    />
                    <a
                        href={personalDetails.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eyebrow group mt-10 inline-flex items-center gap-2 border-b border-foreground pb-1.5 font-semibold"
                    >
                        All on GitHub
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                </div>
            </div>

            <div className="min-w-0 md:pt-28">
                <Marquee items={allTech} duration={45} className="py-5" itemClassName="text-muted-foreground/60" />

                <ol>
                    {projects.map((project, i) => {
                        const flip = i % 2 === 1
                        return (
                            <li key={project.title} className="border-b border-border">
                                <Reveal className="grid items-center gap-10 px-6 py-14 md:px-12 md:py-20 xl:grid-cols-2 xl:gap-14">
                                    <div className={cn(flip && "xl:order-2")}>
                                        <Preview project={project} />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-4">
                                            <span className="eyebrow text-[9px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                                            <span aria-hidden className="h-px flex-1 bg-border" />
                                            <span className="eyebrow text-[9px] text-muted-foreground">{project.category}</span>
                                            {hasDemo(project.links.demo) && (
                                                <span className="eyebrow rounded-full border border-primary/50 px-2.5 py-1 text-[8px] text-primary">Live</span>
                                            )}
                                        </div>

                                        <h3 className="display mt-6 text-4xl md:text-5xl">{project.title}</h3>
                                        <p className="mt-5 text-[15px] leading-[1.8] text-muted-foreground">{project.description}</p>

                                        <ul className="mt-7 flex flex-wrap gap-2">
                                            {project.tech.map((t) => (
                                                <li key={t} className="border border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-8 flex flex-wrap items-center gap-6">
                                            {hasDemo(project.links.demo) && (
                                                <a
                                                    href={project.links.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="eyebrow group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-bold text-background transition-transform hover:scale-[1.03]"
                                                >
                                                    Live site
                                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                                                </a>
                                            )}
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="eyebrow inline-flex items-center gap-2 font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <Github className="h-4 w-4" aria-hidden />
                                                Source
                                            </a>
                                        </div>
                                    </div>
                                </Reveal>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
