import { cn } from "@/lib/utils"

/**
 * Transparent company / school logo. `mono` marks are white artwork: kept white in
 * dark mode and inverted to black in light mode so they read on either background.
 */
export function LogoMark({ src, mono = false, className }: { src: string; mono?: boolean; className?: string }) {
    return <img src={src} alt="" loading="lazy" className={cn("max-h-full max-w-full object-contain", mono && "invert dark:invert-0", className)} />
}
