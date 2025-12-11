import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
    children: React.ReactNode
    id: string
    className?: string
    title?: string
    subtitle?: string
}

export function SectionWrapper({ children, id, className, title, subtitle }: SectionWrapperProps) {
    return (
        <section id={id} className={cn("py-20 md:py-32", className)}>
            <div className="container px-4 md:px-6">
                {(title || subtitle) && (
                    <div className="mb-12 text-center">
                        {title && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                            >
                                {title}
                            </motion.h2>
                        )}
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mt-4 text-muted-foreground md:text-lg max-w-[800px] mx-auto"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    )
}
