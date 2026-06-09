"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/products/CartDrawer";
import CookieConsent from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingTalkToUs from "@/components/FloatingTalkToUs";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSwapbookFilm = pathname?.startsWith("/swapbook");

  useEffect(() => {
    if (isSwapbookFilm) {
      document.body.classList.add("swapbook-film-active");
    } else {
      document.body.classList.remove("swapbook-film-active");
    }
    return () => {
      document.body.classList.remove("swapbook-film-active");
    };
  }, [isSwapbookFilm]);

  if (isSwapbookFilm) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <FloatingTalkToUs />
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}
