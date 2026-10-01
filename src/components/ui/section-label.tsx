import { cn } from "@/lib/utils"

/** "01 ——— ABOUT" micro label used to open every section. */
export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
    return (
        <p className={cn("eyebrow flex items-center gap-4 text-muted-foreground", className)}>
            <span className="text-primary">{index}</span>
            <span aria-hidden className="h-px w-10 bg-primary/40" />
            {label}
        </p>
    )
}
