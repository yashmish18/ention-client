import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientProviders from '@/components/ClientProviders';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: 'ENTION - Made in India Laptops',
    description:
        'ENTION - Premium Made in India Laptops. E3, E4, E5 Series with latest technology and affordable pricing.',
    metadataBase: new URL('https://ention.in'),
    openGraph: {
        type: 'website',
        title: 'ENTION - Made in India Laptops',
        description:
            'ENTION - Premium Made in India Laptops. E3, E4, E5 Series with latest technology and affordable pricing.',
        url: 'https://ention.in',
        siteName: 'ENTION',
        images: [
            {
                url: '/assets/ention-logo.png',
                width: 1200,
                height: 630,
                type: 'image/png',
                alt: 'ENTION - Made in India Laptops Logo',
            },
        ],
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ENTION - Made in India Laptops',
        description:
            'ENTION - Premium Made in India Laptops. E3, E4, E5 Series with latest technology and affordable pricing.',
        images: ['/assets/ention-logo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    icons: {
        shortcut: '/bot.png',
    },
    other: {
        'format-detection': 'telephone=no',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#fff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
                {/* DNS Prefetch */}
                <link rel="dns-prefetch" href="//ention-backend.onrender.com" />
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />

                {/* Preconnect */}
                <link rel="preconnect" href="https://ention-backend.onrender.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                <div className="App">
                    <ClientProviders />
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
