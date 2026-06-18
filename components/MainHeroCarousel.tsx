"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type SlideData = {
  id: string;
  name: string;
  description: string;
  bgImage: string;
  btnText?: string;
  btnLink?: string;
};

const SLIDES: SlideData[] = [
  {
    id: "workbook",
    name: "Workbook Series",
    description:
      "Designed for daily productivity, coding, and learning. Power meets exceptional reliability.",
    bgImage: "/assets/landing_page/1.png",
    btnText: "Explore Series",
    btnLink: "/products",
  },
  {
    id: "swapbook",
    name: "Swapbook Series",
    description:
      "CNC machined aluminum chassis, dedicated graphics, and brilliant displays built for creators and power users.",
    bgImage: "/assets/landing_page/2.png",
    btnText: "Explore Series",
    btnLink: "/products/s1",
  },
  {
    id: "ention-os",
    name: "Ention OS",
    description:
      "Experience a fast, secure, and lightweight ecosystem tailored specifically to enhance your workflow.",
    bgImage: "/assets/landing_page/3.png",
    btnText: "Learn More",
    btnLink: "/ention-os",
  },
  {
    id: "experience",
    name: "Experience Program",
    description:
      "Try the device in your actual workflow to work, build, test, and evaluate performance before deciding.",
    bgImage: "/assets/landing_page/4.png",
    btnText: "Try Ention",
    btnLink: "#experience",
  },
];

