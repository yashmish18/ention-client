"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Paperclip, X as XIcon, AlertCircle } from "lucide-react";
import { submitLeadInquiry } from "@/lib/api";
import type { InquirySource } from "@/lib/inquiry-sources";

interface LeadSalesFormProps {
    source: InquirySource;
    onSuccess?: () => void;
    initialDescription?: string;
    initialUseCase?: string;
}

const ALLOWED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const ALLOWED_EXTENSIONS = ".pdf,.doc,.docx";

export default function LeadSalesForm({ source, onSuccess, initialDescription = "", initialUseCase = "Personal" }: LeadSalesFormProps) {
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
        useCase: "Personal",
        budget: "",
        description: "",
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFileError(null);
        if (!file) { setAttachment(null); return; }
        if (!ALLOWED_TYPES.includes(file.type)) {
            setFileError("Only PDF, DOC, or DOCX files are accepted.");
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
            await submitLeadInquiry({ ...formData, source, attachment });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (err: any) {
            setError(err.message || "Submission failed. Please try again.");
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
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors"
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
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors"
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
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors"
                            placeholder="+91 98XXX XXXXX"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Use Case</label>
                        <select
                            value={formData.useCase}
                            onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent appearance-none transition-colors"
                        >
                            <option>Personal</option>
                            <option>Startup</option>
                            <option>Enterprise</option>
                            <option>Education / Institution</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Requirement Description</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-black/10 p-4 h-32 text-sm font-serif outline-none focus:border-accent resize-none transition-colors"
                        placeholder="Please describe your specific hardware needs..."
                    />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Attach Specs (Optional — PDF, DOC, DOCX)</label>
                    <input
                        ref={fileRef}
                        type="file"
                        accept={ALLOWED_EXTENSIONS}
                        onChange={handleFile}
                        className="hidden"
                        id="lead-file-upload"
                    />
                    {attachment ? (
                        <div className="flex items-center gap-4 bg-[#FAF9F6] border border-accent/30 p-4 rounded-sm">
                            <Paperclip size={16} className="text-accent shrink-0" />
                            <span className="text-sm font-serif flex-1 truncate">{attachment.name}</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-black/40">
                                {(attachment.size / 1024).toFixed(0)} KB
                            </span>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="text-black/30 hover:text-black transition-colors"
                            >
                                <XIcon size={16} />
                            </button>
                        </div>
                    ) : (
                        <label
                            htmlFor="lead-file-upload"
                            className="flex items-center gap-4 text-black/30 hover:text-accent cursor-pointer transition-colors group border border-dashed border-black/10 hover:border-accent/30 p-4"
                        >
                            <Paperclip size={16} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Upload Specs (Optional)</span>
                        </label>
                    )}
                    {fileError && (
                        <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-500">
                            <AlertCircle size={12} /> {fileError}
                        </p>
                    )}
                </div>

                {/* Submission error */}
                {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                        <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 font-serif">{error}</p>
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-end items-center gap-8">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full md:w-auto bg-ink text-bg px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-accent transition-all rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                            ? <><Loader2 size={16} className="animate-spin" /> Processing...</>
                            : <><Send size={16} /> Get Quote</>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}
