import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isLight = theme === "light"

    return (
        <button
            type="button"
            onClick={() => setTheme(isLight ? "dark" : "light")}
            aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" aria-hidden />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" aria-hidden />
        </button>
    )
}
