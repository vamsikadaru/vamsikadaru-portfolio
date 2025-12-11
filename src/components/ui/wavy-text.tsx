import { cn } from "@/lib/utils";

interface WavyTextProps {
    text: string;
    className?: string;
}

export function WavyText({ text, className }: WavyTextProps) {
    return (
        <span className={cn("inline-block cursor-pointer", className)}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className="inline-block char-wave will-change-transform"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}
