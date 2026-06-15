import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delay?: number;
    className?: string;
    prefix?: string;
}

export function Typewriter({
    words,
    typingSpeed = 150,
    deletingSpeed = 75,
    delay = 2000,
    className = "",
    prefix = "> ",
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const currentWord = words[currentWordIndex];

        // Add a slight human-like typing speed variation (variance of +/- 30ms)
        const variance = isDeleting ? 0 : (Math.random() * 60 - 30);
        const speed = Math.max(30, isDeleting ? deletingSpeed : typingSpeed + variance);

        if (isDeleting) {
            timer = setTimeout(() => {
                setCurrentText((prev) => prev.slice(0, -1));
            }, speed);
        } else {
            timer = setTimeout(() => {
                setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
            }, speed);
        }

        // Once word is fully typed, pause before deleting
        if (!isDeleting && currentText === currentWord) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, delay);
        }

        // Once word is fully deleted, move to the next word with a short natural pause
        if (isDeleting && currentText === "") {
            timer = setTimeout(() => {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }, 300);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

    return (
        <span className={className}>
            {/* Terminal prefix with dark/medium grey */}
            <span className="font-mono font-bold text-zinc-500 dark:text-zinc-400 mr-2">
                {prefix}
            </span>

            {/* Smoothly typed text with slate/grey and soft shadow */}
            <span
                className="font-mono font-bold inline-flex items-center text-zinc-700 dark:text-zinc-300"
                style={{
                    textShadow: "0 0 8px rgba(209, 213, 219, 0.25)",
                }}
            >
                {currentText.split("").map((char, index) => (
                    <motion.span
                        key={`${currentWordIndex}-${index}`}
                        initial={{ opacity: 0, filter: "blur(3px)", scale: 0.9 }}
                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}

                {/* Smooth blinking cursor with matching light grey */}
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                        duration: 1.0,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="inline-block font-mono ml-1 text-zinc-700 dark:text-zinc-300"
                    style={{
                        textShadow: "0 0 8px rgba(209, 213, 219, 0.25)",
                    }}
                >
                    _
                </motion.span>
            </span>
        </span>
    );
}
