"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurFadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function BlurFadeIn({
    children,
    delay = 0,
    duration = 1.2,
    className = ""
}: BlurFadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
                delay,
                duration,
                ease: [0.22, 1, 0.36, 1] // Custom refined cubic-bezier
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
