import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ParticlesBackground } from "@/components/ui/ParticlesBackground"

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
            <Navbar />

            {/* Background gradients/particles can go here */}
            <ParticlesBackground />
            <div className="fixed inset-0 -z-20 h-full w-full bg-background/80 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

            <main className="flex-grow pt-16">
                {children}
            </main>

            <Footer />
        </div>
    )
}
