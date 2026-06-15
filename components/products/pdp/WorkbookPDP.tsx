"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowRight, ArrowLeft, Play, Pause, Volume2, VolumeX, Heart, Cpu } from "lucide-react";
import { useCart } from "@/store/useCart";
import type { Product } from "@/lib/products-data";
import { motion, useScroll, useTransform, LayoutGroup, useMotionValueEvent } from "framer-motion";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import ProgramApplicationForm from "@/components/forms/ProgramApplicationForm";

interface WorkbookPDPProps {
  product: Product;
  images: string[];
}

export default function WorkbookPDP({ product, images }: WorkbookPDPProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Active Performance Tab State
  const [activePerfTab, setActivePerfTab] = useState("multitasking");
  const [activeForm, setActiveForm] = useState<"ENQUIRE" | "EXPERIENCE" | null>(null);

  const PERF_TABS_DATA: Record<string, {
    label: string;
    title: string;
    multiplier: number;
    compMultiplier: number;
    competitorName: string;
    footnote: string;
  }> = {
    multitasking: {
      label: "Multitasking",
      title: "Faster in heavy workloads",
      multiplier: 1.13,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on Geekbench 6.5 Multi-Core benchmark"
    },
    productivity: {
      label: "Productivity",
      title: "Saves hours in daily office operations",
      multiplier: 1.25,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on PCMark 10 Application tests"
    },
    coding: {
      label: "Coding",
      title: "Compiles large codebases in seconds",
      multiplier: 1.30,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on Clang/LLVM build time benchmarks"
    },
    gaming: {
      label: "Gaming",
      title: "Higher frame rates in modern titles",
      multiplier: 1.18,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on 3DMark Time Spy GPU benchmark"
    },
    "3d rendering": {
      label: "3D rendering",
      title: "Renders complex scenes effortlessly",
      multiplier: 1.22,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on Blender 4.0 Cycles render time benchmarks"
    },
    "ai speed & quality": {
      label: "AI Speed & Quality",
      title: "Local NPU model inference latency",
      multiplier: 1.45,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on LLaMA-3 8B token generation speeds"
    },
    "more cores": {
      label: "More Cores",
      title: "Sustained multi-core throughput",
      multiplier: 1.15,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on Cinebench 2024 Multi-Core benchmarks"
    },
    "hyper speed": {
      label: "Hyper Speed",
      title: "Ultra-fast read/write data pipelines",
      multiplier: 1.20,
      compMultiplier: 1.0,
      competitorName: "Apple MacBook Pro (Apple M5)",
      footnote: "* Based on CrystalDiskMark sequential read benchmarks"
    }
  };



  // Reveal Video Refs and State
  const revealVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingReveal, setIsPlayingReveal] = useState(false);
  const [isMutedReveal, setIsMutedReveal] = useState(true);

  const togglePlayReveal = () => {
    const v = revealVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlayingReveal(true);
    } else {
      v.pause();
      setIsPlayingReveal(false);
    }
  };

  const toggleMuteReveal = () => {
    const v = revealVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMutedReveal(v.muted);
  };

  const { addItem } = useCart();

  /* ── State ── */
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Hero Carousel/Gallery state
  const [heroIdx, setHeroIdx] = useState(0);



  // Stats / Benchmark Trigger State (filled via GSAP)
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);

  // Battery segment highlights state (filled via GSAP scroll triggers)
  const [timelineProgress, setTimelineProgress] = useState(0);



  const [added, setAdded] = useState(false);
  const [benchmarkTab, setBenchmarkTab] = useState(0);

  /* ── Image Access ── */
  const img = (i: number) => images[i] || images[0] || "/assets/images/classroom-laptop.png";

  const carouselSlides = [
    {
      tag: "DESIGN  |  CRAFTED TO INSPIRE",
      title1: "Every angle,",
      titleHighlight: "intentionally",
      title2: "crafted.",
      description: "Precision-machined details, premium materials, and a silhouette that speaks sophistication. This is design you can feel.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
      category: "DESIGN",
      subtitle: "Crafted to Inspire"
    },
    {
      tag: "PERFORMANCE  |  UNLEASHED POWER",
      title1: "Peak speed,",
      titleHighlight: "effortlessly",
      title2: "sustained.",
      description: "Intel 13th Gen Core processing on dual cooling lines, designed to handle compiling and heavy workloads without sweat.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80",
      category: "PERFORMANCE",
      subtitle: "Power with Purpose"
    },
    {
      tag: "THERMAL  |  QUIET COOLING",
      title1: "Whisper quiet,",
      titleHighlight: "intelligently",
      title2: "cooled.",
      description: "Advanced thermal architecture keeps components running at low temperatures, ensuring silent operation under full load.",
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=200&q=80",
      category: "THERMAL",
      subtitle: "Cooler. Quieter. Smarter."
    },
    {
      tag: "DISPLAY  |  VISUAL PURITY",
      title1: "Pure detail,",
      titleHighlight: "uncompromised",
      title2: "clarity.",
      description: "High-resolution screen assembly with ultra-thin bezels and rich contrast ratios, engineered to minimize visual distractions.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&q=80",
      category: "DISPLAY",
      subtitle: "See the Unseen"
    },
    {
      tag: "EXPERIENCE  |  HUMAN CENTRIC",
      title1: "Fluid flow,",
      titleHighlight: "intuitively",
      title2: "guided.",
      description: "A comfort typing incline combined with intelligent gesture controls that respond dynamically to your workspace needs.",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80",
      category: "EXPERIENCE",
      subtitle: "Intuitive by Design"
    },
    {
      tag: "BUILT TO LAST  |  ENDURING STRENGTH",
      title1: "Aerospace rigidity,",
      titleHighlight: "built to",
      title2: "endure.",
      description: "Built with a premium aluminum-hybrid composite chassis designed to withstand everyday wear and scratch resistance.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=200&q=80",
      category: "BUILT TO LAST",
      subtitle: "Enduring Excellence"
    }
  ];

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

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setHeaderScrolled(scroll > 60);
    });

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

    /* 2. Feature cards scroll triggers */
    root.querySelectorAll(".f-frame-in").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    /* 4. Battery Timeline scroll trigger */
    ScrollTrigger.create({
      trigger: "#battery-timeline",
      start: "top top",
      end: "+=120%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setTimelineProgress(self.progress);
      },
    });

    /* 5. Stats Comparative Benchmarks animations */
    const statsObj = { val: 0 };
    ScrollTrigger.create({
      trigger: "#comparison-trigger",
      start: "top 75%",
      onEnter: () => {
        gsap.to(statsObj, {
          val: 1,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => setBenchmarkProgress(statsObj.val),
        });
      },
      onLeaveBack: () => {
        gsap.set(statsObj, { val: 0 });
        setBenchmarkProgress(0);
      },
    });



    // Scroll active tab link update
    const updateActiveTab = () => {
      const sections = ["hero", "features", "carousel-section", "performance", "battery-timeline", "battery-tech", "comparison-trigger", "buy-now"];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate battery timeline 3-bar values
  const timeFill1 = Math.min(100, Math.max(0, (timelineProgress / 0.33) * 100));
  const timeFill2 = Math.min(100, Math.max(0, ((timelineProgress - 0.33) / 0.33) * 100));
  const timeFill3 = Math.min(100, Math.max(0, ((timelineProgress - 0.66) / 0.34) * 100));
  const timeActiveBarIdx = timelineProgress <= 0.33 ? 0 : timelineProgress <= 0.66 ? 1 : 2;

  // Framer Motion Scroll-Driven Morphing
  const buyNowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: buyNowProgress } = useScroll({
    target: buyNowRef,
    offset: ["start end", "end end"]
  });

  const blobPath = "M 500,500 C 650,300 850,450 850,600 C 850,750 650,850 500,800 C 350,850 150,750 150,600 C 150,450 350,300 500,500 Z";
  const rectPath = "M 0,0 C 500,0 500,0 1000,0 C 1000,500 1000,500 1000,1000 C 500,1000 500,1000 0,1000 C 0,500 0,500 0,0 Z";
  const pathD = useTransform(buyNowProgress, [0.15, 0.8], [blobPath, rectPath]);
  const buyNowOpacity = useTransform(buyNowProgress, [0, 0.15, 0.45, 1], [0, 0, 1, 1], { clamp: true });



  return (
    <div ref={rootRef} className="workbook-pdp bg-[#FAF7F2] text-[#1A1714] select-none font-sans pb-20 md:pb-24">
      <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
          {activeForm === "ENQUIRE" && (
              <LeadSalesForm 
                  source="product_detail_buy" 
                  initialDescription={`I am interested in the ${product?.name || 'product'}. Please provide more details on bulk purchase or B2B pricing.`} 
                  initialUseCase="Enterprise"
                  onSuccess={() => setActiveForm(null)} 
              />
          )}
          {activeForm === "EXPERIENCE" && (
              <ProgramApplicationForm 
                  source="product_detail_experience" 
                  programName="Experience Program"
                  onSuccess={() => setActiveForm(null)} 
              />
          )}
      </FormModal>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        .workbook-pdp { font-family: 'Outfit', sans-serif; cursor: default; }
        .workbook-pdp .f-serif { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* 2. SPLIT CINEMATIC HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-4 pb-20 overflow-hidden bg-[#FAF7F2]">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/assets/all_product_page/hero-e4.png"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* 1. PERSISTENT HEADER NAVIGATION */}
        <div className="w-full z-40 bg-[#FAF7F2]/5 border-b border-transparent relative backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
            <div className="flex items-baseline gap-4">
              <span className="f-serif italic text-xl font-bold text-[#FAF7F2]">
                {product.name}
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {[
                { id: "hero", label: "Overview" },
                { id: "features", label: "Features" },
                { id: "carousel-section", label: "Gallery" },
                { id: "performance", label: "Performance" },
                { id: "battery-timeline", label: "Battery" },
                { id: "comparison-trigger", label: "Compare" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className={`text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${activeTab === tab.id ? "text-[#C5A059] font-semibold" : "text-[#D4CDC5]/80 hover:text-[#FAF7F2]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => setActiveForm("ENQUIRE")}
                className="border border-[#FAF7F2] text-[#FAF7F2] px-5 py-1.5 text-[11px] uppercase tracking-wider hover:bg-[#FAF7F2] hover:text-[#1A1714] transition-all duration-300 cursor-pointer"
              >
                Enquire
              </button>
              <button
                onClick={() => scrollTo("buy-now")}
                className="border border-[#FAF7F2] text-[#FAF7F2] px-5 py-1.5 text-[11px] uppercase tracking-wider hover:bg-[#FAF7F2] hover:text-[#1A1714] transition-all duration-300 cursor-pointer"
              >
                Buy Now
              </button>
            </nav>
          </div>
        </div>

        {/* Vertical "Scroll to explore" indicator */}
        <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 select-none z-20">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#A09288] font-medium" style={{ writingMode: "vertical-rl" }}>
            Scroll to explore
          </span>
          <div className="w-[1px] h-24 bg-[#C8BFB0]/40 relative">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A059]"
              animate={{ y: [0, 88, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Bottom Left pagination */}
        <div className="hidden lg:flex absolute bottom-10 left-12 items-center gap-4 text-[11px] text-[#A09288] select-none z-20">
          <span className="font-semibold text-[#FAF7F2]">01</span>
          <div className="w-16 h-[1px] bg-[#C8BFB0]/60" />
          <span>04</span>
        </div>

        {/* Bottom Center arrow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 select-none animate-bounce">
          <svg className="w-4 h-4 text-[#A09288]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl w-full mx-auto z-10 relative flex-1 flex items-center">
          {/* Left Text Column */}
          <div className="max-w-xl flex flex-col justify-center space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.35em] text-[#A89F95] uppercase font-semibold block">
                NEW {product.name.toUpperCase()}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-[#FAF7F2]">
                <div>{product.tagline.includes(",") ? product.tagline.split(",")[0].trim() : product.tagline}</div>
                {product.tagline.includes(",") && (
                  <div className="text-[#C5A059] font-normal mt-1 f-serif italic">
                    {product.tagline.split(",")[1].trim()}
                  </div>
                )}
              </h1>
            </div>

            <p className="text-sm text-[#D4CDC5] leading-relaxed font-light max-w-md">
              {product.description}
            </p>

            <div className="flex items-center gap-8 pt-4">
              <button
                onClick={() => scrollTo("buy-now")}
                className="bg-[#C5A059] hover:bg-[#1A1714] text-[#FAF7F2] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 rounded-sm cursor-pointer shadow-sm active:scale-95"
              >
                Acquire
              </button>

              <button
                onClick={() => scrollTo("features")}
                className="text-[11px] uppercase tracking-widest text-[#FAF7F2] hover:text-[#C5A059] transition-colors font-semibold flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full border border-[#FAF7F2] group-hover:border-[#C5A059] flex items-center justify-center transition-colors">
                  <ArrowRight size={14} className="text-[#FAF7F2] group-hover:text-[#C5A059] transition-transform group-hover:translate-x-0.5" />
                </div>
                <span>Explore Features</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES LAYOUT */}
      <section id="features" className="py-14 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <h2 className="f-serif italic text-4xl md:text-5xl font-bold text-[#1A1714]">
                Details you feel under your fingertips.
              </h2>
            </div>
            <p className="text-xs text-[#6B6258] font-light max-w-xs leading-relaxed">
              Explore the advanced hardware architecture and engineered chassis details of {product.name}.
            </p>
          </div>

          {/* Bento Grid matching layout screenshot */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Card 1 & 2 Merged: Processor & Laptop Showcase */}
              <div className="bg-[#FCFAF7] border border-[#EDE8DF] rounded-2xl flex flex-col lg:flex-row items-stretch overflow-hidden lg:col-span-2 min-h-[520px]">
                {/* Left side: Processor Details */}
                <div className="flex-1 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EDE8DF]/60">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-4">
                      Processor
                    </span>
                    <h3 className="f-serif italic text-4xl font-bold text-[#1A1714] leading-tight mb-2">
                      {product.specs?.cpu ? (
                        <>
                          {product.specs.cpu.split(" ").slice(0, 2).join(" ")}
                          <span className="block mt-1 font-normal not-italic">{product.specs.cpu.split(" ").slice(2).join(" ")}</span>
                        </>
                      ) : (
                        <>
                          Intel Core
                          <span className="block mt-1 font-normal not-italic">i7-13620H</span>
                        </>
                      )}
                    </h3>
                    <span className="text-sm font-semibold text-[#C5A059] block mb-4">
                      Built for Performance.
                    </span>
                    <p className="text-xs text-[#6B6258] leading-relaxed font-light mb-6">
                      {product.specs?.special || "Power through heavy workloads with 10 cores and 16 threads designed for multitasking, compiling, and rendering."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t border-[#C8BFB0]/30 pt-4 space-y-3">
                      <div className="flex justify-between items-baseline text-[11px] py-1 border-b border-[#C8BFB0]/10">
                        <span className="text-[#A09288] font-medium uppercase tracking-wider">Processor</span>
                        <span className="text-[#1A1714] font-semibold text-right max-w-[180px] truncate">{product.specs?.cpu || "Intel Core i7-13620H (10 Cores, 16 Threads)"}</span>
                      </div>
                      <div className="flex justify-between items-baseline text-[11px] py-1 border-b border-[#C8BFB0]/10">
                        <span className="text-[#A09288] font-medium uppercase tracking-wider">Memory (RAM)</span>
                        <span className="text-[#1A1714] font-semibold text-right max-w-[180px] truncate">{product.specs?.ram || "8GB / 16GB / 32GB / 64GB DDR4"}</span>
                      </div>
                      <div className="flex justify-between items-baseline text-[11px] py-1">
                        <span className="text-[#A09288] font-medium uppercase tracking-wider">Operating System</span>
                        <span className="text-[#1A1714] font-semibold text-right max-w-[180px] truncate">{product.specs?.os || "Windows 11"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#F4EFE6]/60 border border-[#E2DCD0] rounded-xl">
                        <Cpu size={18} className="text-[#C5A059]" />
                      </div>
                      <span className="text-xs text-[#6B6258] hover:text-[#1A1714] transition-colors flex items-center gap-1.5 cursor-pointer">
                        Learn more about performance <span className="text-[#C5A059]">→</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: Laptop image touching all edges on its half */}
                <div className="flex-1 relative min-h-[300px] lg:min-h-0 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80"
                    alt={`${product.name} Showcase`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Card 3: Graphics & Cooling Stack (Right Column) */}
              <div className="flex flex-col gap-6 justify-between h-full min-h-[520px]">
                {/* Graphics Card */}
                <div className="bg-[#FCFAF7] border border-[#EDE8DF] rounded-2xl flex flex-col justify-between overflow-hidden h-full">
                  <div className="p-6 pb-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-2">
                      Graphics
                    </span>
                    <h3 className="f-serif italic text-2xl font-bold text-[#1A1714] leading-tight mb-2">
                      {product.specs?.gpu ? "Discrete GPU Platform" : "HD Graphics Engine"}
                    </h3>
                    <p className="text-[11px] text-[#6B6258] leading-relaxed font-light">
                      {product.specs?.gpu
                        ? `Equipped with ${product.specs.gpu} discrete graphics to deliver fluid frame rates under heavy rendering workloads.`
                        : "Integrated graphics pipeline optimized for clear visuals, power efficiency, and support for multiple displays."}
                    </p>
                  </div>
                  <div className="relative w-full h-[150px] mt-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=600&q=80"
                      alt="Graphics Processor"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                </div>

                {/* Cooling Card */}
                <div className="bg-[#FCFAF7] border border-[#EDE8DF] rounded-2xl flex flex-col justify-between overflow-hidden h-full">
                  <div className="p-6 pb-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-2">
                      Cooling
                    </span>
                    <h3 className="f-serif italic text-2xl font-bold text-[#1A1714] leading-tight mb-2">
                      Dual Cooling System
                    </h3>
                    <p className="text-[11px] text-[#6B6258] leading-relaxed font-light">
                      {product.specs?.cooling
                        ? `${product.specs.cooling} thermoregulation designed to maintain optimal temperatures under demanding workloads.`
                        : "Advanced thermal design with dual fan system and heat pipes to maintain optimal performance under demanding tasks."}
                    </p>
                  </div>
                  <div className="relative w-full h-[150px] mt-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1616363088386-31c4a84848ba?auto=format&fit=crop&w=600&q=80"
                      alt="Thermal Cooling Architecture"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Chassis Build Wide Bottom Card */}
            <div className="bg-[#FCFAF7] border border-[#EDE8DF] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 items-center w-full">
              {/* Left Side: Title and Description */}
              <div className="w-full lg:w-1/4 flex flex-col justify-center space-y-4 pr-0 lg:pr-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-2">
                    Chassis Build
                  </span>
                  <h3 className="f-serif italic text-3xl font-bold text-[#1A1714] leading-tight mb-2">
                    {product.specs?.build ? (product.specs.build.includes("+") ? product.specs.build.split("+")[0].trim() + " Build" : product.specs.build) : "Premium ABS + Aluminum Chassis"}
                  </h3>
                  <div className="h-[1px] w-12 bg-[#C5A059] my-3" />
                  <p className="text-xs text-[#6B6258] leading-relaxed font-light">
                    Precision crafted for durability and comfort. Lightweight, sturdy, and designed to withstand the demands of everyday use.
                  </p>
                </div>
              </div>

              {/* Right Side: Grid of 4 Items */}
              <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Item 1 */}
                <div className="flex flex-col">
                  <div className="aspect-[3/2] w-full relative rounded-xl overflow-hidden border border-[#EDE8DF]">
                    <Image
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
                      alt="Durable Build"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <h4 className="font-semibold text-xs text-[#1A1714] mt-2">Durable Build</h4>
                  <p className="text-[10px] text-[#6B6258] mt-0.5 leading-relaxed font-light">Sturdy materials for long-lasting reliability.</p>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col">
                  <div className="aspect-[3/2] w-full relative rounded-xl overflow-hidden border border-[#EDE8DF]">
                    <Image
                      src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80"
                      alt="Sleek & Minimal"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <h4 className="font-semibold text-xs text-[#1A1714] mt-2">Sleek & Minimal</h4>
                  <p className="text-[10px] text-[#6B6258] mt-0.5 leading-relaxed font-light">Clean lines. Modern professional look.</p>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col">
                  <div className="aspect-[3/2] w-full relative rounded-xl overflow-hidden border border-[#EDE8DF]">
                    <Image
                      src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80"
                      alt="Ergonomic Keyboard"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <h4 className="font-semibold text-xs text-[#1A1714] mt-2">Ergonomic Keyboard</h4>
                  <p className="text-[10px] text-[#6B6258] mt-0.5 leading-relaxed font-light">Comfortable typing for extended sessions.</p>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col">
                  <div className="aspect-[3/2] w-full relative rounded-xl overflow-hidden border border-[#EDE8DF]">
                    <Image
                      src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80"
                      alt="Engineered to Last"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <h4 className="font-semibold text-xs text-[#1A1714] mt-2">Engineered to Last</h4>
                  <p className="text-[10px] text-[#6B6258] mt-0.5 leading-relaxed font-light">Reliable hinge and airflow design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM CAROUSEL SECTION */}
      <section id="carousel-section" className="py-14 bg-[#FAF7F2] relative overflow-hidden">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center max-w-7xl mx-auto px-8">
            <h2 className="f-serif italic text-4xl md:text-5xl font-bold text-[#1A1714]">
              Visual Gallery
            </h2>
          </div>

          {/* Carousel Viewport Container */}
          <div className="relative w-full overflow-hidden [--slide-w:85vw] md:[--slide-w:70vw] lg:[--slide-w:55vw] py-4">
            {/* The Horizontal Track */}
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(calc(50vw - (var(--slide-w) * ${heroIdx}) - (var(--slide-w) / 2)))`
              }}
            >
              {carouselSlides.map((slide, idx) => {
                const isActive = heroIdx === idx;
                return (
                  <div
                    key={idx}
                    className="w-[var(--slide-w)] shrink-0 px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "scale(1)" : "scale(0.93)",
                      filter: isActive ? "blur(0px)" : "blur(1px)"
                    }}
                  >
                    {/* Slide Card */}
                    <div className="flex flex-col h-[420px] md:h-[500px] lg:h-[540px] bg-[#FAF7F2] border border-[#C8BFB0]/50 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
                      {/* 1. Image area */}
                      <div className="flex-1 w-full relative bg-[#EDE8DF]/25 overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.subtitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-none"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <span className="absolute top-6 right-6 text-[10px] text-[#A09288] font-light z-10 bg-[#FAF7F2]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                          0{idx + 1} / 06
                        </span>
                      </div>

                      {/* 2. Details Metadata Area */}
                      <div className="w-full border-t border-[#C8BFB0]/40 bg-[#FAF7F2] p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-7 space-y-2 text-left">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#A09288] block font-medium">
                            {slide.subtitle}
                          </span>
                          <h3 className="f-serif italic text-2xl md:text-3xl text-[#1A1714] leading-tight font-bold">
                            {slide.title1} <span className="text-[#C5A059] font-normal">{slide.titleHighlight}</span> {slide.title2}
                          </h3>
                        </div>

                        <div className="md:col-span-5 space-y-4 text-left flex flex-col justify-center">
                          <p className="text-[11px] text-[#6B6258] leading-relaxed font-light line-clamp-3">
                            {slide.description}
                          </p>
                          <div>
                            <button
                              onClick={() => scrollTo("buy-now")}
                              className="text-[10px] uppercase tracking-widest text-[#1A1714] hover:text-[#C5A059] transition-colors font-semibold inline-flex items-center gap-2 cursor-pointer group/btn"
                            >
                              <span>Learn More</span>
                              <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chevron Overlays floating on left and right edge */}
            <button
              onClick={() => setHeroIdx((prev) => (prev === 0 ? 5 : prev - 1))}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#C8BFB0]/60 bg-[#FAF7F2]/90 hover:bg-[#1A1714] hover:text-[#FAF7F2] hover:border-[#1A1714] flex items-center justify-center shadow-md transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => setHeroIdx((prev) => (prev === 5 ? 0 : prev + 1))}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#C8BFB0]/60 bg-[#FAF7F2]/90 hover:bg-[#1A1714] hover:text-[#FAF7F2] hover:border-[#1A1714] flex items-center justify-center shadow-md transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-8 space-y-6">
            {/* Progress Bar Indicator */}
            <div className="flex justify-center items-center gap-4 text-[11px] text-[#A09288] select-none">
              <span className="font-semibold text-[#1A1714]">0{heroIdx + 1}</span>
              <div className="w-32 h-[1px] bg-[#C8BFB0]/40 relative">
                <div
                  className="absolute top-0 left-0 bottom-0 bg-[#C5A059] transition-all duration-500 ease-out"
                  style={{ width: `${((heroIdx + 1) / 6) * 100}%` }}
                />
              </div>
              <span>06</span>
            </div>

            {/* Bottom Row Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {carouselSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIdx(idx)}
                  className={`text-left p-4 rounded-sm border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[105px] cursor-pointer ${heroIdx === idx
                    ? "border-[#C5A059] bg-[#FAF7F2] shadow-sm"
                    : "border-[#C8BFB0]/40 bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] hover:border-[#C8BFB0]"
                    }`}
                >
                  <div className="space-y-1 z-10">
                    <div className="text-[9px] text-[#A09288] font-semibold tracking-wider">
                      0{idx + 1}
                    </div>
                    <div className="text-[10px] text-[#1A1714] font-medium leading-tight line-clamp-2">
                      {slide.subtitle}
                    </div>
                  </div>

                  {/* Small faint background product image */}
                  <div className="absolute right-1 bottom-1 w-12 h-12 opacity-30 select-none pointer-events-none z-0">
                    <Image
                      src={slide.thumbnail}
                      alt="thumbnail"
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. POWERFUL PERFORMANCE SECTION */}
      <section id="performance" className="py-12 bg-[#FAF7F2] text-[#1A1714] select-none relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/assets/all_product_page/bg-e4.png"
            alt="Performance Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-20 relative z-10">

          {/* A. Specs grid */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight text-[#FAF7F2] font-sans">
              Powerful Performance made possible in a <br />
              <span className="text-[#C5A059] font-normal italic f-serif">Thin & Light Design.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-[#C8BFB0]/30 pt-12 pb-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A09288] font-medium block">
                Processor & CPU
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#FAF7F2] tracking-tight leading-tight">
                  Snapdragon® <br />X2 Elite
                </h3>
                <p className="text-[11px] text-[#D4CDC5] font-light leading-relaxed">
                  Next-generation Snapdragon platform engineered for compiling, rendering, and heavy multitasking.
                </p>
              </div>
              <div className="border-t border-[#C8BFB0]/20 pt-4">
                <span className="text-3xl font-bold text-[#C5A059]">18-core</span>
                <span className="block text-[9px] uppercase tracking-wider text-[#A09288]">CPU Core Architecture</span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A09288] font-medium block">
                Graphics Processing
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#FAF7F2] tracking-tight leading-tight">
                  Qualcomm® <br />Adreno™ GPU
                </h3>
                <p className="text-[11px] text-[#D4CDC5] font-light leading-relaxed">
                  Discrete-level graphics processing built to deliver fluid frame rates under CAD and design workloads.
                </p>
              </div>
              <div className="border-t border-[#C8BFB0]/20 pt-4">
                <span className="text-[10px] uppercase tracking-wider text-[#A09288] block">Performance Level</span>
                <span className="text-sm font-semibold text-[#FAF7F2]">Discrete-level Processing</span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A09288] font-medium block">
                Neural Acceleration
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#FAF7F2] tracking-tight leading-tight">
                  80 TOPS <br />NPU Engine
                </h3>
                <p className="text-[11px] text-[#D4CDC5] font-light leading-relaxed">
                  High-speed AI accelerator capable of executing complex model iterations locally without server delays.
                </p>
              </div>
              <div className="border-t border-[#C8BFB0]/20 pt-4">
                <span className="text-3xl font-bold text-[#C5A059]">4.7 GHz</span>
                <span className="block text-[9px] uppercase tracking-wider text-[#A09288]">Peak Clock Frequency</span>
              </div>
            </div>

            {/* Column 4 */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A09288] font-medium block">
                Sustained Efficiency
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#FAF7F2] tracking-tight leading-tight">
                  152 GB/s <br />Bandwidth
                </h3>
                <p className="text-[11px] text-[#D4CDC5] font-light leading-relaxed">
                  Ultrawide memory bandwidth ensuring zero bottlenecks during intense compiling cycles.
                </p>
              </div>
              <div className="border-t border-[#C8BFB0]/20 pt-4">
                <span className="text-3xl font-bold text-[#C5A059]">35W</span>
                <span className="block text-[9px] uppercase tracking-wider text-[#A09288]">Sustained TDP Limit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.2 PERFORMANCE EVOLVED SECTION */}
      <section id="performance-evolved" className="py-12 bg-[#FAF7F2] text-[#1A1714] select-none relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/assets/all_product_page/e4-per-bg.png"
            alt="Performance Evolved Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12 relative z-10">

          {/* B. Performance Evolved layout */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="f-serif italic text-4xl md:text-5xl font-bold text-[#1A1714]">
              Performance evolved
            </h2>
            <p className="text-sm text-[#6B6258] font-light max-w-2xl mx-auto leading-relaxed">
              With the latest Snapdragon® X2 Elite processor, the Workbook A14 scales your productivity further than ever. We've pushed every benchmark beyond the previous generation to ensure even your heaviest workloads feel light.
            </p>
          </div>

          {/* C. Workloads Laptop Mockups grid - Cylindrical Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch justify-center pt-8 [perspective:2000px] [transform-style:preserve-3d]">
            {[
              {
                title: "Productivity",
                image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
                description: "Seamless office applications, spreadsheets, and documentation pipelines running concurrently."
              },
              {
                title: "Creative timeline scrubbing",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
                description: "Pro video rendering and timeline manipulation. Clean encoding with dual-line processing hardware acceleration.",
                showPlayBtn: true
              },
              {
                title: "3D Game environments",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
                description: "Simulations and high frame rate visual output powered by integrated Qualcomm Adreno GPU core."
              }
            ].map((laptop, i) => (
              <div 
                key={i} 
                className={`flex flex-col space-y-4 items-center text-center transition-all duration-500 ${
                  i === 0 
                    ? "[transform:rotateY(16deg)] [transform-origin:right_center]" 
                    : i === 2 
                      ? "[transform:rotateY(-16deg)] [transform-origin:left_center]" 
                      : "[transform:translateZ(10px)]"
                }`}
              >
                {/* Full-bleed Image Card */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/11] bg-[#1A1714] border border-[#C8BFB0]/20 rounded-none overflow-hidden group hover:shadow-md transition-shadow">
                  <Image
                    src={laptop.image}
                    alt={laptop.title}
                    fill
                    className="object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  
                  {laptop.showPlayBtn && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10">
                      <button className="w-12 h-12 rounded-full bg-[#FAF7F2]/95 border border-[#C8BFB0]/40 flex items-center justify-center text-[#1A1714] shadow hover:scale-110 transition-all cursor-pointer">
                        <Play size={16} className="ml-0.5 text-[#1A1714]" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Text Content below card */}
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-[#1A1714]">{laptop.title}</h4>
                  <p className="text-[11px] text-[#6B6258] font-light leading-relaxed max-w-[260px] mx-auto">
                    {laptop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.3 BEYOND THE BEST & COMPARATIVE BENCHMARKS SECTION */}
      <section id="beyond-best" className="py-12 bg-[#FAF7F2] text-[#1A1714] select-none relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/assets/all_product_page/e4-byod.png"
            alt="Beyond the Best Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-16 relative z-10">

          {/* D. Beyond the Best tab list & comparison chart */}
          <div className="space-y-8 text-center">
            <div className="space-y-3">
              <h3 className="f-serif italic text-3xl md:text-4xl font-semibold text-[#1A1714]">
                Beyond the Best
              </h3>
              <p className="text-xs text-[#6B6258] font-light max-w-md mx-auto">
                Select a workload parameter to see comparative index speeds against standard architectures.
              </p>
            </div>

            {/* Horizontal tab scroll menu */}
            <div className="flex flex-wrap gap-2 justify-center max-w-5xl mx-auto px-4">
              {Object.keys(PERF_TABS_DATA).map((tabKey) => {
                const isActive = activePerfTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActivePerfTab(tabKey)}
                    className={`px-4 py-2 text-[11px] font-medium uppercase tracking-wider rounded-full border transition-all cursor-pointer ${isActive
                      ? "bg-[#1A1714] border-[#1A1714] text-white shadow-sm font-semibold"
                      : "bg-[#FAF7F2] border-[#C8BFB0]/40 text-[#6B6258] hover:border-[#1A1714] hover:text-[#1A1714]"
                      }`}
                  >
                    {PERF_TABS_DATA[tabKey].label}
                  </button>
                );
              })}
            </div>

            {/* Comparison benchmark card */}
            <div className="max-w-3xl mx-auto bg-[#FAF7F2] border border-[#C8BFB0]/50 rounded-md p-8 text-left space-y-6 shadow-sm">
              <h4 className="text-sm font-semibold text-[#1A1714]">
                {PERF_TABS_DATA[activePerfTab].title}
              </h4>

              <div className="space-y-6">
                {/* Workbook Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-semibold text-[#1A1714]">Workbook A14 (Snapdragon® X2 Elite)</span>
                    <span className="text-lg font-bold text-[#C5A059] italic f-serif">
                      {PERF_TABS_DATA[activePerfTab].multiplier}x
                    </span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-2 rounded-full overflow-hidden">
                    <motion.div
                      layoutId="perf-bar-workbook"
                      className="bg-[#C5A059] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(PERF_TABS_DATA[activePerfTab].multiplier / 1.5) * 100}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  </div>
                </div>

                {/* Competitor Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-[#6B6258]">{PERF_TABS_DATA[activePerfTab].competitorName}</span>
                    <span className="font-semibold text-[#6B6258]">
                      {PERF_TABS_DATA[activePerfTab].compMultiplier}x
                    </span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-2 rounded-full overflow-hidden">
                    <motion.div
                      layoutId="perf-bar-comp"
                      className="bg-[#A09288] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(PERF_TABS_DATA[activePerfTab].compMultiplier / 1.5) * 100}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#A09288] italic">
                {PERF_TABS_DATA[activePerfTab].footnote}
              </p>
            </div>
          </div>

          {/* E. Engineered to Lead dual columns */}
          <div className="space-y-12 border-t border-[#C8BFB0]/30 pt-16">
            <div className="text-center space-y-3">
              <h3 className="f-serif italic text-3xl md:text-4xl font-semibold text-[#1A1714]">
                Engineered to Lead
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Column 1: Processor */}
              <div className="space-y-4 text-left">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-none">
                  <Image
                    src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=600&q=80"
                    alt="Silicon Processor socket"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <h4 className="f-serif italic text-xl font-bold text-[#1A1714]">
                    Power that moves with you
                  </h4>
                  <p className="text-xs text-[#6B6258] leading-relaxed font-light">
                    Conquer demanding workloads with a legendary leap in performance and exceptional power efficiency — unplugged and unstoppable with the 18-core Snapdragon® X2 Elite processor.
                  </p>
                </div>
              </div>

              {/* Column 2: Thermals */}
              <div className="space-y-4 text-left">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-none">
                  <Image
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                    alt="Thermal dual fans"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <h4 className="f-serif italic text-xl font-bold text-[#1A1714]">
                    Keep it cool and quiet
                  </h4>
                  <p className="text-xs text-[#6B6258] leading-relaxed font-light">
                    The ultra-light thermal solution cuts down weight and reinforces structural strength, achieving 15% greater fan back pressure resistance for more stable cooling. Stay quiet under 25 dB during light tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>




      {/* 7. THREE-BAR BATTERY SECTION A: TIMELINE */}
      <section id="battery-timeline" className="py-12 flex flex-col justify-center bg-[#FAF7F2] text-[#1A1714] relative overflow-hidden select-none">
        {/* Left vertical index indicator */}
        <div className="hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[11px] text-[#A09288] select-none z-20">
          <span className="font-semibold text-[#1A1714]">03A</span>
          <div className="w-[1px] h-16 bg-[#C8BFB0]/30" />
          <span>10</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12 relative z-10 w-full">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight text-[#1A1714] font-sans">
              Power that <span className="text-[#C5A059] font-normal italic f-serif">keeps up</span> with you.
            </h2>
            <p className="text-xs text-[#6B6258] font-light max-w-md leading-relaxed">
              A high-capacity battery engineered for creators who move. More uptime, less downtime. We've optimized every layer of the architecture to deliver all-day endurance under demanding compile workloads.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Big Battery Graphic */}
            <div className="lg:col-span-6 flex justify-center items-center py-10">
              <div className="relative w-80 h-24 border-4 border-[#1A1714] p-2 flex flex-row gap-2 rounded-sm bg-[#FAF7F2] shrink-0 shadow-sm">
                {/* Cap on the right */}
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-4 h-12 bg-[#1A1714] rounded-r-sm" />

                {/* Vertical Segment 1 (Left) */}
                <div className="flex-1 h-full bg-[#EDE8DF] relative overflow-hidden rounded-sm">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#C5A059] transition-all duration-350" style={{ height: `${timeFill1}%` }} />
                </div>

                {/* Vertical Segment 2 (Middle) */}
                <div className="flex-1 h-full bg-[#EDE8DF] relative overflow-hidden rounded-sm">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#C5A059] transition-all duration-355" style={{ height: `${timeFill2}%` }} />
                </div>

                {/* Vertical Segment 3 (Right) */}
                <div className="flex-1 h-full bg-[#EDE8DF] relative overflow-hidden rounded-sm">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#C5A059] transition-all duration-360" style={{ height: `${timeFill3}%` }} />
                </div>
              </div>
            </div>

            {/* Right Column: Times List */}
            <div className="lg:col-span-6 space-y-6 lg:pl-12">
              {[
                "09:00 — Morning compile tasks without power.",
                "14:00 — Afternoon design and render sessions.",
                "20:00 — Late night coding under dim lighting."
              ].map((line, idx) => (
                <p
                  key={idx}
                  className={`text-sm md:text-lg leading-relaxed transition-all duration-300 ${timeActiveBarIdx === idx ? "text-[#1A1714] font-medium opacity-100 translate-x-2" : "text-[#A09288] opacity-35"
                    }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 THREE-BAR BATTERY SECTION B: TECH SPECIFICATIONS */}
      <section id="battery-tech" className="py-12 flex flex-col justify-center bg-[#FAF7F2] text-[#1A1714] relative overflow-hidden select-none">
        {/* Left vertical index indicator */}
        <div className="hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[11px] text-[#A09288] select-none z-20">
          <span className="font-semibold text-[#1A1714]">03B</span>
          <div className="w-[1px] h-16 bg-[#C8BFB0]/30" />
          <span>10</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12 relative z-10 w-full">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-light tracking-tight leading-relaxed text-[#1A1714] max-w-4xl font-sans">
              Workbook-exclusive battery technology extends charging cycles from 1,000 to 1,200, ensuring longer-lasting performance and reliability over time.
            </h2>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

            {/* Left Column: Lifestyle Image */}
            <div className="lg:col-span-6 relative rounded-md overflow-hidden min-h-[320px] md:min-h-[420px] bg-[#EDE8DF]/30 border border-[#C8BFB0]/40">
              <Image
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                alt="Workbook lifestyle usage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right Column: Tech Stats */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8 lg:pl-6">

              {/* Fast charging header */}
              <div className="space-y-1">
                <span className="text-4xl md:text-5xl font-light tracking-tight text-[#1A1714] block">
                  60% in 49 min
                </span>
                <span className="text-[10px] text-[#6B6258] uppercase tracking-wider block font-medium">
                  fast charging technology
                </span>
              </div>

              {/* Two key metrics row */}
              <div className="grid grid-cols-2 gap-6 border-t border-b border-[#C8BFB0]/25 py-6">
                {/* Lifespan */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#A09288] block">Up to</span>
                  <span className="text-3xl font-light text-[#1A1714] block">1.2 x</span>
                  <span className="text-[11px] text-[#6B6258] block">battery lifespan</span>
                </div>

                {/* Capacity + Graphic */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-light text-[#1A1714]">75Wh</span>

                    {/* Horizontal Battery Graphic with 3 Vertical Bars (Fully Filled) */}
                    <div className="relative w-16 h-7 border border-[#1A1714] p-0.5 flex flex-row gap-0.5 rounded-sm bg-white shrink-0">
                      {/* Cap on the right */}
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1 h-3.5 bg-[#1A1714] rounded-r-sm" />

                      {/* Vertical Segment 1 (Filled) */}
                      <div className="flex-1 h-full bg-[#C5A059] rounded-sm" />

                      {/* Vertical Segment 2 (Filled) */}
                      <div className="flex-1 h-full bg-[#C5A059] rounded-sm" />

                      {/* Vertical Segment 3 (Filled) */}
                      <div className="flex-1 h-full bg-[#C5A059] rounded-sm" />
                    </div>
                  </div>
                  <span className="text-[11px] text-[#6B6258] block">battery capacity</span>
                </div>
              </div>

              {/* Performance Comparison Block */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#1A1714]">
                    Work unplugged without performance losses
                  </h3>
                  <p className="text-[10px] text-[#A09288] uppercase tracking-wider font-medium">
                    Cinebench 2024 (performance benchmark)
                  </p>
                </div>

                {/* Bars Stacked */}
                <div className="space-y-4">
                  {/* Plugged In Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1714]">
                      <span className="w-2 h-2 rounded-full bg-[#1A1714]" />
                      <span>Plugged In</span>
                    </div>
                    <div className="w-full bg-[#EDE8DF] h-4 rounded-sm overflow-hidden">
                      <div className="bg-[#1A1714] h-full w-full" />
                    </div>
                  </div>

                  {/* Unplugged Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1714]">
                      <span className="w-2 h-2 rounded-full border border-[#1A1714] bg-transparent" />
                      <span>Unplugged</span>
                    </div>
                    <div className="w-full bg-[#EDE8DF] h-4 rounded-sm overflow-hidden">
                      <div className="bg-[#C5A059] h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footnote */}
          <div className="text-[9px] text-[#A09288]/60 text-right font-light italic pt-4">
            * Battery life and performance may vary based on usage, hardware configuration, and environmental settings.
          </div>
        </div>
      </section>

      {/* 7.8 HARDWARE HIGHLIGHTS SECTION (CONNECTIVITY, CAMERA, AUDIO) */}
      <section id="hardware-details" className="py-12 bg-[#FAF7F2] select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">

          {/* Card 1: Connectivity */}
          <div className="bg-white border border-[#C8BFB0]/50 rounded-lg p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm">
            {/* Left Column */}
            <div className="lg:w-1/3 w-full space-y-6 text-left flex flex-col items-start justify-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-light text-[#1A1714] font-sans">
                  All the ports <br />you need.
                </h3>
              </div>
              <p className="text-xs text-[#6B6258] leading-relaxed font-light">
                Thoughtfully placed ports give you the flexibility to work, connect, and create without compromise.
              </p>
              <button className="border border-[#C8BFB0] hover:border-[#1A1714] text-[#1A1714] px-6 py-2 text-[10px] uppercase tracking-widest rounded-full transition-colors cursor-pointer bg-transparent">
                Learn more
              </button>
            </div>

            {/* Right Column: HTML Laptop Profiles Drawing */}
            <div className="lg:w-2/3 w-full flex flex-col gap-14 py-4 justify-center items-center">
              {/* Top Profile (Left Side) */}
              <div className="w-full max-w-lg flex flex-col items-center">
                {/* Profile Bevel shape */}
                <div className="w-full h-5 bg-[#C8BFB0]/30 border border-[#C8BFB0]/50 rounded-md relative flex items-center px-8">
                  <div className="absolute right-0 top-0 bottom-0 w-[45%] bg-gradient-to-l from-black/5 to-transparent rounded-r-md" />

                  {/* HDMI Port */}
                  <div className="absolute left-[15%] w-6 h-1.5 bg-[#1A1714] rounded-xs flex items-center justify-center">
                    <div className="w-4 h-[1px] bg-[#EDE8DF]" />
                  </div>

                  {/* USB-C Port */}
                  <div className="absolute left-[35%] w-4 h-1 bg-[#1A1714] rounded-full" />

                  {/* USB-A Port */}
                  <div className="absolute left-[52%] w-6 h-2 bg-[#1A1714] rounded-xs border border-[#C8BFB0]/30" />

                  {/* Audio combo jack */}
                  <div className="absolute left-[70%] w-2.5 h-2.5 bg-[#1A1714] rounded-full" />
                </div>

                {/* Port labels with connector lines */}
                <div className="w-full grid grid-cols-4 gap-2 pt-6 relative">
                  {/* Column 1: HDMI */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute top-0 left-[18%]" />
                    <span className="text-[9px] text-[#1A1714] uppercase tracking-wider font-semibold mt-4">HDMI® 2.1</span>
                    <span className="text-[8px] text-[#A09288] font-light">TMDS</span>
                  </div>

                  {/* Column 2: Thunderbolt */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute top-0 left-[37%]" />
                    <span className="text-[9px] text-[#1A1714] uppercase tracking-wider font-semibold mt-4">Thunderbolt™ 4</span>
                    <span className="text-[8px] text-[#A09288] font-light">USB-C®</span>
                  </div>

                  {/* Column 3: USB-A */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute top-0 left-[55%]" />
                    <span className="text-[9px] text-[#1A1714] uppercase tracking-wider font-semibold mt-4">USB 3.2</span>
                    <span className="text-[8px] text-[#A09288] font-light">Gen 1 Type-A</span>
                  </div>

                  {/* Column 4: Audio Jack */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute top-0 left-[71%]" />
                    <span className="text-[9px] text-[#1A1714] uppercase tracking-wider font-semibold mt-4">Audio combo</span>
                    <span className="text-[8px] text-[#A09288] font-light">jack</span>
                  </div>
                </div>
              </div>

              {/* Bottom Profile (Right Side) */}
              <div className="w-full max-w-lg flex flex-col items-center pt-2">
                {/* Profile Bevel shape */}
                <div className="w-full h-5 bg-[#C8BFB0]/30 border border-[#C8BFB0]/50 rounded-md relative flex items-center px-8">
                  <div className="absolute left-0 top-0 bottom-0 w-[45%] bg-gradient-to-r from-black/5 to-transparent rounded-l-md" />

                  {/* MicroSD slot */}
                  <div className="absolute left-[30%] w-5 h-0.5 bg-[#1A1714] rounded-xs" />

                  {/* USB-A Port */}
                  <div className="absolute left-[54%] w-6 h-2 bg-[#1A1714] rounded-xs border border-[#C8BFB0]/30" />

                  {/* Kensington lock slot */}
                  <div className="absolute left-[72%] w-3 h-2.5 bg-[#1A1714] rounded-xs" />
                </div>

                {/* Port labels with connector lines */}
                <div className="w-full grid grid-cols-3 gap-2 pt-6 relative">
                  {/* Column 1: MicroSD */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute top-0 left-[32%]" />
                    <span className="text-[9px] text-[#1A1714] uppercase tracking-wider font-semibold mt-4">MicroSD</span>
                    <span className="text-[8px] text-[#A09288] font-light">card reader</span>
                  </div>

                  {/* Column 2: USB-A */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute top-0 left-[56%]" />
                    <span className="text-[9px] text-[#1A1714] uppercase tracking-wider font-semibold mt-4">USB 3.2</span>
                    <span className="text-[8px] text-[#A09288] font-light">Gen 1 Type-A</span>
                  </div>

                  {/* Column 3: Kensington lock */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute top-0 left-[73%]" />
                    <span className="text-[9px] text-[#1A1714] uppercase tracking-wider font-semibold mt-4">Kensington</span>
                    <span className="text-[8px] text-[#A09288] font-light">nano lock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Camera */}
          <div className="bg-white border border-[#C8BFB0]/50 rounded-lg p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm">
            {/* Left Column */}
            <div className="lg:w-1/3 w-full space-y-6 text-left flex flex-col items-start justify-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-light text-[#1A1714] font-sans">
                  See clearly. <br />Be clearly seen.
                </h3>
              </div>
              <p className="text-xs text-[#6B6258] leading-relaxed font-light">
                FHD camera with 3DNR and IR technology keeps your video calls sharp, even in low light.
              </p>
              <button className="border border-[#C8BFB0] hover:border-[#1A1714] text-[#1A1714] px-6 py-2 text-[10px] uppercase tracking-widest rounded-full transition-colors cursor-pointer bg-transparent">
                Learn more
              </button>
            </div>

            {/* Right Column: HTML Bezel Drawing */}
            <div className="lg:w-2/3 w-full flex flex-col items-center justify-center py-4">
              {/* Bezel frame */}
              <div className="w-full max-w-lg h-8 bg-[#1A1714] rounded-t-lg relative flex items-center justify-center gap-6 border-b border-black">
                {/* FHD camera module */}
                <div className="w-3 h-3 rounded-full bg-black border border-white/10 flex items-center justify-center relative">
                  <div className="w-1 h-1 rounded-full bg-blue-900/50" />
                  <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute -top-8 left-1/2 -translate-x-1/2" />
                </div>

                {/* IR camera module */}
                <div className="w-2 h-2 rounded-full bg-black border border-white/5 flex items-center justify-center relative">
                  <div className="w-0.5 h-0.5 rounded-full bg-red-950" />
                  <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute -top-8 left-1/2 -translate-x-1/2" />
                </div>

                {/* Privacy shutter indicator */}
                <div className="w-4 h-2 bg-neutral-800 rounded-xs relative flex items-center justify-end px-0.5">
                  <div className="w-2 h-1.5 bg-orange-600 rounded-xs" />
                  <div className="w-[1px] h-6 bg-[#C5A059]/40 absolute -top-8 left-1/2 -translate-x-1/2" />
                </div>

                {/* Text indicators above the bezel */}
                <div className="absolute -top-14 w-full flex justify-center gap-16 text-[9px] uppercase tracking-wider text-[#A09288] font-semibold">
                  <div className="absolute left-[30%] -translate-x-1/2">FHD camera</div>
                  <div className="absolute left-[50%] -translate-x-1/2">IR camera</div>
                  <div className="absolute left-[70%] -translate-x-1/2">Privacy shutter</div>
                </div>
              </div>

              {/* Screen area with abstract design representing the display */}
              <div className="w-full max-w-lg h-24 bg-[#FAF7F2] border-l border-r border-[#C8BFB0]/50 relative overflow-hidden flex items-center justify-center">
                {/* Soft abstract waves in CSS */}
                <div className="absolute w-[120%] h-48 bg-gradient-to-tr from-[#EDE8DF]/30 via-white to-transparent transform rotate-6 -top-12 -left-12" />
                <span className="text-[10px] uppercase tracking-widest text-[#A09288] z-10 font-medium">100% Visual Purity</span>
              </div>
            </div>
          </div>

          {/* Card 3: Audio */}
          <div className="bg-white border border-[#C8BFB0]/50 rounded-lg p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm">
            {/* Left Column */}
            <div className="lg:w-1/3 w-full space-y-6 text-left flex flex-col items-start justify-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-light text-[#1A1714] font-sans">
                  Sound that <br />moves with you.
                </h3>
              </div>
              <p className="text-xs text-[#6B6258] leading-relaxed font-light">
                Smart Amp technology and Dolby Atmos® deliver immersive, room-filling audio with exceptional clarity.
              </p>
              <button className="border border-[#C8BFB0] hover:border-[#1A1714] text-[#1A1714] px-6 py-2 text-[10px] uppercase tracking-widest rounded-full transition-colors cursor-pointer bg-transparent">
                Learn more
              </button>
            </div>

            {/* Right Column: Audio details & ripples */}
            <div className="lg:w-2/3 w-full flex flex-col md:flex-row items-center justify-between gap-8 py-4">
              {/* Visual Keyboard deck corner */}
              <div className="w-full max-w-[280px] h-40 bg-[#EDE8DF] border border-[#C8BFB0]/60 rounded-md p-4 flex flex-col justify-between relative overflow-hidden shrink-0">
                {/* concentric sound ripples */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full border border-[#C5A059]/10" />
                <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full border border-[#C5A059]/10" />
                <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full border border-[#C5A059]/5" />

                {/* Small keys mockup */}
                <div className="grid grid-cols-3 gap-1 w-20 opacity-30">
                  <div className="h-6 bg-white border border-[#C8BFB0] rounded-sm" />
                  <div className="h-6 bg-white border border-[#C8BFB0] rounded-sm" />
                  <div className="h-6 bg-white border border-[#C8BFB0] rounded-sm" />
                </div>

                {/* Harman Kardon text engraving */}
                <div className="space-y-0.5">
                  <div className="text-[7px] text-[#A09288] tracking-widest uppercase">Sound by</div>
                  <div className="f-serif italic text-xs font-bold text-[#1A1714]">harman/kardon</div>
                </div>
              </div>

              {/* Stats side column */}
              <div className="flex-1 space-y-6 text-left w-full pl-0 md:pl-8">
                <div className="space-y-1">
                  {/* Dolby Atmos logo text placeholder styled cleanly */}
                  <div className="flex items-center gap-1.5 font-sans font-bold text-sm text-[#1A1714]">
                    <span className="font-extrabold uppercase text-[10px] bg-[#1A1714] text-white px-1 py-0.5 rounded-xs tracking-tighter">Dolby</span>
                    <span className="uppercase tracking-widest text-[11px] font-light">ATMOS</span>
                  </div>
                </div>

                <div className="border-l-2 border-[#C5A059]/30 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#A09288] block font-semibold">Smart Amp</span>
                  <span className="text-xs text-[#6B6258] block font-light">Technology for enhanced volume</span>
                </div>

                <div className="border-l-2 border-[#C5A059]/30 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#A09288] block font-semibold">3-Mic Array</span>
                  <span className="text-xs text-[#6B6258] block font-light">Integrated noise reduction engine</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. COMPARATIVE BENCHMARK STATS CHART */}
      <section id="comparison-trigger" className="py-12 bg-[#FAF7F2] select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">

          {/* Header & Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
            <div className="space-y-3">
              <h2 className="f-serif italic text-4xl md:text-5xl font-semibold text-[#1A1714]">
                Benchmark comparisons.
              </h2>
            </div>
            <p className="text-xs text-[#6B6258] font-light max-w-xs leading-relaxed">
              Workbook outperforms traditional x86 and ARM platforms in raw computational velocity and thermal efficiency, setting a new baseline for local client compute.
            </p>
          </div>

          {/* Grid Layout: Side-by-side Benchmark Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Card 1: AI Performance */}
            <div className="bg-white border border-[#C8BFB0]/50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-8 text-left">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
                  Neural Throughput
                </span>
                <h3 className="text-xl font-normal text-[#1A1714]">
                  AI Workload Performance
                </h3>
                <p className="text-[10px] text-[#A09288] uppercase tracking-wider">
                  NPU Peak Compute (TOPS)
                </p>
              </div>

              <div className="space-y-6">
                {/* Bar 1: Workbook */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs items-baseline">
                    <span className="font-semibold text-[#1A1714]">Workbook Series (Snapdragon X Elite)</span>
                    <span className="text-lg font-bold text-[#C5A059] italic f-serif">45 TOPS</span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C5A059] h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${45 / 45 * 100 * benchmarkProgress}%` }}
                    />
                  </div>
                </div>

                {/* Bar 2: Competitor Ultra 9 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs items-baseline">
                    <span className="text-[#6B6258]">Competitor Ultra 9 NPU</span>
                    <span className="font-semibold text-[#6B6258]">16 TOPS</span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1A1714]/40 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${16 / 45 * 100 * benchmarkProgress}%` }}
                    />
                  </div>
                </div>

                {/* Bar 3: Previous Gen */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs items-baseline">
                    <span className="text-[#6B6258]">Previous Generation Core i9</span>
                    <span className="font-semibold text-[#6B6258]">11 TOPS</span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1A1714]/20 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${11 / 45 * 100 * benchmarkProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Energy Efficiency */}
            <div className="bg-white border border-[#C8BFB0]/50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-8 text-left">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
                  Power Efficiency
                </span>
                <h3 className="text-xl font-normal text-[#1A1714]">
                  Energy Efficiency
                </h3>
                <p className="text-[10px] text-[#A09288] uppercase tracking-wider">
                  Hours of Video Playback
                </p>
              </div>

              <div className="space-y-6">
                {/* Bar 1: Workbook */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs items-baseline">
                    <span className="font-semibold text-[#1A1714]">Workbook Series (Snapdragon X Elite)</span>
                    <span className="text-lg font-bold text-[#C5A059] italic f-serif">21 hrs</span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C5A059] h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${21 / 24 * 100 * benchmarkProgress}%` }}
                    />
                  </div>
                </div>

                {/* Bar 2: Competitor Ultra 9 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs items-baseline">
                    <span className="text-[#6B6258]">Competitor Ultra 9 Platform</span>
                    <span className="font-semibold text-[#6B6258]">14 hrs</span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1A1714]/40 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${14 / 24 * 100 * benchmarkProgress}%` }}
                    />
                  </div>
                </div>

                {/* Bar 3: Previous Gen */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs items-baseline">
                    <span className="text-[#6B6258]">Previous Generation Core i9</span>
                    <span className="font-semibold text-[#6B6258]">9 hrs</span>
                  </div>
                  <div className="w-full bg-[#EDE8DF] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1A1714]/20 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${9 / 24 * 100 * benchmarkProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8.5 PRODUCT REVEAL VIDEO SECTION */}
      <section className="py-12 bg-[#FAF7F2] select-none flex flex-col items-center">
        <div className="text-center space-y-4 max-w-xl mx-auto px-8 pb-12">
          <h2 className="f-serif italic text-4xl font-bold text-[#1A1714]">
            Workbook in Action
          </h2>
          <p className="text-xs text-[#6B6258] font-light leading-relaxed">
            Experience the design silhouette and hardware fluidity of the Workbook in motion.
          </p>
        </div>

        {/* Full-width Video Player */}
        <div className="w-full h-[60vh] lg:h-[80vh] relative bg-[#1A1714] overflow-hidden group">
          <video
            ref={revealVideoRef}
            src="/assets/swapbook-reveal.mp4"
            loop
            muted={isMutedReveal}
            playsInline
            className="w-full h-full object-cover select-none"
          />

          {/* Premium play overlay */}
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300">
            <button
              onClick={togglePlayReveal}
              className="w-16 h-16 rounded-full bg-white/90 border border-[#C8BFB0]/40 flex items-center justify-center text-[#1A1714] hover:scale-105 active:scale-95 shadow-lg transition-all cursor-pointer z-10"
            >
              {isPlayingReveal ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
          </div>

          {/* Audio Toggle */}
          <div className="absolute bottom-6 right-8 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm z-20 text-[#1A1714] text-[10px] border border-[#C8BFB0]/20 shadow-md">
            <span className="font-semibold uppercase tracking-wider text-[8px] text-[#A09288]">Audio</span>
            <button
              onClick={toggleMuteReveal}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {isMutedReveal ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </section>

      {/* 9. SCROLL-TRIGGERED MORPHING BUY NOW SECTION */}
      <section
        id="buy-now"
        ref={buyNowRef}
        className="relative h-[150vh] w-full bg-[#1A1714] text-[#FAF7F2]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <motion.path
              d={pathD}
              fill="#FAF7F2"
            />
          </svg>

          <motion.div
            style={{ opacity: buyNowOpacity }}
            className="z-10 flex items-center justify-center pointer-events-auto"
          >
            <button
              onClick={handleBuyNowRedirect}
              className="px-16 py-8 f-serif italic text-4xl md:text-5xl border-2 border-[#1A1714] bg-[#FAF7F2] hover:bg-[#1A1714] hover:text-[#FAF7F2] text-[#1A1714] transition-all duration-300 cursor-pointer rounded-sm shadow-lg"
            >
              Buy Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-10 text-center bg-[#FAF7F2]">
        <div className="max-w-xl mx-auto space-y-6 px-6">
          <h2 className="f-serif italic font-semibold text-3xl md:text-4xl leading-tight text-[#1A1714]">
            Ready to design your workspace?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border border-[#1A1714] text-[#1A1714] px-8 py-3.5 text-[11px] uppercase tracking-wider hover:bg-[#1A1714] hover:text-[#FAF7F2] transition-colors cursor-pointer"
            >
              Browse All Products <ArrowRight size={12} />
            </Link>
            <button
              onClick={() => setActiveForm("EXPERIENCE")}
              className="inline-flex items-center justify-center gap-2 bg-[#1A1714] text-[#FAF7F2] px-8 py-3.5 text-[11px] uppercase tracking-wider hover:bg-[#C5A059] hover:text-white transition-colors cursor-pointer"
            >
              Not Sure? Try Experience
            </button>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 text-xs text-[#A09288] hover:text-[#1A1714] transition-colors py-3.5"
            >
              <ArrowLeft size={10} /> Back to Catalog
            </Link>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#C8BFB0]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 md:px-12 py-3.5 flex items-center justify-between z-50 font-sans">
        {/* Left Section: Delivery & Catalogue */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-left">
            <div className="text-[11px] font-semibold text-[#1A1714] flex items-center gap-1.5">
              <span className="text-[#6B6258] font-normal">Delivers to</span>
              <span className="text-[#3b82f6] hover:underline cursor-pointer font-medium">
                Add pincode
              </span>
            </div>
            <div className="text-[10px] text-[#A09288] mt-0.5 font-light tracking-wide">
              In Stock &bull; Ships in 24&ndash;48 hrs &bull; COD available
            </div>
          </div>
          <button className="border border-[#C8BFB0] rounded px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#1A1714] font-medium hover:bg-[#FAF7F2] transition-colors cursor-pointer">
            Catalogue
          </button>
        </div>

        {/* Right Section: Price & Actions */}
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          {/* Price & EMI */}
          <div className="text-left md:text-right flex flex-col justify-center">
            <div className="flex items-baseline gap-1 md:justify-end">
              <span className="text-base md:text-lg font-bold text-[#1A1714]">
                ₹{product.basePrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[9px] text-[#A09288] font-normal">incl. tax</span>
            </div>
            <div className="text-[9px] text-[#6B6258] font-medium mt-0.5">
              EMI ₹{Math.round(product.basePrice / 12).toLocaleString("en-IN")}/mo
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Heart Button */}
            <button className="border border-[#C8BFB0] rounded p-2.5 text-[#1A1714] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center cursor-pointer">
              <Heart size={14} className="text-[#1A1714]" />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={handleBuyNow}
              className="border border-[#1A1714] bg-white rounded px-4 md:px-6 py-2.5 text-[10px] uppercase tracking-wider text-[#1A1714] font-bold hover:bg-[#FAF7F2] transition-all cursor-pointer whitespace-nowrap"
            >
              {added ? "Added!" : "Add to Cart"}
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNowRedirect}
              className="bg-[#1A1714] border border-[#1A1714] text-white rounded px-4 md:px-6 py-2.5 text-[10px] uppercase tracking-wider font-bold hover:bg-black transition-all cursor-pointer whitespace-nowrap"
            >
              Buy Now
            </button>

            {/* Enquire Button */}
            <button
              onClick={() => setActiveForm("ENQUIRE")}
              className="bg-[#C5A059] border border-[#C5A059] text-white rounded px-4 md:px-6 py-2.5 text-[10px] uppercase tracking-wider font-bold hover:bg-[#a68444] transition-all cursor-pointer whitespace-nowrap"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
