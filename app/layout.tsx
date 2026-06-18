import type { Metadata } from "next";
import { Inter, Libre_Baskerville, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppShell from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "ENTION | Built in Bharat",
  description: "High-performance laptops engineered in India. Affordable. Customizable. Reliable. Shop the Workbook and Swapbook Series.",
  keywords: ["laptop", "india", "ention", "workbook", "swapbook", "gaming laptop", "student laptop", "affordable laptop"],
  openGraph: {
    siteName: "Ention",
    type: "website",
    locale: "en_IN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(
      "h-full overflow-x-hidden",
      inter.variable,
      libreBaskerville.variable,
      jetbrainsMono.variable
    )}>
      <body className="antialiased font-sans h-full relative overflow-x-hidden">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
