"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

interface BlurInTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const BlurInText: React.FC<BlurInTextProps> = ({ children, className, duration = 1.2 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

