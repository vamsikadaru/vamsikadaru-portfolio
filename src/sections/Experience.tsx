import { SectionWrapper } from "@/components/section-wrapper"
import { experience } from "@/data/portfolio"
import { motion } from "framer-motion"

export function Experience() {
    return (
        <SectionWrapper id="experience" title="Experience" subtitle="My professional journey.">
            <div className="relative mx-auto max-w-3xl pl-8 md:pl-0">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

                {experience.map((job, index) => (
                    <div key={index} className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:w-1/2'}`}>
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`md:w-full ${index % 2 !== 0 ? '' : 'md:ml-auto md:w-full'}`}
                        >
                            {/* Dot on the timeline */}
                            <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full border border-background bg-primary ring-4 ring-background md:left-1/2 md:-translate-x-[5px]" />

                            <div className={`${index % 2 === 0 ? 'md:mr-auto' : ''}`}>
                                <span className="block text-sm font-semibold tracking-wide text-primary">
                                    {job.duration}
                                </span>
                                <h3 className="text-xl font-bold mt-1">{job.role}</h3>
                                <p className="text-muted-foreground font-medium mb-3">{job.company}</p>
                                <ul className={`list-disc space-y-2 text-sm text-muted-foreground/90 ${index % 2 === 0 ? 'list-inside md:list-none' : 'list-inside'}`}>
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="leading-relaxed">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
