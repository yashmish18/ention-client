import React from "react";
import { notFound } from "next/navigation";


import WorkbookPDP from "@/components/products/pdp/WorkbookPDP";
import TechnicalSpecs from "@/components/products/pdp/TechnicalSpecs";
import ReviewSection from "@/components/products/pdp/ReviewSection";
import CartDrawer from "@/components/products/CartDrawer";
import { fetchProductById } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await fetchProductById(id);

    if (!product) {
        notFound();
    }

    const images = product.images || [
        "/products/laptop-placeholder.png",
        "/assets/Ention-Laptop-E3-Catalogue-design-2.png",
        "/assets/0N1A1389.png"
    ];

    return (
        <main className="bg-white min-h-screen pt-0">
         

            <WorkbookPDP product={product} images={images} />

            <TechnicalSpecs product={product} />

            <ReviewSection product={product} />

         
            <CartDrawer />
        </main>
    );
}
