"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitCallbackInquiry } from "@/lib/api";
import type { InquirySource } from "@/lib/inquiry-sources";

interface QuickCallbackFormProps {
    source: InquirySource;
    onSuccess?: () => void;
}

export default function QuickCallbackForm({ source, onSuccess }: QuickCallbackFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        preferredTime: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await submitCallbackInquiry({ ...formData, source });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Request failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="bg-[#FAF9F6] p-8 text-center space-y-4 border border-neutral-200/50 rounded-sm"
            >
                <CheckCircle2 size={32} className="text-[#8c827a] mx-auto" />
                <p className="text-sm font-serif font-black italic uppercase text-neutral-900 tracking-tight">Callback Logged</p>
                <p className="text-xs text-[#8c827a] font-sans leading-relaxed">We will call you shortly.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] p-8 border border-neutral-200/50 space-y-8 text-left rounded-sm">
            <div className="space-y-2">
                <h3 className="text-2xl font-serif font-black italic tracking-tighter uppercase text-neutral-900 leading-tight">
                    Request a Call Back
                </h3>
                <p className="text-xs text-neutral-500 font-sans">
                    Leave your contact details and our team will call you back.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-neutral-200/70 rounded-sm py-3 px-4 text-xs font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        placeholder="e.g. John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Phone Number <span className="text-accent">*</span>
                    </label>
                    <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-neutral-200/70 rounded-sm py-3 px-4 text-xs font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        placeholder="e.g. +91 00000 00000"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Preferred Time (Optional)
                    </label>
                    <input
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-white border border-neutral-200/70 rounded-sm py-3 px-4 text-xs font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        placeholder="e.g. 2 PM – 4 PM"
                    />
                </div>

                {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 p-3 rounded-sm">
                        <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 font-sans">{error}</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-100">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full sm:w-auto bg-[#141414] hover:bg-neutral-800 text-white px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-3 rounded-none transition-all active:scale-95 shrink-0 cursor-pointer disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={14} className="animate-spin text-white" />
                                <span>Requesting...</span>
                            </>
                        ) : (
                            <>
                                <span>Request Call</span>
                                <span className="text-xs font-sans">→</span>
                            </>
                        )}
                    </button>
                    <span className="text-[10px] text-[#8c827a] font-sans leading-relaxed">
                        We contact within 2 hours.
                    </span>
                </div>
            </form>
        </div>
    );
}
