"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import OfferSection from "@/components/about/OfferSection";
import VisionCarousel from "@/components/about/VisionCarousel";
import { BlurFadeIn } from "@/components/BlurFadeIn";

const FacebookIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const YoutubeIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#F27D26] selection:text-white overflow-x-hidden">
            <BlurFadeIn delay={0.1}>
                {/* VISION CAROUSEL */}
                <VisionCarousel />
                <main className="max-w-7xl mx-auto px-12 pt-0 pb-24 space-y-32">
                    {/* Hero Title */}
                    <h1 className="text-7xl md:text-8xl font-serif font-medium text-center tracking-tight">
                        A Manifested <span className="italic">Reality.</span>
                    </h1>

                    {/* Content Grid (Restored Split Layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Left Column - THE STORY BEHIND ENTION */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 border border-black/5">
                                <Image
                                    src="/assets/about-studio.png"
                                    alt="Ention Studio"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="max-w-xl">
                                <h2 className="text-4xl font-serif font-bold mb-8 leading-tight uppercase">
                                    THE STORY BEHIND ENTION
                                </h2>
                                <div className="space-y-6 text-lg leading-relaxed opacity-70 font-serif">
                                    <p>
                                        The name Ention is more than a label, it&apos;s a philosophy of purpose-driven innovation. Inspired by the humble phrase
                                        <span className="text-[#F27D26] font-bold"> &quot;mention not&quot;</span>, Ention was thoughtfully crafted to reflect humility, reliability, and a long-term commitment to building meaningful technology.
                                    </p>
                                    <p>
                                        Each letter in Ention represents a value we live and build by:<br />
                                        <span className="text-[#F27D26] font-bold">Empowering Nations through Technology, Innovation, Opportunity, and New Ideas.</span>
                                    </p>
                                    <p>
                                        At Ention, we&apos;re not just building a brand or participating in the market—we&apos;re creating solutions that evolve with users and ecosystems.
                                        As a pioneering force in the computing industry, we proudly stand at the intersection of
                                        manufacturing excellence and strategic technology consultancy.
                                    </p>
                                </div>
                                <div className="mt-8 w-16 h-[2px] bg-[#F27D26]" />
                            </div>
                        </div>

                        {/* Right Column - WHO WE ARE */}
                        <div className="lg:col-span-5 space-y-12 lg:pt-32">
                            <div className="relative aspect-square w-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 border border-black/5">
                                <Image
                                    src="/assets/about-manufacturing.png"
                                    alt="Who we are"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-10">
                                <div>
                                    <h2 className="text-4xl font-serif font-bold mb-8 leading-tight uppercase">
                                        WHO WE ARE
                                    </h2>
                                    <p className="text-lg leading-relaxed opacity-70 font-serif">
                                        Ention is an emerging startup, founded on January 28, 2022, in Delhi, with one dream:
                                        To become India&apos;s leading <span className="text-[#F27D26] font-bold">Made-in-India</span> brand for laptops and computer devices.
                                        We are focused on delivering reliable, customizable, and cost-efficient computing solutions built for everyday professionals, creators, students, and gamers.
                                    </p>
                                    <p className="text-lg leading-relaxed opacity-70 font-serif mt-4">
                                        We currently operate as a system integrator and assembler, enabling individuals, institutions, and enterprises with high-performance devices tailored to real-world needs.
                                        Driven by a deep commitment to quality, affordability, and innovation, we are building toward a larger goal—a fully indigenous computing ecosystem.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Section 4: FOUNDER'S PERSPECTIVE */}
                    <section className="bg-white p-16 lg:p-24 shadow-2xl rounded-sm border border-black/5">
                        <div className="max-w-4xl mx-auto space-y-8 text-center text-[#141414]">
                            <h2 className="text-5xl font-serif font-bold italic">Built from the Ground Up</h2>
                            <div className="space-y-6 text-xl leading-relaxed opacity-80 font-serif max-w-3xl mx-auto">
                                <p>Ention started with a simple realization:<br />India consumes millions of computing devices—but builds very few.</p>
                                <p>Instead of just participating in the market, the goal was to build capability from within. The journey began with system integration—but the vision goes far beyond:</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6 text-[#F27D26] font-bold text-lg mt-6">
                                <span>→ Control</span>
                                <span>→ Optimization</span>
                                <span>→ Indigenous development</span>
                            </div>
                            <p className="text-xl leading-relaxed opacity-80 font-serif mt-8">This is a long-term build—not a shortcut.</p>
                            <blockquote className="text-3xl lg:text-4xl font-serif font-bold mt-12 bg-clip-text text-transparent bg-gradient-to-r from-[#F27D26] to-[#141414]">
                                &quot;India has the talent. India has the demand.<br />Now it&apos;s time to build our own computing future.&quot;
                            </blockquote>
                        </div>
                    </section>

                    {/* Section 5 & 6 Grid : Progress & What We Do */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-8 bg-[#141414] text-[#E4E3E0] p-12 lg:p-16 rounded-sm shadow-xl">
                            <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Progress</span>
                            <h2 className="text-4xl font-serif font-bold">Our Progress So Far</h2>
                            <ul className="space-y-6 text-lg font-sans opacity-90">
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Founded in 2022</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Growing presence in institutional and enterprise segments</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Building partnerships across education and startup ecosystems</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Expanding from devices to ecosystem-driven programs</p>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-8 border border-black/10 bg-white p-12 lg:p-16 rounded-sm shadow-xl">
                            <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Capabilities</span>
                            <h2 className="text-4xl font-serif font-bold">What We Do</h2>
                            <p className="text-lg opacity-70 font-serif mb-6">We provide end-to-end computing solutions:</p>
                            <ul className="space-y-6 text-lg font-sans opacity-90">
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Custom-built laptops for individuals and organizations</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Institutional and educational solutions</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>OEM and white-label manufacturing</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Enterprise deployment and IT support</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#F27D26] shrink-0" />
                                    <p>Device lifecycle management and upgrades</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 7: Our Vision */}
                    <section className="text-center space-y-8 py-16">
                        <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Our Vision</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight max-w-4xl mx-auto">
                            To build India&apos;s most trusted end-to-end computing ecosystem—from devices to operating systems to core components.
                        </h2>
                        <div className="w-24 h-1 bg-[#F27D26] mx-auto mt-8" />
                    </section>

                    {/* Section 8 & 9: Approach & Journey */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Methodology</span>
                            <h2 className="text-4xl font-serif font-bold">Our Approach</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold font-serif mb-2 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" /> Customer-first customization
                                    </h3>
                                    <p className="opacity-70 font-sans ml-5">Solutions built around real user needs</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif mb-2 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" /> Scalable solutions
                                    </h3>
                                    <p className="opacity-70 font-sans ml-5">Designed for individuals to enterprises</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif mb-2 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" /> Ecosystem partnerships
                                    </h3>
                                    <p className="opacity-70 font-sans ml-5">Collaborating with institutions, startups, and industry</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif mb-2 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" /> Continuous innovation
                                    </h3>
                                    <p className="opacity-70 font-sans ml-5">Adapting to evolving technologies</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif mb-2 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" /> Co-creation mindset
                                    </h3>
                                    <p className="opacity-70 font-sans ml-5">Building together with partners</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 border-l-0 lg:border-l border-black/10 pl-0 lg:pl-16">
                            <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Milestones</span>
                            <h2 className="text-4xl font-serif font-bold">Our Journey</h2>
                            <p className="text-lg opacity-70 font-serif mb-8">We are building step-by-step toward a larger vision:</p>

                            <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-black/10">
                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full border-4 border-[#E4E3E0] bg-[#F27D26]" />
                                    <h3 className="text-2xl font-bold font-serif mb-2">Today</h3>
                                    <p className="opacity-70 font-sans">System Integration & Assembly</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full border-4 border-[#E4E3E0] bg-black/30" />
                                    <h3 className="text-2xl font-bold font-serif mb-2">Next</h3>
                                    <p className="opacity-70 font-sans">Optimization & Control Layer</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full border-4 border-[#E4E3E0] bg-black/30" />
                                    <h3 className="text-2xl font-bold font-serif mb-2">Future</h3>
                                    <p className="opacity-70 font-sans">Indigenous Hardware, OS & AI Stack</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 10 & 11: Why It Matters & Beyond Products */}
                    <div className="bg-[#141414] text-[#E4E3E0] p-12 lg:p-24 rounded-sm shadow-2xl space-y-24 my-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Impact</span>
                                <h2 className="text-4xl font-serif font-bold">Why It Matters</h2>
                                <p className="text-lg opacity-80 font-serif">India is one of the largest consumers of computing devices—but has limited control over how they are built.</p>
                                <p className="text-lg opacity-80 font-serif">Ention aims to change that by enabling:</p>
                                <div className="flex flex-wrap gap-4">
                                    <span className="bg-white/10 px-4 py-2 rounded-sm text-sm uppercase tracking-wider font-bold">Ownership</span>
                                    <span className="bg-white/10 px-4 py-2 rounded-sm text-sm uppercase tracking-wider font-bold">Capability</span>
                                    <span className="bg-white/10 px-4 py-2 rounded-sm text-sm uppercase tracking-wider font-bold">Innovation</span>
                                </div>
                                <p className="text-xl font-serif font-bold italic text-[#F27D26] mt-4">We are not just building laptops—we are building the foundation for long-term technological independence.</p>
                            </div>

                            <div className="space-y-8">
                                <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Ecosystem</span>
                                <h2 className="text-4xl font-serif font-bold">Beyond Products <br /> <span className="text-2xl opacity-70 italic font-normal">Building an Ecosystem</span></h2>
                                <p className="text-lg opacity-80 font-serif">Ention goes beyond devices to enable:</p>
                                <ul className="space-y-4 text-lg font-sans opacity-90">
                                    <li className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" />
                                        Innovation labs in institutions
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" />
                                        Startup ecosystem partnerships
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#F27D26]" />
                                        Co-creation and shared innovation
                                    </li>
                                </ul>
                                <p className="text-xl font-serif font-bold italic text-[#F27D26] mt-4">Because the future of computing will not be built alone—it will be co-created.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 12: FINAL CTA SECTION */}
                    <section className="text-center space-y-12 pb-16">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold italic tracking-tight leading-tight">Building India&apos;s <br /> Computing Future</h2>
                        <p className="text-xl opacity-70 font-serif max-w-2xl mx-auto">
                            Whether you are an institution, a startup, a partner, or an early supporter, there&apos;s an opportunity to build together.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 pt-8">
                            <Link href="/solutions">
                                <button className="bg-[#F27D26] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#d9631a] transition-all rounded-sm shadow-xl active:scale-95">
                                    Build With Us
                                </button>
                            </Link>
                            <Link href="/solutions">
                                <button className="bg-[#141414] text-white border border-[#141414] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black/90 transition-all rounded-sm shadow-xl active:scale-95">
                                    Partner With Us
                                </button>
                            </Link>
                            <Link href="/products">
                                <button className="bg-transparent text-[#141414] border border-[#141414] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black/5 transition-all rounded-sm shadow-xl active:scale-95">
                                    Explore Solutions
                                </button>
                            </Link>
                        </div>
                    </section>
                </main>

                {/* WHAT WE OFFER - UNIQUE COMPONENT */}
                <OfferSection />


                {/* VIDEO SECTION */}
                <section className="py-24 px-12 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl border border-black/5 bg-[#141414]">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Ention Brand Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
            </BlurFadeIn>
        </div>
    );
}
