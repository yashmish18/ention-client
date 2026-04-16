"use client";

import React from "react";
import { motion } from "framer-motion";
import { Thermometer, Monitor, Cpu, HardDrive, Battery, Radio } from "lucide-react";

const SPEC_GROUPS = [
    {
        title: "Display Architecture",
        icon: Monitor,
        details: [
            { label: "Panel Technology", value: "Liquid Crystal IPS // Sovereign Pro" },
            { label: "Color Space", value: "100% DCI-P3 // Lab Certified" },
            { label: "Frequency", value: "120Hz ProMotion Fluidity" },
            { label: "Peak Luminance", value: "500 Nits High-Dynamic Range" }
        ]
    },
    {
        title: "Thermal Management",
        icon: Thermometer,
        details: [
            { label: "Cooling Tech", value: "Dual-Vapor Chamber Strategy" },
            { label: "Fan Profile", value: "S-Curve Whisper Blade Technology" },
            { label: "Heat Pipes", value: "Triple Composite Liquid-Phase" },
            { label: "Active Airflow", value: "Omni-Directional Output" }
        ]
    },
    {
        title: "I/O Sovereignty",
        icon: Radio,
        details: [
            { label: "Thunderbolt 4", value: "3x High-Speed Operational Cells" },
            { label: "USB-A Legacy", value: "1x Data-Only Port (5Gbps)" },
            { label: "HDMI Standard", value: "2.1 (8K @ 60Hz Support)" },
            { label: "Card Interface", value: "SDXC High-Capacity Reader" }
        ]
    },
    {
        title: "Power Architecture",
        icon: Battery,
        details: [
            { label: "Battery Unit", value: "70Wh Lithium-Ion Polymer" },
            { label: "Charging Speed", value: "96W Fast-Auth Protocol" },
            { label: "Idle State", value: "Deep Sleep Optimization" },
            { label: "Cycle Rating", value: "1000 Full-Capacity Cycles" }
        ]
    }
];

export default function TechnicalSpecs({ product }: { product: any }) {
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
                            Revision 2.0-BRT <br />Domestic Compliance Data
                        </p>
                    </div>
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                    {SPEC_GROUPS.map((group, i) => (
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
                                        <p className="text-[8px] uppercase tracking-widest font-black text-black/20 group-hover:text-[#F27D26] transition-colors">
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

                {/* Process Callout */}
                <div className="bg-[#FAF9F6] p-12 lg:p-24 rounded-sm border border-black/[0.03] space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-12 space-y-4">
                            <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-[9px] block">Manufacturing Philosophy</span>
                            <h3 className="text-4xl font-serif font-bold italic tracking-tighter">Engineered for Sovereignty.</h3>
                            <p className="text-[14px] font-serif italic text-black/60 leading-relaxed max-w-4xl">
                                "The ENTI·ON Workbook is not merely assembled; it is orchestrated. From the precision of the CNC-milled chassis to the thermal mapping of the logic board, every decision is made to ensure that our domestic technical capabilities meet—and exceed—global standards."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
