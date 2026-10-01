import { SectionLabel } from "@/components/ui/section-label"
import { Reveal } from "@/components/ui/reveal"
import { MaskLines } from "@/components/ui/mask-lines"
import { education, personalDetails } from "@/data/portfolio"
import { LogoMark } from "@/components/ui/logo-mark"

// Lead with the first two sentences of the bio, set the rest smaller
const sentences = personalDetails.bio.match(/[^.!?]+[.!?]+/g) ?? [personalDetails.bio]
const lead = sentences.slice(0, 2).join("").trim()
const rest = sentences.slice(2).join("").trim()

export function About() {
    return (
        <section id="about" className="mx-auto grid max-w-[1440px] md:grid-cols-[34%_1fr]">
            {/* Left rail */}
            <div className="border-border px-6 py-24 md:border-r md:px-20 md:py-36">
                <div className="md:sticky md:top-32">
                    <SectionLabel index="01" label="About" />
                    <MaskLines
                        className="display mt-10 pb-2 text-7xl md:text-8xl"
                        lines={[<span className="text-gradient">About</span>]}
                    />

                    <dl className="mt-14">
                        {personalDetails.facts.map((f) => (
                            <div key={f.label} className="border-b border-border py-4">
                                <dt className="eyebrow text-[9px] text-primary">{f.label}</dt>
                                <dd className="mt-1.5 text-[15px] font-medium">{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Right content */}
            <div className="px-6 pb-24 md:px-20 md:py-36 md:pt-[11.5rem]">
                <MaskLines
                    as="h3"
                    className="display max-w-[16ch] text-4xl md:text-6xl"
                    lines={[
                        "Building at the",
                        "intersection of",
                        <>
                            backend <span className="text-muted-foreground/60">and AI.</span>
                        </>,
                    ]}
                />

                <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-6">
                    <p className="text-lg font-medium leading-[1.8]">{lead}</p>
                    <p className="text-[15px] leading-[1.9] text-muted-foreground">{rest}</p>
                </Reveal>

                <Reveal delay={0.15} className="mt-14">
                    <p className="eyebrow text-[9px] text-muted-foreground/70">Engineering values</p>
                    <ul className="mt-5 flex flex-wrap gap-3">
                        {personalDetails.values.map((v) => (
                            <li
                                key={v}
                                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                            >
                                {v}
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <Reveal delay={0.2} className="mt-16">
                    <p className="eyebrow text-[9px] text-muted-foreground/70">Education</p>
                    <ol className="mt-6 border-l border-border">
                        {education.map((edu) => (
                            <li key={edu.school} className="relative pb-10 pl-8 last:pb-0">
                                <span aria-hidden className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border border-primary bg-background" />
                                <p className="eyebrow text-[9px] text-primary">{edu.duration}</p>
                                <div className="mt-3 flex items-center gap-4">
                                    <div className="grid h-12 w-12 shrink-0 place-items-center">
                                        <LogoMark src={edu.logo} mono={"logoMono" in edu} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold leading-snug">{edu.school}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {edu.degree} · {edu.details} · {edu.location}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            </div>
        </section>
    )
}
