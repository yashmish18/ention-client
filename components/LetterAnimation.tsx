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
                staggerChildren: 0.05,
                delayChildren: delay
            },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                ease: "easeOut" as any,
            },
        },
        hidden: {
            opacity: 0,
            filter: type === "blur" ? "blur(10px)" : "blur(0px)",
            transition: {
                duration: duration,
                ease: "easeIn" as any,
            },
        },
    };

    return (
        <motion.div
            style={{ display: "inline-block" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
}
