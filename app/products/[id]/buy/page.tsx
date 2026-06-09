import React from "react";
import { notFound } from "next/navigation";
import ProductConfigurator from "@/components/products/ProductConfigurator";
import { fetchProductById, fetchProducts } from "@/lib/api";
import type { Metadata } from "next";

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
            description: "The product configuration could not be found."
        };
    }

    return {
        title: `Configure ${product.name} | Ention Desktop Ecosystem`,
        description: `Customize and buy ${product.name} with bespoke RAM, SSD, and warranty options.`
    };
}

export default async function BuyPage({ params }: { params: Promise<{ id: string }> }) {
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

    const allProducts = await fetchProducts();

    return (
        <main className="bg-[#FAF7F2] min-h-screen">
            <ProductConfigurator product={product} images={images} allProducts={allProducts} />
        </main>
    );
}
