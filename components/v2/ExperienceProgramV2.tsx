"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Truck, Building2, ArrowRight, X, Loader2, CheckCircle2, Sparkles, Send } from "lucide-react";
import { submitApplication } from "@/lib/api";

export interface ExperienceProgramProps {
  onProgramClick?: (name: string) => void;
}

export const ExperienceProgramV2 = ({ onProgramClick }: ExperienceProgramProps) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const products = [
    {
      id: 1,
      name: "MODEL 03",
      edition: "SILVER EDITION",
    },
    {
      id: 2,
      name: "MODEL 02",
      edition: "CARBON NOIR",
    },
    {
      id: 3,
      name: "MODEL 01",
      edition: "GRAPHITE GREY",
    }
  ];

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validations
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!message.trim()) {
      setError("Please provide a brief message or query");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await submitApplication({
        programName: "Experience Program",
        name: name.trim(),
        email: email.trim(),
        phone: "N/A", // Optional/fallback value for backend schema
        organization: "N/A",
        role: "N/A",
        dynamicFields: {
          message: message.trim()
        }
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Reset form after closing animation
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setIsSuccess(false);
      setError("");
    }, 300);
  };

  return (
    <section className="px-8 py-20 lg:py-32 bg-bg text-ink relative border-t border-ink/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 relative">
        
        {/* Left Column: Original Laptop Experience Program Text */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12 py-4 h-full">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl font-serif font-black text-ink uppercase leading-[0.85] tracking-tighter">
              Laptop <br />
              <span className="italic font-normal text-accent normal-case block mt-2">Experience Program</span>
            </h2>

            <div className="space-y-8 pl-4 border-l-2 border-ink/10">
              {[
                { icon: Globe, title: "Zero Obligation", desc: "Test the hardware in your environment with no purchase commitment." },
                { icon: Truck, title: "On-Site Delivery", desc: "Free sample delivery directly to your office within 48 hours." },
                { icon: Building2, title: "Corporate Offers", desc: "Exclusive pricing and white-glove support for enterprise teams." },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <div key={i} className="flex gap-8 items-start group">
                    <div className="mt-1 w-6 h-6 rounded-full border border-accent/40 flex items-center justify-center shrink-0">
                      <IconComponent size={12} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-ink text-sm md:text-base font-bold uppercase tracking-widest mb-2">
                        {item.title}
                      </h3>
                      <p className="text-ink/60 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-8 items-center border-t border-ink/10">
            <p className="text-ink/60 text-[10px] font-mono uppercase tracking-[0.3em] max-w-xs text-center sm:text-left font-bold">
              Let your team test the performance first-hand before making the switch.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-ink text-bg px-14 py-6 text-xs font-bold uppercase tracking-[0.4em] transition-all hover:bg-accent hover:text-white rounded-sm shadow-md cursor-pointer flex items-center justify-center gap-3"
            >
              Apply Now <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Accordion Carousel */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <div
            className="flex gap-4 h-[450px] md:h-[480px] overflow-hidden w-full"
            onMouseLeave={() => setHovered(null)}
          >
            {products.map((product, i) => {
              const isHovered = hovered === i;
              const isSomethingHovered = hovered !== null;
              const isActive = isHovered || (!isSomethingHovered && i === 0);

              return (
                <motion.div
                  key={product.id}
                  initial={false}
                  animate={{
                    width: isActive ? "70%" : "15%",
                    opacity: isActive ? 1 : 0.4,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative h-full overflow-hidden cursor-pointer rounded-sm flex flex-col justify-between p-6 md:p-8 transition-colors duration-300 border ${
                    isActive 
                      ? "bg-white border-ink/20 shadow-lg" 
                      : "bg-ink/5 border-ink/5 hover:bg-ink/10"
                  }`}
                >
                  {/* Upper Area: Left completely blank */}
                  <div className="flex-1 w-full" />

                  {/* Text Label for Active/Hovered Card at the bottom */}
                  <div className="w-full relative min-h-[60px] flex items-end">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key={`label-active-${product.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col"
                        >
                          <span className="font-mono text-[9px] tracking-[0.35em] uppercase font-black block text-accent">
                            {product.name}
                          </span>
                          <h3 className="text-2xl font-serif text-ink italic font-black uppercase tracking-tight mt-1">
                            {product.edition}
                          </h3>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`label-inactive-${product.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-ink/30 rotate-90 whitespace-nowrap">
                            {product.edition}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Indicators & Interactive Showcase Label */}
          <div className="flex items-center justify-between px-1">
            <div className="flex gap-3">
              {products.map((_, i) => (
                <div
                  key={i}
                  className={`h-[2px] transition-all duration-700 ${(hovered === i || (hovered === null && i === 0)) ? "w-16 bg-accent" : "w-6 bg-ink/10"}`}
                />
              ))}
            </div>
            <div className="text-accent hover:text-ink font-mono text-[9px] tracking-[0.3em] uppercase flex items-center gap-2 select-none transition-colors duration-300">
              <span className="tracking-widest">INTERACTIVE SHOWCASE</span>
              <span className="text-xs font-bold font-sans">&gt;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Dark-Themed Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl bg-ink border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden rounded-sm text-bg"
            >
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 z-50 p-2 hover:bg-white/5 rounded-full transition-colors group"
                aria-label="Close modal"
              >
                <X size={20} className="text-white/40 group-hover:text-white transition-colors" />
              </button>

              <div className="max-h-[90vh] overflow-y-auto p-8 md:p-12">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center space-y-6 py-12"
                  >
                    <CheckCircle2 size={56} className="text-accent mx-auto animate-pulse" />
                    <h3 className="text-3xl font-serif font-bold italic tracking-tight">Application Received</h3>
                    <p className="text-sm text-bg/60 leading-relaxed font-sans max-w-md mx-auto">
                      Thank you for applying. Our experience program coordinators will reach out to you within 24 hours to schedule your hands-on deployment.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-accent font-black">
                        <Sparkles size={14} />
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em]">EXCLUSIVITY PROGRAM</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-tighter leading-none text-white">
                        Experience Ention.
                      </h2>
                      <p className="text-xs text-bg/50 leading-relaxed font-sans">
                        Submit your details to borrow an Ention laptop for on-site validation and testing.
                      </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-sm font-sans">
                        {error}
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-bg/40 block">
                          Name
                        </label>
                        <input 
                          required 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full bg-white/[0.03] border border-white/10 p-4 text-sm font-sans outline-none focus:border-accent text-white rounded-sm transition-colors"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-bg/40 block">
                          Email Address
                        </label>
                        <input 
                          required 
                          type="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="w-full bg-white/[0.03] border border-white/10 p-4 text-sm font-sans outline-none focus:border-accent text-white rounded-sm transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-bg/40 block">
                          Message / Query
                        </label>
                        <textarea 
                          required 
                          rows={4}
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)} 
                          className="w-full bg-white/[0.03] border border-white/10 p-4 text-sm font-sans outline-none focus:border-accent text-white rounded-sm transition-colors resize-none"
                          placeholder="Tell us about your team size, use case, and duration requested."
                        />
                      </div>

                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-accent text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white hover:text-ink transition-all rounded-sm shadow-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <>
                            <Send size={14} /> Submit Request
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
