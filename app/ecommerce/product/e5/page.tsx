'use client';

import React from "react";
import { ProductView } from "@/components/products/ProductView";
import { entionProducts } from "@/data/products-ention";

export default function E5ProductPage() {
  const product = entionProducts.e5;

  return <ProductView product={product} />;
}