export function MainHeroCarousel() {
  // order[0] = background (behind), order[1] = active (shows content),
  // order[2..] = thumbnail cards on the right
  const [order, setOrder] = useState<number[]>(() =>
    SLIDES.map((_, i) => i)
  );
  const [contentKey, setContentKey] = useState(0);

  const handleNext = useCallback(() => {
    setOrder((prev) => [...prev.slice(1), prev[0]]);
    setContentKey((k) => k + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setContentKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, [order, handleNext]);

  return (
    <>
      <style>{`
        @keyframes heroCardSlideIn {
          from {
            opacity: 0;
            transform: translate(0, 100px);
            filter: blur(33px);
          }
          to {
            opacity: 1;
            transform: translate(0);
            filter: blur(0);
          }
        }

        /* Container rules */
        .carousel-container {
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: 250px;
          position: relative;
          background-color: #141414;
          overflow: hidden;
        }

        /* Base item styling */
        .carousel-item {
          position: absolute;
          border-radius: 6px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          background-position: 50% 50%;
          background-size: cover;
          transition: 
            left 0.75s cubic-bezier(0.25, 1, 0.5, 1),
            top 0.75s cubic-bezier(0.25, 1, 0.5, 1),
            width 0.75s cubic-bezier(0.25, 1, 0.5, 1),
            height 0.75s cubic-bezier(0.25, 1, 0.5, 1),
            border-radius 0.75s cubic-bezier(0.25, 1, 0.5, 1),
            opacity 0.75s ease,
            box-shadow 0.75s ease;
          
          /* Mobile sizes */
          width: 64px;
          height: 96px;
          left: 100%;
          top: calc(100% - 112px);
        }

        @media (min-width: 768px) {
          .carousel-item {
            width: 80px;
            height: 120px;
            top: calc(100% - 144px);
            border-radius: 8px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-item {
            width: 96px;
            height: 144px;
            top: calc(100% - 174px);
            border-radius: 10px;
          }
        }

        /* Full bleed active and background slides */
        .carousel-item-0,
        .carousel-item-1 {
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }

        /* Thumbnail position 2 (first visible thumbnail - left-most) */
        .carousel-item-2 {
          left: calc(100% - 224px);
        }
        @media (min-width: 768px) {
          .carousel-item-2 {
            left: calc(100% - 288px);
          }
        }
        @media (min-width: 1024px) {
          .carousel-item-2 {
            left: calc(100% - 348px);
          }
        }

        /* Thumbnail position 3 (second visible thumbnail - middle) */
        .carousel-item-3 {
          left: calc(100% - 152px);
        }
        @media (min-width: 768px) {
          .carousel-item-3 {
            left: calc(100% - 196px);
          }
        }
        @media (min-width: 1024px) {
          .carousel-item-3 {
            left: calc(100% - 237px);
          }
        }

        /* Thumbnail position 4 (third visible thumbnail - right-most) */
        .carousel-item-4 {
          left: calc(100% - 80px);
        }
        @media (min-width: 768px) {
          .carousel-item-4 {
            left: calc(100% - 104px);
          }
        }
        @media (min-width: 1024px) {
          .carousel-item-4 {
            left: calc(100% - 126px);
          }
        }

        /* Hidden slides (move out to the right offscreen) */
        .carousel-item-hidden {
          left: 100%;
          opacity: 0;
          pointer-events: none;
        }

        /* Content overlay styling */
        .carousel-content {
          position: absolute;
          top: 50%;
          left: 20px;
          right: 20px;
          max-width: 90%;
          text-align: left;
          color: #eee;
          transform: translateY(-50%);
          z-index: 10;
          pointer-events: auto;
        }

        @media (min-width: 640px) {
          .carousel-content {
            left: 40px;
            max-width: 450px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-content {
            left: 100px;
            max-width: 500px;
          }
        }

        .carousel-name {
          font-family: var(--font-serif), "Libre Baskerville", serif;
          font-style: italic;
          font-weight: 900;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          font-size: 36px;
          line-height: 1.1;
          opacity: 0;
          animation: heroCardSlideIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        @media (min-width: 768px) {
          .carousel-name {
            font-size: 64px;
          }
        }

        @media (min-width: 1280px) {
          .carousel-name {
            font-size: 72px;
          }
        }

        .carousel-des {
          font-family: var(--font-sans), "Inter", sans-serif;
          margin-top: 16px;
          margin-bottom: 24px;
          font-size: 14px;
          line-height: 1.6;
          opacity: 0;
          animation: heroCardSlideIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
        }

        @media (min-width: 768px) {
          .carousel-des {
            font-size: 16px;
            margin-top: 20px;
            margin-bottom: 32px;
          }
        }

        .carousel-btn {
          font-family: var(--font-sans), "Inter", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 10px;
          opacity: 0;
          animation: heroCardSlideIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.4s forwards;
        }

        /* Background overlay gradient */
        .carousel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(20, 20, 20, 0.8) 0%,
            rgba(20, 20, 20, 0.45) 50%,
            rgba(20, 20, 20, 0.1) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        @media (max-width: 767px) {
          .carousel-overlay {
            background: linear-gradient(
              to bottom,
              rgba(20, 20, 20, 0.85) 0%,
              rgba(20, 20, 20, 0.6) 60%,
              rgba(20, 20, 20, 0.3) 100%
            );
          }
        }

        /* Buttons container */
        .carousel-buttons {
          position: absolute;
          bottom: 30px;
          left: 20px;
          display: flex;
          gap: 16px;
          z-index: 20;
        }

        @media (min-width: 640px) {
          .carousel-buttons {
            left: 40px;
            bottom: 40px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-buttons {
            left: 100px;
            bottom: 50px;
          }
        }

        /* Nav button glassmorphism styles */
        .carousel-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          font-size: 16px;
          user-select: none;
        }

        .carousel-nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.08);
        }

        .carousel-nav-btn:active {
          transform: scale(0.94);
        }
      `}</style>

      <div className="carousel-container">
        {/* Slide container */}
        <div className="relative w-full h-full">
          {[0, 1, 2, 3, 4].map((position) => {
            const slideIndex = position === 4 ? order[0] : order[position];
            const slide = SLIDES[slideIndex];

            let itemClass = "carousel-item";
            if (position === 0) itemClass += " carousel-item-0";
            else if (position === 1) itemClass += " carousel-item-1";
            else if (position === 2) itemClass += " carousel-item-2";
            else if (position === 3) itemClass += " carousel-item-3";
            else if (position === 4) itemClass += " carousel-item-4";
            else itemClass += " carousel-item-hidden";

            return (
              <div
                key={`${slide.id}-${position}`}
                className={itemClass}
                style={{
                  backgroundImage: `url('${slide.bgImage}')`,
                }}
              />
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="carousel-buttons">
          <button onClick={handlePrev} className="carousel-nav-btn" aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} className="carousel-nav-btn" aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

