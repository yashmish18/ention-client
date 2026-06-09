import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductById, fetchProducts } from "@/lib/api";
import ReviewSection from "@/components/products/pdp/ReviewSection";
import ShowcaseCarousel from "@/components/products/pdp/ShowcaseCarousel";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const products = await fetchProducts();
    return products.map((p: { slug?: string; id: string }) => ({
        id: p.slug || p.id
    }));
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

export default async function ShowcasePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await fetchProductById(id);

    if (!product) {
        notFound();
    }

    const carouselOverride = getCarouselImages(product.name, product.id);
    const images = carouselOverride || product.images || [
        "/products/laptop-placeholder.png",
        "/assets/Ention-Laptop-E3-Catalogue-design-2.png",
        "/assets/0N1A1389.png"
    ];

    return (
        <main className="bg-[#FAF7F2] text-[#1A1714] min-h-screen py-16 px-6 md:px-16 select-none font-sans">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Back Navigation */}
                <div>
                    <Link
                        href={`/products/${product.slug || product.id}`}
                        className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.35em] text-[#A09288] hover:text-[#1A1714] transition-colors uppercase"
                    >
                        <ArrowLeft size={12} /> Back to Story
                    </Link>
                </div>

                {/* 1. PRODUCT SHOWCASE */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Traditional Image Showcase Carousel */}
                    <div className="lg:col-span-6 w-full">
                        <ShowcaseCarousel images={images} productName={product.name} />
                    </div>

                    {/* Right Column: Pricing & Spec Details */}
                    <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#A09288] block">
                                    Product Showcase
                                </span>
                                <h1
                                    className="font-serif italic font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none text-[#1A1714]"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    {product.name}
                                </h1>
                            </div>

                            {/* Pricing Display */}
                            <div className="border-t border-b border-[#C8BFB0]/60 py-4 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-[#A09288] uppercase tracking-wider">Baseline Price</span>
                                <span
                                    className="font-serif italic font-semibold text-3xl md:text-4xl text-[#B5843A]"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    ₹{product.basePrice.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-[#6B6258] font-light leading-relaxed">
                            {product.description || "A clean, high-performance computing experience engineered for seamless workflows."}
                        </p>

                        {/* Tech Specs Summary Highlights */}
                        <div className="space-y-3 bg-[#EDE8DF] border border-[#C8BFB0]/50 p-6 rounded-sm">
                            <span className="text-[9px] font-mono text-[#A09288] uppercase tracking-wider block font-bold">
                                Hardware Configuration
                            </span>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between border-b border-[#C8BFB0]/40 pb-1.5 last:border-0 last:pb-0">
                                    <span className="text-[#6B6258]">Processor</span>
                                    <span className="font-medium text-[#1A1714] text-right truncate max-w-[60%]">{product.specs.cpu.split("(")[0]}</span>
                                </div>
                                <div className="flex justify-between border-b border-[#C8BFB0]/40 pb-1.5 last:border-0 last:pb-0">
                                    <span className="text-[#6B6258]">Memory</span>
                                    <span className="font-medium text-[#1A1714] text-right truncate max-w-[60%]">{product.specs.ram}</span>
                                </div>
                                <div className="flex justify-between border-b border-[#C8BFB0]/40 pb-1.5 last:border-0 last:pb-0">
                                    <span className="text-[#6B6258]">Storage</span>
                                    <span className="font-medium text-[#1A1714] text-right truncate max-w-[60%]">{product.specs.storage}</span>
                                </div>
                                <div className="flex justify-between border-b border-[#C8BFB0]/40 pb-1.5 last:border-0 last:pb-0">
                                    <span className="text-[#6B6258]">Display</span>
                                    <span className="font-medium text-[#1A1714] text-right truncate max-w-[60%]">{product.specs.display.split(",")[0]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. TECHNICAL SPECIFICATIONS */}
                <section className="py-16 border-t border-[#C8BFB0] space-y-10">
                    <div className="max-w-xl">
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#A09288] block mb-2">
                            Technical Specifications
                        </span>
                        <h2
                            className="font-serif italic font-semibold text-3xl md:text-4xl text-[#1A1714]"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            The core hardware.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 border-t border-[#C8BFB0]/60">
                        {[
                            ["Processor", product.specs.cpu],
                            ["Graphics", product.specs.gpu || "Integrated Graphics"],
                            ["Memory", product.specs.ram],
                            ["Storage", product.specs.storage],
                            ["Display", product.specs.display],
                            ["Camera", product.specs.camera || "HD IR Camera"],
                            ["Wireless", `${product.specs.wifi || "Wi-Fi 6"}, ${product.specs.bluetooth || "Bluetooth 5.2"}`],
                            ["Ports", product.specs.io],
                            ["Chassis Build", product.specs.build || "Magnesium-Aluminum Alloy"],
                            ["Battery Model", product.specs.battery],
                            ["Pricing Baseline", `₹${product.basePrice.toLocaleString("en-IN")}`],
                            ["Support & Warranty", product.warranty || "18-month warranty"],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex justify-between items-baseline border-b border-[#C8BFB0]/60 py-3.5 text-xs"
                            >
                                <span className="font-mono text-[#A09288] uppercase tracking-widest">{label}</span>
                                <span className="text-right text-[#1A1714] font-medium max-w-[60%] truncate">{value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. REVIEWS */}
                <div id="reviews">
                    <ReviewSection product={product} />
                </div>

                {/* 4. EXPLORE MORE PRODUCTS */}
                <footer className="py-16 border-t border-[#C8BFB0] text-center space-y-6">
                    <span className="text-[10px] font-mono text-[#A09288] tracking-widest uppercase block">
                        Explore the full range
                    </span>
                    <h2
                        className="font-serif italic font-semibold text-3xl text-[#1A1714]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Compare every Ention laptop.
                    </h2>
                    <div className="pt-2">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B5843A] hover:text-[#1A1714] transition-colors cursor-pointer"
                        >
                            View full ecosystem <ArrowLeft className="rotate-180" size={12} />
                        </Link>
                    </div>
                </footer>

            </div>
        </main>
    );
}
