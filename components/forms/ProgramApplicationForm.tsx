"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Paperclip, X as XIcon, AlertCircle } from "lucide-react";
import { submitProgramInquiry } from "@/lib/api";
import type { InquirySource } from "@/lib/inquiry-sources";

interface ProgramFormProps {
    programName: string;
    source: InquirySource;
    onSuccess?: () => void;
}

export default function ProgramApplicationForm({ programName, source, onSuccess }: ProgramFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [attachment, setAttachment] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        role: "",
    });

    const [dynamicFields, setDynamicFields] = useState<Record<string, string>>({});

    const pNameLower = programName.toLowerCase();
    const isCampus = pNameLower.includes("campus") || pNameLower.includes("ambassador");
    const isStartup = pNameLower.includes("startup") || pNameLower.includes("ecosystem");
    const isLab = pNameLower.includes("lab") || pNameLower.includes("innovation");
    const isExperience = pNameLower.includes("experience");

    const getOrgLabel = () => {
        if (isCampus) return "College Name";
        if (isStartup) return "Startup Name";
        if (isLab) return "Institution / Research Lab Details";
        return "Organization / Company Name";
    };

    const getOrgPlaceholder = () => {
        if (isCampus) return "e.g. IIT Bombay";
        if (isStartup) return "e.g. Acme Tech Pvt Ltd";
        if (isLab) return "e.g. Innovation Cell, Delhi University";
        return "e.g. Ention Technologies";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFileError(null);
        if (!file) {
            setAttachment(null);
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setFileError("File must be under 10 MB.");
            e.target.value = "";
            return;
        }
        setAttachment(file);
    };

    const removeFile = () => {
        setAttachment(null);
        setFileError(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleDynamicFieldChange = (key: string, val: string) => {
        setDynamicFields(prev => ({ ...prev, [key]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await submitProgramInquiry({
                ...formData,
                programName,
                source,
                dynamicFields,
                attachment,
            });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Failed to submit program application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="bg-[#FAF9F6] p-12 text-center space-y-6 border border-neutral-200/50 rounded-sm"
            >
                <CheckCircle2 size={48} className="text-[#8c827a] mx-auto" />
                <h3 className="text-3xl font-serif font-black italic uppercase text-neutral-900 tracking-tight">Application Received</h3>
                <p className="text-xs text-[#8c827a] font-mono uppercase tracking-[0.2em] font-bold">Our program managers will review and respond shortly.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] p-8 md:p-12 border border-neutral-200/50 space-y-10 text-left rounded-sm">
            <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-serif font-black italic tracking-tighter uppercase text-neutral-900 leading-tight">
                    Apply for {programName}
                </h2>
                <p className="text-xs text-neutral-500 font-sans">
                    Fill in the details below to submit your application for the ecosystem partnership.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 2 Column Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                            Full Name <span className="text-accent">*</span>
                        </label>
                        <input 
                            required 
                            type="text"
                            value={formData.name} 
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]" 
                            placeholder="John Doe" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                            Email Address <span className="text-accent">*</span>
                        </label>
                        <input 
                            required 
                            type="email" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]" 
                            placeholder="john@example.com" 
                        />
                    </div>
                </div>

                {/* 2 Column Phone & Organization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                            Phone <span className="text-accent">*</span>
                        </label>
                        <input 
                            required 
                            type="tel" 
                            value={formData.phone} 
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]" 
                            placeholder="+91 00000 00000" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                            {getOrgLabel()} <span className="text-accent">*</span>
                        </label>
                        <input 
                            required 
                            type="text"
                            value={formData.organization} 
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })} 
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]" 
                            placeholder={getOrgPlaceholder()} 
                        />
                    </div>
                </div>

                {/* 2 Column Role / Designation & Startup Stage (if startup), otherwise full width Role */}
                {isStartup ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                                Role / Designation <span className="text-accent">*</span>
                            </label>
                            <input 
                                required 
                                type="text"
                                value={formData.role} 
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                                className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]" 
                                placeholder="e.g. Student / Founder / Lead" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                                Startup Stage <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    required
                                    value={dynamicFields.stage || ""}
                                    onChange={(e) => handleDynamicFieldChange("stage", e.target.value)}
                                    className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 pr-12 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 appearance-none cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                                >
                                    <option value="">Select Stage</option>
                                    <option value="Ideation">Ideation</option>
                                    <option value="MVP / Early Stage">MVP / Early Stage</option>
                                    <option value="Growth / Scaling">Growth / Scaling</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
                                    ▼
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                            Role / Designation <span className="text-accent">*</span>
                        </label>
                        <input 
                            required 
                            type="text"
                            value={formData.role} 
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]" 
                            placeholder="e.g. Student / Founder / Lead" 
                        />
                    </div>
                )}

                {isExperience && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                                Specific Trial Use Case <span className="text-accent">*</span>
                            </label>
                            <input
                                required
                                placeholder="e.g. Local Machine Learning Training"
                                value={dynamicFields.useCase || ""}
                                onChange={(e) => handleDynamicFieldChange("useCase", e.target.value)}
                                className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                                Trial Duration Requested <span className="text-accent">*</span>
                            </label>
                            <input
                                required
                                placeholder="e.g. 1 week"
                                value={dynamicFields.duration || ""}
                                onChange={(e) => handleDynamicFieldChange("duration", e.target.value)}
                                className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                            />
                        </div>
                    </div>
                )}

                {/* File Attachment Upload */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Supporting Document (Optional — PDF/DOC/Image)
                    </label>
                    <input
                        ref={fileRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="program-file-upload-new"
                    />
                    {attachment ? (
                        <div className="flex items-center gap-4 bg-white border border-neutral-200 p-4 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                            <Paperclip size={16} className="text-[#8c827a] shrink-0" />
                            <span className="text-sm font-sans flex-1 truncate text-neutral-800">{attachment.name}</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                                {(attachment.size / 1024).toFixed(0)} KB
                            </span>
                            <button type="button" onClick={removeFile} className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <XIcon size={16} />
                            </button>
                        </div>
                    ) : (
                        <label
                            htmlFor="program-file-upload-new"
                            className="flex items-center gap-4 text-neutral-400 hover:text-[#141414] cursor-pointer transition-colors border border-dashed border-neutral-200 hover:border-neutral-400 p-5 bg-white rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        >
                            <Paperclip size={16} className="text-neutral-400" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                                Attach Proposal, Pitch Deck, or Resume (Optional)
                            </span>
                        </label>
                    )}
                    {fileError && (
                        <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-500 mt-1">
                            <AlertCircle size={12} /> {fileError}
                        </p>
                    )}
                </div>

                {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 rounded-sm">
                        <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 font-sans">{error}</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-100">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full sm:w-auto bg-[#141414] hover:bg-neutral-800 text-white px-8 py-5 text-[10px] font-mono font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 rounded-none transition-all active:scale-95 shrink-0 cursor-pointer disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={14} className="animate-spin text-white" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <span>Apply Now</span>
                                <span className="text-xs font-sans">→</span>
                            </>
                        )}
                    </button>
                    <span className="text-[11px] text-[#8c827a] text-left font-sans leading-relaxed">
                        Typical response within 24–48 hours.
                    </span>
                </div>
            </form>
        </div>
    );

}
