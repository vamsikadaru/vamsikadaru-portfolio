import { SectionWrapper } from "@/components/section-wrapper"
import { skills } from "@/data/portfolio"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Skills() {
    return (
        <SectionWrapper id="skills" title="Skills" subtitle="Technologies and tools I work with.">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <SpotlightCard className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5">
                            <CardHeader className="flex flex-row items-center gap-3 pb-2">
                                <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                                    <skill.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <CardTitle className="text-base font-semibold">{skill.category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className="inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-foreground/10"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </SpotlightCard>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    )
}
