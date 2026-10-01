import { ArrowUpRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Reveal } from "@/components/ui/reveal"
import { publications } from "@/data/portfolio"

export function Publications() {
    return (
        <section id="publications" className="mx-auto max-w-[1440px] border-t border-border px-6 py-24 md:px-20 md:py-32">
            <SectionLabel index="06" label="Research" />

            <ul className="mt-12">
                {publications.map((pub) => (
                    <li key={pub.title}>
                        <Reveal>
                            <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid gap-6 border-y border-border py-10 transition-colors hover:bg-card md:grid-cols-[1fr_1.4fr_auto] md:items-start md:gap-12 md:px-6"
                            >
                                <div>
                                    <p className="eyebrow text-[9px] text-primary">{pub.year} · Published paper</p>
                                    <h3 className="display mt-4 text-4xl md:text-5xl">{pub.title}</h3>
                                    <p className="mt-3 text-sm font-medium text-muted-foreground">{pub.conference}</p>
                                </div>
                                <p className="text-[15px] leading-[1.8] text-muted-foreground">{pub.description}</p>
                                <span className="grid h-14 w-14 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                                    <span className="sr-only">Read paper</span>
                                </span>
                            </a>
                        </Reveal>
                    </li>
                ))}
            </ul>
        </section>
    )
}
