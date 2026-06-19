"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, Paperclip, X as XIcon } from "lucide-react";
import { createSupportTicket } from "@/lib/api";
import type { InquirySource } from "@/lib/inquiry-sources";

interface SmartSupportFormProps {
    initialCategory?: string;
    productModel?: string;
    source?: InquirySource;
    onSuccess?: () => void;
}

export default function SmartSupportForm({
    initialCategory = "General Inquiry",
    productModel = "",
    onSuccess
}: SmartSupportFormProps) {
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
        category: initialCategory,
        productModel: productModel,
        serialNumber: "",
        description: ""
    });

    const categories = ["Product Support", "Enterprise Support", "Service / Warranty", "General Inquiry"];

    const getHeadline = () => {
        if (formData.category === "Product Support") return "Product Support Request";
        if (formData.category === "Service / Warranty") return "Service / Warranty Request";
        if (formData.category === "Enterprise Support") return "Enterprise Support Request";
        return "General Inquiry";
    };

    const isProductOrServiceSelected = 
        formData.category === "Product Support" || formData.category === "Service / Warranty";
    
    const isServiceSelected = formData.category === "Service / Warranty";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFileError(null);
        if (!file) {
            setAttachment(null);
            return;
        }
        // Limit to common image formats / PDF under 10MB
        const isAllowedType = file.type.startsWith("image/") || file.type === "application/pdf";
        if (!isAllowedType) {
            setFileError("Only image files or PDFs are accepted.");
            e.target.value = "";
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
            const productDetails = [];
            if (isProductOrServiceSelected && formData.productModel) {
                productDetails.push(`Model: ${formData.productModel}`);
            }
            if (isServiceSelected && formData.serialNumber) {
                productDetails.push(`Serial/Invoice: ${formData.serialNumber}`);
            }
            if (attachment) {
                productDetails.push(`Attachment: ${attachment.name}`);
            }

            const headerInfo = productDetails.length > 0 ? ` [${productDetails.join(" | ")}]` : "";
            const subject = `[${formData.category}] Support Request from ${formData.name}${headerInfo}`;

            const fullDescription = [
                productDetails.length > 0 ? `--- Hardware & Ticket Info ---\n${productDetails.join("\n")}\n------------------------------` : null,
                formData.description
            ].filter(Boolean).join("\n\n");

            await createSupportTicket({
                subject,
                description: fullDescription,
                category: formData.category,
                priority: "MEDIUM",
            });
            
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Request failed. Please check details and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#FAF9F6] p-12 text-center space-y-6 border border-neutral-200/50 rounded-sm">
                <CheckCircle2 size={48} className="text-[#8c827a] mx-auto" />
                <h3 className="text-3xl font-serif font-black italic uppercase text-neutral-900 tracking-tight">Request Logged</h3>
                <p className="text-xs text-[#8c827a] font-mono uppercase tracking-[0.2em] font-bold">Our engineering team will contact you shortly.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] p-8 md:p-12 border border-neutral-200/50 space-y-10 text-left rounded-sm">
            <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-serif font-black italic tracking-tighter uppercase text-neutral-900 leading-tight">
                    {getHeadline()}
                </h2>
                <p className="text-xs text-neutral-500 font-sans">
                    Fill in the details below and our team will get back within 24 hours.
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

                {/* 2 Column Phone & Model */}
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
                            Order ID / Model {isProductOrServiceSelected ? <span className="text-accent">*</span> : "(Optional)"}
                        </label>
                        <input
                            required={isProductOrServiceSelected}
                            placeholder={isProductOrServiceSelected ? "e.g. Workbook A14" : "e.g. #ORD-12345"}
                            value={formData.productModel}
                            onChange={(e) => setFormData({ ...formData, productModel: e.target.value })}
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        />
                    </div>
                </div>

                {/* Full Width Category Dropdown */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Issue Category <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 pr-12 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 appearance-none cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Serial Number & Invoice (Service / Warranty only) */}
                {isServiceSelected && (
                    <div className="space-y-2 animate-fadeIn">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                            Serial Number / Invoice Info <span className="text-accent">*</span>
                        </label>
                        <input
                            required={isServiceSelected}
                            placeholder="e.g. SN-98127391 / INV-2026-081"
                            value={formData.serialNumber}
                            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                            className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        />
                    </div>
                )}

                {/* Issue Description */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white border border-neutral-200/70 rounded-sm py-4.5 px-5 h-36 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 resize-none transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        placeholder="Describe the issue you're facing..."
                    />
                </div>

                {/* Screenshot/Document upload */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                        Upload Screenshot (Optional)
                    </label>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="support-screenshot-upload"
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
                            htmlFor="support-screenshot-upload"
                            className="flex items-center gap-4 text-neutral-400 hover:text-[#141414] cursor-pointer transition-colors border border-dashed border-neutral-200 hover:border-neutral-400 p-5 bg-white rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        >
                            <Paperclip size={16} className="text-neutral-400" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Attach Screenshot or PDF</span>
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

                {/* Custom Submit block matching screenshot */}
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
                                <span>Submit Request</span>
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
