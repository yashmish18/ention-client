"use client";

import React, { useState } from "react";
import { MessageSquare, PhoneCall, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuickCallbackForm from "./forms/QuickCallbackForm";

export default function FloatingTalkToUs() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-[320px] mb-4"
                    >
                        <QuickCallbackForm source="floating_talk_to_us" />
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 scale-100 hover:scale-110 active:scale-95 ${isOpen ? 'bg-black text-white' : 'bg-accent text-white'}`}
            >
                {isOpen ? <X size={24} /> : <PhoneCall size={24} />}
                
                {!isOpen && (
                    <span className="absolute right-full mr-4 bg-white text-ink px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap border border-black/5 animate-bounce">
                        Talk to Us
                    </span>
                )}
            </button>
        </div>
    );
}
