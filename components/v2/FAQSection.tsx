"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What warranty do Ention laptops come with?",
    answer: "Ention laptops come with an 18 month onsite warranty covering hardware defects and manufacturing issues.",
  },
  {
    question: "Do you offer No Cost EMI?",
    answer: "Yes, we offer No Cost EMI options through select banks and payment partners.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery typically takes 3 to 7 business days depending on your location.",
  },
  {
    question: "Can I return or replace my laptop?",
    answer: "Yes, you can request a replacement or return within 7 days if eligible.",
  },
  {
    question: "Are the laptops upgradeable?",
    answer: "Most Ention laptops support RAM and storage upgrades.",
  },
  {
    question: "Does the laptop come with Windows preinstalled?",
    answer: "Yes, all Ention laptops come with genuine Windows preinstalled.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact support via email, phone, or live chat.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use secure encrypted payment gateways to protect your data.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 lg:py-36 bg-[#f6f5f2] text-ink border-t border-ink/5">
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="text-left space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-ink leading-tight py-2">
            Frequently Asked Questions
          </h2>
          <p className="text-ink/65 font-sans leading-relaxed text-sm md:text-base max-w-xl">
            Everything you need to know before buying an Ention laptop.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-ink/10 divide-y divide-ink/10">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="w-full">
                <button
                  onClick={() => toggleItem(index)}
                  className="flex justify-between items-center w-full py-6 md:py-8 text-left hover:text-accent transition-colors duration-300 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-semibold text-base md:text-lg text-ink group-hover:text-accent transition-colors duration-300 pr-8">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-ink/40 group-hover:text-accent transition-colors duration-300"
                  >
                    <ChevronDown size={20} strokeWidth={2} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 text-ink/75 font-sans text-xs md:text-sm leading-relaxed max-w-4xl">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
