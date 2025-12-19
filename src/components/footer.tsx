import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { personalDetails } from "@/data/portfolio"
import { Button } from "@/components/ui/button"

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <footer className="bg-background border-t border-border py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {personalDetails.name}. All rights reserved.
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={scrollToTop}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                    Back to Top
                    <ArrowUp className="h-4 w-4" />
                </Button>

                <div className="flex space-x-6">
                    <a
                        href={personalDetails.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href={personalDetails.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={18} />
                    </a>
                    <a
                        href={`mailto:${personalDetails.socials.email}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Email"
                    >
                        <Mail size={18} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
