"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
    {
        id: "W-E4",
        name: "WORKBOOK E4",
        tagline: "The Elite Performance Unit.",
        image: "/assets/0N1A1389.png",
        accent: "#F27D26"
    }
];

export default function ProjectHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen bg-[#141414] overflow-hidden flex items-center justify-center">
            {/* Background Text */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <h1 className="text-[30vw] font-serif font-black italic text-white/5 whitespace-nowrap tracking-tighter">
                    VENTION
                </h1>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    <div className="space-y-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-[#F27D26] uppercase tracking-[0.8em] font-black text-[10px]"
                        >
                            Project Disclosure // 2026
                        </motion.span>
                        <h2 className="text-7xl md:text-9xl font-serif font-bold italic text-white tracking-tighter leading-[0.8]">
                            The <br />
                            <span className="text-[#F27D26]">Catalog.</span>
                        </h2>
                    </div>
                    <p className="text-xl font-serif italic text-white/40 max-w-md leading-relaxed">
                        A definitive collection of high-performance computing units, engineered for the absolute pursuit of digital sovereignty.
                    </p>
                    <div className="flex gap-8 items-center pt-8">
                        <div className="h-[1px] w-24 bg-white/20" />
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.4em]">Scroll to Explore</span>
                    </div>
                </motion.div>

                <motion.div
                    style={{ scale }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-square w-full"
                >
                    <div className="absolute inset-0 bg-[#F27D26]/10 rounded-full blur-[40px]" />
                    <Image
                        src="/assets/0N1A1389.png"
                        alt="Ention Laptop"
                        fill
                        className="object-contain filter drop-shadow-[0_50px_100px_rgba(242,125,38,0.2)]"
                        priority
                    />
                </motion.div>
            </div>

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#141414]" />

            {/* Grid Detail */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
        </section>
    );
}
