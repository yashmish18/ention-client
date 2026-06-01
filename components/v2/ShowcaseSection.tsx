"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: any;

    // Delay initialization slightly to let preceding layout settle
    const initTimeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const svgText = containerRef.current?.querySelector(".sc-svg-text");

        if (!svgText) return;

        // Start states
        gsap.set(svgText, {
          strokeDasharray: 1200,
          strokeDashoffset: 1200,
          fillOpacity: 0,
        });

        // Pinned timeline — locks the page scroll until tracing and filling are complete
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",      // Pin starts when the top of the section hits the top of viewport
            end: "+=120%",         // Keeps the page static for 120% of viewport height of scrolling
            scrub: 1,              // Smooth scrub linked to scroll progress
            pin: true,             // Pins the section in place
            pinSpacing: true,      // Reserves spacing so surrounding elements do not overlap
          },
        });

        // 1. Trace the borders
        tl.to(svgText, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "none",
        });

        // 2. Fill the text
        tl.to(svgText, {
          fillOpacity: 1,
          duration: 1.0,
          ease: "none",
        });
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
      className="relative z-10 w-full min-h-screen border-t border-white/5"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Content — Centered SVG Traced text only */}
        <div className="relative z-10 w-full max-w-[900px] px-8 select-none">
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
