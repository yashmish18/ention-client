"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Paperclip, X as XIcon, AlertCircle } from "lucide-react";
import { submitLeadInquiry } from "@/lib/api";
import type { InquirySource } from "@/lib/inquiry-sources";

interface LeadSalesFormProps {
    source: InquirySource;
    onSuccess?: () => void;
    initialDescription?: string;
    initialUseCase?: string;
}

export default function LeadSalesForm({
    source,
    onSuccess,
    initialDescription = "",
    initialUseCase = "Personal"
}: LeadSalesFormProps) {
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
        useCase: initialUseCase,
        budget: "",
        description: initialDescription,
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await submitLeadInquiry({
                ...formData,
                source,
                attachment
            });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Enquiry submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#FAF9F6] p-12 text-center space-y-6 border border-neutral-200/50 rounded-sm"
            >
                <div className="w-16 h-16 bg-neutral-100 text-[#8c827a] rounded-full flex items-center justify-center mx-auto border border-neutral-200">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-3xl font-serif font-black italic uppercase text-neutral-900 tracking-tight">Enquiry Sent</h3>
                <p className="text-xs text-[#8c827a] font-mono uppercase tracking-[0.2em] font-bold">Our team will be in touch within 24 hours.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] p-8 md:p-12 border border-neutral-200/50 space-y-10 text-left rounded-sm">
            <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-serif font-black italic tracking-tighter uppercase text-neutral-900 leading-tight">
                    Tell Us Your Requirement
                </h2>
                <p className="text-xs text-neutral-500 font-sans">
                    Fill in the details below and our sales engineering team will get back to you shortly.
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

                {/* 2 Column Phone & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                            Phone Number <span className="text-accent">*</span>
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
                            Budget (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                            placeholder="e.g. ₹60,000"
                        />
                    </div>
                </div>

                {/* Full Width Use Case Dropdown */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Use Case <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={formData.useCase}
                            onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 pr-12 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 appearance-none cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        >
                            <option value="Personal">Personal</option>
                            <option value="Startup">Startup</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Requirement Description <span className="text-accent">*</span>
                    </label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 h-36 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 resize-none transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        placeholder="Please describe your specific hardware or volume needs..."
                    />
                </div>

                {/* File Attachment */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Attach Reference Specifications (Optional)
                    </label>
                    <input
                        ref={fileRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="lead-file-upload-new"
                    />
                    {attachment ? (
                        <div className="flex items-center gap-4 bg-white border border-neutral-200 p-4 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                            <Paperclip size={16} className="text-[#8c827a] shrink-0" />
                            <span className="text-sm font-sans flex-1 truncate text-neutral-800">{attachment.name}</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                                {(attachment.size / 1024).toFixed(0)} KB
                            </span>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="text-neutral-400 hover:text-neutral-900 transition-colors"
                            >
                                <XIcon size={16} />
                            </button>
                        </div>
                    ) : (
                        <label
                            htmlFor="lead-file-upload-new"
                            className="flex items-center gap-4 text-neutral-400 hover:text-[#141414] cursor-pointer transition-colors border border-dashed border-neutral-200 hover:border-neutral-400 p-5 bg-white rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        >
                            <Paperclip size={16} className="text-neutral-400" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Upload File (PDF / DOC / Image)</span>
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
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>Get Quote</span>
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
