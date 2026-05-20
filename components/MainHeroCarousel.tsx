"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LetterAnimation } from "./LetterAnimation";
// import { HeroCarousel as InnerAccordion } from "./HeroCarousel";

type SlideData = {
    id: string;
    type: "split" | "image-only" | "manifesto" | "full";
    subtitle?: string;
    titleMain?: string;
    titleAccent?: string;
    description?: string;
    accentColor?: string;
    hasAccordion?: boolean;
    bgImage?: string;
    cta?: string;
    href?: string;
};

const SLIDES: SlideData[] = [
    {
        id: "intro",
        type: "split",
        subtitle: "Introducing",
        titleMain: "MADE IN",
        titleAccent: "India",
        description: "ENTION® COMPUTING DEVICE",
        accentColor: "text-accent",
        hasAccordion: true
    },
    {
        id: "vanguard",
        type: "image-only",
        bgImage: "/assets/landing_page/slide-1.png"
    },
    {
        id: "gaming",
        type: "image-only",
        bgImage: "/assets/landing_page/slide-2.png"
    },
    {
        id: "professional",
        type: "image-only",
        bgImage: "/assets/landing_page/slide-3.png"
    },
    {
        id: "foundry",
        type: "image-only",
        bgImage: "/assets/landing_page/slide-4.png"
    },
    {
        id: "ecosystem",
        type: "image-only",
        bgImage: "/assets/landing_page/slide-5.png"
    }
];

export function MainHeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % SLIDES.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000); // 5 seconds
        return () => clearInterval(timer);
    }, [current]);

    const slide = SLIDES[current];

    return (
        <section
            className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[850px] max-w-[1920px] mx-auto bg-ink overflow-hidden text-bg"
        >
            {/* Preload slide images */}
            {SLIDES.map((s) => s.bgImage && (
                <link key={s.id} rel="preload" href={s.bgImage} as="image" />
            ))}

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <AnimatePresence initial={true} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Image-only slides */}
                    {slide.type === "image-only" && slide.bgImage && (
                        <div className="relative w-full h-full overflow-hidden">
                            <motion.div
                                className="relative w-full h-full"
                                initial={{ scale: 1.08 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Image
                                    src={slide.bgImage}
                                    className="object-fit"
                                    fill
                                    sizes="100vw"
                                    priority
                                    alt={`Ention Slide ${current}`}
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-black/20 z-10" />
                        </div>
                    )}

                    {/* Split layout slides (Intro) */}
                    {slide.type === "split" && (
                        <div className="w-full h-full max-w-[1600px] mx-auto px-8 md:px-16 flex items-center justify-center py-10">
                            <div className="w-full text-center space-y-12">
                                <div className="space-y-6">
                                    <LetterAnimation
                                        type="blur"
                                        text={slide.subtitle || ""}
                                        className="text-accent font-mono text-[1.5vw] md:text-[1vw] font-bold tracking-[0.8em] uppercase block mb-4"
                                    />
                                    <h1 className="text-6xl md:text-9xl font-serif font-black text-bg uppercase leading-[0.85] tracking-tighter opacity-95">
                                        <LetterAnimation type="blur" text={slide.titleMain || ""} delay={0.4} />
                                        <br />
                                        <LetterAnimation
                                            type="blur"
                                            text={slide.titleAccent || ""}
                                            delay={0.8}
                                            className={`${slide.accentColor || ""} italic font-normal`}
                                        />
                                    </h1>
                                </div>

                                <div className="flex flex-col items-center gap-10">
                                    <h2 className="text-xl md:text-2xl font-mono text-bg/70 tracking-[0.6em] uppercase text-center max-w-3xl">
                                        <LetterAnimation type="blur" text={slide.description || ""} delay={1.2} duration={0.8} />
                                    </h2>

                                    {slide.cta ? (
                                        <Link href={slide.href || "#"}>
                                            <button className="bg-white text-ink px-12 py-6 font-mono text-[12px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-white transition-all flex items-center gap-4">
                                                {slide.cta} <ArrowRight size={14} />
                                            </button>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > current ? 1 : -1);
                            setCurrent(i);
                        }}
                        className={`h-[2px] transition-all duration-500 ${i === current ? "w-16 bg-accent" : "w-6 bg-white/20 hover:bg-white/40"}`}
                    />
                ))}
            </div>

            {/* Side Arrows */}
            <button onClick={prev} className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-4 border border-white/5 hover:bg-white/5 text-white/20 hover:text-accent transition-all hidden lg:block">
                <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-4 border border-white/5 hover:bg-white/5 text-white/20 hover:text-accent transition-all hidden lg:block">
                <ChevronRight size={20} />
            </button>

            {/* Aesthetic Page Counter */}
            <div className="absolute right-12 bottom-12 font-mono text-[8vw] md:text-[10vw] font-black text-white/[0.02] select-none pointer-events-none uppercase">
                0{current + 1}
            </div>
        </section>
    );
}
