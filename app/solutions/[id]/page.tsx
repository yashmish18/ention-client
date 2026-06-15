"use client";

import React, { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import ProgramApplicationForm from "@/components/forms/ProgramApplicationForm";
import { SOLUTIONS_DATA, getSolutionById } from "@/lib/solutions-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const solution = getSolutionById(id);

    if (!solution) {
        notFound();
    }

    const [activeForm, setActiveForm] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [activeSection, setActiveSection] = useState("");

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const relatedSolutions = SOLUTIONS_DATA.filter((s) => s.id.toLowerCase() !== id.toLowerCase());

    const mainRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Sidebar navigation items mapping
    const navItems = [
        { id: "who-this-is-for", label: "Who This Is For" },
        { id: "overview", label: "Overview" },
        { id: "what-you-get", label: "What You Get" },
        { id: "key-benefits", label: "Key Benefits" },
        { id: "use-cases", label: "Use Cases / Outcomes" },
        { id: "deployment-models", label: "Deployment Models" },
        { id: "why-ention", label: "Why Ention" },
        { id: "how-it-works", label: "How It Works" },
        { id: "faqs", label: "FAQs" }
    ];

    // Intersection Observer to highlight active sidebar item on scroll
    useEffect(() => {
        const sections = document.querySelectorAll(".detail-section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-15% 0px -65% 0px"
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Scroll trigger autoplay timelines (NO SCRUB) to make sure cards are fully drawn when viewed
    useEffect(() => {
        if (typeof window === "undefined" || !contentRef.current) return;

        const ctx = gsap.context(() => {
            const sections = contentRef.current?.querySelectorAll(".detail-section");
            sections?.forEach((section) => {
                const topB = section.querySelector(".det-b-top");
                const rightB = section.querySelector(".det-b-right");
                const bottomB = section.querySelector(".det-b-bottom");
                const leftB = section.querySelector(".det-b-left");
                const fill = section.querySelector(".det-fill");
                const body = section.querySelector(".det-body");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%", // Trigger when top of card is 85% from top of screen
                        toggleActions: "play none none none"
                    }
                });

                tl.to(topB, { scaleX: 1, duration: 0.15, ease: "none" })
                  .to(rightB, { scaleY: 1, duration: 0.15, ease: "none" })
                  .to(bottomB, { scaleX: 1, duration: 0.15, ease: "none" })
                  .to(leftB, { scaleY: 1, duration: 0.15, ease: "none" })
                  .to(fill, { scaleY: 1, duration: 0.3, ease: "power2.out" }, "-=0.1")
                  .to(body, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.15");
            });

            // Hero header entrance
            gsap.fromTo(".hero-border-frame", 
                { scaleX: 0, scaleY: 0, opacity: 0 },
                { scaleX: 1, scaleY: 1, opacity: 1, duration: 1, ease: "power3.out" }
            );
            gsap.fromTo(".hero-text-block",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
            );

        }, contentRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 100; // Account for navigation offset
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(targetId);
        }
    };

    return (
        <main ref={mainRef} className="min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-accent selection:text-white">
            <FormModal isOpen={activeForm} onClose={() => setActiveForm(false)}>
                {solution.id === "e2" ? (
                    <ProgramApplicationForm programName={solution.name} source="solutions_education" onSuccess={() => setActiveForm(false)} />
                ) : (
                    <LeadSalesForm source="solutions_enterprise" onSuccess={() => setActiveForm(false)} />
                )}
            </FormModal>

            {/* ── 1. HERO HEADER ─────────────────────────────────────────── */}
            <section className="bg-bg text-ink pt-32 pb-16 px-8 relative overflow-hidden border-b border-ink/10">
                <div className="max-w-[1200px] mx-auto space-y-8 relative z-10">
                    <Link
                        href="/solutions"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-ink/50 hover:text-accent transition-colors duration-300 group"
                    >
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Solutions
                    </Link>

                    {/* Outer outline frame */}
                    <div className="relative border border-ink/10 rounded-sm p-8 md:p-12 hero-border-frame origin-center">
                        <div className="hero-text-block space-y-4 max-w-4xl">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent block">
                                Solution Profile
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter leading-tight text-ink">
                                {solution.heroTitle}
                            </h1>
                            <p className="text-base md:text-lg text-ink/75 font-sans leading-relaxed max-w-3xl">
                                {solution.heroSub}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. TWO-COLUMN DETAILS ───────────────────────────────────── */}
            <div ref={contentRef} className="max-w-[1200px] mx-auto px-8 py-16 lg:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* Sticky Sidebar Navigation (Desktop only) */}
                    <aside className="hidden lg:block w-1/4 sticky top-32 space-y-6">
                        <div className="border-l border-ink/10 pl-6 space-y-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-6">
                                Profile Index
                            </span>
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => scrollToSection(e, item.id)}
                                    className={`block text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
                                        activeSection === item.id
                                            ? "text-accent translate-x-2"
                                            : "text-ink/50 hover:text-ink/80"
                                    }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* Right Content Panels */}
                    <div className="w-full lg:w-3/4 space-y-12">
                        
                        {/* Who This Is For */}
                        <section id="who-this-is-for" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    Who This Is For
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {solution.whoThisIsFor.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-ink/75 font-sans leading-relaxed">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Overview */}
                        <section id="overview" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    Overview
                                </h2>
                                <p className="text-sm md:text-base text-ink/75 font-sans leading-relaxed">
                                    {solution.overview}
                                </p>
                            </div>
                        </section>

                        {/* What You Get */}
                        <section id="what-you-get" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    What You Get
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {solution.whatYouGet.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-ink/75 font-sans leading-relaxed">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Key Benefits */}
                        <section id="key-benefits" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    Key Benefits
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {solution.keyBenefits.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-ink/75 font-sans leading-relaxed">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Use Cases */}
                        <section id="use-cases" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    Use Cases / Outcomes
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {solution.useCases.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-ink/75 font-sans leading-relaxed">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Deployment Models */}
                        <section id="deployment-models" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    Deployment Models
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {solution.deploymentModels.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-ink/75 font-sans leading-relaxed">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Why Ention */}
                        <section id="why-ention" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    Why Ention
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {solution.whyEntion.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-ink/75 font-sans leading-relaxed">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* How It Works */}
                        <section id="how-it-works" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    How It Works
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                    {solution.howItWorks.map((step, idx) => (
                                        <div key={idx} className="space-y-3 p-5 border border-ink/10 bg-bg hover:border-accent/40 transition-all duration-500 group rounded-sm">
                                            <div className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center text-accent font-mono text-xs font-bold group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm font-sans text-ink/75 leading-relaxed font-bold">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* FAQs */}
                        <section id="faqs" className="detail-section relative min-h-[160px] overflow-hidden rounded-sm">
                            <div className="det-b-top absolute top-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-left scale-x-0 z-10" />
                            <div className="det-b-right absolute top-0 bottom-0 right-0 w-[1.5px] bg-ink/20 origin-top scale-y-0 z-10" />
                            <div className="det-b-bottom absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink/20 origin-right scale-x-0 z-10" />
                            <div className="det-b-left absolute top-0 bottom-0 left-0 w-[1.5px] bg-ink/20 origin-bottom scale-y-0 z-10" />
                            <div className="det-fill absolute inset-0 bg-white origin-top scale-y-0 z-0" />

                            <div className="det-body opacity-0 transform translate-y-6 p-8 lg:p-10 relative z-10 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tighter text-ink border-b border-ink/10 pb-4">
                                    Frequently Asked Questions
                                </h2>

                                <div className="space-y-0 pt-2">
                                    {solution.faqs.map((faq, idx) => {
                                        const isOpen = expandedFaq === idx;
                                        return (
                                            <div key={idx} className="border-b border-ink/10 overflow-hidden py-4">
                                                <button
                                                    onClick={() => toggleFaq(idx)}
                                                    className="w-full flex items-center justify-between text-left cursor-pointer hover:text-accent transition-colors duration-300 py-2"
                                                >
                                                    <span className="font-sans font-bold text-sm text-ink">{faq.q}</span>
                                                    {isOpen ? <ChevronDown size={14} className="text-accent" /> : <ChevronRight size={14} className="text-ink/40" />}
                                                </button>
                                                {isOpen && (
                                                    <div className="pb-4 pt-2">
                                                        <p className="text-sm text-ink/75 font-sans leading-relaxed">{faq.a}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* Final CTA */}
                        <section className="py-16 text-center space-y-8 border border-white/5 rounded-sm p-10 bg-ink text-bg relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
                                <svg width="100%" height="100%">
                                    <pattern id="detail-cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#detail-cta-grid)" />
                                </svg>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-serif font-black italic text-bg relative z-10 leading-tight">
                                {solution.finalCta}
                            </h2>
                            <div className="pt-2 relative z-10">
                                <button
                                    onClick={() => setActiveForm(true)}
                                    className="relative overflow-hidden z-10 bg-transparent border border-accent text-accent hover:text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 rounded-sm group/btn flex items-center justify-between gap-4 cursor-pointer mx-auto w-max shadow-xl"
                                >
                                    <span className="absolute inset-0 bg-accent -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                    <span className="relative z-10">{solution.ctaLabel}</span>
                                    <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
                                </button>
                            </div>
                        </section>

                        {/* Related Solutions */}
                        <section className="space-y-6">
                            <div className="h-[1px] bg-ink/10" />
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
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
