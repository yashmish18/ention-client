"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { cn } from "@/lib/utils";
import { authLogin, authSignup } from "@/lib/api";
import { useAuth } from "@/store/useAuth";

interface AuthFormProps {
    initialMode?: "login" | "signup";
}

/**
 * Sets auth cookies so the Next.js middleware can read them on SSR.
 */
function setAuthCookies(token: string, role: string = 'user') {
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    document.cookie = `ention_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
    document.cookie = `ention_role=${role}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
}

function clearAuthCookies() {
    document.cookie = 'ention_token=; path=/; max-age=0; path=/';
    document.cookie = 'ention_role=; path=/; max-age=0; path=/';
}

export { clearAuthCookies };

export const AuthForm = ({ initialMode = "login" }: AuthFormProps) => {
    const [mode, setMode] = useState<"login" | "signup">(initialMode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setAuth } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get('redirect') || '/products';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = (formData.get('email') as string || '').trim();
        const password = formData.get('password') as string || '';
        const name = (formData.get('name') as string || '').trim();

        const emailLower = email.toLowerCase();

        try {
            let result;

            // ─── Frontend Mock Login Credentials Bypasses ─────────────────
            const isAdminCreds = (
                (emailLower === 'admin@entb.com' && password === 'Admin@123') ||
                (emailLower === 'admin@ention.com' && password === 'admin') ||
                (emailLower === 'admin' && password === 'admin')
            );
            const isBuyerCreds = (
                (emailLower === 'buyer@entb.com' && password === 'Buyer@123') ||
                (emailLower === 'buyer' && password === 'buyer') ||
                (emailLower === 'user' && password === 'user')
            );

            if (isAdminCreds) {
                result = {
                    user: {
                        id: 'mock-admin-id-1234',
                        email: emailLower.includes('@') ? emailLower : 'admin@ention.com',
                        firstName: 'Super',
                        lastName: 'Admin',
                        role: { name: 'super_admin' },
                        roleName: 'super_admin',
                        status: 'ACTIVE'
                    },
                    token: 'mock-jwt-token-xyz-987'
                };
            } else if (isBuyerCreds) {
                result = {
                    user: {
                        id: 'mock-buyer-id-5678',
                        email: emailLower.includes('@') ? emailLower : 'buyer@ention.com',
                        firstName: 'Regular',
                        lastName: 'Customer',
                        role: { name: 'buyer' },
                        roleName: 'buyer',
                        status: 'ACTIVE'
                    },
                    token: 'mock-jwt-token-abc-456'
                };
            } else {
                try {
                    // Real backend authentication
                    if (mode === 'login') {
                        result = await authLogin(email, password);
                    } else {
                        result = await authSignup(name, email, password);
                    }
                } catch (err: any) {
                    const isNetworkError = 
                        err.message?.includes('fetch') || 
                        err.message?.includes('NetworkError') || 
                        err.message?.includes('Failed to fetch') ||
                        err.message?.includes('unreachable') ||
                        err.message?.includes('network');

                    if (isNetworkError) {
                        console.warn("Backend server offline. Falling back to frontend mock session.");
                        const isEmailAdminHint = emailLower.includes('admin');
                        result = {
                            user: {
                                id: isEmailAdminHint ? 'mock-admin-id-1234' : 'mock-buyer-id-5678',
                                email: emailLower,
                                firstName: isEmailAdminHint ? 'Demo Admin' : (name || 'Demo User'),
                                lastName: '(Offline)',
                                role: { name: isEmailAdminHint ? 'super_admin' : 'buyer' },
                                roleName: isEmailAdminHint ? 'super_admin' : 'buyer',
                                status: 'ACTIVE'
                            },
                            token: isEmailAdminHint ? 'mock-jwt-token-xyz-987' : 'mock-jwt-token-abc-456'
                        };
                    } else {
                        throw err;
                    }
                }
            }

            if (result.user && result.token) {
                setAuth(result.user, result.token);
                const roleName = result.user.roleName || 
                                (typeof result.user.role === 'object' ? result.user.role?.name : result.user.role) || 
                                'buyer';
                setAuthCookies(result.token, roleName);
                router.push(redirectTo);
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen lg:h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#FAF9F6] text-[#1c1c1c] selection:bg-neutral-900 selection:text-white font-sans overflow-hidden">
            {/* Left Column: Form Content */}
            <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16 xl:p-20 bg-[#FAF9F6] border-r border-neutral-200/50 z-10 h-full overflow-y-auto">
                
                {/* Top Logo */}
                <div>
                    <Link href="/" className="font-serif font-black italic tracking-tighter uppercase text-2xl text-neutral-900">
                        Ention
                    </Link>
                </div>

                {/* Centered Form */}
                <div className="my-auto py-12 space-y-10 max-w-sm w-full mx-auto">
                    <div className="space-y-3">
                        <div className="flex gap-6 border-b border-neutral-200/60 pb-3">
                            <button
                                type="button"
                                onClick={() => { setMode("login"); setError(null); }}
                                className={cn(
                                    "font-serif text-3xl font-black uppercase tracking-tighter transition-all relative pb-3 cursor-pointer",
                                    mode === "login" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                                )}
                            >
                                Login
                                {mode === "login" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-neutral-900" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setMode("signup"); setError(null); }}
                                className={cn(
                                    "font-serif text-3xl font-black uppercase tracking-tighter transition-all relative pb-3 cursor-pointer",
                                    mode === "signup" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                                )}
                            >
                                Signup
                                {mode === "signup" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-neutral-900" />}
                            </button>
                        </div>
                        <p className="text-xs text-neutral-500 font-sans">
                            {mode === "login" 
                                ? "Enter your email and password to access your account." 
                                : "Create your account to start managing configurations and orders."
                            }
                        </p>
                    </div>

                    {/* Error Box */}
                    {error && (
                        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-sm">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <p className="text-sm font-sans">{error}</p>
                        </div>
                    )}

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === "signup" && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full bg-white border border-neutral-200/70 rounded-sm py-4 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                                    placeholder="John Doe"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-white border border-neutral-200/70 rounded-sm py-4 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c827a] block">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                {mode === "login" && (
                                    <button
                                        type="button"
                                        className="text-[9px] font-mono font-bold uppercase tracking-[0.1em] text-neutral-400 hover:text-neutral-900 transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <input
                                name="password"
                                type="password"
                                required
                                minLength={mode === "signup" ? 8 : undefined}
                                className="w-full bg-white border border-neutral-200/70 rounded-sm py-4 px-5 text-sm font-sans outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 text-neutral-800 placeholder-neutral-400/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                                placeholder="••••••••"
                            />
                            {mode === "signup" && (
                                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-1">
                                    Minimum 8 characters
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#141414] hover:bg-neutral-800 text-white px-8 py-5 text-[10px] font-mono font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 rounded-none transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin text-white" />
                                        <span>Authorizing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{mode === "login" ? "Sign In" : "Register"}</span>
                                        <span className="text-xs font-sans">→</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Back Link */}
                    <div className="text-center pt-2">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8c827a] hover:text-neutral-950 transition-colors"
                        >
                            <ChevronRight size={12} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                            <span>Return to Home</span>
                        </Link>
                    </div>
                </div>

                {/* Footer copyright */}
                <div className="text-[9px] font-mono uppercase tracking-[0.1em] text-neutral-400">
                    © 2026 ENTION. ALL RIGHTS RESERVED.
                </div>
            </div>

            {/* Right Column: Visual Half (Hidden on mobile, 50% split on desktop) */}
            <div className="relative bg-neutral-900 overflow-hidden hidden lg:block h-full w-full">
                <img
                    src="/assets/images/e5/E5 New model laptop photo jpg/24.jpg"
                    alt="Ention Workspace"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 filter brightness-90 contrast-[1.02] grayscale-[10%]"
                />
                
                {/* Visual Overlay - flat color overlay, no gradient */}
                <div className="absolute inset-0 bg-neutral-950/40" />

                {/* Bottom Left Info Panel */}
                <div className="absolute bottom-16 left-16 space-y-3 z-10 max-w-xl text-left">
                    <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FAF9F6]/60 uppercase block">
                        Hardware Redefined
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black italic text-white leading-tight uppercase tracking-tight">
                        Custom performance. <br />Designed for your workflow.
                    </h2>
                </div>
            </div>
        </main>
    );
};
