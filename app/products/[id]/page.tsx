import React from "react";
import { notFound } from "next/navigation";


import WorkbookPDP from "@/components/products/pdp/WorkbookPDP";
import TechnicalSpecs from "@/components/products/pdp/TechnicalSpecs";
import ReviewSection from "@/components/products/pdp/ReviewSection";
import CartDrawer from "@/components/products/CartDrawer";
import { fetchProductById, fetchProducts } from "@/lib/api";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const products = await fetchProducts();
    return products.map((p: any) => ({
        id: p.slug || p.id
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await fetchProductById(id);
    
    if (!product) {
        return {
            title: "Product Not Found | Ention",
            description: "The product you are looking for does not exist."
        };
    }
    
    return {
        title: `${product.name} | Ention Desktop Ecosystem`,
        description: product.description || `Buy ${product.name} with Ention's custom high-end specifications.`,
        openGraph: {
            title: `${product.name} | Ention`,
            description: product.description,
            images: [product.images?.[0] || '/assets/ention-logo.png']
        }
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let product = await fetchProductById(id);

    if (!product) {
        notFound();
    }

    const getCarouselImages = (name: string, id: string) => {
        const lower = (name + id).toLowerCase();
        const getPaths = (folder: string) => [1, 2, 3, 4, 5, 6, 7, 8].map(n => `/assets/images/${folder}/${n}.jpg`);

        if (lower.includes("e4")) {
            return [1, 2, 10, 4, 11, 12, 7, 8].map(n => `/assets/images/e4/E4 laptop photo jpg/${n}.jpg`);
        }
        if (lower.includes("e1")) return getPaths("e1/E1 laptop photo jpg");
        if (lower.includes("e5")) return getPaths("e5/E5 New model laptop photo jpg");
        if (lower.includes("s1")) return getPaths("s1/S1 gaming laptop transparent jpg");
        return null;
    };

    const carouselOverride = getCarouselImages(product.name, product.id);
    const images = carouselOverride || product.images || [
        "/products/laptop-placeholder.png",
        "/assets/Ention-Laptop-E3-Catalogue-design-2.png",
        "/assets/0N1A1389.png"
    ];

    // Select distinct, context-relevant image creatives depending on the model
    const resolveCreatives = (modeId: string) => {
        const idLower = modeId.toLowerCase();
        if (idLower.includes('s1')) return ["/assets/all_product_page/s1-info.png"];
        if (idLower.includes('e4')) return ["/assets/all_product_page/e4-info.png"];
        if (idLower.includes('e5')) return ["/assets/all_product_page/e5-info.png"];
        if (idLower.includes('e1')) return ["/assets/all_product_page/e1-info.png"];
        return ["/assets/all_product_page/e1-info.png"];
    };
    
    const contextCreatives = resolveCreatives(product.id || product.slug);

    return (
        <main className="bg-white min-h-screen pt-0">
            <BlurFadeIn delay={0.1}>
         
            <WorkbookPDP product={product} images={images} />

            {/* PRODUCT CREATIVES SHOWCASE */}
            <section className="bg-white py-16 lg:py-24 px-4 overflow-hidden">
                <div className="max-w-[90rem] mx-auto text-center space-y-16">
                    <div className="space-y-4">
                        <span className="text-[#F27D26] uppercase font-mono tracking-[0.4em] text-[10px]">Product Hardware</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tighter">Manufacturing Architecture.</h2>
                    </div>
                    <div className="flex justify-center px-2 md:px-8">
                        {contextCreatives.map((src, i) => (
                            <div key={i} className="relative w-full max-w-6xl overflow-hidden border border-black/5 rounded-sm shadow-lg">
                                <img src={src} alt={`${product.name} Info`} className="w-full h-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TechnicalSpecs product={product} />

            <ReviewSection product={product} />
            </BlurFadeIn>
         
            <CartDrawer />
        </main>
    );
}
