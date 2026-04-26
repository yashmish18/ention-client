"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Loader2, CheckCircle2 } from "lucide-react";
import { submitCallback } from "@/lib/api";

interface QuickCallbackFormProps {
    onSuccess?: () => void;
}

export default function QuickCallbackForm({ onSuccess }: QuickCallbackFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        preferredTime: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitCallback(formData);
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (error) {
            alert("Request failed. Please check your connection.");
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
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 text-xs font-serif outline-none focus:border-accent" />
                </div>
                <div className="space-y-1">
                    <label className="text-[8px] uppercase font-black tracking-widest text-black/40">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 text-xs font-serif outline-none focus:border-accent" />
                </div>
                <div className="space-y-1">
                    <label className="text-[8px] uppercase font-black tracking-widest text-black/40">Preferred Time (Optional)</label>
                    <input value={formData.preferredTime} onChange={(e) => setFormData({...formData, preferredTime: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 text-xs font-serif outline-none focus:border-accent" placeholder="e.g. 2 PM - 4 PM" />
                </div>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-ink text-bg py-4 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-accent transition-all rounded-sm"
                >
                    {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : "Request Call"}
                </button>
            </form>
        </div>
    );
}
