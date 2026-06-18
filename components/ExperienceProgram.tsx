"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface ExperienceProgramProps {
  onProgramClick: (name: string) => void;
}

export const ExperienceProgram = ({ onProgramClick }: ExperienceProgramProps) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const slides = [
    {
      id: 1,
      num: "01",
      title: "Experience Before You Decide",
      desc: "Try Ention laptops in real world use before making a decision."
    },
    {
      id: 2,
      num: "02",
      title: "Not Just a Demo A Real Experience",
      desc: "Use the device in your actual workflow work, build, test, and evaluate performance."
    },
    {
      id: 3,
      num: "03",
      title: "Built for Confidence, Not Just Sales",
      desc: "Use the device in your actual workflow work, build, test, and evaluate performance."
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

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
        <div className="flex flex-col gap-6 w-full max-w-[620px] lg:ml-auto lg:pr-6 xl:pr-8">
          <div
            className="flex gap-4 h-[480px] md:h-[540px] overflow-hidden w-full"
            onMouseLeave={() => setHovered(null)}
          >
            {slides.map((slide, i) => {
              const isHovered = hovered === i;
              const isSomethingHovered = hovered !== null;
              const isActive = isHovered || (!isSomethingHovered && activeIndex === i);

              return (
                <motion.div
                  key={slide.id}
                  initial={false}
                  animate={{
                    width: isActive ? "68%" : "16%",
                    opacity: isActive ? 1 : 0.6,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative h-full overflow-hidden cursor-pointer rounded-2xl flex flex-col transition-colors duration-500 border ${isActive
                      ? "bg-[#fcfbf9] border-ink/15 shadow-md"
                      : "bg-[#f4f3ef] border-ink/5 hover:bg-[#eae9e5]"
                    }`}
                >
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key={`active-${slide.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col justify-between h-full w-full p-8 md:p-10 select-none text-left"
                      >
                        <div className="space-y-6">
                          {/* Top Index indicator */}
                          <div className="space-y-1">
                            <span className="text-accent text-sm md:text-base font-sans font-bold tracking-wider block">{slide.num}</span>
                            <div className="w-8 h-[1.5px] bg-accent" />
                          </div>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-black text-ink leading-tight tracking-tight">
                            {slide.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs md:text-sm font-sans font-medium text-ink/65 leading-relaxed max-w-[280px]">
                            {slide.desc}
                          </p>
                        </div>

                        {/* Bottom Circle Arrow Button */}
                        <div className="w-10 h-10 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/5 flex items-center justify-center text-accent transition-colors duration-300">
                          <ArrowRight size={16} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`inactive-${slide.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col justify-start items-center py-8 select-none"
                      >
                        {/* Top index for inactive */}
                        <div className="flex flex-col items-center gap-1.5 mb-8">
                          <span className="text-ink/30 text-xs font-sans font-bold tracking-wider">{slide.num}</span>
                          <div className="w-4 h-[1px] bg-ink/15" />
                        </div>

                        {/* Vertical Rotated Text for inactive columns */}
                        <div className="flex-1 flex items-center justify-center w-full">
                          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] font-bold text-ink/40 rotate-90 whitespace-nowrap">
                            {slide.title}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Indicators & Arrow controls */}
          <div className="flex items-center justify-between mt-4 w-full">
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-ink/10 bg-[#fcfbf9] hover:bg-ink/5 flex items-center justify-center text-ink/70 hover:text-ink transition-colors duration-300 shadow-sm cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {slides.map((_, i) => {
                const isCurrent = hovered === i || (hovered === null && activeIndex === i);
                return (
                  <div
                    key={i}
                    className={`h-[3px] rounded-full transition-all duration-500 ${isCurrent ? "w-10 bg-accent" : "w-6 bg-ink/10"}`}
                  />
                );
              })}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-ink/10 bg-[#fcfbf9] hover:bg-ink/5 flex items-center justify-center text-ink/70 hover:text-ink transition-colors duration-300 shadow-sm cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
