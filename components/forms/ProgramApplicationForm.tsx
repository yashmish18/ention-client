"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Sparkles, Paperclip, X as XIcon, AlertCircle } from "lucide-react";
import { submitProgramInquiry } from "@/lib/api";
import type { InquirySource } from "@/lib/inquiry-sources";

interface ProgramFormProps {
    programName: string;
    source: InquirySource;
    onSuccess?: () => void;
}

const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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

    const [dynamicFields, setDynamicFields] = useState<any>({});

    const isCampus    = programName.toLowerCase().includes("campus");
    const isStartup   = programName.toLowerCase().includes("startup");
    const isExperience = programName.toLowerCase().includes("experience");

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
            await submitProgramInquiry({
                ...formData,
                programName,
                source,
                dynamicFields,
                attachment,
            });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (err: any) {
            setError(err.message || "Application delivery failed. Please try again.");
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
                        <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Email</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Phone</label>
                        <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">{isCampus ? "College Name" : "Organization Name"}</label>
                        <input required value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors" />
                    </div>
                </div>

                {/* Conditional Fields */}
                {isStartup && (
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Startup Stage</label>
                        <select
                            onChange={(e) => setDynamicFields({ ...dynamicFields, stage: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent appearance-none transition-colors"
                        >
                            <option>Ideation</option>
                            <option>MVP / Early Stage</option>
                            <option>Growth / Scaling</option>
                        </select>
                    </div>
                )}

                {isExperience && (
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Trial Duration Requested</label>
                        <input
                            placeholder="e.g. 1 week"
                            onChange={(e) => setDynamicFields({ ...dynamicFields, duration: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent transition-colors"
                        />
                    </div>
                )}

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black tracking-widest text-black/40">
                        Supporting Document (Optional — PDF, DOC, DOCX)
                    </label>
                    <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFile}
                        className="hidden"
                        id="program-file-upload"
                    />
                    {attachment ? (
                        <div className="flex items-center gap-4 bg-[#FAF9F6] border border-accent/30 p-4 rounded-sm">
                            <Paperclip size={16} className="text-accent shrink-0" />
                            <span className="text-sm font-serif flex-1 truncate">{attachment.name}</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-black/40">
                                {(attachment.size / 1024).toFixed(0)} KB
                            </span>
                            <button type="button" onClick={removeFile} className="text-black/30 hover:text-black transition-colors">
                                <XIcon size={16} />
                            </button>
                        </div>
                    ) : (
                        <label
                            htmlFor="program-file-upload"
                            className="flex items-center gap-4 text-black/30 hover:text-accent cursor-pointer transition-colors border border-dashed border-black/10 hover:border-accent/30 p-4"
                        >
                            <Paperclip size={16} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                                Attach Portfolio / Resume (Optional)
                            </span>
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

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-ink text-bg py-6 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-accent transition-all rounded-sm shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting
                        ? <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                        : <><Send size={16} /> Apply Now</>
                    }
                </button>
            </form>
        </div>
    );
}
