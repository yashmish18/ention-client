"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: any;

    const initTimeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const svgText = containerRef.current?.querySelector(".sc-svg-text");
        const bgImage = bgImageRef.current;

        if (!svgText || !bgImage) return;

        // Start states
        gsap.set(svgText, {
          strokeDasharray: 1200,
          strokeDashoffset: 1200,
          fillOpacity: 0,
        });

        gsap.set(bgImage, {
          opacity: 0,
          scale: 1.15,
        });

        // Pinned timeline — locks the page scroll until tracing and filling are complete
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",      // Pin starts when the top of the section hits the top of viewport
            end: "+=130%",         // Keeps the page static for 130% of viewport height of scrolling
            scrub: 1.2,            // Smooth scrub linked to scroll progress
            pin: true,             // Pins the section in place
            pinSpacing: true,      // Reserves spacing so surrounding elements do not overlap
          },
        });

        // 1. Trace the borders and start revealing background image
        tl.to(svgText, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "none",
        });

        // 2. Fill the text and fully fade in the background image
        tl.to(svgText, {
          fillOpacity: 1,
          duration: 1.0,
          ease: "none",
        });

        // Animate background image zoom out and opacity fade-in parallel to filling
        tl.to(bgImage, {
          opacity: 0.25, // Subtle, cinematic opacity to ensure text readability
          scale: 1.0,
          duration: 2.0,
          ease: "power2.out",
        }, "-=2.0"); // Overlaps with text fill timeline
      }, containerRef);

      // Force recalculation of page coordinates to handle dynamic layouts
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full min-h-screen border-t border-white/5 overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Dynamic Background Image Panel */}
      <div 
        ref={bgImageRef} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <Image
          src="/assets/all_product_page/hero-e4.png"
          alt="Ention Premium Workstation"
          fill
          className="object-cover grayscale"
          unoptimized
        />
        {/* Dark radial glow overlay to focus center and maintain text contrast */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-black pointer-events-none" />
      </div>

      <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden relative z-10">
        {/* Content — Centered SVG Traced text */}
        <div className="relative w-full max-w-[900px] px-8 select-none">
          <svg
            viewBox="0 0 800 150"
            className="w-full h-auto"
            style={{ display: "block" }}
          >
            <text
              x="50%"
              y="70%"
              textAnchor="middle"
              className="sc-svg-text font-serif italic font-black uppercase"
              style={{
                fontSize: "8.5rem",
                letterSpacing: "0.06em",
                strokeWidth: "2.5px",
                stroke: "#ffffff",
                fill: "#ffffff",
              }}
            >
              ENTION
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
