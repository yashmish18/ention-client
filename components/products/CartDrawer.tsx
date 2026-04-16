"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from '@/store/useCart';

export default function CartDrawer() {
    const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotal } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => toggleCart(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FAF9F6] shadow-2xl z-[101] flex flex-col border-l border-black/5"
                    >
                        <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white">
                            <div>
                                <h2 className="text-2xl font-serif font-bold italic tracking-tight">Your Cart.</h2>
                                <p className="text-[9px] uppercase tracking-widest font-black text-black/20 mt-1">{items.length} Units Secured</p>
                            </div>
                            <button onClick={() => toggleCart(false)} className="hover:rotate-90 transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30">
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p className="font-serif italic text-lg">Inventory is empty.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="w-24 h-24 bg-white border border-black/5 p-2 rounded-sm overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} width={100} height={100} className="object-contain" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="text-sm font-serif font-bold italic">{item.name}</h3>
                                                <p className="text-[9px] font-mono text-black/40 uppercase mt-1">Config: {item.configuration.processor}, {item.configuration.ram}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center border border-black/10 rounded-sm">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-3 hover:bg-black/5">-</button>
                                                    <span className="text-xs font-mono w-8 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-3 hover:bg-black/5">+</button>
                                                </div>
                                                <span className="text-sm font-serif font-bold italic">₹{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 text-black/20 hover:text-red-500 transition-all">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-8 bg-white border-t border-black/5 space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-black/20">Cart Total</p>
                                        <span className="text-3xl font-serif font-bold italic">₹{getTotal().toLocaleString()}</span>
                                    </div>
                                    <p className="text-[8px] font-mono text-black/20 uppercase">Incl. Taxes</p>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={() => toggleCart(false)}
                                    className="w-full bg-[#141414] text-white py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#F27D26] transition-all flex items-center justify-center gap-3"
                                >
                                    Proceed to Checkout <ArrowRight size={16} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
