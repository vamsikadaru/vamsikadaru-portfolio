import { SectionWrapper } from "@/components/section-wrapper"
import { personalDetails, education } from "@/data/portfolio"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { CardContent } from "@/components/ui/card"

export function About() {
    return (
        <SectionWrapper id="about" title="About Me">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 md:grid-cols-[2fr_3fr] items-start">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative max-w-[260px] mx-auto md:mx-0 w-full group/profile"
                    >
                        <div className="aspect-[3427/4570] w-full overflow-hidden rounded-2xl bg-neutral-950 relative border border-white/[0.08] shadow-2xl">
                            <img
                                src="/profile.jpg"
                                alt="Profile"
                                className="object-cover w-full h-full grayscale group-hover/profile:grayscale-0 group-hover/profile:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="prose prose-neutral dark:prose-invert text-lg text-foreground/90"
                    >
                        <p className="leading-relaxed mb-8">
                            {personalDetails.bio}
                        </p>

                        <div className="grid gap-4 mt-8 not-prose">
                            {education.map((edu, index) => (
                                <SpotlightCard key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            {/* @ts-ignore -- logo property added to data schema */}
                                            {edu.logo && (
                                                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                                                    <img
                                                        src={edu.logo}
                                                        alt={`${edu.school} Logo`}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-grow flex flex-col gap-2 w-full">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between w-full gap-2">
                                                    <div className="flex flex-col">
                                                        <h3 className="font-semibold text-foreground leading-snug">{edu.school}</h3>
                                                        {/* @ts-ignore -- location added in data file */}
                                                        <p className="text-xs text-muted-foreground">{edu.location}</p>
                                                    </div>
                                                    {/* @ts-ignore -- duration added purely in data file */}
                                                    <span className="text-sm text-muted-foreground sm:text-right whitespace-nowrap tabular-nums">{edu.duration}</span>
                                                </div>
                                                <div className="flex items-center justify-between w-full">
                                                    <p className="text-sm text-muted-foreground">{edu.degree}</p>
                                                    {edu.details && (
                                                        <span className="text-xs font-medium bg-secondary/80 px-2 py-1 rounded text-secondary-foreground whitespace-nowrap ml-2">
                                                            {edu.details}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </SpotlightCard>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    )
}
