"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, Upload } from "lucide-react";
import { submitLead } from "@/lib/api";

interface LeadSalesFormProps {
    source?: string;
    onSuccess?: () => void;
}

export default function LeadSalesForm({ source = "General", onSuccess }: LeadSalesFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        useCase: "Personal",
        budget: "",
        description: "",
        attachment: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitLead({ ...formData, source });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (error) {
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="bg-white p-12 text-center space-y-6 border border-black/5"
            >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-3xl font-serif font-bold italic">Enquiry Sent.</h3>
                <p className="text-sm text-black/50 font-mono uppercase tracking-widest">Our team will be in touch within 24 hours.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-12 border border-black/5 space-y-12 shadow-2xl">
            <div className="space-y-4">
                <span className="text-accent font-mono text-[10px] uppercase tracking-[0.4em]">Sales Enquiry</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tighter">Tell Us Your Requirement.</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Full Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent"
                            placeholder="Vikram Rao"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Email Address</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent"
                            placeholder="vikram@example.com"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Phone Number</label>
                        <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent"
                            placeholder="+91 98XXX XXXXX"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Use Case</label>
                        <select
                            value={formData.useCase}
                            onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent appearance-none"
                        >
                            <option>Personal</option>
                            <option>Startup</option>
                            <option>Enterprise</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Requirement Description</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-black/10 p-4 h-32 text-sm font-serif outline-none focus:border-accent resize-none"
                        placeholder="Please describe your specific hardware needs..."
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4 text-black/30 hover:text-accent cursor-pointer transition-colors group">
                        <Upload size={16} />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Upload Specs (Optional)</span>
                    </div>

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full md:w-auto bg-ink text-bg px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-accent transition-all rounded-sm"
                    >
                        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Processsing...</> : <><Send size={16} /> Get Quote</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
