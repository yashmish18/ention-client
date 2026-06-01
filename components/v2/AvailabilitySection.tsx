"use client";

import React, { useEffect, useRef } from "react";
import { Globe, ShoppingCart, GraduationCap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    title: "Website",
    desc: "Browse our full catalog and configure your custom machine online.",
    icon: Globe,
  },
  {
    title: "E-commerce",
    desc: "Available through select premium retail partners across the globe.",
    icon: ShoppingCart,
  },
  {
    title: "Campus",
    desc: "Special education pricing and workshops for students and faculty.",
    icon: GraduationCap,
  },
];

export default function AvailabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Heading clip reveal
      const heading = sectionRef.current!.querySelector(".av-heading") as HTMLElement;
      const rule = sectionRef.current!.querySelector(".av-rule") as HTMLElement;
      const floods = sectionRef.current!.querySelectorAll(".av-flood");
      const inners = sectionRef.current!.querySelectorAll(".av-inner");

      if (!heading || !rule || !floods || !inners) return;

      gsap.set(heading, { yPercent: 105 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(floods, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(inners, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(heading, {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
      });

      tl.to(rule, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.inOut",
      }, "-=0.7");

      // Card Background Flood Fill (rising liquid effect)
      tl.to(floods, {
        scaleY: 1,
        stagger: 0.15,
        duration: 1.0,
        ease: "power2.out",
      }, "-=0.4");

      // Content fades up
      tl.to(inners, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      }, "-=0.7");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="order"
      className="px-8 py-24 lg:py-36 bg-ink text-bg border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Centered Heading */}
        <div className="pb-6 text-center">
          <div className="overflow-hidden">
            <h2 className="av-heading text-4xl md:text-5xl lg:text-7xl font-serif font-black italic tracking-tighter text-bg select-none">
              Availability
            </h2>
          </div>
          <div className="av-rule mt-4 h-[1px] w-32 bg-white/10 mx-auto" />
        </div>

        {/* 3 cards with Flood Fill animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="av-card group relative bg-white/[0.02] border border-white/5 hover:border-accent/40 transition-all duration-500 overflow-hidden"
              >
                {/* Flood Fill Layer */}
                <div className="av-flood absolute inset-0 bg-accent/15 -z-10" />

                <div className="av-inner p-10 lg:p-12 flex flex-col items-start gap-6 min-h-[260px] relative z-10">
                  {/* Icon */}
                  <div className="text-accent">
                    <Icon size={28} strokeWidth={1.2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-white tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[11px] font-sans font-medium tracking-[0.12em] text-white/40 leading-loose">
                    {card.desc.toUpperCase()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
