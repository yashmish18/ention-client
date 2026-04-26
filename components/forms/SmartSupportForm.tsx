"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, LifeBuoy } from "lucide-react";
import { submitLead } from "@/lib/api"; // We can reuse lead or use a dedicated ticket if authenticated

interface SmartSupportFormProps {
    initialCategory?: string;
    productModel?: string;
    onSuccess?: () => void;
}

export default function SmartSupportForm({ initialCategory = "General Inquiry", productModel = "", onSuccess }: SmartSupportFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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
        if (formData.category.includes("Product")) return "Product Support Request";
        if (formData.category.includes("Service")) return "Service / Warranty Request";
        if (formData.category.includes("Enterprise")) return "Enterprise Support Request";
        return "General Inquiry";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Mapping to Lead submission for public support requests
            await submitLead({
                ...formData,
                description: `[${formData.category}] ${formData.productModel ? 'Model: ' + formData.productModel : ''} ${formData.serialNumber ? 'Serial: ' + formData.serialNumber : ''} | ${formData.description}`,
                source: "Support Contact"
            });
            setIsSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 3000);
        } catch (error) {
            alert("Request failed. Please try again or login for portal support.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 text-center space-y-6 border border-black/5">
                <CheckCircle2 size={48} className="text-green-500 mx-auto" />
                <h3 className="text-3xl font-serif font-bold italic">Request Logged.</h3>
                <p className="text-sm text-black/50 font-mono uppercase tracking-widest">Engineering support will contact you shortly.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-12 border border-black/5 space-y-10">
            <div className="space-y-4">
                <div className="flex items-center gap-4 text-accent">
                    <LifeBuoy size={18} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Smart Dynamic Support</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tighter">{getHeadline()}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Name</label>
                        <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Email</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Phone</label>
                        <input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Category</label>
                        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent appearance-none">
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    
                    {(formData.category.includes("Product") || formData.category.includes("Service")) && (
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Product Model / Serial</label>
                            <input placeholder="e.g. Workbook E4 / SN-XXXX" value={formData.productModel} onChange={(e) => setFormData({...formData, productModel: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-accent" />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Description of Issue</label>
                    <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 h-32 text-sm font-serif outline-none focus:border-accent resize-none" placeholder="Describe the problem in detail..." />
                </div>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-ink text-bg py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-accent transition-all rounded-sm"
                >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Submit Request</>}
                </button>
            </form>
        </div>
    );
}
