"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowRight, ArrowLeft, Heart, Cpu } from "lucide-react";
import { useCart } from "@/store/useCart";
import type { Product } from "@/lib/products-data";
import { motion } from "framer-motion";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";

interface SwapbookPDPProps {
  product: Product;
  images: string[];
}

export default function SwapbookPDP({ product, images }: SwapbookPDPProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addItem } = useCart();

  /* ── State ── */
  const [activeTab, setActiveTab] = useState("overview");
  const [added, setAdded] = useState(false);
  const [activeForm, setActiveForm] = useState<"ENQUIRE" | null>(null);



  /* ── Scroll Target ── */
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleBuyNow = () => {
    addItem({
      id: `${product.id}-base`,
      name: product.name,
      price: product.basePrice,
      quantity: 1,
      image: images[0] || "",
      configuration: {
        processor: product.specs?.cpu || "Base Processor",
        ram: product.specs?.ram || "Base RAM",
        storage: product.specs?.storage || "Base Storage",
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleBuyNowRedirect = () => {
    router.push(`/products/${product.slug || product.id}/buy`);
  };

  /* ═══════════════════════════════════════════
     GSAP + Lenis Initializations
     ═══════════════════════════════════════════ */
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    /* Initialize Lenis */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const root = rootRef.current;
    if (!root) return;

    /* 1. Hero Text Word Stagger Animation */
    const words = root.querySelectorAll(".h-stagger");
    if (words.length > 0) {
      gsap.set(words, { y: 45, opacity: 0 });
      gsap.to(words, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.85,
        ease: "power2.out",
        delay: 0.1,
      });
    }

    // Scroll active tab link update
    const updateActiveTab = () => {
      const sections = ["hero", "cooling-redefined"];
      let current = "overview";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section;
          }
        }
      }
      setActiveTab(current);
    };

    window.addEventListener("scroll", updateActiveTab);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      window.removeEventListener("scroll", updateActiveTab);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className="swapbook-pdp bg-[#080606] text-white select-none pb-20 md:pb-24">
      <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
          {activeForm === "ENQUIRE" && (
              <LeadSalesForm 
                  source="product_detail_buy" 
                  initialDescription={`I am interested in the ${product?.name || 'product'}. Please provide more details on bulk purchase or B2B pricing.`} 
                  initialUseCase="Enterprise"
                  onSuccess={() => setActiveForm(null)} 
              />
          )}
      </FormModal>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Inter:wght@300;400;500;600;700&display=swap');
        .swapbook-pdp { font-family: 'Inter', sans-serif; cursor: default; }
        .font-orbitron { font-family: 'Orbitron', sans-serif; font-weight: 900; }
      `}} />

      {/* 1. CINEMATIC HERO SECTION */}
      <section id="hero" className="relative min-h-[95vh] flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-4 pb-16 overflow-hidden bg-black">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/assets/all_product_page/s1-hero.png"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Persistent Header Navigation */}
        <div className="w-full z-40 bg-black/10 border-b border-white/5 relative backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-4">

            {/* Logo/Branding */}
            <div className="flex items-center gap-2.5">
              <svg className="w-8 h-8 text-[#FF1E27] filter drop-shadow-[0_0_8px_rgba(255,30,39,0.5)]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M25 15 H80 L70 45 H35 L25 15 Z" />
                <path d="M75 85 H20 L30 55 H65 L75 85 Z" />
              </svg>
              <span className="font-orbitron tracking-[0.2em] text-lg text-white uppercase">
                SWAPBOOK
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {[
                { id: "hero", label: "Overview" },
                { id: "cooling-redefined", label: "Cooling" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer font-medium ${activeTab === tab.id ? "text-[#FF1E27]" : "text-[#A09A95] hover:text-white"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => setActiveForm("ENQUIRE")}
                className="border border-white/20 text-[#FAF7F2] px-5 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 font-medium rounded-none cursor-pointer mr-3"
              >
                Enquire
              </button>
              <button
                onClick={handleBuyNowRedirect}
                className="border border-[#FF1E27]/80 hover:bg-[#FF1E27] text-white px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium rounded-none hover:shadow-[0_0_15px_rgba(255,30,39,0.4)] cursor-pointer"
              >
                Buy Now
              </button>
            </nav>
          </div>
        </div>

        {/* Vertical neon text SWAPBOOK on far right */}
        <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 select-none z-20">
          <span className="text-5xl font-orbitron uppercase tracking-[0.3em] text-[#FF1E27] opacity-20 select-none" style={{ writingMode: "vertical-rl", textShadow: "0 0 10px rgba(255, 30, 39, 0.3)" }}>
            SWAPBOOK
          </span>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl w-full mx-auto z-10 relative flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">

            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.4em] text-[#FF1E27] font-medium block filter drop-shadow-[0_0_4px_rgba(255,30,39,0.4)]">
                  GAMING SERIES
                </span>

                <h1 className="text-5xl md:text-7xl font-orbitron tracking-tighter leading-none text-white uppercase">
                  <div className="h-stagger">BUILT FOR</div>
                  <div className="text-[#FF1E27] mt-2 filter drop-shadow-[0_0_12px_rgba(255,30,39,0.5)] h-stagger">
                    DOMINANCE
                  </div>
                </h1>
              </div>

              <p className="text-xs md:text-sm text-[#A09A95] leading-relaxed font-light max-w-md">
                Engineered with cutting-edge performance, advanced cooling, and gamer-focused design. SwapBook Gaming Series is your ultimate weapon.
              </p>

              <div>
                <button
                  onClick={() => scrollTo("cooling-redefined")}
                  className="border border-[#FF1E27]/50 hover:border-[#FF1E27] bg-[#FF1E27]/5 hover:bg-[#FF1E27]/15 text-white px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 rounded-none flex items-center gap-2 group hover:shadow-[0_0_20px_rgba(255,30,39,0.3)] cursor-pointer"
                >
                  <span>Explore Now</span>
                  <span className="text-[#FF1E27] group-hover:translate-x-1 transition-transform font-bold">&gt;</span>
                </button>
              </div>

              {/* Bottom Specs Tiles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl pt-8 z-20">
                {[
                  { icon: Cpu, label: "POWERFUL PERFORMANCE" },
                  {
                    icon: () => (
                      <svg className="w-4 h-4 text-[#FF1E27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 12c2-3 5-3 5-3s0 3-3 5c-2 2-5 2-5 2s0-3 3-5Z" />
                        <path d="M12 12c-3-2-3-5-3-5s3 0 5 3c2 2 2 5 2 5s-3 0-5-3Z" />
                        <path d="M12 12c-2 3-5 3-5 3s0-3 3-5c2-2 5-2 5-2s0 3-3 5Z" />
                        <path d="M12 12c3 2 3 5 3 5s-3 0-5-3c-2-2-2-5-2-5s3 0 5 3Z" />
                      </svg>
                    ), label: "ADVANCED COOLING"
                  },
                  {
                    icon: () => (
                      <svg className="w-4 h-4 text-[#FF1E27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    ), label: "HIGH REFRESH DISPLAY"
                  },
                  {
                    icon: () => (
                      <svg className="w-4 h-4 text-[#FF1E27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <line x1="6" y1="8" x2="6" y2="8" />
                        <line x1="10" y1="8" x2="10" y2="8" />
                        <line x1="14" y1="8" x2="14" y2="8" />
                        <line x1="18" y1="8" x2="18" y2="8" />
                        <line x1="6" y1="12" x2="6" y2="12" />
                        <line x1="10" y1="12" x2="14" y2="12" />
                        <line x1="18" y1="12" x2="18" y2="12" />
                        <line x1="6" y1="16" x2="18" y2="16" />
                      </svg>
                    ), label: "GAMER KEYBOARD"
                  },
                ].map((tile, i) => {
                  const IconComp = tile.icon;
                  return (
                    <div key={i} className="bg-[#120D0D]/60 border border-[#FF1E27]/10 hover:border-[#FF1E27]/30 p-5 flex flex-col justify-between items-start gap-4 transition-all duration-300 backdrop-blur-md group hover:bg-[#1C1515]/80 rounded-none">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#FF1E27]/10 rounded-sm">
                        <IconComp />
                      </div>
                      <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#A09A95] group-hover:text-white transition-colors">
                        {tile.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (Placeholder space for Laptop Showcase - empty) */}
            <div className="lg:col-span-5 h-[350px] lg:h-[450px] relative w-full pointer-events-none select-none" />

          </div>
        </div>

        {/* Bottom Right scroll indicator */}
        <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-end gap-2 text-right z-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF1E27] font-semibold filter drop-shadow-[0_0_4px_rgba(255,30,39,0.4)]">
            SCROLL DOWN
          </span>
          <div className="w-16 h-[2px] bg-[#FF1E27]/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#FF1E27] w-6"
              animate={{ x: [-24, 64] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>

      </section>

      {/* 2. COOLING REDEFINED SECTION */}
      <section id="cooling-redefined" className="py-32 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* Left Column: Title, Subtitle, and Highlight Box */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF1E27] font-semibold block">
                  THERMAL MASTERY
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron tracking-tight leading-none uppercase text-white">
                  <div>COOLING</div>
                  <div className="text-[#FF1E27] mt-1">
                    REDEFINED
                  </div>
                </h2>
                <p className="text-sm text-[#A09A95] leading-relaxed font-light mt-6 max-w-md">
                  Advanced thermal architecture built to push performance limits without compromise.
                </p>
              </div>

              {/* Bottom Left Highlight Box (Minimal left-border design) */}
              <div className="border-l-2 border-[#FF1E27] pl-6 mt-12 max-w-md text-left">
                <h4 className="text-[11px] text-white uppercase tracking-widest font-semibold font-orbitron">
                  BUILT TO STAY COOL
                </h4>
                <p className="text-xs text-[#A09A95] font-light leading-relaxed mt-2">
                  Sustained performance for the longest gaming sessions and toughest workloads.
                </p>
              </div>
            </div>

            {/* Right Column: Clean Specs Grid */}
            <div className="lg:col-span-7 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 lg:pl-8">
                {[
                  {
                    title: "DUAL TURBO FANS",
                    desc: "High-density fan blades maximize airflow while keeping noise low.",
                    svg: (
                      <svg className="w-6 h-6 text-[#FF1E27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 12c2-3 5-3 5-3s0 3-3 5c-2 2-5 2-5 2s0-3 3-5Z" />
                        <path d="M12 12c-3-2-3-5-3-5s3 0 5 3c2 2 2 5 2 5s-3 0-5-3Z" />
                        <path d="M12 12c-2 3-5 3-5 3s0-3 3-5c2-2 5-2 5-2s0 3-3 5Z" />
                        <path d="M12 12c3 2 3 5 3 5s-3 0-5-3c-2-2-2-5-2-5s3 0 5 3Z" />
                      </svg>
                    )
                  },
                  {
                    title: "VAPOR CHAMBER",
                    desc: "Full-surface vapor chamber rapidly dissipates heat from critical zones.",
                    svg: (
                      <svg className="w-6 h-6 text-[#FF1E27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M7 9c2-1 3-1 5 0s3 1 5 0" />
                        <path d="M7 12c2-1 3-1 5 0s3 1 5 0" />
                        <path d="M7 15c2-1 3-1 5 0s3 1 5 0" />
                      </svg>
                    )
                  },
                  {
                    title: "6 HEAT PIPES",
                    desc: "Optimized heat pipe layout efficiently transfers heat away from components.",
                    svg: (
                      <svg className="w-6 h-6 text-[#FF1E27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 8v6a4 4 0 0 0 8 0V8" />
                        <path d="M10 8v6a2 2 0 0 0 4 0V8" />
                      </svg>
                    )
                  },
                  {
                    title: "4-WAY AIRFLOW",
                    desc: "Precision-engineered vents direct airflow for maximum thermal efficiency.",
                    svg: (
                      <svg className="w-6 h-6 text-[#FF1E27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8V2M12 2l-3 3M12 2l3 3" />
                        <path d="M12 16v6M12 22l-3-3M12 22l3-3" />
                        <path d="M8 12H2M2 12l3-3M2 12l3 3" />
                        <path d="M16 12h6M22 12l-3-3M22 12l3 3" />
                      </svg>
                    )
                  }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-3">
                      {spec.svg}
                      <h4 className="text-[13px] font-semibold text-white tracking-wider uppercase font-orbitron">
                        {spec.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#A09A95] leading-relaxed font-light">
                      {spec.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="py-14 text-center bg-[#0A0707] border-t border-white/5">
        <div className="max-w-xl mx-auto space-y-6 px-6">
          <h2 className="text-3xl md:text-4xl uppercase tracking-tight text-white font-orbitron">
            Ready to build your ultimate rig?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border border-white hover:border-[#FF1E27] text-white px-8 py-3.5 text-[11px] uppercase tracking-wider hover:bg-[#FF1E27] transition-all cursor-pointer rounded-none font-medium"
            >
              Browse All Products <ArrowRight size={12} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 text-xs text-[#A09288] hover:text-white transition-colors py-3.5"
            >
              <ArrowLeft size={10} /> Back to Catalog
            </Link>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] px-4 md:px-12 py-3.5 flex items-center justify-between z-50">
        <div className="hidden md:flex items-center gap-6">
          <div className="text-left">
            <div className="text-[11px] font-medium text-white flex items-center gap-1.5">
              <span className="text-[#A09A95] font-normal">Delivers to</span>
              <span className="text-blue-500 hover:underline cursor-pointer font-medium">
                Add pincode
              </span>
            </div>
            <div className="text-[10px] text-[#A09288] mt-0.5 font-light tracking-wide">
              In Stock &bull; Ships in 24&ndash;48 hrs &bull; COD available
            </div>
          </div>
          <button
            onClick={() => setActiveForm("ENQUIRE")}
            className="bg-[#C5A059] border border-[#C5A059] text-white rounded-none px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold hover:bg-[#a68444] hover:border-[#a68444] transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            Enquire Now
          </button>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          <div className="text-left md:text-right flex flex-col justify-center">
            <div className="flex items-baseline gap-1 md:justify-end">
              <span className="text-base md:text-lg font-bold text-white">
                ₹{product.basePrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[9px] text-[#A09288] font-normal">incl. tax</span>
            </div>
            <div className="text-[9px] text-[#A09A95] font-medium mt-0.5">
              EMI ₹{Math.round(product.basePrice / 12).toLocaleString("en-IN")}/mo
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button className="border border-white/10 rounded-none p-2.5 text-white hover:bg-white/5 transition-colors flex items-center justify-center cursor-pointer">
              <Heart size={14} className="text-white" />
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-white bg-black rounded-none px-4 md:px-6 py-2.5 text-[10px] uppercase tracking-wider text-white font-medium hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap"
            >
              {added ? "Added!" : "Add to Cart"}
            </button>

            <button
              onClick={handleBuyNowRedirect}
              className="bg-[#FF1E27] border border-[#FF1E27] text-white rounded-none px-4 md:px-6 py-2.5 text-[10px] uppercase tracking-wider font-medium hover:bg-[#FF1E27]/90 transition-all cursor-pointer whitespace-nowrap"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
