"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardList, Wand2, Truck, LifeBuoy, Layers, Settings, CreditCard, Maximize2, IndianRupee, ShoppingCart, Wallet, RefreshCw, ShieldCheck, Handshake, Cpu, Tag, Send, Loader2, ChevronDown } from "lucide-react";
import { submitLeadInquiry } from "@/lib/api";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsPage() {
    const [activeForm, setActiveForm] = useState<"ENTERPRISE" | "DEVELOPER" | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState("right");

    // Interactive Configurator states for solutions cards
    const [selectedRam, setSelectedRam] = useState("16GB");
    const [selectedCpu, setSelectedCpu] = useState("Ultra 7");
    const [selectedColor, setSelectedColor] = useState("charcoal");

    // State for the Custom Solutions Inquiry Form
    const [customForm, setCustomForm] = useState({
        name: "",
        company: "",
        email: "",
        mobile: "",
        location: "",
        requirement: "",
        message: ""
    });
    const [isCustomSubmitting, setIsCustomSubmitting] = useState(false);
    const [customSuccess, setCustomSuccess] = useState(false);
    const [customError, setCustomError] = useState<string | null>(null);

    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const handleCustomSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCustomError(null);
        setIsCustomSubmitting(true);
        try {
            await submitLeadInquiry({
                name: customForm.name,
                email: customForm.email,
                phone: customForm.mobile,
                source: "solutions_custom",
                description: `Company: ${customForm.company || "N/A"}\nLocation: ${customForm.location || "N/A"}\nRequirement: ${customForm.requirement}\nMessage: ${customForm.message || "None"}`
            });
            setCustomSuccess(true);
        } catch (err: any) {
            setCustomError(err.message || "Failed to submit. Please try again.");
        } finally {
            setIsCustomSubmitting(false);
        }
    };

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
        {
            title: "Share Your Requirements",
            desc: "Tell us about scale, audience, configuration, and timeline.",
            sub: "Estimated response : 1-2 Days",
            icon: ClipboardList
        },
        {
            title: "Receive a Tailored Solution",
            desc: "We design hardware, software, and support to fit your context.",
            sub: "Estimated time : 3-5 Days",
            icon: Wand2
        },
        {
            title: "Deployment & Onboarding",
            desc: "We handle delivery, installation, and rollout coordination.",
            sub: "Estimated time : 7-10 Days",
            icon: Truck
        },
        {
            title: "Ongoing Support & Scaling",
            desc: "AMC, lifecycle management, and capacity expansion when you need it.",
            sub: "Available : Always",
            icon: LifeBuoy
        }
    ];

    const darkSolutions = [
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
        }
    ];

    const lightSolutions = [
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
        {
            title: "Hardware + ecosystem approach",
            desc: "Devices, deployment, and programs delivered together — not three vendors stitched into one.",
            icon: Layers
        },
        {
            title: "Flexible customization",
            desc: "Hardware, software, branding, and scale tailored to your exact requirements.",
            icon: Settings
        },
        {
            title: "Long-term support",
            desc: "AMC, lifecycle management, and a partnership that lasts well beyond deployment.",
            icon: LifeBuoy
        },
        {
            title: "Financing & leasing options",
            desc: "Flexible payment plans, operational leases, and financing customized for your growth stage.",
            icon: CreditCard
        },
        {
            title: "Scalable deployment capability",
            desc: "Fast logistics, bulk configuration staging, and rollout support regardless of cohort size.",
            icon: Maximize2
        },
        {
            title: "India-focused cost optimization",
            desc: "Tailored component sourcing to optimize hardware budgets under local operating conditions.",
            icon: IndianRupee
        }
    ];

    const deploymentModels = [
        { 
            title: "Direct Purchase", 
            desc: "Own your hardware outright with institutional and bulk pricing.",
            icon: ShoppingCart
        },
        { 
            title: "Leasing & Financing", 
            desc: "Operating-lease and EMI options that preserve capital and runway.",
            icon: Wallet
        },
        { 
            title: "As-a-Service / Subscription", 
            desc: "Lab-as-a-Service and device subscription models that scale on demand.",
            icon: RefreshCw
        },
        { 
            title: "AMC & Lifecycle Support", 
            desc: "Annual maintenance, refresh planning, and full lifecycle management.",
            icon: ShieldCheck
        },
        { 
            title: "Co-branded & Partnerships", 
            desc: "Revenue-sharing, co-branded, and ecosystem partnership structures.",
            icon: Handshake
        }
    ];

    const relatedSolutions = [
        { id: "s1", name: "Innovation Labs & Institutional Enablement" },
        { id: "s2", name: "Education Solutions" },
        { id: "s3", name: "Enterprise & Organizational Solutions" },
        { id: "s4", name: "Co-Creation & White-Label Solutions" },
        { id: "e1", name: "Startup Ecosystem Partnerships" },
        { id: "e2", name: "Campus Ambassador Program (ECAP)" }
    ];

    const faqs = [
        {
            question: "Can I get a fully customized solution?",
            answer: "Yes — every solution can be tailored to your hardware, software, branding, deployment, and support requirements."
        },
        {
            question: "Do you support bulk orders?",
            answer: "Yes. We specialize in bulk deployment for organizations, with dedicated rollout coordination and lifecycle management."
        },
        {
            question: "Are financing options available?",
            answer: "Yes. Leasing, EMI, and flexible payment options are available — handled in partnership with regulated financial partners."
        },
        {
            question: "Do you provide post-deployment support?",
            answer: "Yes. AMC (Annual Maintenance Contract) and ongoing service support are included, with priority SLAs for enterprise plans."
        }
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
            
            // ── 1. How It Works Timeline ──
            if (howItWorksRef.current) {
                const dashedLine = howItWorksRef.current.querySelector(".hiw-dashed-line");
                const stepItems = howItWorksRef.current.querySelectorAll(".hiw-step-item");

                gsap.set(dashedLine, { scaleX: 0 });
                stepItems.forEach((item: any) => {
                    const circle = item.querySelector(".hiw-step-circle");
                    const iconBox = item.querySelector(".hiw-step-icon-box");
                    const title = item.querySelector(".hiw-step-title");
                    const desc = item.querySelector(".hiw-step-desc");
                    const sub = item.querySelector(".hiw-step-sub");

                    gsap.set(circle, { scale: 0 });
                    gsap.set([iconBox, title, desc, sub], { opacity: 0, y: 20 });
                });

                const hiwTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: howItWorksRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none"
                    }
                });

                hiwTl.to(dashedLine, { scaleX: 1, duration: 1.5, ease: "power2.inOut" });

                stepItems.forEach((item: any, i: number) => {
                    const circle = item.querySelector(".hiw-step-circle");
                    const iconBox = item.querySelector(".hiw-step-icon-box");
                    const title = item.querySelector(".hiw-step-title");
                    const desc = item.querySelector(".hiw-step-desc");
                    const sub = item.querySelector(".hiw-step-sub");

                    hiwTl.to(circle, { scale: 1, duration: 0.4, ease: "back.out(1.7)" }, `-=${1.5 - (i * 0.35)}`)
                         .to([iconBox, title, desc, sub], { 
                             opacity: 1, 
                             y: 0, 
                             duration: 0.5, 
                             stagger: 0.08, 
                             ease: "power2.out" 
                         }, `-=${1.1 - (i * 0.35)}`);
                });
            }

            // ── 2. PINNED HORIZONTAL SCROLL TIMELINE ──
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

                    const elementsToSet = [titleText, targetText, ctaBtn, panelContent].filter(Boolean) as HTMLElement[];
                    if (elementsToSet.length > 0) {
                        gsap.set(elementsToSet, { opacity: 0 });
                    }
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

                    // For index 6 (Programs & Ecosystem Intro slide), flood the background to sandstone cream
                    if (index === 6) {
                        pinTl.to(".s-e-flood-fill", {
                            scale: 1.2,
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, "-=1.5");
                    }

                    // Animate the details
                    if (titleText) {
                        pinTl.fromTo(titleText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
                    }
                    if (targetText) {
                        pinTl.fromTo(targetText, { opacity: 0 }, { opacity: 1, duration: 0.3 }, titleText ? "-=0.2" : undefined);
                    }
                    if (panelContent) {
                        pinTl.fromTo(panelContent, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, targetText ? "-=0.3" : undefined);
                    }

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

                    if (ctaBtn) {
                        pinTl.fromTo(ctaBtn, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 }, "-=0.15");
                    }

                    // Read pause
                    pinTl.to({}, { duration: 1.2 });
                });
            }

            // ── 3. Why Ention Section Timeline (Per-Card Autoplay) ──
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

            // ── 4. Deployment Models Timeline (Per-Card Autoplay) ──
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

            // ── 5. CTA Section Timeline ──
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
            <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
                {activeForm === "ENTERPRISE" && (
                    <LeadSalesForm source="solutions_enterprise" onSuccess={() => setActiveForm(null)} />
                )}
                {activeForm === "DEVELOPER" && (
                    <LeadSalesForm source="solutions_developer" initialDescription="I am interested in developer hardware and environments." onSuccess={() => setActiveForm(null)} />
                )}
            </FormModal>

            {/* ── 1. HERO SECTION ────────────────────────────────────────────────── */}
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

                                <div className="lg:col-span-5 relative h-[380px] w-full flex items-center justify-center lg:justify-end">
                                    <div className="absolute inset-y-0 right-0 left-0 lg:left-[-10%] border border-ink/10 rounded-sm bg-white/20 backdrop-blur-sm z-0 pointer-events-none" />
                                    
                                    <div className="relative z-10 w-full max-w-[340px] h-[280px] bg-ink text-bg rounded-sm shadow-2xl p-6 flex flex-col justify-between border border-white/10 origin-center translate-x-4 translate-y-4 hover:translate-x-0 hover:translate-y-0 transition-transform duration-500 group">
                                        <div className="flex justify-between items-center border-b border-white/10 pb-3 font-mono text-[9px] text-white/40 uppercase tracking-wider">
                                            <span>SYS_REF: {currentSlide === 0 ? "STUD_01" : currentSlide === 1 ? "PROF_02" : "WHT_LBL"}</span>
                                            <span>[X: 840, Y: 120]</span>
                                        </div>

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

            {/* ── 2. HOW IT WORKS ────────────────────────────────────────────────── */}
            <section ref={howItWorksRef} className="py-28 lg:py-36 px-8 relative bg-bg text-ink overflow-hidden border-t border-ink/10">
                <div className="max-w-[1200px] mx-auto space-y-20 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink uppercase">
                            How It Works
                        </h2>
                        <p className="text-sm font-sans text-ink/50 max-w-xl mx-auto leading-relaxed">
                            From request to launch in 4 simple steps
                        </p>
                    </div>

                    <div className="relative">
                        <div 
                            className="hiw-dashed-line absolute top-[20px] left-0 right-0 h-[1px] border-t border-dashed border-accent/20 -z-10 origin-left hidden lg:block"
                            style={{ transform: "scaleX(0)" }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                            {howItWorks.map((step, i) => {
                                const IconComponent = step.icon;
                                return (
                                    <div key={i} className="hiw-step-item flex flex-col items-center text-center relative">
                                        <div className="hiw-step-circle w-10 h-10 rounded-full border border-accent/40 bg-bg flex items-center justify-center text-xs font-mono font-bold text-accent z-10 shadow-sm">
                                            {i + 1}
                                        </div>

                                        <div className="hiw-step-icon-box w-20 h-20 rounded-[20px] bg-white border border-ink/8 flex items-center justify-center text-accent mt-8 shadow-sm transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:bg-[#FAF7F2] hover:shadow-md cursor-default">
                                            <IconComponent size={28} strokeWidth={1.5} className="text-accent" />
                                        </div>

                                        <h4 className="hiw-step-title font-serif font-bold italic text-lg text-ink mt-8 leading-tight tracking-tight">
                                            {step.title}
                                        </h4>

                                        <p className="hiw-step-desc text-xs text-ink/60 mt-3 font-normal leading-relaxed max-w-[240px]">
                                            {step.desc}
                                        </p>

                                        <span className="hiw-step-sub text-[9px] text-accent/80 font-mono tracking-wider mt-4 block uppercase font-bold">
                                            {step.sub}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. PINNED HORIZONTAL SCROLL SECTION ────────────────────────────── */}
            <section ref={horizontalSectionRef} className="relative overflow-hidden bg-ink text-bg">
                <div className="s-e-flood-fill absolute w-[200vmax] h-[200vmax] rounded-full bg-bg z-0 pointer-events-none origin-center" style={{ transform: "scale(0)", left: "50%", top: "50%", translate: "-50% -50%" }} />

                <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                    <div ref={panelsContainerRef} className="flex flex-row h-full w-[900vw] items-stretch flex-nowrap relative z-10">
                        
                        {/* Intro Panel */}
                        <div className="scroll-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden border-r border-white/5 bg-ink text-bg">
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
                                <svg width="100%" height="100%">
                                    <pattern id="grid-intro" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid-intro)" />
                                </svg>
                            </div>

                            <div className="absolute inset-x-8 lg:inset-x-20 top-20 bottom-20 border border-white/5 pointer-events-none z-0">
                                <div className="absolute -top-2 -left-2 text-white/20 font-mono text-xs font-light select-none">+</div>
                                <div className="absolute -top-2 -right-2 text-white/20 font-mono text-xs font-light select-none">+</div>
                                <div className="absolute -bottom-2 -left-2 text-white/20 font-mono text-xs font-light select-none">+</div>
                                <div className="absolute -bottom-2 -right-2 text-white/20 font-mono text-xs font-light select-none">+</div>
                            </div>

                            <div className="max-w-[1000px] w-full mx-auto text-center space-y-8 relative z-10">
                                <span className="panel-target font-mono text-xs uppercase tracking-[0.35em] text-accent block">
                                    Solutions Showcase
                                </span>
                                <h2 className="panel-title text-4xl md:text-6xl lg:text-7xl font-serif font-black italic tracking-tighter leading-[1.05] text-white">
                                    Tailored solutions for <br className="hidden md:inline" />every kind of organization.
                                </h2>
                                <p className="panel-card-content text-white/60 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
                                    Whether configuring high-performance labs for educational institutes, requesting enterprise fleets, or co-creating white-label products, we tailor hardware and ecosystem support to your goals.
                                </p>
                                <div className="panel-cta pt-8 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
                                    <span>Scroll to explore</span>
                                    <span className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
                                        <span className="absolute inset-y-0 left-0 bg-accent w-[30%] h-full animate-[pulse_1.5s_infinite]" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Dark Solutions loops */}
                        {darkSolutions.map((s) => (
                            <div key={s.id} className="scroll-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden border-r border-white/5 bg-ink text-bg">
                                <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
                                    <svg width="100%" height="100%">
                                        <pattern id={`grid-${s.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill={`url(#grid-${s.id})`} />
                                    </svg>
                                </div>

                                <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                                    <div className="lg:col-span-6 space-y-6 text-left">
                                        <h3 className="panel-title text-3xl md:text-4xl lg:text-5xl font-serif font-black italic tracking-tighter leading-tight text-bg">
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

                                    <div className="lg:col-span-6 relative min-h-[340px] rounded-sm overflow-hidden flex flex-col justify-center w-full border border-white/10 bg-white/[0.02] text-bg panel-card-content">
                                        <div className="p-8 lg:p-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                            
                                            <div className="space-y-6 text-left">
                                                <span className="font-mono text-[10px] text-accent uppercase tracking-widest block border-b pb-3 border-white/10">
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

                                            <div className="flex items-center justify-center h-full min-h-[180px] border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 relative overflow-hidden panel-dashboard-container border-white/10">
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
                                                            <p className="text-white/33 animate-pulse">monitoring_sys_v2.4_active...</p>
                                                        </div>
                                                    </div>
                                                )}

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

                                                {s.id === "s3" && (
                                                    <div className="w-full bg-black/40 text-white/90 rounded-md border border-white/10 p-4 font-sans text-[9px] text-left leading-normal space-y-3 select-none shadow-lg">
                                                        <div className="border-b border-white/5 pb-2">
                                                            <span className="text-white/40 font-mono text-[8px] uppercase tracking-wider block">Est. Core Configuration</span>
                                                            <span className="text-base font-serif italic text-accent font-black tracking-tight mt-0.5 block">₹{calculatePrice()}</span>
                                                        </div>
                                                        <div className="space-y-2">
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

                                                {s.id === "s4" && (
                                                    <div className="w-full bg-black/40 text-white/90 rounded-md border border-white/10 p-4 font-sans text-[9px] text-left leading-normal space-y-3 select-none shadow-lg">
                                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                                            <div>
                                                                <span className="text-white/40 font-mono text-[8px] uppercase">Chassis customization</span>
                                                                <span className="text-[10px] font-bold capitalize mt-0.5 block">{selectedColor} anodized</span>
                                                            </div>
                                                            <div className="w-4 h-4 rounded-full border border-white/25" style={{ backgroundColor: selectedColor === "sandstone" ? "#E4E3E0" : selectedColor === "orange" ? "#F27D26" : "#141414" }} />
                                                        </div>
                                                        
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

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Service Network & Warranty Coverage Panel */}
                        <div className="scroll-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden border-r border-white/5 bg-ink text-bg">
                            <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
                                <svg width="100%" height="100%">
                                    <pattern id="grid-service" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid-service)" />
                                </svg>
                            </div>

                            <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                                <div className="lg:col-span-6 space-y-6 text-left">
                                    <h3 className="panel-title text-3xl md:text-4xl lg:text-5xl font-serif font-black italic tracking-tighter leading-tight text-bg">
                                        Service Network & Warranty Coverage
                                    </h3>
                                    <p className="panel-target text-xs font-sans font-bold text-accent uppercase tracking-widest">
                                        every Ention device owner across India
                                    </p>
                                    <div className="panel-cta pt-6">
                                        <Link
                                            href="/contact"
                                            className="relative overflow-hidden z-10 bg-transparent border border-accent text-accent hover:text-white px-8 py-4.5 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 rounded-sm group/btn flex items-center justify-between gap-4 cursor-pointer w-max shadow-sm"
                                        >
                                            <span className="absolute inset-0 bg-accent -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                            <span className="relative z-10">Explore Service Coverage</span>
                                            <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="lg:col-span-6 relative min-h-[340px] rounded-sm overflow-hidden flex flex-col justify-center w-full border border-white/10 bg-white/[0.02] text-bg panel-card-content">
                                    <div className="p-8 lg:p-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                        <div className="space-y-6 text-left">
                                            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block border-b border-white/10 pb-3">
                                                Network details
                                            </span>
                                            <ul className="space-y-4">
                                                {[
                                                    "On-site repair diagnostics",
                                                    "24-48 hour response window",
                                                    "Transparent digital ticket tracking",
                                                    "India-wide service network coverage"
                                                ].map((item, idx) => (
                                                    <li key={idx} className="card-item flex items-start gap-3 text-xs font-sans leading-relaxed">
                                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex items-center justify-center h-full min-h-[180px] border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 relative overflow-hidden panel-dashboard-container border-white/10">
                                            <div className="w-full bg-black/40 text-white/90 rounded-md border border-white/10 p-4 font-mono text-[8px] text-left leading-normal space-y-2 select-none shadow-lg">
                                                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                                                    <div className="flex gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                                                    </div>
                                                    <span className="text-[7px] text-accent animate-pulse font-bold">● DIAG_ACTIVE</span>
                                                </div>
                                                <p className="text-white/40">&gt; sys_net --verify-node</p>
                                                <p className="text-green-400">[OK] Region: India (Active Coverage)</p>
                                                <div className="space-y-1 pt-1 border-t border-white/5 mt-1 text-white/70">
                                                    <div className="flex justify-between">
                                                        <span>Turnaround:</span>
                                                        <span className="text-white font-bold">&lt; 48 hours</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Warranty Level:</span>
                                                        <span className="text-white">Active On-Site</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Diagnostics status:</span>
                                                        <span className="text-green-400">Normal (0 Errors)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Programs & Ecosystem Intro Panel */}
                        <div className="scroll-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden border-r border-ink/5 bg-bg text-ink">
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
                                <svg width="100%" height="100%">
                                    <pattern id="grid-light-intro" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid-light-intro)" />
                                </svg>
                            </div>

                            <div className="absolute inset-x-8 lg:inset-x-20 top-20 bottom-20 border border-ink/5 pointer-events-none z-0">
                                <div className="absolute -top-2 -left-2 text-ink/20 font-mono text-xs font-light select-none">+</div>
                                <div className="absolute -top-2 -right-2 text-ink/20 font-mono text-xs font-light select-none">+</div>
                                <div className="absolute -bottom-2 -left-2 text-ink/20 font-mono text-xs font-light select-none">+</div>
                                <div className="absolute -bottom-2 -right-2 text-ink/20 font-mono text-xs font-light select-none">+</div>
                            </div>

                            <div className="max-w-[1000px] w-full mx-auto text-center space-y-8 relative z-10">
                                <span className="panel-target font-mono text-xs uppercase tracking-[0.35em] text-accent block">
                                    Programs & Ecosystem
                                </span>
                                <h2 className="panel-title text-4xl md:text-6xl lg:text-7xl font-serif font-black italic tracking-tighter leading-[1.05] text-ink">
                                    Beyond devices — <br className="hidden md:inline" />programs that drive growth
                                </h2>
                                <p className="panel-card-content text-ink/70 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
                                    Our solutions don’t stop at hardware. We integrate with programs that enable growth, innovation, and collaboration across the ecosystem.
                                </p>
                                <div className="panel-cta pt-8 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-ink/40">
                                    <span>Scroll to continue</span>
                                    <span className="w-12 h-[1px] bg-ink/20 relative overflow-hidden">
                                        <span className="absolute inset-y-0 left-0 bg-accent w-[30%] h-full animate-[pulse_1.5s_infinite]" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Light Solutions Showcase Loops */}
                        {lightSolutions.map((s) => (
                            <div key={s.id} className="scroll-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden border-r border-white/5 bg-bg text-ink">
                                <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
                                    <svg width="100%" height="100%">
                                        <pattern id={`grid-${s.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill={`url(#grid-${s.id})`} />
                                    </svg>
                                </div>

                                <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                                    <div className="lg:col-span-6 space-y-6 text-left">
                                        <h3 className="panel-title text-3xl md:text-4xl lg:text-5xl font-serif font-black italic tracking-tighter leading-tight text-ink">
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

                                    <div className="lg:col-span-6 relative min-h-[340px] rounded-sm overflow-hidden flex flex-col justify-center w-full border border-ink/10 bg-ink/[0.01] text-ink panel-card-content">
                                        <div className="p-8 lg:p-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                            
                                            <div className="space-y-6 text-left">
                                                <span className="font-mono text-[10px] text-accent uppercase tracking-widest block border-b pb-3 border-ink/10">
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

                                            <div className="flex items-center justify-center h-full min-h-[180px] border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 relative overflow-hidden panel-dashboard-container border-ink/10">
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
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. WHY ENTION ──────────────────────────────────────────────────── */}
            <section ref={whyRef} className="py-28 lg:py-36 px-8 bg-bg text-ink relative overflow-hidden border-t border-ink/10">
                <div className="max-w-[1100px] mx-auto space-y-16 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink leading-tight">
                            Why Organizations Choose Ention
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUs.map((p, i) => {
                            const IconComponent = p.icon;
                            return (
                                <div key={i} className="why-grid-item relative min-h-[220px] overflow-hidden">
                                    <div className="why-b-top absolute top-0 left-0 right-0 h-[1px] bg-ink/10 origin-left" />
                                    <div className="why-b-right absolute top-0 bottom-0 right-0 w-[1px] bg-ink/10 origin-top" />
                                    <div className="why-b-bottom absolute bottom-0 left-0 right-0 h-[1px] bg-ink/10 origin-right" />
                                    <div className="why-b-left absolute top-0 bottom-0 left-0 w-[1px] bg-ink/10 origin-bottom" />
                                    
                                    <div className="why-fill absolute inset-0 bg-white origin-left transition-colors duration-500" />

                                    <div className="why-content p-8 relative z-10 flex flex-col items-start h-full text-left">
                                        <div className="text-accent mb-4.5">
                                            <IconComponent size={24} strokeWidth={1.5} />
                                        </div>
                                        <h4 className="font-sans font-bold text-base text-ink leading-tight">
                                            {p.title}
                                        </h4>
                                        <p className="text-xs text-ink/60 mt-2.5 font-normal leading-relaxed">
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 5. DEPLOYMENT MODELS ───────────────────────────────────────────── */}
            <section ref={deploymentRef} className="py-28 lg:py-36 px-8 bg-bg text-ink relative overflow-hidden border-t border-ink/10">
                <div className="max-w-[1200px] mx-auto space-y-16 relative z-10">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink uppercase">
                            Flexible commercial models for every stage
                        </h2>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-y-0">
                        <div className="dep-vline absolute left-0 top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute left-[20%] top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute left-[40%] top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute left-[60%] top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute left-[80%] top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />
                        <div className="dep-vline absolute right-0 top-0 bottom-0 w-[1.5px] bg-ink/10 origin-top hidden lg:block" />

                        {deploymentModels.map((m, i) => {
                            const IconComponent = m.icon;
                            return (
                                <div key={i} className="dep-card-trigger relative p-8 lg:p-10 flex flex-col justify-between min-h-[250px] overflow-hidden group border-b last:border-b-0 md:border-b-0 lg:border-b-0 border-ink/5">
                                    <div className="dep-card-fill absolute inset-0 bg-white/40 origin-bottom z-0 transition-colors duration-500" />

                                    <div className="dep-card-content relative z-10 space-y-5 text-left">
                                        <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-ink/5 flex items-center justify-center text-accent shadow-sm">
                                            <IconComponent size={20} strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-sans font-bold text-base text-ink leading-tight">
                                                {m.title}
                                            </h4>
                                            <div className="w-8 h-[2px] bg-accent/40 group-hover:w-16 transition-all duration-500" />
                                            <p className="text-xs text-ink/75 leading-relaxed font-sans">{m.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 6. CTA ─────────────────────────────────────────────────────────── */}
            <section ref={ctaRef} className="py-40 px-8 bg-bg text-bg text-center relative overflow-hidden min-h-[60vh] flex items-center justify-center border-t border-ink/10">
                <div className="cta-orange-block absolute w-80 h-80 bg-accent z-0 rounded-full" />
                <div className="cta-wireframe absolute inset-x-8 top-16 bottom-16 border border-white/20 pointer-events-none z-10 rounded-sm scale-95" />

                <div className="max-w-3xl mx-auto space-y-8 relative z-20 cta-text">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-white leading-tight">
                        {"Let's build your innovation ecosystem together"}
                    </h2>
                    <p className="text-white/85 text-base md:text-lg font-sans max-w-xl mx-auto leading-relaxed">
                        Share your requirements and our team will design a tailored solution — and reach out within 1–2 business days.
                    </p>
                    <div className="pt-6 flex justify-center">
                        <button
                            onClick={() => setActiveForm("ENTERPRISE")}
                            className="relative overflow-hidden z-10 bg-transparent border border-white text-white hover:text-accent px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 rounded-sm group/btn flex items-center justify-center gap-4 cursor-pointer shadow-xl"
                        >
                            <span className="absolute inset-0 bg-white -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            <span className="relative z-10">Talk to Our Team</span>
                            <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Custom Solutions Section ── */}
            <section className="py-28 lg:py-36 px-8 bg-bg text-ink relative overflow-hidden border-t border-ink/10">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start relative z-10">
                    
                    {/* Left Column: Restructured Info & Customize Elements */}
                    <div className="lg:col-span-5 space-y-10 text-left">
                        <div className="space-y-4">
                            <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent block">
                                Custom Solutions
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink leading-[1.05]">
                                Need something custom? We build it.
                            </h2>
                            <p className="text-ink/70 text-sm font-sans leading-relaxed">
                                Every organization operates differently. Ention offers deep hardware and software personalization to fit your institutional workflows, scale, and operational requirements.
                            </p>
                        </div>

                        <div className="space-y-0 border-t border-ink/10">
                            {[
                                { 
                                    num: "01", 
                                    title: "Hardware Configurations", 
                                    desc: "Configure memory capacities, storage partitions, and processor families to optimize budgets.", 
                                    icon: Cpu 
                                },
                                { 
                                    num: "02", 
                                    title: "Operating Systems", 
                                    desc: "Preloaded customized dual-boot setups, custom Linux kernels, or specific enterprise OS layers.", 
                                    icon: Settings 
                                },
                                { 
                                    num: "03", 
                                    title: "Branding & Custom Aesthetics", 
                                    desc: "Personalized laser engraving, branded BIOS bootscreens, and custom product colorways.", 
                                    icon: Tag 
                                },
                                { 
                                    num: "04", 
                                    title: "Lifecycle Support & SLAs", 
                                    desc: "Custom service agreements, dedicated buffer inventory management, and on-site support.", 
                                    icon: Layers 
                                }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="py-6 border-b border-ink/10 flex gap-6 items-start group">
                                        <span className="font-mono text-xs text-accent/50 group-hover:text-accent transition-colors duration-300 font-bold mt-1">
                                            {item.num}
                                        </span>
                                        <div className="space-y-1.5">
                                            <h4 className="font-sans font-bold text-sm text-ink group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                                                <Icon size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-ink/65 font-sans leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Redesigned Traditional Form */}
                    <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-ink/10 pt-12 lg:pt-0 lg:pl-16 relative overflow-hidden text-left">
                        {customSuccess ? (
                            <div className="text-center py-16 space-y-6">
                                <div className="w-16 h-16 bg-[#FAF7F2] text-accent rounded-full border border-accent/25 flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-serif font-black italic text-ink tracking-tight">Inquiry Sent Successfully!</h3>
                                <p className="text-xs text-ink/60 max-w-md mx-auto leading-relaxed font-sans">
                                    Thank you for sharing your requirements. Our solutions team will design a custom proposal and get back to you within 1-2 business days.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-serif font-black italic tracking-tight text-ink uppercase">
                                        Build your custom solution
                                    </h3>
                                    <p className="text-xs text-ink/60 leading-relaxed font-sans">
                                        Tell us what you need — we&apos;ll come back with options within 1–2 business days.
                                    </p>
                                </div>

                                <form onSubmit={handleCustomSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-sans font-bold text-ink/50 uppercase tracking-widest">
                                                Full Name <span className="text-accent">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={customForm.name}
                                                onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                                                placeholder="Jane Sharma"
                                                className="w-full bg-[#FAF9F6] border border-ink/10 rounded-sm p-4 text-xs outline-none focus:border-accent focus:bg-white transition-all font-sans"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-sans font-bold text-ink/50 uppercase tracking-widest">
                                                Company / Organization
                                            </label>
                                            <input
                                                type="text"
                                                value={customForm.company}
                                                onChange={(e) => setCustomForm({ ...customForm, company: e.target.value })}
                                                placeholder="Acme Pvt. Ltd."
                                                className="w-full bg-[#FAF9F6] border border-ink/10 rounded-sm p-4 text-xs outline-none focus:border-accent focus:bg-white transition-all font-sans"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-sans font-bold text-ink/50 uppercase tracking-widest">
                                                Email Address <span className="text-accent">*</span>
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                value={customForm.email}
                                                onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                                                placeholder="you@company.com"
                                                className="w-full bg-[#FAF9F6] border border-ink/10 rounded-sm p-4 text-xs outline-none focus:border-accent focus:bg-white transition-all font-sans"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-sans font-bold text-ink/50 uppercase tracking-widest">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={customForm.mobile}
                                                onChange={(e) => setCustomForm({ ...customForm, mobile: e.target.value })}
                                                placeholder="+91 90000 00000"
                                                className="w-full bg-[#FAF9F6] border border-ink/10 rounded-sm p-4 text-xs outline-none focus:border-accent focus:bg-white transition-all font-sans"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-sans font-bold text-ink/50 uppercase tracking-widest">
                                            Location (City, State)
                                        </label>
                                        <input
                                            type="text"
                                            value={customForm.location}
                                            onChange={(e) => setCustomForm({ ...customForm, location: e.target.value })}
                                            placeholder="Mumbai, Maharashtra"
                                            className="w-full bg-[#FAF9F6] border border-ink/10 rounded-sm p-4 text-xs outline-none focus:border-accent focus:bg-white transition-all font-sans"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-sans font-bold text-ink/50 uppercase tracking-widest">
                                            Your Requirement <span className="text-accent">*</span>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={customForm.requirement}
                                            onChange={(e) => setCustomForm({ ...customForm, requirement: e.target.value })}
                                            placeholder="e.g., 50 Workbook E4 laptops with Linux, 32GB RAM"
                                            className="w-full bg-[#FAF9F6] border border-ink/10 rounded-sm p-4 text-xs outline-none focus:border-accent focus:bg-white transition-all font-sans"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-sans font-bold text-ink/50 uppercase tracking-widest">
                                            Message / Additional Details
                                        </label>
                                        <textarea
                                            value={customForm.message}
                                            onChange={(e) => setCustomForm({ ...customForm, message: e.target.value })}
                                            placeholder="Describe any branding, Dual-boot setup, or shipping needs..."
                                            rows={4}
                                            className="w-full bg-[#FAF9F6] border border-ink/10 rounded-sm p-4 text-xs outline-none focus:border-accent focus:bg-white resize-none transition-all font-sans"
                                        />
                                    </div>

                                    {customError && (
                                        <p className="text-xs text-red-500 font-mono">
                                            {customError}
                                        </p>
                                    )}

                                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-ink/5">
                                        <button
                                            type="submit"
                                            disabled={isCustomSubmitting}
                                            className="w-full sm:w-auto bg-ink text-bg hover:bg-accent hover:text-white px-8 py-4.5 text-[10px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-3 rounded-sm cursor-pointer transition-all duration-500 shadow-sm disabled:opacity-60 shrink-0 group/send relative overflow-hidden"
                                        >
                                            <span className="absolute inset-0 bg-accent -z-10 translate-y-full group-hover/send:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                            {isCustomSubmitting ? (
                                                <>
                                                    <Loader2 size={14} className="animate-spin" />
                                                    <span className="relative z-10">Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="relative z-10">Send inquiry</span>
                                                    <Send size={12} className="relative z-10 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5 transition-transform duration-500" />
                                                </>
                                            )}
                                        </button>
                                        <span className="text-[10px] text-ink/50 text-left font-sans leading-relaxed max-w-[340px]">
                                            By submitting, you agree to be contacted by our solutions team.
                                        </span>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            {/* ── FAQ Section ── */}
            <section className="py-28 lg:py-36 px-8 bg-[#FAF7F2]/30 text-ink relative overflow-hidden border-t border-ink/10">
                <div className="absolute inset-0 opacity-[0.01] pointer-events-none z-0">
                    <svg width="100%" height="100%">
                        <pattern id="grid-faq" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-faq)" />
                    </svg>
                </div>
                
                <div className="max-w-[900px] mx-auto space-y-14 relative z-10 text-left">
                    <div className="space-y-4 text-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink uppercase">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-bold">
                            Everything you need to know about Ention solutions.
                        </p>
                    </div>

                    <div className="border-t border-ink/10 pt-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div key={idx} className="border-b border-ink/10 py-6">
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        className="w-full flex justify-between items-center text-left py-2 font-sans font-bold text-base md:text-lg text-ink hover:text-accent transition-colors duration-300 group cursor-pointer"
                                    >
                                        <span>{faq.question}</span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="text-ink/40 group-hover:text-accent transition-colors duration-300 shrink-0 ml-4"
                                        >
                                            <ChevronDown size={18} />
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-xs md:text-sm text-ink/70 leading-relaxed font-sans pt-2 pb-4 pr-12">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
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
