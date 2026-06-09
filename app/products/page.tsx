"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight, Cpu, HardDrive, Monitor } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import { useCart } from "@/store/useCart";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ─── Constants ──────────────────────────────────────────────────── */

const CAROUSEL_SLIDES = [
    { id: "slide1", image: "/assets/all_product_page/slide1.png" },
    { id: "slide2", image: "/assets/all_product_page/slide2.png" },
    { id: "slide3", image: "/assets/all_product_page/slide3.png" },
    { id: "slide4", image: "/assets/all_product_page/slide4.png" },
];

const CATALOG_IMAGES: Record<string, string> = {
    s1: "/assets/all_product_page/s1-cat.png",
    e4: "/assets/all_product_page/e4-cat.png",
    e5: "/assets/all_product_page/e5-cat.png",
    e1: "/assets/all_product_page/e1-cat.png",
};

function getProductImage(product: any): string {
    const slug = product.slug || product.id || "";
    return CATALOG_IMAGES[slug] || product.images?.[0] || "/assets/all_product_page/e4-cat.png";
}

const CATEGORY_ACCENTS: Record<string, string> = {
    Performance: "#F27D26",
    Business: "#3B82F6",
    Universal: "#10B981",
    Mobility: "#8B5CF6",
};


/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO CAROUSEL
   Full-bleed image carousel with GSAP crossfade, progress timer
   bar, and arrow navigation. Inspired by Razer/Lenovo hero banners.
   ═══════════════════════════════════════════════════════════════════ */

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressTween = useRef<gsap.core.Tween | null>(null);

    const DURATION = 6000; // ms per slide

    const goTo = useCallback((index: number) => {
        if (isTransitioning || index === current) return;
        setIsTransitioning(true);

        // Kill running progress bar
        progressTween.current?.kill();
        if (progressRef.current) gsap.set(progressRef.current, { scaleX: 0 });

        const outEl = imagesRef.current[current];
        const inEl = imagesRef.current[index];

        // Crossfade with a slight zoom
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrent(index);
                setIsTransitioning(false);
            },
        });

        if (outEl) {
            tl.to(outEl, { opacity: 0, scale: 1.05, duration: 0.9, ease: "power2.inOut" }, 0);
        }
        if (inEl) {
            gsap.set(inEl, { opacity: 0, scale: 1.08 });
            tl.to(inEl, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.inOut" }, 0.1);
        }
    }, [current, isTransitioning]);

    const next = useCallback(() => {
        goTo((current + 1) % CAROUSEL_SLIDES.length);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    }, [current, goTo]);

    // Auto-advance timer
    useEffect(() => {
        timerRef.current = setInterval(next, DURATION);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [next]);

    // Progress bar animation — resets on slide change
    useEffect(() => {
        if (!progressRef.current) return;
        progressTween.current?.kill();
        gsap.set(progressRef.current, { scaleX: 0 });
        progressTween.current = gsap.to(progressRef.current, {
            scaleX: 1,
            duration: DURATION / 1000,
            ease: "none",
        });
    }, [current]);

    // Initial entrance animation
    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            // First slide fades in
            const firstSlide = imagesRef.current[0];
            if (firstSlide) {
                gsap.fromTo(firstSlide,
                    { opacity: 0, scale: 1.1 },
                    { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.2 }
                );
            }

            // Navigation arrows
            const arrows = sectionRef.current!.querySelectorAll(".carousel-arrow");
            gsap.fromTo(arrows,
                { opacity: 0, x: (i) => i === 0 ? -20 : 20 },
                { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.8, stagger: 0.1 }
            );

            // Dots
            const dots = sectionRef.current!.querySelectorAll(".carousel-dot");
            gsap.fromTo(dots,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 1, stagger: 0.05 }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(next, DURATION);
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-ink overflow-hidden group"
            style={{ aspectRatio: "1942 / 809" }}
        >
            {/* Image stack */}
            {CAROUSEL_SLIDES.map((slide, i) => (
                <div
                    key={slide.id}
                    ref={(el) => { imagesRef.current[i] = el; }}
                    className="absolute inset-0 w-full h-full"
                    style={{ opacity: i === 0 ? 1 : 0, zIndex: i === current ? 2 : 1 }}
                >
                    <Image
                        src={slide.image}
                        alt={`Ention Product Showcase ${i + 1}`}
                        fill
                        className="object-contain"
                        priority={i === 0}
                        unoptimized
                    />
                </div>
            ))}

            {/* Vignette overlay */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)" }}
            />

            {/* Left arrow */}
            <button
                onClick={() => { prev(); resetTimer(); }}
                className="carousel-arrow absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/25 hover:bg-black/50 backdrop-blur-sm text-white/60 hover:text-white transition-all duration-300"
                aria-label="Previous slide"
            >
                <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            {/* Right arrow */}
            <button
                onClick={() => { next(); resetTimer(); }}
                className="carousel-arrow absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/25 hover:bg-black/50 backdrop-blur-sm text-white/60 hover:text-white transition-all duration-300"
                aria-label="Next slide"
            >
                <ChevronRight size={22} strokeWidth={1.5} />
            </button>

            {/* Bottom bar: dots + progress */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                {/* Dots */}
                <div className="flex items-center justify-center gap-5 pb-5">
                    {CAROUSEL_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { goTo(i); resetTimer(); }}
                            className={`carousel-dot h-[2px] transition-all duration-500 ${
                                i === current
                                    ? "w-10 bg-accent"
                                    : "w-4 bg-white/25 hover:bg-white/50"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
                {/* Progress bar */}
                <div className="h-[2px] w-full bg-white/5">
                    <div
                        ref={progressRef}
                        className="h-full bg-accent origin-left"
                        style={{ transform: "scaleX(0)" }}
                    />
                </div>
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — PRODUCT GRID
   Clean uniform grid. No editorial labels, no fancy hierarchy —
   just well-designed product cards in a responsive grid.
   ═══════════════════════════════════════════════════════════════════ */

const ProductShowcase = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"all" | "swapbook" | "workbook">("all");
    const { addItem } = useCart();
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchProducts();
                const filtered = (Array.isArray(data) ? data : []).filter(
                    (p: any) => !p.name?.toLowerCase().includes("e3") && !p.name?.toLowerCase().includes("entity")
                );
                setProducts(filtered);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // GSAP card entrance
    useEffect(() => {
        if (!sectionRef.current || loading) return;
        const ctx = gsap.context(() => {
            const cards = sectionRef.current!.querySelectorAll(".product-card");
            cards.forEach((card) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [loading, products, activeTab]);

    const handleAddToCart = (product: any) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.basePrice,
            image: getProductImage(product),
            quantity: 1,
            configuration: { processor: "Standard", ram: "Standard", storage: "Standard" },
        });
    };

    if (loading) {
        return (
            <section className="min-h-[50vh] flex flex-col items-center justify-center bg-bg space-y-5">
                <div className="w-10 h-10 border-2 border-ink/10 border-t-accent rounded-full animate-spin" />
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/30">Loading products</p>
            </section>
        );
    }

    const swapbooks = products.filter(p => p.name?.toLowerCase().includes("swapbook"));
    const workbooks = products.filter(p => p.name?.toLowerCase().includes("workbook"));

    return (
        <section ref={sectionRef} id="lineup" className="bg-bg py-20 md:py-28 px-5 md:px-10 lg:px-16">
            <div className="max-w-[82rem] mx-auto">
                {/* Main Section Heading */}
                <div className="text-center mb-12 md:mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-serif font-black italic tracking-tighter text-ink leading-[0.9]">
                        Choose Your Ention Laptop
                    </h2>
                    <p className="text-sm font-sans text-ink/50 max-w-xl mx-auto leading-relaxed">
                        Select between our high-performance flagship creator series and our ultra-reliable everyday professional series.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center items-center gap-3 mb-16 md:mb-20">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-5 py-2.5 text-[9px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                            activeTab === "all"
                                ? "bg-ink text-bg shadow-sm"
                                : "bg-ink/[0.03] text-ink/40 hover:bg-ink/[0.06] hover:text-ink"
                        }`}
                    >
                        All Laptops
                    </button>
                    <button
                        onClick={() => setActiveTab("swapbook")}
                        className={`px-5 py-2.5 text-[9px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                            activeTab === "swapbook"
                                ? "bg-accent text-white shadow-sm"
                                : "bg-ink/[0.03] text-ink/40 hover:bg-ink/[0.06] hover:text-ink"
                        }`}
                    >
                        Swapbook Series
                    </button>
                    <button
                        onClick={() => setActiveTab("workbook")}
                        className={`px-5 py-2.5 text-[9px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                            activeTab === "workbook"
                                ? "bg-blue-600 text-white shadow-sm"
                                : "bg-ink/[0.03] text-ink/40 hover:bg-ink/[0.06] hover:text-ink"
                        }`}
                    >
                        Workbook Series
                    </button>
                </div>

                {/* All Laptops Grid */}
                {activeTab === "all" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {products.map((product, i) => (
                            <ProductCard
                                key={product.id || i}
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                )}

                {/* Swapbook Series */}
                {swapbooks.length > 0 && activeTab === "swapbook" && (
                    <div>
                        <div className="border-b border-ink/10 pb-4 mb-8">
                            <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-ink tracking-tight flex items-center gap-3">
                                Swapbook Series
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-normal text-white px-2.5 py-0.5" style={{ backgroundColor: "#F27D26" }}>
                                    Flagship Performance
                                </span>
                            </h3>
                            <p className="text-xs font-sans text-ink/40 mt-1">
                                CNC-machined aluminum chassis, dedicated graphics, and brilliant displays for creators, developers, and power users.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                            {swapbooks.map((product, i) => (
                                <ProductCard
                                    key={product.id || i}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Workbook Series */}
                {workbooks.length > 0 && activeTab === "workbook" && (
                    <div>
                        <div className="border-b border-ink/10 pb-4 mb-8">
                            <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-ink tracking-tight flex items-center gap-3">
                                Workbook Series
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-normal text-white px-2.5 py-0.5" style={{ backgroundColor: "#3B82F6" }}>
                                    Everyday Productivity
                                </span>
                            </h3>
                            <p className="text-xs font-sans text-ink/40 mt-1">
                                Slim designs, exceptional battery life, and everyday reliability built for modern professional and student workflows.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                            {workbooks.map((product, i) => (
                                <ProductCard
                                    key={product.id || i}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};


/* ─── Product Card ───────────────────────────────────────────────── */

const ProductCard = ({
    product, onAddToCart
}: {
    product: any; onAddToCart: (p: any) => void;
}) => {
    const catName = typeof product.category === "object" ? product.category?.name : product.category;
    const accentColor = CATEGORY_ACCENTS[catName] || "#F27D26";
    const displayImage = getProductImage(product);

    return (
        <div className="product-card group">
            <div className="h-full bg-white border border-ink/8 overflow-hidden flex flex-col transition-all duration-500 hover:border-ink/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)]">

                {/* Image area */}
                <Link href={`/products/${product.slug || product.id}`} className="block relative bg-[#f7f7f6] overflow-hidden">
                    <div className="relative w-full aspect-[4/3]">
                        <Image
                            src={displayImage}
                            alt={product.name}
                            fill
                            className="object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-[1.04]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                    </div>

                    {/* Badge */}
                    {product.badge && (
                        <span
                            className="absolute top-4 left-4 text-[8px] font-mono uppercase tracking-[0.25em] font-bold text-white px-2.5 py-1"
                            style={{ backgroundColor: accentColor }}
                        >
                            {product.badge}
                        </span>
                    )}
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 md:p-7">
                    {/* Category + Name */}
                    <div className="mb-4">
                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] block mb-2" style={{ color: accentColor }}>
                            {catName}
                        </span>
                        <Link href={`/products/${product.slug || product.id}`}>
                            <h3 className="text-xl md:text-2xl font-serif font-bold italic tracking-tight text-ink leading-tight hover:text-accent transition-colors duration-300">
                                {product.name}
                            </h3>
                        </Link>
                    </div>

                    {/* Tagline */}
                    <p className="text-ink/45 font-sans text-[13px] leading-relaxed line-clamp-2 mb-5">
                        {product.tagline || product.description}
                    </p>

                    {/* Key specs pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {[product.specs?.cpu, product.specs?.ram, product.specs?.display].filter(Boolean).map((spec, i) => (
                            <span key={i} className="text-[8px] font-mono tracking-wider bg-ink/[0.04] text-ink/50 px-2 py-1">
                                {spec}
                            </span>
                        ))}
                    </div>

                    {/* Spacer to push price/CTA to bottom */}
                    <div className="mt-auto" />

                    {/* Price + CTA row */}
                    <div className="flex items-center justify-between pt-5 border-t border-ink/8">
                        <div>
                            <span className="text-[8px] font-mono uppercase tracking-wider text-ink/25 block">From</span>
                            <span className="text-lg font-serif italic font-bold text-ink">
                                ₹{product.basePrice?.toLocaleString("en-IN")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onAddToCart(product)}
                                className="group/btn bg-ink text-bg px-4 py-2.5 text-[9px] uppercase tracking-[0.15em] font-bold hover:bg-accent transition-colors duration-400 flex items-center gap-1.5"
                            >
                                Add to Cart
                                <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                            </button>
                            <Link
                                href={`/products/${product.slug || product.id}`}
                                className="text-[9px] font-mono uppercase tracking-wider text-ink/30 hover:text-accent px-2 py-2.5 transition-colors"
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — COMPARE TOOL
   Interactive side-by-side model comparison tool with dropdowns,
   difference highlighting, and rich specification groups.
   ═══════════════════════════════════════════════════════════════════ */

const COMPARE_MODELS = [
    {
        id: "s1",
        name: "Swapbook S1",
        badge: "Best Seller",
        price: "₹89,999",
        category: "Performance",
        cpu: "Intel Core i9-13900HK (14 Cores, up to 5.4 GHz)",
        gpu: "NVIDIA GeForce RTX 4060 (8GB GDDR6)",
        ram: "Up to 64GB DDR4 (Dual Channel)",
        storage: "Up to 2TB NVMe PCIe 4.0 SSD",
        display: "16\" QHD+ (2560x1600) 165Hz IPS, 500 nits",
        battery: "83Whr Lithium-Polymer (Up to 10 hrs)",
        weight: "2.1 kg (4.6 lbs)",
        build: "CNC Anodized Aluminum Chassis",
        ports: "1x Thunderbolt 4, 1x USB-C, 2x USB-A 3.2, HDMI 2.1",
    },
    {
        id: "e4",
        name: "Workbook E4",
        badge: "Pro Pick",
        price: "₹68,999",
        category: "Business",
        cpu: "Intel Core i7-13620H (10 Cores, up to 4.9 GHz)",
        gpu: "Intel Iris Xe Graphics",
        ram: "Up to 64GB DDR4 (Dual Channel)",
        storage: "Up to 2TB PCIe 3.0 SSD",
        display: "15.6\" FHD (1920x1080) 60Hz IPS, 300 nits",
        battery: "70Whr Lithium-Polymer (Up to 12 hrs)",
        weight: "1.75 kg (3.8 lbs)",
        build: "Aluminum Top, Premium Composite Base",
        ports: "1x USB-C (PD & DP), 2x USB-A 3.2, HDMI 1.4",
    },
    {
        id: "e5",
        name: "Workbook E5",
        badge: "Value Focus",
        price: "₹31,999",
        category: "Universal",
        cpu: "Intel Processor N95 (4 Cores, up to 3.4 GHz)",
        gpu: "Intel UHD Graphics",
        ram: "Up to 32GB LPDDR5",
        storage: "Up to 1TB M.2 SATA/NVMe SSD",
        display: "15.6\" FHD (1920x1080) 60Hz IPS, 250 nits",
        battery: "50Whr Lithium-Polymer (Up to 7 hrs)",
        weight: "1.65 kg (3.6 lbs)",
        build: "Reinforced Composite Matte Finish",
        ports: "1x USB-C (Data), 2x USB-A 3.0, HDMI 1.4, Audio Jack",
    },
    {
        id: "e1",
        name: "Workbook E1",
        badge: "Mobility First",
        price: "₹19,999",
        category: "Mobility",
        cpu: "Intel Processor N100 (4 Cores, up to 3.4 GHz)",
        gpu: "Intel UHD Graphics",
        ram: "Up to 32GB LPDDR5",
        storage: "Up to 1TB M.2 SSD",
        display: "14.1\" FHD (1920x1080) 60Hz IPS, 220 nits",
        battery: "38Whr Lithium-Polymer (Up to 6 hrs)",
        weight: "1.35 kg (2.9 lbs)",
        build: "Ultra-Light Composite Chassis",
        ports: "1x USB-C (Data), 1x USB-A 3.0, 1x USB-A 2.0, HDMI, Audio Jack",
    },
];

const SPEC_GROUPS = [
    {
        group: "Performance",
        specs: [
            { label: "Processor", key: "cpu" },
            { label: "Graphics", key: "gpu" },
            { label: "Memory", key: "ram" },
            { label: "Storage", key: "storage" },
        ]
    },
    {
        group: "Display & Design",
        specs: [
            { label: "Display Size & Panel", key: "display" },
            { label: "Chassis & Build", key: "build" },
            { label: "Weight", key: "weight" },
        ]
    },
    {
        group: "Power & Connectivity",
        specs: [
            { label: "Battery Capacity", key: "battery" },
            { label: "I/O Ports", key: "ports" },
        ]
    },
    {
        group: "Pricing",
        specs: [
            { label: "Starting Price", key: "price" },
        ]
    }
];

const CompareTable = () => {
    const tableRef = useRef<HTMLElement>(null);
    const [selectedDesktop, setSelectedDesktop] = useState(["s1", "e4", "e5"]);
    const [selectedMobile, setSelectedMobile] = useState(["s1", "e4"]);
    const [highlightDiffs, setHighlightDiffs] = useState(false);

    useEffect(() => {
        if (!tableRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(tableRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: tableRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, tableRef);
        return () => ctx.revert();
    }, []);

    const checkDiff = (key: string, selectedIds: string[]) => {
        const values = selectedIds.map(id => {
            const model = COMPARE_MODELS.find(m => m.id === id);
            return model ? (model[key as keyof typeof model] || "") : "";
        });
        return new Set(values).size > 1;
    };

    return (
        <section ref={tableRef} className="bg-bg px-5 md:px-12 lg:px-16 py-24 md:py-36 border-t border-ink/5">
            <div className="max-w-[88rem] mx-auto">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-serif font-black italic tracking-tighter text-ink leading-[0.9]">
                            Compare Models
                        </h2>
                        <p className="text-sm font-sans text-ink/50 leading-relaxed">
                            Select models side-by-side to compare performance specifications, display quality, chassis construction, and battery capabilities.
                        </p>
                    </div>
                    
                    {/* Highlight Differences Switch */}
                    <div className="flex">
                        <button
                            onClick={() => setHighlightDiffs(!highlightDiffs)}
                            className="group flex items-center gap-3 bg-white hover:bg-ink/[0.02] border border-ink/10 rounded-full px-4.5 py-2 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-98"
                        >
                            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${highlightDiffs ? "bg-accent" : "bg-ink/15"}`}>
                                <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${highlightDiffs ? "translate-x-4" : "translate-x-0"}`} />
                            </div>
                            <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-ink/60 group-hover:text-ink transition-colors">
                                Highlight Differences
                            </span>
                        </button>
                    </div>
                </div>

                {/* Desktop Table (Visible on md and up) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-ink/10">
                                <th className="py-6 pr-8 text-left w-[180px] align-bottom">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ink/30">Specifications</span>
                                </th>
                                {selectedDesktop.map((id, index) => {
                                    const model = COMPARE_MODELS.find(m => m.id === id)!;
                                    return (
                                        <th key={index} className="py-6 px-6 text-center w-1/4 align-bottom">
                                            <div className="flex flex-col items-center space-y-4">
                                                {/* Laptop Image */}
                                                <div className="relative w-28 h-20 bg-[#f7f7f6] overflow-hidden flex items-center justify-center p-2 border border-ink/5">
                                                    <Image
                                                        src={CATALOG_IMAGES[model.id] || "/assets/all_product_page/e4-cat.png"}
                                                        alt={model.name}
                                                        fill
                                                        className="object-contain p-2"
                                                        sizes="112px"
                                                    />
                                                </div>
                                                {/* Dropdown Selector */}
                                                <div className="w-full px-2 relative">
                                                    <select
                                                        value={id}
                                                        onChange={(e) => {
                                                            const next = [...selectedDesktop];
                                                            next[index] = e.target.value;
                                                            setSelectedDesktop(next);
                                                        }}
                                                        className="w-full bg-transparent text-center border-b border-ink/10 hover:border-ink/30 text-base font-serif font-bold italic py-1 focus:outline-none focus:border-accent text-ink cursor-pointer transition-colors"
                                                    >
                                                        {COMPARE_MODELS.map(m => (
                                                            <option key={m.id} value={m.id} className="bg-bg text-ink font-sans text-sm">{m.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {model.badge ? (
                                                    <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-accent bg-accent/10 px-2 py-0.5 inline-block">
                                                        {model.badge}
                                                    </span>
                                                ) : (
                                                    <span className="h-4.5 block" />
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {SPEC_GROUPS.map((group, gIdx) => (
                                <React.Fragment key={gIdx}>
                                    {/* Group Header */}
                                    <tr className="bg-ink/[0.015] border-y border-ink/5">
                                        <td colSpan={4} className="py-2.5 px-4 text-left">
                                            <span className="text-[9px] font-mono uppercase tracking-[0.4em] font-bold text-ink/35">
                                                {group.group}
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Group Specs */}
                                    {group.specs.map((spec) => {
                                        const isDiff = highlightDiffs && checkDiff(spec.key, selectedDesktop);
                                        return (
                                            <tr
                                                key={spec.key}
                                                className={`border-b border-ink/5 transition-all duration-300 ${
                                                    isDiff ? "bg-accent/[0.025] border-l-2 border-l-accent" : ""
                                                }`}
                                            >
                                                <td className="py-4.5 pr-8 pl-4 text-left align-top">
                                                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink/40 font-bold block mt-0.5">
                                                        {spec.label}
                                                    </span>
                                                </td>
                                                {selectedDesktop.map((id, index) => {
                                                    const model = COMPARE_MODELS.find(m => m.id === id)!;
                                                    const value = model[spec.key as keyof typeof model] || "—";
                                                    const isPrice = spec.key === "price";
                                                    return (
                                                        <td
                                                            key={index}
                                                            className={`py-4.5 px-6 text-left align-top ${
                                                                isPrice
                                                                    ? "font-serif italic font-bold text-base text-ink"
                                                                    : "text-[13px] font-sans text-ink/75 leading-relaxed"
                                                            }`}
                                                        >
                                                            {value}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                            {/* CTA Row */}
                            <tr>
                                <td className="py-8 pr-8" />
                                {selectedDesktop.map((id, index) => (
                                    <td key={index} className="py-8 px-6 text-left">
                                        <Link
                                            href={`/products/${id}`}
                                            className="group inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-ink hover:text-accent border-b border-ink/15 hover:border-accent pb-0.5 transition-all duration-300"
                                        >
                                            View Details
                                            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Mobile View (Visible on screens smaller than md) */}
                <div className="md:hidden space-y-6">
                    {/* Dropdowns for Column 1 and Column 2 side-by-side */}
                    <div className="grid grid-cols-2 gap-4 border-b border-ink/10 pb-6">
                        {selectedMobile.map((id, index) => {
                            const model = COMPARE_MODELS.find(m => m.id === id)!;
                            return (
                                <div key={index} className="flex flex-col items-center space-y-3">
                                    <div className="relative w-24 h-16 bg-[#f7f7f6] overflow-hidden flex items-center justify-center p-1 border border-ink/5">
                                        <Image
                                            src={CATALOG_IMAGES[model.id] || "/assets/all_product_page/e4-cat.png"}
                                            alt={model.name}
                                            fill
                                            className="object-contain p-1"
                                            sizes="96px"
                                        />
                                    </div>
                                    <select
                                        value={id}
                                        onChange={(e) => {
                                            const next = [...selectedMobile];
                                            next[index] = e.target.value;
                                            setSelectedMobile(next);
                                        }}
                                        className="w-full bg-transparent text-center border-b border-ink/10 text-sm font-serif font-bold italic py-1 focus:outline-none focus:border-accent text-ink cursor-pointer"
                                    >
                                        {COMPARE_MODELS.map(m => (
                                            <option key={m.id} value={m.id} className="bg-bg text-ink font-sans text-xs">{m.name}</option>
                                        ))}
                                    </select>
                                    <span className="text-xs font-serif italic font-bold text-ink">
                                        {model.price}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Specs list stacked */}
                    <div className="space-y-4">
                        {SPEC_GROUPS.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-2">
                                <div className="bg-ink/[0.015] py-2 px-3">
                                    <span className="text-[8px] font-mono uppercase tracking-[0.3em] font-bold text-ink/40">
                                        {group.group}
                                    </span>
                                </div>
                                {group.specs.map((spec) => {
                                    const isDiff = highlightDiffs && checkDiff(spec.key, selectedMobile);
                                    return (
                                        <div
                                            key={spec.key}
                                            className={`p-3 border-b border-ink/5 transition-all duration-300 ${
                                                isDiff ? "bg-accent/[0.02] border-l-2 border-l-accent" : ""
                                            }`}
                                        >
                                            <span className="text-[9px] font-mono uppercase tracking-wider text-ink/35 block mb-1">
                                                {spec.label}
                                            </span>
                                            <div className="grid grid-cols-2 gap-4">
                                                {selectedMobile.map((id, index) => {
                                                    const model = COMPARE_MODELS.find(m => m.id === id)!;
                                                    const value = model[spec.key as keyof typeof model] || "—";
                                                    const isPrice = spec.key === "price";
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`${
                                                                isPrice
                                                                    ? "font-serif italic font-bold text-sm text-ink"
                                                                    : "text-xs font-sans text-ink/75 leading-relaxed"
                                                            }`}
                                                        >
                                                            {value}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Mobile CTA Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        {selectedMobile.map((id, index) => (
                            <Link
                                key={index}
                                href={`/products/${id}`}
                                className="group flex items-center justify-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-accent py-3 border border-accent/20 hover:bg-accent/[0.02] transition-colors"
                            >
                                Details
                                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════ */

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-bg selection:bg-accent selection:text-bg">
            <HeroCarousel />
            <ProductShowcase />
            <CompareTable />
        </main>
    );
}
