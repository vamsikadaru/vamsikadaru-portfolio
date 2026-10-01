import { SectionLabel } from "@/components/ui/section-label"
import { Reveal } from "@/components/ui/reveal"
import { MaskLines } from "@/components/ui/mask-lines"
import { CountUp } from "@/components/ui/count-up"
import { skills } from "@/data/portfolio"

const techCount = new Set(skills.flatMap((s) => s.items)).size

const stats = [
    { value: `${techCount}+`, label: "Technologies" },
    { value: `${skills.length}`, label: "Disciplines" },
    { value: "3+", label: "Years shipping" },
]

export function Skills() {
    return (
        <section id="skills" className="mx-auto grid max-w-[1440px] border-t border-border md:grid-cols-[34%_1fr]">
            <div className="border-border px-6 py-24 md:border-r md:px-20 md:py-36">
                <div className="md:sticky md:top-32">
                    <SectionLabel index="02" label="Expertise" />
                    <MaskLines
                        className="display mt-10 text-5xl md:text-6xl"
                        lines={[
                            "I build",
                            <span className="text-muted-foreground/40">for</span>,
                            <span className="text-muted-foreground/40">production.</span>,
                        ]}
                    />
                    <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                        Spring Boot microservices, event-driven pipelines on Kafka and AWS, and the tests and tooling that keep them reliable in production.
                    </p>

                    <dl className="mt-12 max-w-xs">
                        {stats.map((s) => (
                            <div key={s.label} className="flex items-baseline gap-4 border-b border-border py-4">
                                <dd className="display text-3xl">
                                    <CountUp value={s.value} />
                                </dd>
                                <dt className="eyebrow order-last text-[9px] font-semibold">{s.label}</dt>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <div className="grid content-start sm:grid-cols-2">
                {skills.map((skill, i) => (
                    <Reveal
                        key={skill.category}
                        delay={(i % 2) * 0.08}
                        className="group relative border-b border-border px-6 py-12 transition-colors duration-500 hover:bg-card sm:odd:border-r md:px-12 md:py-16"
                    >
                        <span
                            aria-hidden
                            className="bg-brand-gradient absolute left-0 top-0 h-px w-0 transition-[width] duration-700 group-hover:w-full"
                        />
                        <div className="flex items-start justify-between">
                            <span className="eyebrow text-primary">{String(i + 1).padStart(2, "0")}</span>
                            <skill.icon
                                className="h-6 w-6 text-muted-foreground/50 transition-colors duration-500 group-hover:text-primary"
                                strokeWidth={1.5}
                                aria-hidden
                            />
                        </div>
                        <h3 className="display mt-10 text-2xl md:text-3xl">{skill.category}</h3>
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {skill.items.map((item) => (
                                <li
                                    key={item}
                                    className="border border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
