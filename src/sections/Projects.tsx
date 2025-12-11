import { SectionWrapper } from "@/components/section-wrapper"
import { projects } from "@/data/portfolio"
import { motion } from "framer-motion"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Folder } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export function Projects() {
    return (
        <SectionWrapper id="projects" title="Projects" subtitle="Some of the things I've built.">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex"
                    >
                        <SpotlightCard className="flex flex-col h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-secondary rounded-xl group-hover:bg-primary/20 transition-colors">
                                        <Folder className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="flex gap-2">
                                        {project.links.github && (
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <Github className="h-5 w-5" />
                                            </a>
                                        )}
                                        {project.links.demo && project.links.demo !== "#" && (
                                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <ExternalLink className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                                <CardDescription className="mt-2 text-sm line-clamp-3 leading-relaxed">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="bg-secondary/50 font-normal">
                                            {tech}
                                        </Badge>
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
