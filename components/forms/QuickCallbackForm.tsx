"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
        } catch (err: any) {
            setError(err.message || "Request failed. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 text-center space-y-4 border border-black/5">
                <CheckCircle2 size={32} className="text-green-500 mx-auto" />
                <p className="text-sm font-serif font-bold italic">We'll call you soon.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 border border-black/5 space-y-8 shadow-xl">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                    <PhoneCall size={14} />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-black">Fast Response</span>
                </div>
                <h3 className="text-2xl font-serif font-bold italic">Request a Call Back</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[8px] uppercase font-black tracking-widest text-black/40">Your Name</label>
                    <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-black/10 p-3 text-xs font-serif outline-none focus:border-accent transition-colors"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[8px] uppercase font-black tracking-widest text-black/40">Phone Number</label>
                    <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-black/10 p-3 text-xs font-serif outline-none focus:border-accent transition-colors"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[8px] uppercase font-black tracking-widest text-black/40">Preferred Time (Optional)</label>
                    <input
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-black/10 p-3 text-xs font-serif outline-none focus:border-accent transition-colors"
                        placeholder="e.g. 2 PM – 4 PM"
                    />
                </div>

                {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 p-3">
                        <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 font-serif">{error}</p>
                    </div>
                )}

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-ink text-bg py-4 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-accent transition-all rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting
                        ? <Loader2 size={14} className="animate-spin" />
                        : "Request Call"
                    }
                </button>
            </form>
        </div>
    );
}
