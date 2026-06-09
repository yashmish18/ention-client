import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Ention Route Protection Middleware
 * 
 * Protected routes require 'ention_token' cookie.
 * Admin routes additionally check for 'ention_role' cookie.
 * Public routes (login, signup) redirect authenticated users away.
 */

// Routes that require authentication
const PROTECTED_ROUTES = [
    '/dashboard',
    '/checkout',
    '/orders',
];

// Routes that require admin role
const ADMIN_ROUTES = [
    '/admin',
];

// Routes only for unauthenticated users
const AUTH_ROUTES = [
    '/login',
    '/signup',
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('ention_token')?.value;
    let role = request.cookies.get('ention_role')?.value;

    // Safety check: Filter out malformed cookie values that cause redirects
    if (role === '[object Object]' || !role) {
        role = 'unauthorized';
    }

    // Security headers for all responses
    const response = NextResponse.next();
    
    // Strict Transport Security (HSTS)
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    // Prevent Clickjacking
    response.headers.set('X-Frame-Options', 'DENY');
    // Prevent MIME-sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');
    // Referrer policy for privacy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // XSS Protection
    response.headers.set('X-XSS-Protection', '1; mode=block');
    // Fine-grained browser features control
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), origin-trial=()');
    
    // Content Security Policy (CSP)
    // Allows images from unsplash and self, scripts from self and inline (for React/Next.js)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const apiOrigin = new URL(apiUrl).origin;

    const csp = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' blob: data: https://images.unsplash.com ${apiOrigin};
        font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com;
        media-src 'self' https://commondatastorage.googleapis.com https://player.vimeo.com https://*.vimeo.com https://*.vimeocdn.com;
        connect-src 'self' ${apiOrigin} https://fonts.googleapis.com https://fonts.gstatic.com;
        frame-ancestors 'none';
        base-uri 'self';
        form-action 'self';
    `.replace(/\s{2,}/g, ' ').trim();
    
    response.headers.set('Content-Security-Policy', csp);

    // Check admin routes — Token check only, role check delegated to client-side AuthGuard
    const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
    if (isAdminRoute) {
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
        // role check moved to app/admin/page.tsx AuthGuard for reliability
        return response;
    }

    // Check protected routes
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from auth pages
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico
         * - public assets
         * - api routes
         */
        '/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)',
    ],
};
