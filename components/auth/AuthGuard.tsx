"use client";

import React, { useEffect } from "react";
import { useAuth, isAdmin as checkIsAdmin } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    fallbackUrl?: string;
}

/**
 * Client-side auth guard — wraps protected page content.
 * Works in tandem with middleware.ts for double-layer protection.
 * Middleware handles the initial redirect; this handles SPA navigation.
 */
export default function AuthGuard({ children, requireAdmin = false, fallbackUrl = "/login" }: AuthGuardProps) {
    const { isAuthenticated, isLoading, user, initialize } = useAuth();
    const router = useRouter();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (isLoading) return;

        // Double-check: does the browser actually have a session cookie?
        // If yes, middleware will allow us, so don't redirect to login even if store is empty
        const hasTokenCookie = typeof document !== 'undefined' && document.cookie.includes('ention_token=');

        if (!isAuthenticated) {
            if (!hasTokenCookie) {
                router.push(`${fallbackUrl}?redirect=${window.location.pathname}`);
            }
            return;
        }

        if (requireAdmin && !checkIsAdmin(user)) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, requireAdmin, user, router, fallbackUrl]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-bg flex flex-col items-center justify-center space-y-6 text-ink/40">
                <Loader2 size={32} className="animate-spin text-accent" />
                <p className="font-mono text-[10px] uppercase tracking-[0.5em]">Authenticating...</p>
            </div>
        );
    }

    if (!isAuthenticated) return null;
    if (requireAdmin && !checkIsAdmin(user)) return null;

    return <>{children}</>;
}
