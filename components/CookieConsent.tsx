"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Cookie, ChevronDown, Check } from "lucide-react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "ention_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export default function CookieConsent() {
    const [consentState, setConsentState] = useState<ConsentState>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored === "accepted" || stored === "declined") {
            setConsentState(stored);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        // Set a long-lived consent cookie for server-side awareness
        document.cookie = `ention_cookie_consent=accepted; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        setConsentState("accepted");
    };

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
        document.cookie = `ention_cookie_consent=declined; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        setConsentState("declined");
    };

    // Don't render until hydrated, and don't show if already decided
    if (!mounted || consentState !== null) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 120, opacity: 0 }}
                transition={{ type: "spring", damping: 22, stiffness: 180, delay: 2 }}
                className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6"
            >
                <div className="max-w-5xl mx-auto bg-ink text-bg border border-white/10 shadow-[0_-20px_80px_rgba(0,0,0,0.4)] overflow-hidden">
                    
                    {/* Main Row */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8">
                        
                        {/* Icon + Text */}
                        <div className="flex items-start gap-5 flex-1">
                            <div className="w-10 h-10 bg-accent/20 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Cookie size={18} className="text-accent" />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-3">
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-bg">Cookie & Data Policy</p>
                                    <span className="text-[8px] bg-accent/20 text-accent px-2 py-0.5 rounded-sm font-black uppercase tracking-widest">GDPR Compliant</span>
                                </div>
                                <p className="text-[11px] font-mono text-bg/50 leading-relaxed max-w-xl">
                                    Ention uses cookies to secure your session, process your orders, and improve your experience. 
                                    We <strong className="text-bg/80">do not sell</strong> your data.{" "}
                                    <button 
                                        onClick={() => setShowDetails(!showDetails)} 
                                        className="text-accent underline underline-offset-2 hover:brightness-110 inline-flex items-center gap-1"
                                    >
                                        {showDetails ? "Hide" : "What we collect"} 
                                        <ChevronDown size={10} className={`transition-transform ${showDetails ? "rotate-180" : ""}`} />
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                onClick={handleDecline}
                                className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.4em] text-bg/40 hover:text-bg/70 transition-colors border border-white/10 hover:border-white/20"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-8 py-3 bg-accent text-white text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#d9631a] transition-all flex items-center gap-2 shadow-lg"
                            >
                                <Check size={12} /> Accept All
                            </button>
                            <button 
                                onClick={handleDecline} 
                                className="p-2 text-bg/20 hover:text-bg/50 transition-colors"
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Expandable Detail Panel */}
                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden border-t border-white/10"
                            >
                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        {
                                            title: "Essential Cookies",
                                            always: true,
                                            desc: "Authentication tokens (ention_token), session security, and cart state. Required for the site to function."
                                        },
                                        {
                                            title: "Functional Cookies",
                                            always: false,
                                            desc: "Cookie consent preference (ention_cookie_consent) and user role (ention_role) for personalizing your dashboard experience."
                                        },
                                        {
                                            title: "No Analytics / Ad Tracking",
                                            always: true,
                                            desc: "We do not use Google Analytics, Meta Pixel, or any third-party ad trackers. Your browsing behavior is never sold."
                                        }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Shield size={12} className="text-accent" />
                                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-bg/70">{item.title}</p>
                                                {item.always && (
                                                    <span className="text-[7px] bg-white/10 text-bg/40 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Always On</span>
                                                )}
                                            </div>
                                            <p className="text-[10px] font-mono text-bg/30 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-6 md:px-8 pb-4">
                                    <p className="text-[9px] font-mono text-bg/20">
                                        Questions? Email{" "}
                                        <a href="mailto:contact@ention.in" className="text-accent hover:underline">contact@ention.in</a>
                                        {" · "}
                                        <Link href="/about" className="text-accent hover:underline">Full Privacy Policy</Link>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
