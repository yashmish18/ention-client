"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface BlockRevealProps {
    children: React.ReactNode;
    delay?: number;
    color?: string; // Tailwind bg color class, e.g. "bg-accent", "bg-ink", "bg-bg"
    duration?: number;
    className?: string;
    block?: boolean;
}

export function BlockReveal({
    children,
    delay = 0,
    color = "bg-accent",
    duration = 0.5,
    className = "",
    block = false
}: BlockRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current || !overlayRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%", // Trigger slightly early
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(overlayRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: duration,
                    ease: "power3.inOut",
                    delay: delay
                }
            )
            .set(contentRef.current, { opacity: 1 })
            .to(overlayRef.current, {
                scaleX: 0,
                transformOrigin: "right center",
                duration: duration,
                ease: "power3.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [delay, duration]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${block ? "block w-full" : "inline-block"} ${className}`}>
            {/* The sliding overlay curtain */}
            <div
                ref={overlayRef}
                className={`absolute inset-0 z-10 w-full h-full ${color}`}
                style={{ transform: "scaleX(0)" }}
            />
            {/* Content, initially hidden until the overlay covers it */}
            <div ref={contentRef} style={{ opacity: 0 }} className={block ? "w-full" : "inline-block"}>
                {children}
            </div>
        </div>
    );
}
