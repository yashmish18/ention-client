"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Cpu, Shield, Zap, Terminal, Activity, CheckCircle, 
    ArrowRight, Settings, Layers, Monitor, Lock, Sparkles, 
    Code, Beaker, Wifi, GraduationCap, Palette, Building, Check, ChevronRight, Network
} from "lucide-react";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";

export default function EntionOSPage() {
    const [activeForm, setActiveForm] = useState(false);
    const [activeTab, setActiveTab] = useState("students");
    
    // Telemetry compiler simulator loop states
    const [cpuUsage, setCpuUsage] = useState(24);
    const [temp, setTemp] = useState(38);
    const [fps, setFps] = useState(144);
    const [activeCompiler, setActiveCompiler] = useState("GCC v13.2");
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCpuUsage(Math.floor(Math.random() * (45 - 8 + 1)) + 8);
            setTemp(Math.floor(Math.random() * (46 - 34 + 1)) + 34);
            setFps(Math.floor(Math.random() * (165 - 142 + 1)) + 142);
            
            const compilers = ["GCC v13.2", "Clang v17.0", "Rustc v1.75", "Webpack v5.90", "Esbuild v0.19"];
            setActiveCompiler(compilers[Math.floor(Math.random() * compilers.length)]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const workflows = [
        {
            id: "students",
            label: "Students & Researchers",
            tagline: "Built for academic excellence",
            icon: GraduationCap,
            image: "/assets/landing_page/stud.png",
            desc: "Ention OS gives students a distraction-free, resource-efficient computing environment that respects their hardware budget while enabling the kind of deep focus that academic work demands. From the first year of college to advanced research, the OS adapts to your workload.",
            bullets: [
                "Lightweight resource footprint for entry-level hardware",
                "Note-taking and research workflow integrations",
                "Offline-first AI for essays, summarisation, citations",
                "Academic collaboration and file-sharing tools",
                "Student verification — unlocks Ention ecosystem benefits"
            ]
        },
        {
            id: "creatives",
            label: "Creative Professionals",
            tagline: "Where performance meets precision",
            icon: Palette,
            image: "/assets/landing_page/prof.png",
            desc: "For designers, video editors, and sound engineers, Ention OS maps system priorities specifically to creative threads. Experience zero latency in playback rendering, automated GPU-acceleration overrides, and hardware-calibrated color profiles right out of the box.",
            bullets: [
                "Real-time priority scheduling for GPU and media threads",
                "Color-calibrated display pipeline configuration tools",
                "System-wide hardware acceleration preset controls",
                "Integrated scratch disk and memory clearing utilities",
                "Pre-installed open-source media creation toolchains"
            ]
        },
        {
            id: "developers",
            label: "Developers & Engineers",
            tagline: "Terminal-first, container-native",
            icon: Code,
            image: "/assets/landing_page/b2b.png",
            desc: "A Linux-compatible subsystem, container-native execution, and developer-first shell presets make Ention OS a builder's paradise. Achieve compilation boosts of up to 30% thanks to low-level thread optimization and memory scheduler mapping.",
            bullets: [
                "Integrated low-overhead virtualization & container runtimes",
                "Optimized CPU affinity maps for concurrent build tasks",
                "Sovereign compute modules for secure key and token storage",
                "Native dual-boot and partition layout customization options",
                "Pre-configured shell scripts for rapid developer environment staging"
            ]
        },
        {
            id: "enterprises",
            label: "Enterprises & Institutions",
            tagline: "Fleet-ready, policy-enforced",
            icon: Building,
            image: "/assets/landing_page/exp.png",
            desc: "Deploy, manage, and scale fleets of Ention devices with institutional control. Ention OS integrates directly with device management platforms, allowing policy enforcement, remote wiping, and automated updates with zero user disruption.",
            bullets: [
                "Unified Endpoint Management (UEM) compatibility",
                "Policy-enforced security baselines and network encryption",
                "Institutional app deployment and custom software pools",
                "Zero-touch remote enrollment and device provisioning",
                "Priority long-term support (LTS) lifecycle paths"
            ]
        }
    ];

    const currentWorkflow = workflows.find(w => w.id === activeTab) || workflows[0];
    const WorkflowIcon = currentWorkflow.icon;

    return (
        <main className="min-h-screen bg-bg text-ink overflow-hidden selection:bg-[#F27D26] selection:text-white relative font-sans">
            
            {/* Form modal for OS Build Request */}
            <FormModal isOpen={activeForm} onClose={() => setActiveForm(false)}>
                <LeadSalesForm 
                    source="solutions_developer"
                    initialDescription="I am interested in custom Ention OS builds/Early Access."
                    initialUseCase="Enterprise"
                    onSuccess={() => setActiveForm(false)}
                />
            </FormModal>

            {/* Subtle background details */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
                <div className="w-full h-full bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* ── 1. HERO SECTION ────────────────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 px-8 z-10 max-w-7xl mx-auto border-b border-ink/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left text column */}
                    <div className="lg:col-span-6 text-left space-y-8">
                        <div className="space-y-4">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink/5 border border-ink/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-ink/70">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                <span>Phase 2 - In Development</span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-6xl font-serif font-black italic tracking-tighter leading-none text-ink">
                                The Operating <br />
                                Environment Built <br />
                                <span className="text-accent">for India&apos;s Builders</span>
                            </h1>
                        </div>

                        {/* Paragraph */}
                        <p className="text-sm md:text-base text-ink/70 leading-relaxed font-sans font-light max-w-lg">
                            Ention OS is a productivity-first computing layer, engineered to integrate seamlessly with Ention hardware — giving students, creators, developers, and institutions a unified, intelligent workspace.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-2">
                            <button
                                onClick={() => setActiveForm(true)}
                                className="bg-ink hover:bg-accent text-white px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 rounded-sm cursor-pointer transition-colors duration-300"
                            >
                                <span>Request Early Access</span>
                                <ArrowRight size={14} />
                            </button>
                            <a
                                href="#capabilities"
                                className="border border-ink/15 hover:bg-ink/5 text-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-sm transition-colors duration-300 cursor-pointer"
                            >
                                <span>Explore Capabilities</span>
                                <ChevronRight size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Right image/mockup column */}
                    <div className="lg:col-span-6 relative flex justify-center">
                        <div className="relative w-full aspect-[4/3] max-w-lg rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(20,20,20,0.1)] border border-ink/5 group bg-[#F0EFEB]">
                            <Image 
                                src="/assets/images/classroom-laptop.png" 
                                alt="Ention OS on hardware"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-ink/5 text-[9px] font-mono uppercase tracking-wider text-ink font-bold shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                <span>Ention OS Developer Preview</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. "MORE THAN AN OPERATING SYSTEM" SECTION (Dark Theme) ─────────────────── */}
            <section id="capabilities" className="py-24 px-8 bg-ink text-bg relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto space-y-20">
                    
                    <div className="text-center space-y-4 max-w-3xl mx-auto flex flex-col items-center">
                        <span className="font-mono text-[9px] md:text-xs uppercase tracking-[0.25em] text-[#818CF8] font-bold">
                            What is Ention OS
                        </span>
                        <div className="w-10 h-0.5 bg-accent" />
                        <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter leading-none text-bg mt-6">
                            More than an operating system
                        </h2>
                        <p className="text-sm font-sans text-bg/60 max-w-xl mx-auto leading-relaxed mt-2 font-light">
                            Ention OS is a complete computing environment — a layer that sits between your hardware and your work, making both perform better together.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Side: Ecosystem structure Image */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/5 group bg-white/5">
                                <Image 
                                    src="/assets/landing_page/exp.png" 
                                    alt="Ecosystem Integration" 
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-6 left-6 space-y-1">
                                    <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold">Connectivity Layer</span>
                                    <h4 className="font-serif italic font-bold text-lg text-white">Engineered for Indian Realities</h4>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Clean lists */}
                        <div className="lg:col-span-7 space-y-10">
                            {/* Point 1 */}
                            <div className="border-b border-white/10 pb-6 space-y-2 text-left">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                                        <Layers size={16} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-sans font-bold text-base text-white">Productivity Layer</h3>
                                </div>
                                <p className="text-xs md:text-sm text-bg/70 leading-relaxed font-sans font-light pl-11">
                                    An OS experience engineered for real workflows — not a generic environment repurposed for India. Every interaction is designed around how you actually work.
                                </p>
                            </div>

                            {/* Point 2 */}
                            <div className="border-b border-white/10 pb-6 space-y-2 text-left">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                                        <Cpu size={16} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-sans font-bold text-base text-white">Hardware Integration</h3>
                                </div>
                                <p className="text-xs md:text-sm text-bg/70 leading-relaxed font-sans font-light pl-11">
                                    Deep, native integration with Ention laptops — optimised drivers, thermal intelligence, battery awareness, and one-touch diagnostics built into the OS itself.
                                </p>
                            </div>

                            {/* Point 3 */}
                            <div className="border-b border-white/10 pb-6 space-y-2 text-left">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                                        <Network size={16} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-sans font-bold text-base text-white">Ecosystem Bridge</h3>
                                </div>
                                <p className="text-xs md:text-sm text-bg/70 leading-relaxed font-sans font-light pl-11">
                                    Connects your device to Ention programs, warranty services, institutional tools, and the broader innovation ecosystem — all from a single, unified environment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. SIX PILLARS GRID SECTION (Light Theme) ─────────────────────────────── */}
            <section className="py-24 px-8 bg-bg text-ink relative z-10 border-t border-line">
                <div className="max-w-7xl mx-auto space-y-16">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-line pb-10">
                        {/* Left Heading */}
                        <div className="lg:col-span-7 space-y-3 text-left">
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block font-bold">
                                Core Capabilities
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter text-ink leading-tight">
                                Six pillars of the <br className="hidden md:inline" />Ention OS experience
                            </h2>
                        </div>
                        {/* Right Subtitle */}
                        <div className="lg:col-span-5 text-left lg:text-right">
                            <p className="text-sm md:text-base text-ink/60 leading-relaxed font-sans font-light">
                                Every design decision in Ention OS traces back to a single question: does this make your work faster, cleaner, or more secure?
                            </p>
                        </div>
                    </div>

                    {/* Six Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
                        {[
                            {
                                title: "Intelligent Workspace",
                                desc: "Smart window management, adaptive multitasking, and AI-assisted shortcuts that learn your workflow and surface what you need before you ask.",
                                icon: Monitor
                            },
                            {
                                title: "Hardware Integration",
                                desc: "Native device drivers, real-time thermal profiling, battery intelligence, and single-click diagnostics — the hardware and OS speak the same language.",
                                icon: Cpu
                            },
                            {
                                title: "Privacy by Default",
                                desc: "No telemetry harvesting. No hidden data pipelines. No background uploads. Your work, your research, and your intellectual property stay yours.",
                                icon: Lock
                            },
                            {
                                title: "AI-Native Core",
                                desc: "On-device AI primitives for summarisation, code assistance, and content generation — fast, private, and available even without an internet connection.",
                                icon: Sparkles
                            },
                            {
                                title: "Developer Environment",
                                desc: "Pre-configured dev tools, container-ready architecture, terminal-first design, and open APIs so you can build on top of the OS — not just run inside it.",
                                icon: Code
                            },
                            {
                                title: "Zero Bloat Philosophy",
                                desc: "Minimal footprint, clean UI, and only the tools you actually need. No trial software, no bundled subscriptions, no noise between you and your work.",
                                icon: Zap
                            }
                        ].map((pillar, idx) => {
                            const Icon = pillar.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className="space-y-4 py-4 border-b border-ink/10 flex flex-col justify-between group"
                                >
                                    <div className="space-y-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                            <Icon size={16} strokeWidth={2} />
                                        </div>
                                        <h4 className="font-sans font-bold text-base text-ink">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-xs text-ink/65 leading-relaxed font-sans font-light">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 4. "ONE OS, EVERY WORKFLOW" SECTION (Dark Theme Tabs with Images) ───────── */}
            <section className="py-24 px-8 bg-ink text-bg relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4 max-w-3xl mx-auto flex flex-col items-center">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#818CF8] font-bold">
                            Built For
                        </span>
                        <div className="w-10 h-0.5 bg-accent" />
                        <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter text-bg leading-none mt-6">
                            One OS, every workflow
                        </h2>
                        <p className="text-sm font-sans text-bg/60 mt-2 font-light">
                            Ention OS adapts to who you are — not the other way around.
                        </p>
                    </div>

                    {/* Tab Navigation & Detail Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-4">
                        {/* Sidebar Tab List */}
                        <div className="lg:col-span-4 flex flex-col gap-3 text-left justify-center">
                            {workflows.map((flow) => {
                                const FlowIcon = flow.icon;
                                const isActive = activeTab === flow.id;
                                return (
                                    <button
                                        key={flow.id}
                                        onClick={() => setActiveTab(flow.id)}
                                        className={`w-full p-4 border rounded-xl flex items-center justify-between text-left cursor-pointer transition-all duration-300 ${isActive ? "bg-white/5 border-white/20 text-white shadow-lg" : "bg-transparent border-white/5 text-bg/50 hover:border-white/10"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-300 ${isActive ? "bg-white/10 border-white/20 text-accent" : "bg-white/5 border-white/5 text-bg/30"}`}>
                                                <FlowIcon size={14} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h5 className="font-sans font-bold text-xs leading-none">
                                                    {flow.label}
                                                </h5>
                                                <p className={`text-[9px] font-sans leading-none mt-1 ${isActive ? "text-white/60" : "text-bg/30"}`}>
                                                    {flow.tagline}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className={`shrink-0 transition-transform ${isActive ? "rotate-90 text-accent" : "text-bg/20"}`} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content Split display */}
                        <div className="lg:col-span-8 p-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full"
                                >
                                    {/* Left image block */}
                                    <div className="md:col-span-5 relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
                                        <Image 
                                            src={currentWorkflow.image} 
                                            alt={currentWorkflow.label}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent opacity-80" />
                                    </div>

                                    {/* Right text details */}
                                    <div className="md:col-span-7 space-y-6 text-left">
                                        <div className="space-y-1.5">
                                            <h4 className="font-serif italic font-bold text-2xl text-white">
                                                {currentWorkflow.label}
                                            </h4>
                                            <span className="text-[10px] font-sans text-accent font-bold uppercase tracking-wider block">
                                                {currentWorkflow.tagline}
                                            </span>
                                        </div>
                                        <p className="text-xs md:text-sm text-bg/75 leading-relaxed font-sans font-light">
                                            {currentWorkflow.desc}
                                        </p>
                                        <ul className="space-y-3">
                                            {currentWorkflow.bullets.map((bullet, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-xs text-bg/80 leading-relaxed font-sans font-light">
                                                    <div className="w-5 h-5 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-accent shrink-0 mt-0.5">
                                                        <Check size={10} strokeWidth={3} />
                                                    </div>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. ECOSYSTEM INTEGRATION SECTION (Light Theme) ────────────────────────── */}
            <section className="py-24 px-8 bg-bg text-ink relative z-10 border-t border-line">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-line pb-10">
                        {/* Left Heading */}
                        <div className="lg:col-span-7 space-y-3 text-left">
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block font-semibold">
                                Ecosystem Integration
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter text-ink leading-tight">
                                The OS that connects <br className="hidden md:inline" />everything Ention
                            </h2>
                        </div>
                        {/* Right Subtitle */}
                        <div className="lg:col-span-5 text-left lg:text-right">
                            <p className="text-sm md:text-base text-ink/65 leading-relaxed font-sans font-light">
                                Ention OS is not a standalone product — it&apos;s the connective tissue of the entire Ention ecosystem.
                            </p>
                        </div>
                    </div>

                    {/* Ecosystem Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        {[
                            {
                                tag: "AVAILABLE AT LAUNCH",
                                title: "Ention Hardware",
                                desc: "Optimised device drivers, one-click thermal profiles, battery intelligence, and real-time performance diagnostics — all native.",
                                icon: Cpu
                            },
                            {
                                tag: "AVAILABLE AT LAUNCH",
                                title: "Warranty & Support",
                                desc: "OS-level diagnostics automatically surface service alerts. Raise support tickets directly from system settings without leaving your workflow.",
                                icon: Shield
                            },
                            {
                                tag: "AVAILABLE AT LAUNCH",
                                title: "Innovation Programs",
                                desc: "Pre-configured lab environments for universities and accelerators. Ention OS ships deployment-ready for institutional programs.",
                                icon: Beaker
                            },
                            {
                                tag: "COMING IN PHASE 3",
                                title: "Ention Cloud & Sync",
                                desc: "Cross-device continuity, secure cloud backup, and seamless sync across all your Ention hardware — your workspace, everywhere.",
                                icon: Wifi
                            }
                        ].map((eco, idx) => {
                            const Icon = eco.icon;
                            const isLobby = eco.tag.includes("LAUNCH");
                            return (
                                <div 
                                    key={idx}
                                    className="p-6 border border-ink/10 rounded-2xl bg-white flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:border-accent/25 hover:shadow-lg group"
                                >
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                                <Icon size={14} strokeWidth={1.5} />
                                            </div>
                                            <span className={`text-[7px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full uppercase border ${isLobby ? "text-accent bg-accent/5 border-accent/20" : "text-ink/40 bg-ink/5 border-ink/10"}`}>
                                                {eco.tag}
                                            </span>
                                        </div>
                                        <h4 className="font-sans font-bold text-xs text-ink">
                                            {eco.title}
                                        </h4>
                                        <p className="text-[10px] text-ink/65 leading-relaxed font-sans font-light">
                                            {eco.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 6. ROADMAP SECTION (Dark Theme) ────────────────────────────────────────── */}
            <section className="py-24 px-8 bg-ink text-bg relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-10">
                        {/* Left Heading */}
                        <div className="lg:col-span-7 space-y-3 text-left">
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block font-semibold">
                                Our Roadmap
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter text-white leading-tight">
                                Solving today. <br className="hidden md:inline" />Building tomorrow.
                            </h2>
                        </div>
                        {/* Right Subtitle */}
                        <div className="lg:col-span-5 text-left">
                            <p className="text-sm md:text-base text-bg/60 leading-relaxed font-sans font-light">
                                Ention OS is Phase 2 of our three-part vision to build India&apos;s most complete computing ecosystem — from hardware through software to indigenous silicon.
                            </p>
                        </div>
                    </div>

                    {/* Phase Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Phase 1 */}
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col justify-between min-h-[350px] relative transition-all hover:bg-white/[0.04]">
                            <div className="space-y-6 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">Phase 1</span>
                                    <span className="text-[8px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full uppercase border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
                                        Completed
                                    </span>
                                </div>
                                <h3 className="font-sans font-bold text-lg text-white">Hardware Excellence</h3>
                                <ul className="space-y-4 font-sans text-xs text-white/70">
                                    {[
                                        "Performance laptop lineup for every segment",
                                        "On-site warranty across 30+ Indian cities",
                                        "Service network with doorstep repair",
                                        "Student verification & institutional programs",
                                        "Innovation labs for universities and accelerators"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <ChevronRight size={14} className="text-[#22C55E] shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Phase 2: Highlighted active phase */}
                        <div className="bg-white/[0.04] border-2 border-accent/40 p-8 rounded-2xl flex flex-col justify-between min-h-[350px] relative shadow-[0_0_30px_rgba(242,125,38,0.1)] transition-all hover:bg-white/[0.06]">
                            <span className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-white font-mono text-[8px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">Active</span>
                            <div className="space-y-6 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">Phase 2</span>
                                    <span className="text-[8px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full uppercase border border-accent/40 bg-accent/10 text-accent">
                                        In Progress
                                    </span>
                                </div>
                                <h3 className="font-sans font-bold text-lg text-white">OS & Experience Layer</h3>
                                <ul className="space-y-4 font-sans text-xs text-white/80">
                                    {[
                                        "Ention OS core architecture",
                                        "Deep hardware-software integration",
                                        "AI-native productivity layer",
                                        "Developer preview programme",
                                        "Institutional fleet management console"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-accent text-left">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                <span>You are here</span>
                            </div>
                        </div>

                        {/* Phase 3 */}
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col justify-between min-h-[350px] relative transition-all hover:bg-white/[0.04]">
                            <div className="space-y-6 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">Phase 3</span>
                                    <span className="text-[8px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full uppercase border border-white/10 bg-white/5 text-white/40">
                                        Upcoming
                                    </span>
                                </div>
                                <h3 className="font-sans font-bold text-lg text-white">Indigenous Technologies</h3>
                                <ul className="space-y-4 font-sans text-xs text-white/70">
                                    {[
                                        "Custom silicon research & participation",
                                        "Edge AI chipset integration",
                                        "OS hardening for sensitive environments",
                                        "India-first data sovereignty architecture",
                                        "Open hardware ecosystem"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <ChevronRight size={14} className="text-white/20 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. WHY ENTION OS FOR INDIA SECTION (Light Theme with Side-by-Side Image) ── */}
            <section className="py-24 px-8 bg-bg text-ink relative z-10 border-t border-line">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column Text */}
                    <div className="lg:col-span-5 space-y-6 text-left">
                        <div className="flex flex-col items-start space-y-2">
                            <span className="font-mono text-[9px] md:text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                                Why Ention OS
                            </span>
                            <div className="w-10 h-0.5 bg-ink" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter text-ink leading-tight">
                            India deserves an OS built for India
                        </h2>
                        <p className="text-sm md:text-base font-sans text-ink/75 leading-relaxed font-light">
                            Today, Indian students, developers, and institutions run operating systems designed for entirely different markets — software bloated with irrelevant regional services, pricing locked to foreign currency markets, and hardware integrations that never quite fit.
                        </p>
                        <p className="text-sm md:text-base font-sans text-ink/70 leading-relaxed font-light">
                            Ention OS is built ground-up for Indian workflows, Indian hardware realities, and India&apos;s long-term aspiration to own the full technology stack — not just consume it.
                        </p>
                    </div>

                    {/* Right Column List */}
                    <div className="lg:col-span-7 space-y-4">
                        {[
                            {
                                title: "Designed for Indian connectivity realities",
                                desc: "Offline-first features, low-bandwidth sync, and graceful degradation for varied network conditions.",
                                icon: Wifi
                            },
                            {
                                title: "India-resident data architecture",
                                desc: "Telemetry, sync, and cloud services anchored in India — built for the data sovereignty frameworks ahead.",
                                icon: Shield
                            },
                            {
                                title: "Education & institutional licensing",
                                desc: "Affordable, institution-wide licensing with volume deployment tools built for Indian government procurement.",
                                icon: GraduationCap
                            },
                            {
                                title: "AI in Indian languages",
                                desc: "On-device language models with multilingual support — not just English, but the languages India actually uses.",
                                icon: Sparkles
                            }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="bg-white border border-[#EBEBEF] p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:border-accent/30 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-[#F8F8FA] border border-[#EBEBEF] flex items-center justify-center text-accent shrink-0">
                                        <Icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <h4 className="font-sans font-bold text-sm text-ink leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-ink/65 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 8. EARLY ACCESS FORM SECTION (Dark Theme with Background Image) ──────────── */}
            <section className="relative py-32 px-8 overflow-hidden text-center flex flex-col items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/assets/landing_page/final-cta.png"
                        alt="Join Ention OS early access"
                        fill
                        className="object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-[#07060A]/90 backdrop-blur-sm" />
                </div>

                <div className="max-w-3xl mx-auto space-y-8 w-full relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span>Early Access Programme</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter text-white max-w-2xl mx-auto leading-tight">
                        Be among the first to experience Ention OS
                    </h2>
                    {/* Subtitle */}
                    <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans max-w-xl mx-auto font-light">
                        Join the early access list. We&apos;ll notify you when the developer preview opens — and your feedback will shape the final product.
                    </p>

                    {/* Form */}
                    <EarlyAccessForm />
                </div>
            </section>

            {/* ── 9. HARDWARE CALLOUT SECTION (Light Theme CTA) ───────────────────────────── */}
            <section className="py-16 px-8 bg-bg text-ink relative z-10 border-t border-line flex justify-center">
                <div className="w-full max-w-[1200px] bg-ink rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/5">
                    {/* Left text */}
                    <div className="space-y-2 text-left md:max-w-2xl">
                        <h3 className="font-serif italic font-bold text-lg md:text-xl text-white">
                            Interested in Ention hardware?
                        </h3>
                        <p className="text-xs md:text-sm text-white/60 leading-relaxed font-sans font-light">
                            Our laptops are available now — engineered for the same users Ention OS is built for.
                        </p>
                    </div>

                    {/* Right buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center shrink-0 w-full sm:w-auto">
                        <a 
                            href="/products" 
                            className="w-full sm:w-auto bg-white hover:bg-white/90 text-ink px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all font-sans"
                        >
                            <span>Browse Laptops</span>
                            <ArrowRight size={14} />
                        </a>
                        <button 
                            onClick={() => setActiveForm(true)}
                            className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center cursor-pointer transition-all font-sans"
                        >
                            Talk to Our Team
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

function EarlyAccessForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/inquiries/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    useCase: "Personal / Early Access",
                    source: "os_early_access_inline",
                    description: "Requested Early Access to Ention OS directly from OS landing page."
                })
            });
            if (response.ok) {
                setSuccess(true);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 border border-[#22C55E]/30 bg-[#22C55E]/5 rounded-2xl max-w-md mx-auto space-y-2 text-center"
            >
                <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] mx-auto mb-2">
                    <Check size={20} strokeWidth={2.5} />
                </div>
                <h4 className="font-bold text-sm text-[#22C55E]">Application Received!</h4>
                <p className="text-xs text-white/60">Thank you for joining the early access list. We will reach out as soon as the developer preview opens.</p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">
                {/* Name Input */}
                <div className="relative w-full md:w-64">
                    <input 
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-sans"
                        required
                    />
                    <span className="absolute left-3.5 top-3.5 text-white/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                </div>

                {/* Email Input */}
                <div className="relative w-full md:w-72">
                    <input 
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-sans"
                        required
                    />
                    <span className="absolute left-3.5 top-3.5 text-white/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-white hover:bg-white/90 text-ink px-6 py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-sans disabled:opacity-50"
                >
                    {loading ? (
                        <span>Requesting...</span>
                    ) : (
                        <>
                            <span>Request Access</span>
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
            {error && <p className="text-xs text-red-500 font-sans mt-2">{error}</p>}
            <p className="text-[10px] text-white/30 font-sans pt-2">
                No spam. No commitments. We&apos;ll only reach out with updates about Ention OS.
            </p>
        </form>
    );
}

