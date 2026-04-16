"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import OfferSection from "@/components/about/OfferSection";
import VisionCarousel from "@/components/about/VisionCarousel";

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

            {/* VISION CAROUSEL */}
            <VisionCarousel />
            <main className="max-w-7xl mx-auto px-12 py-24">
                {/* Hero Title */}
                <h1 className="text-7xl md:text-8xl font-serif font-medium text-center mb-32 tracking-tight">
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
                            <h2 className="text-4xl font-serif font-bold mb-8 leading-tight">
                                THE STORY BEHIND ENTION
                            </h2>
                            <div className="space-y-6 text-lg leading-relaxed opacity-70 font-serif">
                                <p>
                                    The name Ention is more than a label it's a philosophy. Inspired by the humble phrase
                                    <span className="text-[#F27D26] font-bold"> "mention not"</span>, Ention was thoughtfully crafted to represent our core values, each letter
                                    in Ention represents a value we live and build by:
                                    <span className="text-[#F27D26] font-bold"> Empowering Nations through Technology, Innovation, Opportunity, and New Ideas.</span>
                                </p>
                                <p>
                                    At Ention, we're not just building a brand—we're creating your working companion.
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
                                <h2 className="text-4xl font-serif font-bold mb-8 leading-tight">
                                    WHO WE ARE
                                </h2>
                                <p className="text-lg leading-relaxed opacity-70 font-serif">
                                    Ention is an Indian startup, founded on January 28, 2022, in Delhi, with one dream:
                                    To become India's leading <span className="text-[#F27D26] font-bold">Made-in-India</span> brand for laptops and computer devices,
                                    built for everyday professionals, creators, students, and gamers. We're driven by a deep
                                    commitment to quality, affordability, and innovation—delivering world-class devices
                                    designed to meet the unique demands of Indian consumers.
                                </p>
                            </div>
                            <Link href="/products">
                                <button className="bg-[#F27D26] text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#d9631a] transition-all rounded-sm shadow-xl active:scale-95">
                                    Discover the Process
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* WHAT WE OFFER - UNIQUE COMPONENT */}
            <OfferSection />


            {/* VIDEO SECTION */}
            <section className="py-24 px-12 bg-white">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center">
                        <h2 className="text-5xl font-serif font-bold italic mb-6">The Ention Experience</h2>
                        <div className="w-24 h-1 bg-[#F27D26] mx-auto" />
                    </div>
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

        </div>
    );
}
