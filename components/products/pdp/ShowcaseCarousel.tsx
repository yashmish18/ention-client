"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ShowcaseCarouselProps {
  images: string[];
  productName: string;
}

export default function ShowcaseCarousel({ images, productName }: ShowcaseCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image window */}
      <div className="relative aspect-[4/3] w-full bg-[#EDE8DF] border border-[#C8BFB0]/40 overflow-hidden flex items-center justify-center p-6">
        <Image
          src={images[activeIdx] || "/products/laptop-placeholder.png"}
          alt={`${productName} - View ${activeIdx + 1}`}
          fill
          className="object-contain p-4 transition-all duration-300"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative w-16 h-12 bg-[#EDE8DF] border p-1 transition-all cursor-pointer ${
                activeIdx === i
                  ? "border-[#B5843A] ring-1 ring-[#B5843A]"
                  : "border-[#C8BFB0]/40 hover:border-[#A09288]"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-contain"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
