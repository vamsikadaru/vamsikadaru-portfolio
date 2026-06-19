import { useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "var(--spotlight)",
    ...props
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });

        // 3D Tilt calculation - 7 degrees is highly realistic and responsive
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxTilt = 7; 
        const rX = ((y - centerY) / centerY) * -maxTilt;
        const rY = ((x - centerX) / centerX) * maxTilt;
        setRotateX(rX);
        setRotateY(rY);
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
        setRotateX(0);
        setRotateY(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setRotateX(0);
        setRotateY(0);
    };

    // Calculate dynamic shadow offsets for real-world depth
    const shadowX = -rotateY * 2;
    const shadowY = rotateX * 2;

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative rounded-2xl border border-white/[0.06] bg-neutral-900/40 dark:bg-neutral-950/50 backdrop-blur-xl overflow-hidden transition-all duration-300",
                className
            )}
            style={{
                ...props.style,
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                boxShadow: opacity === 1
                    ? `${shadowX}px ${shadowY}px 35px -5px rgba(0, 0, 0, 0.55), 0 10px 20px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)`
                    : "0 10px 30px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                transition: opacity === 0 
                    ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s, border-color 0.3s, background-color 0.3s" 
                    : "border-color 0.3s, background-color 0.3s, box-shadow 0.1s ease-out",
            }}
            {...props}
        >
            {/* Ambient Background Spotlight glow */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`,
                }}
            />

            {/* Glass Sheen / Light Reflection Overlay sitting above content */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-20"
                style={{
                    opacity: opacity * 0.45,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 60%)`,
                }}
            />

            <div className="relative h-full z-10">{children}</div>
        </div>
    );
}
