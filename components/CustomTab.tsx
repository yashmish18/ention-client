"use client";

import { motion } from "framer-motion";
import "swiper/css";

const tabs = ["Workbook", "Swapbook"];

interface CustomTabProps {
    activeTab: number;
    setActiveTab: (index: number) => void;
}

export default function CustomTab({ activeTab, setActiveTab }: CustomTabProps) {
    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Tab Header */}
            <div className="relative space-x-4 border-b border-gray-300 flex justify-center">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`text-[20px] px-4 py-2 relative text-gray-200 font-medium ${activeTab === index ? "text-[rgb(34,209,238)]" : ""
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                        {activeTab === index && (
                            <motion.div
                                layoutId="underline"
                                className="absolute left-0 bottom-0 h-1 bg-[rgb(34,209,238)] w-full"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
