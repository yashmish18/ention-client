"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type SlideData = {
  id: string;
  name: string;
  description: string;
  bgImage: string;
};

const SLIDES: SlideData[] = [
  {
    id: "workbook",
    name: "Building India's Computing Ecosystem",
    description:
      "From devices today to OS, and indigenous components tomorrow — we're building long-term capability, not just products.",
    bgImage: "/assets/landing_page/1.png",
  },
  {
    id: "swapbook",
    name: "More Than Devices — A Long-term Computing Platform",
    description:
      "Hardware, operating systems, ecosystem programs & intelligent infrastructure designed to support the next generation of computing.",
    bgImage: "/assets/landing_page/2.png",
  },
  {
    id: "ention-os",
    name: "Two sides. One vision.",
    description:
      "We look at technology differently. One side improves what exists. The other reimagines what's possible. Together, they create one vision for the future.",
    bgImage: "/assets/landing_page/3.png",
  },
  {
    id: "experience",
    name: "",
    description: "",
    bgImage: "/assets/landing_page/4.png",
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

        .carousel-content {
          position: absolute;
          bottom: 30px;
          left: 20px;
          right: 20px;
          z-index: 10;
          pointer-events: auto;
        }

        @media (min-width: 640px) {
          .carousel-content {
            left: 40px;
            bottom: 40px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-content {
            left: 100px;
            bottom: 50px;
          }
        }

        .carousel-name {
          font-family: var(--font-sans), "Inter", sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 32px;
          line-height: 1.15;
          opacity: 0;
          animation: heroCardSlideIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          color: white;
        }

        @media (min-width: 768px) {
          .carousel-name {
            font-size: 48px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-name {
            font-size: 56px;
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
          color: rgba(255, 255, 255, 0.95);
          max-width: 600px;
        }

        @media (min-width: 768px) {
          .carousel-des {
            font-size: 16px;
            margin-top: 20px;
            margin-bottom: 32px;
          }
        }

        .carousel-btns-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          opacity: 0;
          animation: heroCardSlideIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.4s forwards;
        }

        .cta-btn-solid {
          background-color: white;
          color: black;
          padding: 12px 28px;
          font-family: var(--font-sans), "Inter", sans-serif;
          font-weight: 700;
          font-size: 14px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }

        .cta-btn-solid:hover {
          background-color: #f3f3f3;
          transform: translateY(-1px);
        }

        .cta-btn-solid:active {
          transform: translateY(0);
        }

        .cta-btn-outline {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 12px 28px;
          font-family: var(--font-sans), "Inter", sans-serif;
          font-weight: 700;
          font-size: 14px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          backdrop-filter: blur(4px);
          text-decoration: none;
        }

        .cta-btn-outline:hover {
          background-color: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.8);
          transform: translateY(-1px);
        }

        .cta-btn-outline:active {
          transform: translateY(0);
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
          top: 50%;
          left: 20px;
          right: 20px;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
          z-index: 20;
          pointer-events: none;
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
          pointer-events: auto;
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
              >
                {position === 1 && (
                  <div className="carousel-content">
                    <div key={`btns-${contentKey}`} className="carousel-btns-wrap">
                      <Link href="/products" className="cta-btn-solid">
                        Explore Laptops
                      </Link>
                      <a href="#why-choose" className="cta-btn-outline">
                        Partner with Ention
                      </a>
                    </div>
                  </div>
                )}
              </div>
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

