import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

let instance: Lenis | null = null

/** Access the active Lenis instance (null under reduced motion). */
export const getLenis = () => instance

/**
 * Inertial smooth scrolling for wheel/trackpad. Touch keeps native scrolling,
 * in-page anchor links are animated with the header offset, and the whole
 * thing is skipped when the visitor prefers reduced motion.
 */
export function useSmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        instance = new Lenis({
            autoRaf: true,
            lerp: 0.1,
            wheelMultiplier: 1,
            anchors: { offset: -76 },
        })
        document.documentElement.classList.add("has-lenis")

        return () => {
            instance?.destroy()
            instance = null
            document.documentElement.classList.remove("has-lenis")
        }
    }, [])
}
