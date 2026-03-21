'use client';

import React from "react";
import { ProductView } from "@/components/products/ProductView";
import { entionProducts } from "@/data/products-ention";

export default function E3ProductPage() {
  const product = entionProducts.e3;

  return <ProductView product={product} />;
}
