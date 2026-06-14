import { SectionWrapper } from "@/components/section-wrapper"
import { experience } from "@/data/portfolio"

export function Experience() {
    return (
        <SectionWrapper id="experience" title="Experience" subtitle="My professional journey.">
            <div className="mx-auto max-w-5xl">
                <div className="space-y-16">
                    {experience.map((job, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12">
                            
                            {/* Left Column: Date Duration (25% on desktop) */}
                            <div className="md:w-[25%] flex-shrink-0 text-muted-foreground/80 font-medium text-base pt-1">
                                {job.duration}
                            </div>

                            {/* Right Column: Logo, Job Role, Company, Location, Description & Tech */}
                            <div className="flex-grow flex flex-col">
                                
                                {/* Header: Logo + Title/Meta */}
                                <div className="flex items-center gap-4 mb-5">
                                    {/* @ts-ignore -- logo property added to data schema */}
                                    {job.logo && (
                                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                                            <img
                                                src={job.logo}
                                                alt={`${job.company} Logo`}
                                                className="object-contain w-full h-full rounded"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-bold text-foreground leading-snug">{job.role}</h3>
                                        <div className="text-base font-medium text-muted-foreground leading-snug">
                                            <span className="text-foreground/90">{job.company}</span>
                                            {/* @ts-ignore -- location added in data file */}
                                            {job.location && (
                                                <>
                                                    <span className="mx-1.5">·</span>
                                                    <span>{job.location}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Description Paragraphs (instead of bullet lists) */}
                                <div className="space-y-4 text-base text-muted-foreground/90 leading-relaxed max-w-3xl mb-6">
                                    {job.description.map((desc, i) => (
                                        <p key={i}>{desc}</p>
                                    ))}
                                </div>

                                {/* Technologies Used (Horizontal inline flex row) */}
                                {/* @ts-ignore -- tech property added to data schema */}
                                {job.tech && job.tech.length > 0 && (
                                    <div className="flex flex-wrap gap-x-6 gap-y-2.5 items-center text-sm font-medium text-muted-foreground/80">
                                        {/* @ts-ignore */}
                                        {job.tech.map((t, i) => (
                                            <div key={i} className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                                                <span>{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
