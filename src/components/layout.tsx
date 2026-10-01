import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-clip font-sans text-foreground">
            <a
                href="#main"
                className="eyebrow fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-foreground px-4 py-3 text-background transition-transform focus:translate-y-0"
            >
                Skip to content
            </a>
            <div aria-hidden className="bg-noise pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]" />
            <Navbar />
            <main id="main" className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}
