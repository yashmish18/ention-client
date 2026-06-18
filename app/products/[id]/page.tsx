import React from "react";
import { notFound } from "next/navigation";


import WorkbookPDP from "@/components/products/pdp/WorkbookPDP";
import SwapbookPDP from "@/components/products/pdp/SwapbookPDP";
import CartDrawer from "@/components/products/CartDrawer";
import { fetchProductById, fetchProducts } from "@/lib/api";
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const products = await fetchProducts();
    return products.map((p: { slug?: string; id: string }) => ({
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
    const product = await fetchProductById(id);

    if (!product) {
        notFound();
    }

    const getCarouselImages = (name: string, id: string) => {
        const lower = (name + id).toLowerCase();
        const getPaths = (folder: string) => [1, 2, 3, 4, 5, 6, 7, 8].map(n => `/assets/images/${folder}/${n}.png`);

        if (lower.includes("e4")) {
            return [1, 2, 10, 4, 11, 12, 7, 8].map(n => `/assets/images/e4/E4 laptop photo transparent background png/${n}.png`);
        }
        if (lower.includes("e1")) return getPaths("e1/E1 laptop photo transparent background png");
        if (lower.includes("e5")) return getPaths("e5/E5 new laptop photo transparent background png");
        if (lower.includes("s1")) return getPaths("s1/S1 gaming laptop transparent background png");
        return null;
    };

    const carouselOverride = getCarouselImages(product.name, product.id);
    const images = carouselOverride || product.images || [
        "/products/laptop-placeholder.png",
        "/assets/Ention-Laptop-E3-Catalogue-design-2.png",
        "/assets/0N1A1389.png"
    ];

    const isSwapbook = product.name?.toLowerCase().includes("swapbook") || product.id === "s1";

    return (
        <main className="bg-[#FAF7F2] min-h-screen pt-0">
            {isSwapbook ? (
                <SwapbookPDP product={product} images={images} />
            ) : (
                <WorkbookPDP product={product} images={images} />
            )}
            <CartDrawer />
        </main>
    );
}
