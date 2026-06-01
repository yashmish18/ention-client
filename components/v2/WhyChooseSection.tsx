"use client";

import React, { useEffect, useRef } from "react";
import { Sliders, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    title: "Customization & Affordability",
    desc: "Get personalized hardware configurations without the enterprise price tag.",
    icon: Sliders,
    points: [
      "Affordable customizable configurations built-to-order",
      "Tailored to your specific compute & memory needs",
      "No compromise on thermals or hardware performance",
    ],
  },
  {
    title: "Integrated Ecosystem",
    desc: "Full stack hardware, software, and community partnerships working in synergy.",
    icon: Layers,
    points: [
      "Unified hardware, localized deployment, and program support",
      "Ecosystem resources updated continuously with direct engineering loops",
      "Designed to scale fluidly as your lab or enterprise expands",
    ],
  },
  {
    title: "Trust & Reliability",
    desc: "Rigorous thermal testing, localized maintenance support, and robust quality guarantees.",
    icon: ShieldCheck,
    points: [
      "Obsessively engineered for sustained consistent performance",
      "Premium support channels and direct developer access",
      "18-Month Warranty & Made in India quality guarantee",
    ],
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Heading: words clip up from overflow-hidden wrappers
      const words = sectionRef.current!.querySelectorAll(".wc-word");
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0,
        stagger: 0.07,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // ── Subtext fades up
      const sub = sectionRef.current!.querySelector(".wc-sub");
      if (sub) {
        gsap.set(sub, { opacity: 0, y: 20 });
        gsap.to(sub, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
      }

      // ── Cards: clip-path reveal from bottom, staggered
      const cards = sectionRef.current!.querySelectorAll(".wc-card");
      gsap.set(cards, { clipPath: "inset(100% 0 0 0)" });
      gsap.to(cards, {
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // ── Card contents fade+rise after card appears
      CARDS.forEach((_, i) => {
        const card = sectionRef.current!.querySelectorAll(".wc-card")[i];
        if (!card) return;
        const inner = card.querySelector(".wc-inner");
        if (inner) {
          gsap.set(inner, { opacity: 0, y: 24 });
          gsap.to(inner, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.12 * i + 0.35,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="px-8 py-24 lg:py-36 bg-ink text-bg border-t border-white/5 relative overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-[1200px] mx-auto space-y-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-tight text-bg">
            {["Why", "Choose", "Ention?"].map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
              >
                <span className="wc-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
          <p className="wc-sub text-lg opacity-60 font-sans leading-relaxed max-w-2xl mx-auto mt-6">
            We build with obsession, source with integrity, and support without compromise.
          </p>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="wc-card group bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors duration-500 overflow-hidden"
              >
                <div className="wc-inner p-8 lg:p-10 flex flex-col gap-6 h-full">
                  {/* Icon */}
                  <div className="text-accent">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>

                  {/* Title + desc */}
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif font-bold italic tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs text-white/40 font-sans leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-10 bg-white/10 group-hover:w-full group-hover:bg-white/5 transition-all duration-700" />

                  {/* Points */}
                  <ul className="space-y-3">
                    {card.points.map((pt, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-xs text-white/55 font-sans leading-relaxed"
                      >
                        <CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Index */}
                  <span className="font-mono text-[9px] tracking-[0.35em] text-white/15 uppercase mt-auto pt-4 select-none block">
                    0{i + 1} / 03
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
