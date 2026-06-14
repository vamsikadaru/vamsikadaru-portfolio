import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link as ScrollLink } from "react-scroll"
import { personalDetails } from "@/data/portfolio"

import { Typewriter } from "@/components/ui/typewriter"

export function Hero() {
    return (
        <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 overflow-hidden">
            {/* Spotlight/Glow effect behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center gap-6 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <span className="rounded-full bg-secondary/80 backdrop-blur-sm border border-border px-4 py-1.5 text-sm font-medium text-secondary-foreground shadow-sm">
                            👋 Hello, I'm
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-foreground"
                    >
                        {personalDetails.name}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-2"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-primary min-h-[40px] flex items-center justify-center">
                            <Typewriter words={personalDetails.titles} />
                        </h2>
                        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl mx-auto leading-relaxed">
                            {personalDetails.tagline}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 pt-8"
                    >
                        <ScrollLink to="projects" smooth={true} duration={500} offset={-70}>
                            <Button size="lg" className="h-12 px-8 text-base rounded-full group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </ScrollLink>

                        <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full hover:bg-secondary/80 backdrop-blur-sm transition-colors" asChild>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                Download Resume
                                <Download className="h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    )
}
