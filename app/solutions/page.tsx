"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsPage() {
    const [activeForm, setActiveForm] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState("right");

    // Interactive Configurator states for solutions cards
    const [selectedRam, setSelectedRam] = useState("16GB");
    const [selectedCpu, setSelectedCpu] = useState("Ultra 7");
    const [selectedColor, setSelectedColor] = useState("charcoal");

    const mainRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const howItWorksRef = useRef<HTMLElement>(null);
    const horizontalSectionRef = useRef<HTMLElement>(null);
    const panelsContainerRef = useRef<HTMLDivElement>(null);
    const whyRef = useRef<HTMLElement>(null);
    const deploymentRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    const slides = [
        {
            title: "Build Innovation Ecosystems, Not Just Infrastructure",
            sub: "Ention combines hardware, deployment, ecosystem programs, and long-term support to transform technology into real-world outcomes.",
            photo: "/assets/landing_page/stud.png"
        },
        {
            title: "Beyond Devices — Built Around Growth",
            sub: "From innovation labs to startup ecosystems and enterprise deployment, our solutions are designed to support growth at every stage.",
            photo: "/assets/landing_page/prof.png"
        },
        {
            title: "Flexible Solutions. Custom-Built for Your Needs.",
            sub: "Whether you need institutional deployment, enterprise infrastructure, or white-label device programs — Ention adapts to your requirements.",
            photo: "/assets/landing_page/final-cta.png"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideDirection("right");
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const changeSlide = (idx: number) => {
        setSlideDirection(idx > currentSlide ? "right" : "left");
        setCurrentSlide(idx);
    };

    const howItWorks = [
        { title: "Share Your Requirements", desc: "Share details about your team size, custom hardware configuration needs, and deployment scope." },
        { title: "Receive a Tailored Solution", desc: "Our engineering and operations teams will structure a custom device, pricing, and support roadmap." },
        { title: "Deployment & Onboarding", desc: "We handle the logistics, device setup, custom OS configurations, and team/lab onboarding." },
        { title: "Ongoing Support & Scaling", desc: "Access direct hardware engineering support, lifecycle upgrades, and scalable financing models as you expand." }
    ];

    const solutionsList = [
        {
            id: "s1",
            title: "Innovation Labs & Institutional Programs",
            target: "For universities, schools, AI labs, and research centers.",
            highlights: [
                "End-to-end lab setup",
                "AI & development environments",
                "Workshops & internship integration",
                "Institutional deployment support"
            ],
            cta: "Discuss Your Lab Setup"
        },
        {
            id: "s2",
            title: "Educational Institution Solutions",
            target: "For colleges, training institutes, and academic organizations.",
            highlights: [
                "Affordable performance laptops",
                "Smart device management",
                "Institutional branding",
                "Lab-ready configurations"
            ],
            cta: "Discuss Your Requirements"
        },
        {
            id: "s3",
            title: "Enterprise & Organizational Solutions",
            target: "For corporates, SMEs, and growing teams.",
            highlights: [
                "Custom hardware configurations",
                "Leasing & AMC options",
                "Lifecycle IT support",
                "Try-before-buy programs"
            ],
            cta: "Request Enterprise Solution"
        },
        {
            id: "s4",
            title: "Co-Creation & White-Label Solutions",
            target: "For: Startups, enterprises, and brands launching their own devices",
            highlights: [
                "White-label laptop programs",
                "Dedicated production batches",
                "Hardware & software co-creation",
                "Dedicated after-sales support"
            ],
            cta: "Start Collaboration"
        },
        {
            id: "e1",
            title: "Startup Ecosystem Partnerships",
            target: "For incubators, accelerators, innovation hubs, and ecosystem partners.",
            highlights: [
                "Startup device access programs",
                "Financing & leasing integration",
                "Co-branded ecosystem initiatives",
                "Partner deployment support"
            ],
            cta: "Partner With Ention"
        },
        {
            id: "e2",
            title: "Campus Ambassador Program (ECAP)",
            target: "For students and campus communities.",
            highlights: [
                "Leadership opportunities",
                "Certificates & rewards",
                "Internship & PPO pathways",
                "Industry exposure"
            ],
            cta: "Apply Now"
        }
    ];

    const whyChooseUs = [
        "Hardware + ecosystem approach",
        "Flexible customization",
        "Long-term support",
        "Financing & leasing options",
        "Scalable deployment capability",
        "India-focused cost optimization"
    ];

    const deploymentModels = [
        { title: "Direct Purchase", desc: "Buy device batches outright with customizable specs and direct corporate warranties." },
        { title: "Lab-as-a-Service", desc: "A flexible subscription model to deploy fully managed hardware labs with zero upfront CAPEX." },
        { title: "Leasing & EMI Options", desc: "Spread procurement budgets across seasonal quarters with tailored enterprise financing." },
        { title: "Co-Branded Partnerships", desc: "Jointly establish institutional programs, startup accelerators, or custom hardware labs." }
    ];

    const relatedSolutions = [
        { id: "s1", name: "Innovation Labs & Institutional Enablement" },
        { id: "s2", name: "Education Solutions" },
        { id: "s3", name: "Enterprise & Organizational Solutions" },
        { id: "s4", name: "Co-Creation & White-Label Solutions" },
        { id: "e1", name: "Startup Ecosystem Partnerships" },
        { id: "e2", name: "Campus Ambassador Program (ECAP)" }
    ];

    // S3 Configurator pricing helper
    const calculatePrice = () => {
        let base = 59900;
        if (selectedRam === "32GB") base += 10000;
        if (selectedRam === "64GB") base += 25000;
        if (selectedCpu === "Ultra 9") base += 15000;
        return base.toLocaleString("en-IN");
    };

    useEffect(() => {
        if (typeof window === "undefined" || !mainRef.current) return;

        const ctx = gsap.context(() => {
            
            // ── 1. How It Works Timeline (Autoplay Per-Card - triggered at top 75% for right timing) ──
            if (howItWorksRef.current) {
                gsap.fromTo(".hiw-central-line", 
                    { scaleX: 0 }, 
                    { 
                        scaleX: 1, 
                        duration: 1, 
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: howItWorksRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    }
                );

                const hiwCards = howItWorksRef.current.querySelectorAll(".hiw-card-trigger");
                hiwCards.forEach((card: any) => {
                    const topBorder = card.querySelector(".hiw-border-top");
                    const rightBorder = card.querySelector(".hiw-border-right");
                    const bottomBorder = card.querySelector(".hiw-border-bottom");
                    const leftBorder = card.querySelector(".hiw-border-left");
                    const fillBlock = card.querySelector(".hiw-card-fill");
                    const content = card.querySelector(".hiw-card-content");

                    gsap.set([topBorder, bottomBorder], { scaleX: 0 });
                    gsap.set([rightBorder, leftBorder, fillBlock], { scaleY: 0 });
                    gsap.set(content, { opacity: 0, y: 25 });

                    const cardTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top 75%", // Card top hits 75% of viewport to prevent animating too soon
                            toggleActions: "play none none none"
                        }
                    });

                    cardTl.to(topBorder, { scaleX: 1, duration: 0.15, ease: "none" })
                          .to(rightBorder, { scaleY: 1, duration: 0.15, ease: "none" })
                          .to(bottomBorder, { scaleX: 1, duration: 0.15, ease: "none" })
                          .to(leftBorder, { scaleY: 1, duration: 0.15, ease: "none" })
                          .to(fillBlock, { scaleY: 1, duration: 0.25, ease: "power2.out" })
                          .to(content, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, "-=0.15");
                });
            }

            // ── 2. PINNED HORIZONTAL SCROLL TIMELINE (S1-S4: Dark bg, E1-E2: Light bg flooded smoothly) ──
            if (horizontalSectionRef.current && panelsContainerRef.current) {
                const panels = panelsContainerRef.current.querySelectorAll(".scroll-panel");
                const totalPanels = panels.length;

                // Pre-configure initial states
                panels.forEach((panel) => {
                    const titleText = panel.querySelector(".panel-title");
                    const targetText = panel.querySelector(".panel-target");
                    const ctaBtn = panel.querySelector(".panel-cta");
                    const panelContent = panel.querySelector(".panel-card-content");
                    const items = panel.querySelectorAll(".card-item");
                    const dashboard = panel.querySelector(".panel-dashboard-container");

                    gsap.set([titleText, targetText, ctaBtn, panelContent], { opacity: 0 });
                    if (items.length > 0) gsap.set(items, { opacity: 0 });
                    if (dashboard) gsap.set(dashboard, { opacity: 0, y: 20 });
                });

                // Configure flood fill circle starting state
                gsap.set(".s-e-flood-fill", { scale: 0 });

                const pinTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: horizontalSectionRef.current,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${totalPanels * window.innerWidth * 1.2}`,
                        invalidateOnRefresh: true,
                    }
                });

                // Sequential panel build
                panels.forEach((panel, index) => {
                    const titleText = panel.querySelector(".panel-title");
                    const targetText = panel.querySelector(".panel-target");
                    const ctaBtn = panel.querySelector(".panel-cta");
                    const panelContent = panel.querySelector(".panel-card-content");
                    const items = panel.querySelectorAll(".card-item");
                    const dashboard = panel.querySelector(".panel-dashboard-container");

                    // Slide the panels track wrapper
                    if (index > 0) {
                        pinTl.to(panelsContainerRef.current, {
                            x: -(index * window.innerWidth),
                            duration: 1.5,
                            ease: "power2.inOut"
                        });
                    }

                    // For index 4 (E1 / Startup Ecosystem slide), flood the background to sandstone cream
                    if (index === 4) {
                        pinTl.to(".s-e-flood-fill", {
                            scale: 1.2,
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, "-=1.5");
                    }

                    // Animate the details
                    pinTl.fromTo(titleText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
                         .fromTo(targetText, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.2")
                         .fromTo(panelContent, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");

                    if (items.length > 0) {
                        pinTl.fromTo(items, 
                            { opacity: 0, x: 20 }, 
                            { opacity: 1, x: 0, duration: 0.25, stagger: 0.05 }, 
                            "-=0.2"
                        );
                    }

                    // Animate the UI mockups/dashboards
                    if (dashboard) {
                        pinTl.to(dashboard, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        }, "-=0.2");
                    }

                    pinTl.fromTo(ctaBtn, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 }, "-=0.15");

                    // Read pause
                    pinTl.to({}, { duration: 1.2 });
                });
            }

            // ── 3. Why Ention Section Timeline (Per-Card Autoplay - NO SCRUB) ──
            if (whyRef.current) {
                const gridItems = whyRef.current.querySelectorAll(".why-grid-item");
                gridItems.forEach((item: any) => {
                    const topB = item.querySelector(".why-b-top");
                    const rightB = item.querySelector(".why-b-right");
                    const bottomB = item.querySelector(".why-b-bottom");
                    const leftB = item.querySelector(".why-b-left");
                    const fill = item.querySelector(".why-fill");
                    const content = item.querySelector(".why-content");

                    gsap.set([topB, bottomB], { scaleX: 0 });
                    gsap.set([rightB, leftB], { scaleY: 0 });
                    gsap.set(fill, { scaleX: 0 });
                    gsap.set(content, { opacity: 0, x: -20 });

                    const itemTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            toggleActions: "play none none none"
                        }
                    });

                    itemTl.to(topB, { scaleX: 1, duration: 0.15, ease: "none" })
                          .to(rightB, { scaleY: 1, duration: 0.15, ease: "none" })
                          .to(bottomB, { scaleX: 1, duration: 0.15, ease: "none" })
                          .to(leftB, { scaleY: 1, duration: 0.15, ease: "none" })
                          .to(fill, { scaleX: 1, duration: 0.25, ease: "power2.out" })
                          .to(content, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, "-=0.15");
                });
            }

            // ── 4. Deployment Models Timeline (Per-Card Autoplay - NO SCRUB) ──
            if (deploymentRef.current) {
                const vlines = deploymentRef.current.querySelectorAll(".dep-vline");
                gsap.set(vlines, { scaleY: 0 });
                gsap.to(vlines, {
                    scaleY: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: deploymentRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });

                const depCards = deploymentRef.current.querySelectorAll(".dep-card-trigger");
                depCards.forEach((card: any) => {
                    const fill = card.querySelector(".dep-card-fill");
                    const content = card.querySelector(".dep-card-content");

                    gsap.set(fill, { scaleY: 0 });
                    gsap.set(content, { opacity: 0, y: 20 });

                    const cardTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none none"
                        }
                    });

                    cardTl.to(fill, { scaleY: 1, duration: 0.35, ease: "power2.out" })
                          .to(content, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, "-=0.15");
                });
            }

            // ── 5. CTA Section Timeline (Autoplay Flood-Fill - NO SCRUB) ──
            if (ctaRef.current) {
                const orangeBlock = ctaRef.current.querySelector(".cta-orange-block");
                const wireframe = ctaRef.current.querySelector(".cta-wireframe");
                const text = ctaRef.current.querySelector(".cta-text");

                gsap.set(orangeBlock, { scale: 0, borderRadius: "100%" });
                gsap.set(wireframe, { scale: 0.95, opacity: 0 });
                gsap.set(text, { opacity: 0, y: 30 });

                const ctaTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });

                ctaTl.to(orangeBlock, { scale: 15, borderRadius: "0%", duration: 1.2, ease: "power3.inOut" })
                     .to(wireframe, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
                     .to(text, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5");
            }

            // Recalculate ScrollTrigger offsets in multiple phases to handle layout shifts
            const refreshAll = () => {
                ScrollTrigger.refresh();
            };
            
            refreshAll();
            
            const t1 = setTimeout(refreshAll, 200);
            const t2 = setTimeout(refreshAll, 600);
            const t3 = setTimeout(refreshAll, 1200);
            const t4 = setTimeout(refreshAll, 2500);

            if (document.readyState === "complete") {
                refreshAll();
            } else {
                window.addEventListener("load", refreshAll);
            }

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearTimeout(t4);
                window.removeEventListener("load", refreshAll);
            };

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-accent selection:text-white relative">
            <FormModal isOpen={activeForm} onClose={() => setActiveForm(false)}>
                <LeadSalesForm source="Solutions Page Core Inquiry" onSuccess={() => setActiveForm(false)} />
            </FormModal>

            {/* ── 1. HERO SECTION (Simple Carousel with Text & Photo Slate) ───────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-[90vh] bg-bg text-ink flex flex-col justify-center px-8 lg:px-16 pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-x-8 top-32 bottom-20 border border-ink/10 pointer-events-none z-0 origin-center">
                    <div className="absolute -top-2 -left-2 text-ink/30 font-mono text-xs font-light select-none">+</div>
                    <div className="absolute -top-2 -right-2 text-ink/30 font-mono text-xs font-light select-none">+</div>
                    <div className="absolute -bottom-2 -left-2 text-ink/30 font-mono text-xs font-light select-none">+</div>
                    <div className="absolute -bottom-2 -right-2 text-ink/30 font-mono text-xs font-light select-none">+</div>
                    <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-ink/5" />
                    <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-ink/5" />
                </div>

                <div className="max-w-[1100px] mx-auto w-full relative z-10">
                    <div className="min-h-[420px] flex flex-col justify-center relative overflow-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                            >
                                {/* Left column: Editorial text */}
                                <div className="lg:col-span-7 space-y-6 text-left hero-text-content">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent block">
                                        Solution Profile {currentSlide + 1}
                                    </span>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter leading-[1.05] max-w-2xl text-ink">
                                        {slides[currentSlide].title}
                                    </h1>
                                    <p className="text-ink/75 text-lg md:text-xl font-sans max-w-xl leading-relaxed">
                                        {slides[currentSlide].sub}
                                    </p>
                                </div>

                                {/* Right column: Overlapping floating device slate */}
                                <div className="lg:col-span-5 relative h-[380px] w-full flex items-center justify-center lg:justify-end">
                                    <div className="absolute inset-y-0 right-0 left-0 lg:left-[-10%] border border-ink/10 rounded-sm bg-white/20 backdrop-blur-sm z-0 pointer-events-none" />
                                    
                                    <div className="relative z-10 w-full max-w-[340px] h-[280px] bg-ink text-bg rounded-sm shadow-2xl p-6 flex flex-col justify-between border border-white/10 origin-center translate-x-4 translate-y-4 hover:translate-x-0 hover:translate-y-0 transition-transform duration-500 group">
                                        {/* Telemetry data */}
                                        <div className="flex justify-between items-center border-b border-white/10 pb-3 font-mono text-[9px] text-white/40 uppercase tracking-wider">
                                            <span>SYS_REF: {currentSlide === 0 ? "STUD_01" : currentSlide === 1 ? "PROF_02" : "WHT_LBL"}</span>
                                            <span>[X: 840, Y: 120]</span>
                                        </div>

                                        {/* Photo space */}
                                        <div className="relative w-full h-[160px] my-3 overflow-hidden bg-black/40 rounded-sm flex items-center justify-center">
                                            {slides[currentSlide].photo ? (
                                                <img
                                                    src={slides[currentSlide].photo}
                                                    alt={slides[currentSlide].title}
                                                    className="w-full h-full object-cover opacity-85 grayscale group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full border border-accent/30 animate-ping" />
                                            )}
                                        </div>

                                        {/* Status metrics */}
                                        <div className="flex justify-between items-center font-mono text-[9px] text-white/50 uppercase tracking-widest pt-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                                <span>Active Node</span>
                                            </div>
                                            <span>v2.4_core</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex gap-4 pt-6 border-t border-ink/10 w-max z-10 relative">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => changeSlide(idx)}
                                className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${currentSlide === idx ? "w-12 bg-accent" : "w-4 bg-ink/20 hover:bg-ink/40"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 2. HOW IT WORKS ───────────────────────────────────────── */}
            <section ref={howItWorksRef} className="py-28 lg:py-36 px-8 relative bg-bg text-ink overflow-hidden border-t border-ink/10">
                <div className="hiw-central-line absolute top-[16%] left-0 right-0 h-[2px] bg-accent/30 origin-left z-0" />

                <div className="max-w-[1200px] mx-auto space-y-20 relative z-10">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink">
                            HOW IT WORKS
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((step, i) => (
                            <div key={i} className="hiw-card-trigger relative h-full min-h-[220px]">
                                <div className="hiw-border-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left z-10" />
                                <div className="hiw-border-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top z-10" />
                                <div className="hiw-border-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right z-10" />
                                <div className="hiw-border-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom z-10" />

                                <div className="hiw-card-fill absolute inset-0 bg-white origin-top z-0 transition-colors duration-500 hover:bg-white/90" />

                                <div className="hiw-card-content p-8 relative z-10 space-y-5 h-full flex flex-col justify-between">
                                    <div className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent font-mono text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-sans font-bold text-base uppercase tracking-tight text-ink leading-tight">
                                            {step.title}
                                        </h4>
                                        <p className="text-xs text-ink/70 font-sans leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. PINNED HORIZONTAL SCROLL SECTION (Cinematic Dark Canvas with Smooth Theme Transition) ── */}
            <section ref={horizontalSectionRef} className="relative overflow-hidden bg-ink text-bg">
                {/* Expanding circle flood fill background transition */}
                <div className="s-e-flood-fill absolute w-[200vmax] h-[200vmax] rounded-full bg-bg z-0 pointer-events-none origin-center" style={{ transform: "scale(0)", left: "50%", top: "50%", translate: "-50% -50%" }} />

                <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                    <div ref={panelsContainerRef} className="flex flex-row h-full w-[600vw] items-stretch flex-nowrap relative z-10">
                        
                        {solutionsList.map((s, idx) => {
                            const isEcosystem = s.id.startsWith("e");
                            return (
                                <div key={s.id} className="scroll-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden border-r border-white/5">
                                    <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
                                        <svg width="100%" height="100%">
                                            <pattern id={`grid-${s.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                            </pattern>
                                            <rect width="100%" height="100%" fill={`url(#grid-${s.id})`} />
                                        </svg>
                                    </div>

                                    <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                                        
                                        {/* Left Side */}
                                        <div className="lg:col-span-6 space-y-6 text-left">
                                            <h3 className={`panel-title text-3xl md:text-4xl lg:text-5xl font-serif font-black italic tracking-tighter leading-tight ${isEcosystem ? "text-ink" : "text-bg"}`}>
                                                {s.title}
                                            </h3>
                                            <p className="panel-target text-xs font-sans font-bold text-accent uppercase tracking-widest">
                                                {s.target}
                                            </p>
                                            <div className="panel-cta pt-6">
                                                <Link
                                                    href={`/solutions/${s.id}`}
                                                    className="relative overflow-hidden z-10 bg-transparent border border-accent text-accent hover:text-white px-8 py-4.5 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 rounded-sm group/btn flex items-center justify-between gap-4 cursor-pointer w-max shadow-sm"
                                                >
                                                    <span className="absolute inset-0 bg-accent -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                                    <span className="relative z-10">{s.cta}</span>
                                                    <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Right Side: Editorial outline card layout matching in both light and dark */}
                                        <div className={`lg:col-span-6 relative min-h-[340px] rounded-sm overflow-hidden flex flex-col justify-center w-full ${isEcosystem ? "border border-ink/10 bg-ink/[0.01] text-ink" : "border border-white/10 bg-white/[0.02] text-bg"} panel-card-content`}>
                                            <div className="p-8 lg:p-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                                
                                                {/* Left half: Highlights checklist */}
                                                <div className="space-y-6 text-left">
                                                    <span className={`font-mono text-[10px] text-accent uppercase tracking-widest block border-b pb-3 ${isEcosystem ? "border-ink/10" : "border-white/10"}`}>
                                                        Highlights
                                                    </span>
                                                    <ul className="space-y-4">
                                                        {s.highlights.map((item, idx) => (
                                                            <li key={idx} className="card-item flex items-start gap-3 text-xs font-sans leading-relaxed">
                                                                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Right half: Live Interactive UI mockups/dashboards (NO AI SVGs) */}
                                                <div className={`flex items-center justify-center h-full min-h-[180px] border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 relative overflow-hidden panel-dashboard-container ${isEcosystem ? "border-ink/10" : "border-white/10"}`}>
                                                    
                                                    {/* S1: Code Editor mockup */}
                                                    {s.id === "s1" && (
                                                        <div className="w-full bg-black/40 text-white/90 rounded-md border border-white/10 p-4 font-mono text-[9px] text-left leading-normal space-y-2 select-none shadow-lg">
                                                            <div className="flex gap-1.5 pb-2 border-b border-white/5 mb-2">
                                                                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                                                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                                                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                                                            </div>
                                                            <p className="text-white/40">&gt; ention-lab --init-success</p>
                                                            <p className="text-accent">[OK] hardware_detected</p>
                                                            <p className="text-green-400">[OK] AI_core_loaded: active</p>
                                                            <div className="h-6 overflow-hidden flex items-end">
                                                                <p className="text-white/30 animate-pulse">monitoring_sys_v2.4_active...</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* S2: Student Device Manager dashboard */}
                                                    {s.id === "s2" && (
                                                        <div className="w-full bg-black/40 text-white/90 rounded-md border border-white/10 p-4 font-mono text-[9px] text-left leading-normal space-y-3 select-none shadow-lg">
                                                            <span className="text-white/40 uppercase tracking-wider block border-b border-white/5 pb-1.5 font-bold">Lab Fleet status</span>
                                                            <div className="space-y-1.5">
                                                                <div className="flex justify-between">
                                                                    <span>node_01_stud:</span>
                                                                    <span className="text-green-400">92% online</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>node_02_lab:</span>
                                                                    <span className="text-green-400">86% online</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>node_03_sys:</span>
                                                                    <span className="text-accent animate-pulse">updating (45%)</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* S3: Clickable Enterprise spec configurator */}
                                                    {s.id === "s3" && (
                                                        <div className="w-full bg-black/40 text-white/90 rounded-md border border-white/10 p-4 font-sans text-[9px] text-left leading-normal space-y-3 select-none shadow-lg">
                                                            <div className="border-b border-white/5 pb-2">
                                                                <span className="text-white/40 font-mono text-[8px] uppercase tracking-wider block">Est. Core Configuration</span>
                                                                <span className="text-base font-serif italic text-accent font-black tracking-tight mt-0.5 block">₹{calculatePrice()}</span>
                                                            </div>
                                                            <div className="space-y-2">
                                                                {/* RAM selector */}
                                                                <div className="space-y-1">
                                                                    <span className="text-white/40 font-mono text-[7px] uppercase">Select RAM:</span>
                                                                    <div className="flex gap-2">
                                                                        {["16GB", "32GB", "64GB"].map((ram) => (
                                                                            <button
                                                                                key={ram}
                                                                                onClick={() => setSelectedRam(ram)}
                                                                                className={`px-2 py-0.5 border text-[7px] rounded-sm uppercase tracking-widest cursor-pointer transition-all duration-300 ${selectedRam === ram ? "border-accent text-accent bg-accent/10" : "border-white/10 text-white/60 hover:border-white/30"}`}
                                                                            >
                                                                                {ram}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                {/* CPU selector */}
                                                                <div className="space-y-1">
                                                                    <span className="text-white/40 font-mono text-[7px] uppercase">Select CPU:</span>
                                                                    <div className="flex gap-2">
                                                                        {["Ultra 7", "Ultra 9"].map((cpu) => (
                                                                            <button
                                                                                key={cpu}
                                                                                onClick={() => setSelectedCpu(cpu)}
                                                                                className={`px-2 py-0.5 border text-[7px] rounded-sm uppercase tracking-widest cursor-pointer transition-all duration-300 ${selectedCpu === cpu ? "border-accent text-accent bg-accent/10" : "border-white/10 text-white/60 hover:border-white/30"}`}
                                                                            >
                                                                                {cpu}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* S4: Clickable laptop chassis color customizer */}
                                                    {s.id === "s4" && (
                                                        <div className="w-full bg-black/40 text-white/90 rounded-md border border-white/10 p-4 font-sans text-[9px] text-left leading-normal space-y-3 select-none shadow-lg">
                                                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                                                <div>
                                                                    <span className="text-white/40 font-mono text-[8px] uppercase">Chassis customization</span>
                                                                    <span className="text-[10px] font-bold capitalize mt-0.5 block">{selectedColor} anodized</span>
                                                                </div>
                                                                <div className="w-4 h-4 rounded-full border border-white/25" style={{ backgroundColor: selectedColor === "sandstone" ? "#E4E3E0" : selectedColor === "orange" ? "#F27D26" : "#141414" }} />
                                                            </div>
                                                            
                                                            {/* Laptop outline drawing changing dynamically */}
                                                            <div className="relative h-14 flex items-center justify-center border border-white/5 rounded-sm bg-black/20 my-1">
                                                                <svg className="w-20 h-10" viewBox="0 0 100 50" fill="none" strokeWidth="1">
                                                                    <rect x="20" y="15" width="60" height="25" rx="1.5" stroke={selectedColor === "sandstone" ? "#E4E3E0" : selectedColor === "orange" ? "#F27D26" : "#444"} />
                                                                    <line x1="10" y1="40" x2="90" y2="40" stroke={selectedColor === "sandstone" ? "#E4E3E0" : selectedColor === "orange" ? "#F27D26" : "#444"} strokeWidth="2" />
                                                                </svg>
                                                            </div>

                                                            <div className="flex gap-2 pt-1 justify-center">
                                                                {[
                                                                    { id: "charcoal", color: "#141414", name: "charcoal" },
                                                                    { id: "sandstone", color: "#E4E3E0", name: "sandstone" },
                                                                    { id: "orange", color: "#F27D26", name: "orange" }
                                                                ].map((c) => (
                                                                    <button
                                                                        key={c.id}
                                                                        onClick={() => setSelectedColor(c.id)}
                                                                        className={`w-3.5 h-3.5 rounded-full cursor-pointer border transition-all duration-300 ${selectedColor === c.id ? "border-accent scale-110" : "border-white/10 hover:scale-105"}`}
                                                                        style={{ backgroundColor: c.color }}
                                                                        title={c.name}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* E1: Partner Startup Credits dashboard */}
                                                    {s.id === "e1" && (
                                                        <div className="w-full bg-white text-ink rounded-md border border-ink/10 p-4 font-mono text-[9px] text-left leading-normal space-y-3 select-none shadow-lg">
                                                            <span className="text-ink/40 uppercase tracking-wider block border-b border-ink/10 pb-1.5 font-bold">allocated partner pool</span>
                                                            <div className="space-y-1.5">
                                                                <div className="flex justify-between">
                                                                    <span>Krypton AI:</span>
                                                                    <span className="text-accent font-bold">$10,000 credit</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>BioLife Tech:</span>
                                                                    <span className="text-accent font-bold">$5,000 credit</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>FinFlow Labs:</span>
                                                                    <span className="text-ink/40">awaiting setup</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* E2: Ambassador Leaderboard portal */}
                                                    {s.id === "e2" && (
                                                        <div className="w-full bg-white text-ink rounded-md border border-ink/10 p-4 font-sans text-[9px] text-left leading-normal space-y-3 select-none shadow-lg">
                                                            <span className="text-ink/40 font-mono text-[8px] uppercase tracking-wider block border-b border-ink/10 pb-1.5">Ambassador Leaderboard</span>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between border-b border-ink/5 pb-1">
                                                                    <span className="font-bold">1. Rohan M. (L3)</span>
                                                                    <span className="text-accent">450 pts</span>
                                                                </div>
                                                                <div className="flex items-center justify-between border-b border-ink/5 pb-1">
                                                                    <span className="font-bold">2. Priya S. (L2)</span>
                                                                    <span className="text-accent">410 pts</span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-bold">3. Amit K. (L2)</span>
                                                                    <span className="text-accent">380 pts</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ── 4. WHY ENTION ─────────────────────────────────────────── */}
            <section ref={whyRef} className="py-28 lg:py-36 px-8 bg-bg text-ink relative overflow-hidden border-t border-ink/10">
                <div className="max-w-[1100px] mx-auto space-y-16 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink">
                            Why Organizations Choose Ention
                        </h2>
                        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-accent">
                            This section builds trust.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUs.map((p, i) => (
                            <div key={i} className="why-grid-item relative min-h-[140px] rounded-sm overflow-hidden">
                                <div className="why-b-top absolute top-0 left-0 right-0 h-[1px] bg-ink/20 origin-left" />
                                <div className="why-b-right absolute top-0 bottom-0 right-0 w-[1px] bg-ink/20 origin-top" />
                                <div className="why-b-bottom absolute bottom-0 left-0 right-0 h-[1px] bg-ink/20 origin-right" />
                                <div className="why-b-left absolute top-0 bottom-0 left-0 w-[1px] bg-ink/20 origin-bottom" />
                                
                                <div className="why-fill absolute inset-0 bg-white origin-left transition-colors duration-500" />

                                <div className="why-content p-8 relative z-10 flex h-full items-center gap-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                                    <h4 className="font-sans font-bold text-sm uppercase tracking-tight text-ink leading-snug">
                                        {p}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. DEPLOYMENT MODELS ──────────────────────────────────── */}
            <section ref={deploymentRef} className="py-28 lg:py-36 px-8 bg-bg text-ink relative overflow-hidden border-t border-ink/10">
                <div className="max-w-[1200px] mx-auto space-y-16 relative z-10">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink">
                            Deployment Models
                        </h2>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
                        <div className="dep-vline absolute left-0 top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute left-[25%] top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute left-[50%] top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute left-[75%] top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute right-0 top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />

                        {deploymentModels.map((m, i) => (
                            <div key={i} className="dep-card-trigger relative p-8 lg:p-10 flex flex-col justify-between min-h-[250px] overflow-hidden group">
                                <div className="dep-card-fill absolute inset-0 bg-white/40 origin-bottom z-0 transition-colors duration-500" />

                                <div className="dep-card-content relative z-10 space-y-4">
                                    <h4 className="font-sans font-bold text-base uppercase tracking-tight text-ink">
                                        {m.title}
                                    </h4>
                                    <div className="w-8 h-[2px] bg-accent/40 group-hover:w-16 transition-all duration-500" />
                                    <p className="text-xs text-ink/75 leading-relaxed font-sans">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. CTA ────────────────────────────────────────────────── */}
            <section ref={ctaRef} className="py-40 px-8 bg-bg text-bg text-center relative overflow-hidden min-h-[60vh] flex items-center justify-center border-t border-ink/10">
                <div className="cta-orange-block absolute w-80 h-80 bg-accent z-0 rounded-full" />

                <div className="cta-wireframe absolute inset-x-8 top-16 bottom-16 border border-white/20 pointer-events-none z-10 rounded-sm scale-95" />

                <div className="max-w-3xl mx-auto space-y-8 relative z-20 cta-text">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-white leading-tight">
                        Ready to Build Your Tech Ecosystem?
                    </h2>
                    <p className="text-white/85 text-lg md:text-xl font-sans max-w-xl mx-auto leading-relaxed">
                        Contact our engineering and solutions team to design custom device specifications and leasing terms.
                    </p>
                    <div className="pt-6">
                        <button
                            onClick={() => setActiveForm(true)}
                            className="relative overflow-hidden z-10 bg-transparent border border-white text-white hover:text-accent px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 rounded-sm group/btn flex items-center gap-4 cursor-pointer shadow-xl mx-auto"
                        >
                            <span className="absolute inset-0 bg-white -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            <span className="relative z-10">Discuss Your Requirements</span>
                            <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── 7. RELATED SOLUTIONS ──────────────────────────────────── */}
            <section className="py-20 px-8 bg-bg text-ink relative border-t border-ink/10">
                <div className="max-w-[1100px] mx-auto space-y-10">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-ink/40 text-center">
                        Related Solutions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        {relatedSolutions.map((s) => (
                            <Link
                                key={s.id}
                                href={`/solutions/${s.id}`}
                                className="p-6 border border-ink/10 bg-white hover:border-accent hover:bg-bg rounded-sm shadow-sm transition-all duration-300 flex items-center justify-between group cursor-pointer"
                            >
                                <span className="font-sans font-bold text-sm text-ink group-hover:text-accent transition-colors duration-300">
                                    {s.name}
                                </span>
                                <ArrowRight size={14} className="text-ink/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
