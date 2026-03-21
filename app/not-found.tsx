'use client';

import React from 'react';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-[#070D2A] text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-lg w-full text-center p-8 bg-white/10 rounded-2xl shadow-lg border border-white/20">
                <h1 className="text-5xl font-extrabold mb-4 text-cyan-300">404</h1>
                <h2 className="text-2xl font-bold mb-2">We are working on it</h2>
                <p className="mb-6 text-lg">
                    The page you&rsquo;re looking for is not available yet.<br />
                    Please check back soon or return to the
                    <Link href="/" className="text-cyan-300 underline hover:text-cyan-200 ml-1">
                        home page
                    </Link>.
                </p>
                <div className="flex justify-center">
                    <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="56" stroke="#0FAFCA" strokeWidth="8" fill="#133B5C" />
                        <path d="M40 80 Q60 100 80 80" stroke="#fff" strokeWidth="4" fill="none" />
                        <circle cx="50" cy="55" r="5" fill="#fff" />
                        <circle cx="70" cy="55" r="5" fill="#fff" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
