import { SectionWrapper } from "@/components/section-wrapper"
import { publications } from "@/data/portfolio"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { CardContent } from "@/components/ui/card"
import { ExternalLink, FileText } from "lucide-react"

export function Publications() {
    return (
        <SectionWrapper id="publications" title="Publications">
            <div className="mx-auto max-w-4xl">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <SpotlightCard className="bg-white/[0.01] dark:bg-neutral-900/10 border-white/[0.05] hover:border-white/[0.1] transition-all">
                            <CardContent className="flex flex-row items-start gap-4 p-6">
                                <div className="mt-1 bg-secondary p-2 rounded-full">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-xl leading-none">{pub.title}</h3>
                                    <p className="text-sm text-primary font-medium">{pub.conference}</p>
                                    <p className="text-muted-foreground">{pub.description}</p>
                                    {pub.link && (
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium mt-2"
                                        >
                                            Read Paper
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </SpotlightCard>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    )
}
