"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";


interface TypingEffectProps {
  text: string;
  className?: string;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({ text, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={className}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

