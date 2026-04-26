"use client";

import { motion } from "framer-motion";

interface LetterAnimationProps {
    text: string;
    delay?: number;
    duration?: number;
    className?: string;
    type: "reveal" | "blur";
}

export function LetterAnimation({
    text,
    delay = 0,
    duration = 0.5,
    className = "",
    type
}: LetterAnimationProps) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay
            },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1] as any,
            },
        },
        hidden: {
            opacity: 0,
            y: 0,
            filter: type === "blur" ? "blur(10px)" : "blur(0px)",
            transition: {
                duration: 0.8,
                ease: "easeIn" as any,
            },
        },
    };

    return (
        <motion.div
            style={{ display: "inline-block" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    style={{ 
                        display: "inline-block", 
                        whiteSpace: "pre",
                        willChange: "transform, opacity, filter",
                        transform: "translateZ(0)"
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
}
