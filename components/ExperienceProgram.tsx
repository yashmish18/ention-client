"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface ExperienceProgramProps {
  onProgramClick: (name: string) => void;
}

export const ExperienceProgram = ({ onProgramClick }: ExperienceProgramProps) => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "MODEL 03",
      edition: "SILVER EDITION",
      image: "/assets/images/s1/S1 gaming laptop transparent background png/1.png"
    },
    {
      id: 2,
      name: "MODEL 02",
      edition: "CARBON NOIR",
      image: "/assets/images/e4/E4 laptop photo transparent background png/1.png"
    },
    {
      id: 3,
      name: "MODEL 01",
      edition: "GRAPHITE GREY",
      image: "/assets/images/e1/E1 laptop photo transparent background png/1.png"
    }
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-32 py-20 lg:py-32 bg-bg text-ink relative border-t border-ink/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center z-10 relative">

        {/* Left Column: Try Before You Buy Experience Program */}
        <div className="flex flex-col justify-between space-y-10 py-4 h-full lg:pl-6 xl:pl-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="font-serif font-bold italic text-accent text-lg md:text-xl block mb-2">
                Ention Experience Program
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-ink tracking-tight leading-none">
                Try Before <br className="hidden md:block" /> You Buy
              </h2>
            </div>

            {/* Corporate/No-Obligation Bullet Points */}
            <div className="space-y-3 font-sans text-sm text-ink/75">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>Experience program for corporate</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>No obligation before purchase</span>
              </div>
            </div>

            {/* 4 Numbered Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {[
                { step: "01", title: "Apply for the program" },
                { step: "02", title: "Get a device for evaluation" },
                { step: "03", title: "Use it in real scenarios" },
                { step: "04", title: "Decide with confidence" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 border-l-2 border-accent/25 pl-4 hover:border-accent transition-colors duration-300">
                  <span className="font-sans text-[10px] text-accent font-bold tracking-wider">{item.step}</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-ink leading-snug">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-ink/10 flex flex-col sm:flex-row gap-6 items-center">
            <p className="text-ink/75 text-sm font-sans max-w-xs text-center sm:text-left leading-relaxed">
              Let your team test the performance first-hand before making the switch.
            </p>
            
            {/* Progressive Animated CTA Button */}
            <button
              onClick={() => onProgramClick("Experience Program")}
              className="relative overflow-hidden z-10 bg-accent text-white border border-accent hover:text-white px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center transition-colors duration-500 cursor-pointer shadow-md group/btn w-max shrink-0"
            >
              <span className="absolute inset-0 bg-ink -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10 mr-4">Apply for Experience Program</span>
              <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Accordion Carousel */}
        <div className="flex flex-col gap-6 w-full max-w-[500px] lg:ml-auto lg:pr-6 xl:pr-8">
          <div
            className="flex gap-3 h-[320px] md:h-[360px] overflow-hidden w-full"
            onMouseLeave={() => setHovered(null)}
          >
            {products.map((product, i) => {
              const isHovered = hovered === i;
              const isSomethingHovered = hovered !== null;
              const isActive = isHovered || (!isSomethingHovered && i === 0);

              return (
                <motion.div
                  key={product.id}
                  initial={false}
                  animate={{
                    width: isActive ? "64%" : "14%",
                    opacity: isActive ? 1 : 0.5,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative h-full overflow-hidden cursor-pointer rounded-lg flex flex-col justify-between p-4 md:p-5 transition-colors duration-300 border ${isActive
                      ? "bg-white border-ink/20 shadow-lg"
                      : "bg-ink/5 border-ink/5 hover:bg-ink/10"
                    }`}
                >
                  {/* Laptop Image Area - Only visible when active to prevent squishing (hyphen bug) */}
                  <div className="flex-1 w-full relative flex items-center justify-center p-2 min-h-[160px]">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4 }}
                          className="relative w-full h-[130px] md:h-[150px]"
                        >
                          <Image
                            src={product.image}
                            alt={product.edition}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Text Label for Card at the bottom */}
                  <div className="w-full relative min-h-[50px] flex items-end">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key={`label-active-${product.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col"
                        >
                          <span className="font-sans text-[9px] tracking-[0.35em] uppercase font-black block text-accent">
                            {product.name}
                          </span>
                          <h3 className="text-lg font-serif text-ink italic font-black uppercase tracking-tight mt-1 leading-none">
                            {product.edition}
                          </h3>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`label-inactive-${product.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          {/* Vertical Rotated Text for inactive columns */}
                          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-ink/30 rotate-90 whitespace-nowrap">
                            {product.edition}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Indicators & Interactive Showcase Label */}
          <div className="flex items-center justify-between px-1">
            <div className="flex gap-3">
              {products.map((_, i) => (
                <div
                  key={i}
                  className={`h-[2px] transition-all duration-700 ${(hovered === i || (hovered === null && i === 0)) ? "w-16 bg-accent" : "w-6 bg-ink/10"}`}
                />
              ))}
            </div>
            <div className="text-accent hover:text-ink font-sans text-[9px] tracking-[0.3em] uppercase flex items-center gap-2 select-none transition-colors duration-300">
              <span className="tracking-widest">INTERACTIVE SHOWCASE</span>
              <span className="text-xs font-bold font-sans">&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
