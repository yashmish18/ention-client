"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { submitApplication } from "@/lib/api";

interface ProgramFormProps {
    programName: string;
    onSuccess?: () => void;
}

export default function ProgramApplicationForm({ programName, onSuccess }: ProgramFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        role: "",
    });
    
    // Dynamic fields based on programName
    const [dynamicFields, setDynamicFields] = useState<any>({});

    const isCampus = programName.toLowerCase().includes("campus");
    const isStartup = programName.toLowerCase().includes("startup");
    const isLab = programName.toLowerCase().includes("lab");
    const isExperience = programName.toLowerCase().includes("experience");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitApplication({
                ...formData,
                programName,
                dynamicFields
            });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (error) {
            alert("Application delivery failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 text-center space-y-6 border border-black/5">
                <CheckCircle2 size={48} className="text-accent mx-auto" />
                <h3 className="text-3xl font-serif font-bold italic">Application Received.</h3>
                <p className="text-sm text-black/50 font-mono uppercase tracking-widest">Our program leads will review your profile.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-12 border border-black/5 space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent font-black">
                    <Sparkles size={16} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Program Application</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tighter leading-none">Apply for {programName}.</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Name</label>
                        <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Email</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Phone</label>
                        <input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">{isCampus ? "College Name" : "Organization Name"}</label>
                        <input required value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                </div>

                {/* Conditional Fields */}
                {isStartup && (
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Startup Stage</label>
                        <select onChange={(e) => setDynamicFields({...dynamicFields, stage: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent">
                            <option>Ideation</option>
                            <option>MVP / Early Stage</option>
                            <option>Growth / Scaling</option>
                        </select>
                    </div>
                )}
                
                {isExperience && (
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Trial Duration Requested</label>
                        <input placeholder="e.g. 1 week" onChange={(e) => setDynamicFields({...dynamicFields, duration: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                )}

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-ink text-bg py-6 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-accent transition-all rounded-sm shadow-xl"
                >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Apply Now</>}
                </button>
            </form>
        </div>
    );
}
