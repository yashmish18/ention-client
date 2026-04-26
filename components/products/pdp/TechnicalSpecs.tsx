"use client";

import React from "react";
import { Thermometer, Monitor, Cpu, Battery, Radio } from "lucide-react";

export default function TechnicalSpecs({ product }: { product: any }) {
    const slug = product?.slug || product?.id;

    // Mapping exact details based on PDF extraction
    const DYNAMIC_SPEC_GROUPS = [
        {
            title: "Core Architecture & Storage",
            icon: Cpu,
            details: [
                { label: "Processor", value: slug === 's1' ? "Intel Core i9-13900HK" : slug === 'e4' ? "Intel i7-13620H (10 Cores, 16 Threads)" : slug === 'e5' ? "Intel N5095 / N95" : slug === 'e1' ? "Intel N100 (up to 3.4GHz)" : slug === 'e3' ? "Intel Celeron" : "System Processor" },
                { label: "Memory (RAM)", value: slug === 's1' ? "16GB/32GB/64GB (Dual Slot)" : slug === 'e4' ? "8GB/16GB/32GB/64GB DDR4" : slug === 'e5' ? "16GB/32GB RAM" : slug === 'e1' ? "16GB/32GB RAM" : slug === 'e3' ? "8GB" : "System Memory" },
                { label: "Storage Drive", value: slug === 's1' ? "512GB/1TB/2TB SSD" : slug === 'e4' ? "Up to 2TB SSD (Dual Storage)" : slug === 'e5' ? "512GB / 1TB SSD" : slug === 'e1' ? "512GB / 1TB SSD" : slug === 'e3' ? "256GB SSD" : "NVMe SSD" },
                { label: "Graphics Engine", value: slug === 's1' ? "NVIDIA RTX 3060" : slug === 'e1' ? "Intel UHD 600" : "Integrated UHD Graphics" }
            ]
        },
        {
            title: "Display & Vision",
            icon: Monitor,
            details: [
                { label: "Panel Specs", value: slug === 's1' ? "16-inch FHD (1920x1080) 165Hz" : slug === 'e4' ? "15.6-inch FHD IPS" : slug === 'e5' ? "15.6-inch Full HD" : slug === 'e1' ? "14-inch IPS (1920x1200) 60Hz" : "FHD IPS Display" },
                { label: "Camera Module", value: slug === 's1' || slug === 'e1' ? "2MP HD with Privacy Shutter" : "HD Webcam with Privacy Shutter" },
                { label: "Display Features", value: slug === 's1' ? "2ms Response, Matte Anti-glare" : slug === 'e1' ? "Sleek Silver Display Bezel" : "High-Dynamic Range Panel" },
                { label: "Form Factor", value: slug === 'e1' ? "Ultra Lightweight (1.3kg)" : slug === 'e4' ? "Rugged Weight (1.68kg)" : "Aeronautical Grade Construction" }
            ]
        },
        {
            title: "Connectivity & Input",
            icon: Radio,
            details: [
                { label: "Keyboard", value: slug === 's1' || slug === 'e4' || slug === 'e5' ? "RGB Illuminated with Numpad" : slug === 'e1' ? "Standard with Numeric Keypad" : "Full-Size Keyboard" },
                { label: "Biometric Security", value: "Windows Fingerprint Lock" },
                { label: "Networking", value: "Dual-band WiFi (2.4/5GHz), Bluetooth 4.x" },
                { label: "I/O Ports", value: slug === 's1' ? "USB 3.2, USB 2.0, Type-C, HDMI, RJ45" : slug === 'e1' ? "Type-C, Audio Jack, Card Reader" : slug === 'e5' ? "Type-C + RJ45 Ethernet" : "Standard I/O Framework" }
            ]
        },
        {
            title: "Power & Chassis",
            icon: Battery,
            details: [
                { label: "Battery Unit", value: slug === 's1' ? "90Wh (4-cell 5500–6000mAh)" : slug === 'e4' || slug === 'e5' || slug === 'e1' ? "5000mAh High-Capacity Cell" : "Standard Lithium-Ion Polymer" },
                { label: "Cooling Tech", value: slug === 's1' ? "Advanced Thermal Cooling System" : slug === 'e4' ? "Dual Cooling System Architecture" : "Optimized Airflow Cooling" },
                { label: "Build Material", value: slug === 's1' || slug === 'e4' ? "Premium ABS + Aluminum Chassis" : slug === 'e1' ? "Sleek Silver Aluminum Finish" : "Durable ABS Housing" },
                { label: "Special Features", value: slug === 'e5' ? "Smart touch gesture controls" : slug === 'e1' ? "Ultra-portable design for students" : slug === 'e4' ? "Built for heavy workload rendering" : "Precision orchestrated components" }
            ]
        }
    ];

    return (
        <section className="bg-white py-40 px-12 border-t border-black/5">
            <div className="max-w-7xl mx-auto space-y-32">
                {/* Section Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">03 // Technical Document</span>
                            <div className="h-[1px] w-12 bg-[#F27D26]/20" />
                        </div>
                        <h2 className="text-6xl md:text-8xl font-serif font-bold italic leading-none tracking-tighter">Full Technical <br />Inventory.</h2>
                    </div>
                    <div className="md:col-span-4 opacity-40 text-right hidden md:block">
                        <p className="text-[10px] font-mono uppercase leading-relaxed tracking-widest italic font-bold">
                            Official Ention Specs <br />{product?.name || "System"} Protocol
                        </p>
                    </div>
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                    {DYNAMIC_SPEC_GROUPS.map((group, i) => (
                        <div key={i} className="space-y-12">
                            <div className="flex items-center justify-between pb-4 border-b border-black/10">
                                <h4 className="text-[12px] uppercase tracking-[0.4em] font-black text-black">
                                    {group.title}
                                </h4>
                                <group.icon size={18} className="text-[#F27D26]/40" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                                {group.details.map((detail, j) => (
                                    <div key={j} className="space-y-2 group">
                                        <p className="text-[8px] uppercase tracking-widest font-black text-black/20 group-hover:text-[#F27D26] transition-colors line-clamp-1">
                                            {detail.label}
                                        </p>
                                        <p className="text-[13px] font-mono text-black/80 font-medium">
                                            {detail.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Callout */}
                <div className="bg-[#FAF9F6] p-12 lg:p-24 rounded-sm border border-black/[0.03] space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-12 space-y-4">
                            <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-[9px] block">{product?.name || "Ention"} Warranty Protocol</span>
                            <h3 className="text-4xl font-serif font-bold italic tracking-tighter">Affordable. Customizable. Reliable.</h3>
                            <p className="text-[14px] font-serif italic text-black/60 leading-relaxed max-w-4xl">
                                Available exclusively on www.ention.in and major e-commerce platforms. Proudly Made in India, we provide No-Cost EMI schemes, an 18-month standard warranty extension offer, and pure uncompromised build quality tailored directly to your workflow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
