import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MaskLinesProps {
    lines: ReactNode[]
    className?: string
    as?: "h2" | "h3"
    delay?: number
}

/** Heading whose lines slide up from behind a mask, one after another, when scrolled into view. */
export function MaskLines({ lines, className, as = "h2", delay = 0 }: MaskLinesProps) {
    const Tag = as
    return (
        <Tag className={className}>
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                    <motion.span
                        className={cn("block")}
                        initial={{ y: "110%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 1, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </Tag>
    )
}
