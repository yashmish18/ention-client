"use client";

import React from "react";
import { motion } from "framer-motion";

const SPECS = [
    { label: "Processor", e3: "Celeron N4020", e5: "N5095 / N95", e4: "i5 / i7 13th Gen" },
    { label: "Memory", e3: "8GB LPDDR4", e5: "16GB / 32GB", e4: "16GB / 32GB LPDDR5" },
    { label: "Storage", e3: "256GB SSD", e5: "512GB / 1TB", e4: "512GB / 1TB NVMe" },
    { label: "Display", e3: "14\" FHD", e5: "15.6\" FHD", e4: "14\" 2.5K ProMotion" },
    { label: "Build", e3: "Industrial Poly", e5: "Magnesium Alloy", e4: "Aerospace Aluminum" },
    { label: "Warranty", e3: "12 Months", e5: "18 Months", e4: "24 Months On-site" }
];

export default function TechSpecMatrix() {
    return (
        <section className="bg-[#141414] py-32 px-8 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="text-center space-y-6">
                    <span className="text-[#F27D26] uppercase tracking-[0.8em] font-black text-[10px]">Comparative Analysis</span>
                    <h2 className="text-5xl md:text-8xl font-serif font-bold italic tracking-tighter text-white">Spec Matrix.</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-8 px-6 text-left font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">Technical Identifier</th>
                                <th className="py-8 px-6 text-center font-serif italic text-xl text-white">Workbook E3</th>
                                <th className="py-8 px-6 text-center font-serif italic text-xl text-white">Workbook E5</th>
                                <th className="py-8 px-6 text-center font-serif italic text-xl text-[#F27D26]">Workbook E4 Elite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SPECS.map((spec, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="py-6 px-6 font-mono text-[9px] uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
                                        {spec.label}
                                    </td>
                                    <td className="py-6 px-6 text-center font-serif italic text-sm text-white/60">
                                        {spec.e3}
                                    </td>
                                    <td className="py-6 px-6 text-center font-serif italic text-sm text-white/60">
                                        {spec.e5}
                                    </td>
                                    <td className="py-6 px-6 text-center font-serif italic text-sm text-[#F27D26]/80 font-bold">
                                        {spec.e4}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5">
                    {[
                        { title: "Configuration", value: "Fully Modular", desc: "Select components tailored to your workload." },
                        { title: "Deployment", value: "48H Shipping", desc: "Rapid delivery across the Bharat innovation corridor." },
                        { title: "Support", value: "24/7 Concierge", desc: "Priority hardware assistance for elite users." }
                    ].map((item, i) => (
                        <div key={i} className="space-y-4">
                            <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-[8px]">{item.title}</span>
                            <p className="text-2xl font-serif font-bold italic text-white">{item.value}</p>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
