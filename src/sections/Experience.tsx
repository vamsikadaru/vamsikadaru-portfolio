import { SectionWrapper } from "@/components/section-wrapper"
import { experience } from "@/data/portfolio"


export function Experience() {
    return (
        <SectionWrapper id="experience" title="Experience" subtitle="My professional journey.">
            <div className="relative mx-auto max-w-6xl">
                {/* Vertical Line - Fixed at 30% for desktop */}
                <div className="absolute left-[20px] top-0 bottom-0 w-px bg-border md:left-[30%]" />

                <div className="space-y-12">
                    {experience.map((job, index) => (
                        <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-0">

                            {/* Left Side: Meta Info (30%) */}
                            <div className="pl-12 md:pl-0 md:w-[30%] md:pr-12 md:text-right relative">
                                {/* Mobile Timeline Dot */}
                                <div className="md:hidden absolute left-[15px] top-2 h-3 w-3 rounded-full border-2 border-primary bg-background ring-4 ring-background z-10" />

                                <h3 className="text-xl font-bold">{job.role}</h3>
                                <p className="text-lg font-semibold text-primary mb-1">{job.company}</p>
                                <div className="text-muted-foreground font-medium text-sm flex flex-col md:items-end gap-1">
                                    <span>{job.duration}</span>
                                    {/* @ts-ignore */}
                                    {job.location && (
                                        <span>{job.location}</span>
                                    )}
                                </div>
                            </div>

                            {/* Timeline Dot (Desktop) - centered on the 30% line */}
                            <div className="hidden md:block absolute left-[30%] -translate-x-[5px] top-2 h-3 w-3 rounded-full border-2 border-primary bg-background ring-4 ring-background z-10" />

                            {/* Right Side: Description (70%) */}
                            <div className="pl-12 md:pl-12 md:w-[70%]">
                                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-muted-foreground/90 leading-relaxed">
                                    {job.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
