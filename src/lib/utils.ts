import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Run `cb` whenever the theme class on <html> changes. ThemeProvider swaps the
 * class in its own effect, which runs after children's effects, so canvases
 * reading CSS variables must listen here rather than to the theme state.
 */
export function onThemeClassChange(cb: () => void) {
    const observer = new MutationObserver(cb)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
}
