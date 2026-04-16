"use client";

import React from "react";
import ProjectHero from "@/components/products/ProjectHero";
import ProjectDetails from "@/components/products/ProjectDetails";
import TechSpecMatrix from "@/components/products/TechSpecMatrix";
import ProductGrid from "@/components/products/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/products/CartDrawer";

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-[#141414] selection:bg-[#F27D26] selection:text-white">
            <ProjectHero />

            <div className="space-y-0">
                <ProjectDetails product={null} />
                <TechSpecMatrix />

                {/* Keep the grid at the bottom for catalog browsing */}
                <div className="bg-white">
                    <ProductGrid />
                </div>
            </div>

            <Footer />
            <CartDrawer />
        </main>
    );
}
