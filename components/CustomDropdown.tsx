"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomDropdownProps {
    value: string;
    setValue: (value: string) => void;
    items: string[];
}

export default function CustomDropdown({ value, setValue, items }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full bg-gray-200 px-4 py-2 rounded-lg shadow-lg transition-all hover:bg-gray-200"
            >
                {value || "Select Option"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    <path
                        fillRule="evenodd"
                        d="M12 15.75a.75.75 0 0 1-.53-.22l-6-6a.75.75 0 0 1 1.06-1.06L12 13.94l5.47-5.47a.75.75 0 0 1 1.06 1.06l-6 6a.75.75 0 0 1-.53.22"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute w-full mt-2 bg-white shadow-xl rounded-lg overflow-hidden z-10"
                    >
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer transition-all hover:bg-gray-200"
                                onClick={() => {
                                    setIsOpen(false);
                                    setValue(item);
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
