'use client';

import React from "react";
import { ProductView } from "@/components/products/ProductView";
import { entionProducts } from "@/data/products-ention";

export default function E4ProductPage() {
  const product = entionProducts.e4;

  return <ProductView product={product} />;
}
