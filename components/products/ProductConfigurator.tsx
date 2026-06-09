"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Briefcase, Percent, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useCart } from "@/store/useCart";
import type { Product } from "@/lib/products-data";
import ReviewSection from "@/components/products/pdp/ReviewSection";
import ProductCard from "@/components/products/ProductCard";

interface ProductConfiguratorProps {
  product: Product;
  images: string[];
  allProducts: Product[];
}

export default function ProductConfigurator({ product, images, allProducts }: ProductConfiguratorProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // Configuration selections
  const [selectedRam, setSelectedRam] = useState("16GB");
  const [selectedSsd, setSelectedSsd] = useState("512GB");
  const [selectedWarranty, setSelectedWarranty] = useState("18-Month Standard");
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  // Image gallery state
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Pricing maps
  const ramPrices: Record<string, number> = {
    "16GB": 0,
    "32GB": 8000,
    "64GB": 16000,
  };

  const ssdPrices: Record<string, number> = {
    "512GB": 0,
    "1TB": 6000,
    "2TB": 12000,
  };

  const warrantyPrices: Record<string, number> = {
    "18-Month Standard": 0,
    "18+6 Months": 3500,
    "18+12 Months": 6000,
  };

  // Base price + dynamic option add-ons
  const basePrice = product.basePrice || 35400;
  const configAddons =
    ramPrices[selectedRam] + ssdPrices[selectedSsd] + warrantyPrices[selectedWarranty];
  const subtotal = basePrice + configAddons;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const totalPrice = subtotal - discountAmount;

  // Handle coupon apply
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const code = couponCode.trim().toUpperCase();
    if (code === "ENTION10") {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else if (code === "WELCOME5") {
      setDiscountPercent(5);
      setCouponApplied(true);
    } else if (code === "") {
      setCouponError("Please enter a coupon code.");
    } else {
      setCouponError("Invalid coupon code.");
    }
  };

  // Add customized product to cart
  const handleOrder = () => {
    const configId = `${product.id}-${selectedRam}-${selectedSsd}-${selectedWarranty.replace(/\s+/g, "")}`;
    addItem({
      id: configId,
      name: `${product.name} (Customized - ${selectedWarranty})`,
      price: totalPrice,
      quantity: 1,
      image: images[activeImageIdx] || images[0] || "",
      configuration: {
        processor: product.specs?.cpu || "Base Processor",
        ram: selectedRam,
        storage: `${selectedSsd} | Warranty: ${selectedWarranty}`,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1714] font-sans pb-24 pt-8">
      {/* Header back navigation */}
      <div className="max-w-7xl mx-auto mb-12 px-6 md:px-12 lg:px-16 flex justify-between items-center">
        <Link
          href={`/products/${product.slug || product.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A09288] hover:text-[#1A1714] transition-colors"
        >
          <ArrowLeft size={14} /> Back to product description
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#C5A059]/10 text-[#C5A059] px-3 py-1 rounded-sm">
          Custom Configurator
        </span>
      </div>

      {/* SECTION 1: TOP CONFIGURATOR GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image Showcase */}
          <div className="flex flex-col items-center w-full">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#A09288] font-bold self-start mb-4">
              Visual Studio • Image Showcase
            </span>
            
            {/* Main Image View */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-[#EDE8DF]/40 rounded-sm overflow-hidden p-6">
              <Image
                src={images[activeImageIdx] || "/products/laptop-placeholder.png"}
                alt={`${product.name} Showcase View`}
                fill
                className="object-contain p-4 transition-all duration-500 ease-in-out"
                priority
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-2.5 mt-6 overflow-x-auto max-w-full py-2 self-start">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-16 border rounded-sm p-1.5 transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    activeImageIdx === idx
                      ? "border-[#1A1714] scale-105 shadow-sm bg-white"
                      : "border-[#C8BFB0]/40 opacity-70 hover:opacity-100 hover:border-[#1A1714]/60 bg-transparent"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Custom Configuration Controls */}
          <div className="flex flex-col space-y-8 w-full">
            {/* Product Meta */}
            <div className="space-y-3">
              <h1 className="f-serif italic text-4xl md:text-5xl font-bold text-[#1A1714] leading-tight">
                {product.name}
              </h1>
              <h2 className="text-[#C5A059] uppercase tracking-[0.25em] text-[11px] font-bold">
                {product.tagline || "Power That Executes"}
              </h2>
              <p className="text-xs text-[#6B6258] leading-relaxed font-light">
                {product.description ||
                  "Desktop-class performance engineered for gaming, creative workloads, software development, rendering, and professional multitasking."}
              </p>
            </div>

            {/* Quick Highlights Box */}
            <div className="border border-[#C8BFB0]/30 rounded-sm p-5 bg-[#EDE8DF]/30 space-y-3">
              <h3 className="text-[11px] uppercase tracking-wider font-bold text-[#1A1714]">
                Quick Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-[#6B6258]">
                {product.specs?.cpu && (
                  <li className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span>{product.specs.cpu}</span>
                  </li>
                )}
                {product.specs?.gpu && (
                  <li className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span>{product.specs.gpu}</span>
                  </li>
                )}
                {product.specs?.display && (
                  <li className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span>{product.specs.display}</span>
                  </li>
                )}
                {product.specs?.cooling && (
                  <li className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span>{product.specs.cooling}</span>
                  </li>
                )}
                {product.specs?.keyboard && (
                  <li className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span>{product.specs.keyboard}</span>
                  </li>
                )}
                {product.specs?.security && (
                  <li className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span>{product.specs.security}</span>
                  </li>
                )}
                {product.specs?.build && (
                  <li className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span>{product.specs.build}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Spec Option Selectors */}
            <div className="space-y-6">
              {/* RAM Selector */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1714]">
                    RAM Options
                  </label>
                  <span className="text-[10px] text-[#A09288]">Currently selected: {selectedRam}</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {["16GB", "32GB", "64GB"].map((ram) => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram)}
                      className={`border px-4 py-3 text-xs font-semibold rounded-sm cursor-pointer transition-all duration-300 ${
                        selectedRam === ram
                          ? "border-[#1A1714] bg-[#1A1714] text-white shadow-sm"
                          : "border-[#C8BFB0]/40 text-[#6B6258] hover:border-[#1A1714]/60 bg-white"
                      }`}
                    >
                      <span className="block">{ram}</span>
                      <span className={`block text-[9px] mt-0.5 font-light ${selectedRam === ram ? "text-[#D4CDC5]" : "text-[#A09288]"}`}>
                        {ramPrices[ram] === 0 ? "Included" : `+₹${ramPrices[ram].toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SSD Selector */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1714]">
                    SSD Options
                  </label>
                  <span className="text-[10px] text-[#A09288]">Currently selected: {selectedSsd}</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {["512GB", "1TB", "2TB"].map((ssd) => (
                    <button
                      key={ssd}
                      onClick={() => setSelectedSsd(ssd)}
                      className={`border px-4 py-3 text-xs font-semibold rounded-sm cursor-pointer transition-all duration-300 ${
                        selectedSsd === ssd
                          ? "border-[#1A1714] bg-[#1A1714] text-white shadow-sm"
                          : "border-[#C8BFB0]/40 text-[#6B6258] hover:border-[#1A1714]/60 bg-white"
                      }`}
                    >
                      <span className="block">{ssd}</span>
                      <span className={`block text-[9px] mt-0.5 font-light ${selectedSsd === ssd ? "text-[#D4CDC5]" : "text-[#A09288]"}`}>
                        {ssdPrices[ssd] === 0 ? "Included" : `+₹${ssdPrices[ssd].toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Warranty Selector */}
              <div className="space-y-2.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1714] block">
                  Warranty Options
                </label>
                <div className="space-y-2">
                  {[
                    { key: "18-Month Standard", label: "18-Month Standard Warranty (by default)" },
                    { key: "18+6 Months", label: "18+6 Months extended warranty" },
                    { key: "18+12 Months", label: "18+12 Months premium warranty" },
                  ].map((w) => (
                    <button
                      key={w.key}
                      onClick={() => setSelectedWarranty(w.key)}
                      className={`w-full border p-3.5 text-xs font-medium rounded-sm flex items-center justify-between cursor-pointer transition-all duration-300 ${
                        selectedWarranty === w.key
                          ? "border-[#1A1714] bg-[#1A1714] text-white shadow-sm"
                          : "border-[#C8BFB0]/40 text-[#6B6258] hover:border-[#1A1714]/60 bg-white"
                      }`}
                    >
                      <span>{w.label}</span>
                      <span className={`text-[10px] font-semibold ${selectedWarranty === w.key ? "text-[#C5A059]" : "text-[#1A1714]"}`}>
                        {warrantyPrices[w.key] === 0 ? "Included" : `+₹${warrantyPrices[w.key].toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Coupons and Apply */}
            <div className="pt-6 border-t border-[#C8BFB0]/20">
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1714] block">
                  Discount coupons
                </label>
                <div className="flex gap-2 max-w-sm">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Code (e.g. ENTION10)"
                    disabled={couponApplied}
                    className="flex-1 border border-[#C8BFB0] rounded-sm px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714] uppercase bg-white disabled:bg-gray-100"
                  />
                  <button
                    type="submit"
                    disabled={couponApplied}
                    className="bg-[#1A1714] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-black transition-colors disabled:bg-gray-400 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                    <Check size={12} /> Coupon applied successfully! ({discountPercent}% Discount)
                  </div>
                )}
                {couponError && (
                  <div className="text-[11px] text-red-500 font-medium">
                    {couponError}
                  </div>
                )}
              </form>
            </div>

            {/* Summary Pricing Bar & Dynamic Add to Cart / Order button */}
            <div className="pt-6 border-t border-[#C8BFB0]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A09288] block">Total Configuration Price</span>
                <div className="flex items-baseline gap-2 mt-1">
                  {discountPercent > 0 && (
                    <span className="text-sm line-through text-[#A09288]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-[#1A1714]">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOrder}
                  className="w-full sm:w-auto bg-[#1A1714] border border-[#1A1714] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-black transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  {added ? "Added to Cart!" : "Complete Order"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#C8BFB0]/30 my-16"></div>

        {/* SECTION 2: WHAT'S INCLUDED & CORPORATE DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pb-16">
          {/* What's Included */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#1A1714]">
              What's Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6B6258]">
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#C5A059]" />
                <span>Windows 11 Home/Pro Pre-loaded</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#C5A059]" />
                <span>Microsoft Office Suite License</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#C5A059]" />
                <span>Ention Workspace Premium Laptop Bag</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#C5A059]" />
                <span>100W High-Speed Charging Power Adapter</span>
              </div>
            </div>
          </div>

          {/* Corporate Options */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button className="border border-[#1A1714] text-[#1A1714] px-6 py-3 text-[11px] font-bold uppercase tracking-wider hover:bg-[#1A1714] hover:text-[#FAF7F2] transition-colors rounded-sm flex items-center gap-2 cursor-pointer shadow-sm">
                <Briefcase size={14} /> Request Corporate Pricing
              </button>
              <span className="text-[10px] text-[#A09288] font-light max-w-xs leading-normal">
                Get special custom layouts and volumetric enterprise discounts.
              </span>
            </div>
            
            <div className="space-y-2.5 text-xs text-[#6B6258] pt-4 border-t border-[#C8BFB0]/20">
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#C5A059]" />
                <span>Flexible EMI Options Available (up to 12 Months Cost-Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#C5A059]" />
                <span>Corporate Leasing Solutions for IT Hardware</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#C5A059]" />
                <span>Extended Annual Maintenance Contracts (AMC) Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TECHNICAL SPECIFICATIONS SECTION */}
      <section className="py-24 border-t border-[#C8BFB0]/30 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#C5A059] uppercase tracking-[0.4em] font-bold text-[10px]">
                Specifications
              </span>
              <div className="h-[1px] w-12 bg-[#C8BFB0]" />
            </div>
            <h2 className="f-serif italic text-4xl md:text-5xl font-bold text-[#1A1714] leading-[0.92] tracking-tight">
              Technical Specifications.
            </h2>
            <p className="text-xs text-[#6B6258] font-light max-w-md leading-relaxed">
              Detailed breakdown of the architecture, memory speeds, power parameters, and hardware structures of your built-to-order device.
            </p>
          </div>

          {/* Table container */}
          <div className="w-full">
            <table className="w-full text-xs text-left text-[#6B6258] border-collapse bg-transparent">
              <thead>
                <tr className="border-b border-[#C8BFB0]/30 text-[10px] uppercase tracking-widest text-[#1A1714] font-bold">
                  <th className="py-4 pr-6 w-1/3 md:w-1/4">Component</th>
                  <th className="py-4 px-6">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C8BFB0]/20">
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Processor</td>
                  <td className="py-4 px-6 font-light">{product.specs?.cpu || "Intel® Core™ i9-13900HK"}</td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Graphics</td>
                  <td className="py-4 px-6 font-light">{product.specs?.gpu || "NVIDIA® GeForce RTX™ 3060"}</td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Memory</td>
                  <td className="py-4 px-6 font-light">
                    16GB / 32GB / 64GB DDR4 <span className="text-[10px] text-[#C5A059] font-bold ml-2 bg-[#C5A059]/10 px-2 py-0.5 rounded-sm">Selected: {selectedRam}</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Storage</td>
                  <td className="py-4 px-6 font-light">
                    512GB / 1TB / 2TB SSD <span className="text-[10px] text-[#C5A059] font-bold ml-2 bg-[#C5A059]/10 px-2 py-0.5 rounded-sm">Selected: {selectedSsd}</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Display</td>
                  <td className="py-4 px-6 font-light">{product.specs?.display || "16-inch Full HD 165Hz"}</td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Camera</td>
                  <td className="py-4 px-6 font-light">{product.specs?.camera || "2.0MP HD Webcam"}</td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Wireless</td>
                  <td className="py-4 px-6 font-light">{product.specs?.wifi || "Dual Band Wi-Fi 6E"} + {product.specs?.bluetooth || "Bluetooth 5.1"}</td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Battery</td>
                  <td className="py-4 px-6 font-light">{product.specs?.battery || "4-Cell 6000mAh (90Wh)"}</td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Materials</td>
                  <td className="py-4 px-6 font-light">{product.specs?.build || "Aluminum Alloy & ABS"}</td>
                </tr>
                <tr className="hover:bg-[#EDE8DF]/20 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1A1714]">Operating System</td>
                  <td className="py-4 px-6 font-light">{product.specs?.os || "Windows 11"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expandable detailed specs trigger and drawer */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowFullSpecs(!showFullSpecs)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] border border-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all px-8 py-3.5 rounded-sm cursor-pointer bg-transparent"
            >
              {showFullSpecs ? "Hide Technical Specifications" : "View Full Technical Specifications"}
            </button>

            {showFullSpecs && (
              <div className="w-full mt-8 p-6 md:p-8 bg-[#EDE8DF]/40 border border-[#C8BFB0]/30 rounded-sm space-y-6 text-xs text-[#6B6258] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div>
                  <h4 className="font-bold text-[#1A1714] uppercase tracking-wider text-[10px] mb-1">Thermal Management</h4>
                  <p className="font-light">{product.specs?.cooling || "Advanced Dual Fan Cooling System"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1714] uppercase tracking-wider text-[10px] mb-1">Keyboard & Input</h4>
                  <p className="font-light">{product.specs?.keyboard || "RGB Backlit Membrane Keyboard"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1714] uppercase tracking-wider text-[10px] mb-1">Physical Dimensions</h4>
                  <p className="font-light">35.8 x 24.2 x 1.79 cm • {product.specs?.weight || "1.65 kg"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1714] uppercase tracking-wider text-[10px] mb-1">I/O Ports</h4>
                  <p className="font-light">{product.specs?.io || "1x Thunderbolt 4, 2x USB 3.2 Gen 1, 1x HDMI 2.1, 1x Audio Combo Jack"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1714] uppercase tracking-wider text-[10px] mb-1">Biometric Security</h4>
                  <p className="font-light">{product.specs?.security || "Windows Hello Fingerprint Scanner"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1714] uppercase tracking-wider text-[10px] mb-1">Warranty & Support</h4>
                  <p className="font-light">{product.warranty || "18-Month Standard Ention Warranty Cover"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <ReviewSection product={product} />

      {/* EXPLORE MORE SECTION */}
      <section className="py-24 border-t border-[#C8BFB0]/30 bg-transparent select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#C5A059] uppercase tracking-[0.4em] font-bold text-[10px]">
                Ecosystem
              </span>
              <div className="h-[1px] w-12 bg-[#C8BFB0]" />
            </div>
            <h2 className="f-serif italic text-4xl md:text-5xl font-bold text-[#1A1714] leading-[0.92] tracking-tight">
              Explore More.
            </h2>
            <p className="text-xs text-[#6B6258] font-light max-w-md leading-relaxed">
              Discover other high-performance workstations and laptops built for the Ention ecosystem.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts
              .filter((p) => p.id !== product.id && p.slug !== product.slug)
              .slice(0, 3)
              .map((otherProduct) => (
                <div key={otherProduct.id} className="h-full">
                  <ProductCard product={otherProduct as any} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
