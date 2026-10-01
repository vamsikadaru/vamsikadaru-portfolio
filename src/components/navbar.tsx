import { useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { FileText, Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"
import { personalDetails } from "@/data/portfolio"

const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Work", id: "projects" },
    { name: "Contact", id: "contact" },
]

const sectionIds = navItems.map((i) => i.id)

export function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const active = useActiveSection(sectionIds)
    const { scrollYProgress } = useScroll()
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
    }, [open])

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
                scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
            )}
        >
            <nav aria-label="Primary" className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 md:px-20">
                <a href="#home" className="display flex items-center gap-1 whitespace-nowrap text-xl" aria-label={`${personalDetails.name}, home`}>
                    {personalDetails.name}
                    <span className="mt-1 h-[3px] w-4 bg-primary" aria-hidden />
                </a>

                <ul className="hidden items-center gap-10 lg:flex">
                    {navItems.map((item) => {
                        const isActive = active === item.id
                        return (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    aria-current={isActive ? "location" : undefined}
                                    className={cn(
                                        "eyebrow relative py-2 transition-colors",
                                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute -bottom-0.5 left-0 h-px w-full bg-primary"
                                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                                        />
                                    )}
                                </a>
                            </li>
                        )
                    })}
                </ul>

                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eyebrow hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 text-foreground transition-colors hover:border-primary/60 sm:inline-flex"
                    >
                        <FileText className="h-3.5 w-3.5" aria-hidden />
                        Resume
                    </a>
                    <a
                        href="#contact"
                        className="eyebrow hidden rounded-full bg-foreground px-5 py-3 font-semibold text-background transition-transform hover:scale-[1.03] sm:inline-flex"
                    >
                        Hire me
                    </a>
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                        className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
                    >
                        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>
            </nav>

            <motion.div
                aria-hidden
                className="bg-brand-gradient absolute inset-x-0 bottom-[-1px] h-[2px] origin-left"
                style={{ scaleX: progress }}
            />

            {/* Mobile: full-screen menu with display-size links */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        data-lenis-prevent
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-x-0 bottom-0 top-[76px] z-40 flex flex-col justify-between bg-background px-6 pb-10 pt-8 lg:hidden"
                    >
                        <ul className="space-y-2">
                            {navItems.map((item, i) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.04 * i, duration: 0.4 }}
                                >
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "display flex items-baseline gap-4 text-5xl",
                                            active === item.id ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        <span className="eyebrow text-primary">{String(i).padStart(2, "0")}</span>
                                        {item.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="flex gap-3">
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="eyebrow flex-1 rounded-full border border-border py-4 text-center">
                                Resume
                            </a>
                            <a href="#contact" onClick={() => setOpen(false)} className="eyebrow flex-1 rounded-full bg-foreground py-4 text-center font-semibold text-background">
                                Hire me
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
