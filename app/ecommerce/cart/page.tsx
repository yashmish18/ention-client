'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const initialCart: CartItem[] = [];

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-md p-8 mt-32">
                <h1 className="text-3xl font-bold text-[#000f29] mb-8 text-center">Order Details</h1>
                <div className="flex flex-col gap-6 mb-8">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg py-12">Your recent orders will show here.</div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex items-center gap-6 border-b pb-4">
                                <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: '64px', minHeight: '64px' }}>
                                    <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-lg object-contain bg-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-[#000f29]">{item.name}</h3>
                                    <p className="text-[#007e9e] font-bold">₹{item.price.toLocaleString()}</p>
                                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                                    <p className="text-green-600 font-semibold mt-1">Status: Processing</p>
                                    <div className="flex flex-row gap-3 mt-4">
                                        <button className="bg-[#0FAFCA] hover:bg-[#007e9e] text-white font-bold px-4 py-1.5 rounded-xl text-sm shadow-lg transition">Track Order</button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-1.5 rounded-xl text-sm shadow-lg transition">Cancel Order</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
