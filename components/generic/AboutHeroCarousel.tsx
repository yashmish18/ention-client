import React, { useState, useRef, useEffect } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCircle, IconCircleDot } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// Import background images
import slide1Bg from "../../public/assets/aboutus_page/1.webp";
import slide2Bg from "../../public/assets/aboutus_page/2.webp";
import slide3Bg from "../../public/assets/aboutus_page/3.webp";

import slide5Bg from "../../public/assets/aboutus_page/5.webp";
import slide6Bg from "../../public/assets/aboutus_page/6.webp";

const slideImages: StaticImageData[] = [slide1Bg, slide2Bg, slide3Bg, slide5Bg, slide6Bg].filter(Boolean);
const slides = slideImages.map((img, idx) => ({ key: idx, background: img }));

interface AboutHeroCarouselProps {
    showText?: boolean;
}

export default function AboutHeroCarousel({ showText = true }: AboutHeroCarouselProps) {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (!isPaused) {
            autoScrollTimeout.current = setTimeout(() => {
                setActive((a) => (a + 1) % slides.length);
            }, 3000);
        }
        return () => {
            if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
        };
    }, [active, isPaused]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });

    const next = () => {
        setActive((a) => (a + 1) % slides.length);
        resetAutoScroll();
    };
    const prev = () => {
        setActive((a) => (a - 1 + slides.length) % slides.length);
        resetAutoScroll();
    };
    const resetAutoScroll = () => {
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 1000); // Resume after 1s
    };

    return (
        <section className="relative w-full aspect-video md:aspect-auto md:min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={slides[active].background}
                    alt="Background"
                    fill
                    className="object-contain scale-100"
                    priority={active === 0}
                    loading={active === 0 ? 'eager' : 'lazy'}
                />
                {/* Overlay */}
                <div className="absolute inset-0"></div>
            </div>

            {/* Carousel controls bottom right */}
            <div className="absolute bottom-10 right-10 z-20 flex items-center gap-6 bg-black/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                <button
                    aria-label="Previous slide"
                    onClick={prev}
                    disabled={active === 0}
                    className="rounded-full bg-white/10 hover:bg-white/30 p-3 transition-all disabled:opacity-20"
                >
                    <IconArrowNarrowLeft size={24} className="text-white" />
                </button>
                <div className="flex gap-3">
                    {slides.map((_, idx) =>
                        active === idx ? (
                            <IconCircleDot key={idx} size={14} className="text-white" />
                        ) : (
                            <IconCircle
                                key={idx}
                                size={14}
                                className="text-white/40 hover:text-white cursor-pointer transition-all"
                                onClick={() => setActive(idx)}
                            />
                        )
                    )}
                </div>
                <button
                    aria-label="Next slide"
                    onClick={next}
                    disabled={active === slides.length - 1}
                    className="rounded-full bg-white/10 hover:bg-white/30 p-3 transition-all disabled:opacity-20"
                >
                    <IconArrowNarrowRight size={24} className="text-white" />
                </button>
            </div>
        </section>
    );
}
