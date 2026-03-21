'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '../index';
import Image from 'next/image';
import Link from 'next/link';
import accessories from '@/assets/accessories.png';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-use';
import { toast } from 'react-toastify';
import { FaCartArrowDown } from 'react-icons/fa';

interface Product {
    slug: string;
    id?: string;
    title?: string;
    cover_image?: string;
    pricing?: {
        sellingPrice?: number;
    };
    rating?: number;
    link?: string;
}

interface Category {
    id: string;
    title: string;
    description: string;
    products: Product[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [cart, setCart] = useLocalStorage<any[]>('cart', []);
    const router = useRouter();

    const addToCart = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        toast.dismiss();
        const exist = cart?.find((x: any) => x.slug === slug);
        if (!exist) {
            setCart([...(cart || []), { slug, quantity: 1 }]);
            router.push('/ecommerce/cart');
        } else {
            router.push('/ecommerce/cart');
        }
    };

    const handleCheckout = (e: React.MouseEvent) => {
        e.preventDefault();
        setCart([...(cart || []), { slug: product.slug, quantity: 1 }]);
        router.push('/ecommerce/checkout');
    };

    return (
        <div className="w-full md:w-[40%] lg:w-1/3 py-5 lg:px-2 flex justify-center mx-10 md:mx-4 lg:mx-0">
            <div className="px-5 py-4 border border-[#007E9E] hover:bg-teal-600/10 cursor-pointer w-full transition-colors flex flex-col">
                <div className="flex justify-start mb-4">
                    <button
                        onClick={(e) => addToCart(e, product.slug)}
                        className="p-3 rounded-full bg-slate-600 text-white hover:bg-slate-700 transition"
                    >
                        <FaCartArrowDown size={20} />
                    </button>
                </div>

                <div className="w-[70%] mx-auto flex justify-center mb-8 flex-1">
                    {product?.cover_image && (
                        <Image
                            src={product.cover_image}
                            width={300}
                            height={300}
                            alt={product.title || 'Product'}
                            className="object-contain"
                        />
                    )}
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
                        {product?.title || 'DELL Adapter'}
                    </h2>
                    <div className="w-full flex justify-between items-end">
                        <div>
                            <h2 className="text-xl font-bold mb-2">
                                ₹{product?.pricing?.sellingPrice || 999}
                            </h2>
                            <div className="flex gap-1 mb-2">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <span
                                            key={`rating-${i}`}
                                            className={`w-3 h-3 rounded-full ${i < (product?.rating || 4) ? 'bg-[#FBB040]' : 'bg-gray-400'
                                                }`}
                                        ></span>
                                    ))}
                            </div>
                        </div>
                        <button
                            className="px-6 py-2 rounded bg-[#007E9E] text-white hover:bg-[#007E9E]/80 font-semibold transition-all transform hover:scale-105"
                            onClick={handleCheckout}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccessoryProducts: React.FC<{ categories: Category[] }> = ({ categories }) => {
    const params = useSearchParams();
    const [selected, setSelected] = useState<Category>(categories[0]);

    useEffect(() => {
        const categoryParam = params.get('category')?.replace(/-/g, ' ');
        if (categoryParam) {
            const found = categories.find(
                (c) => c.id?.toLowerCase() === categoryParam.toLowerCase()
            );
            if (found) setSelected(found);
        }
    }, [params, categories]);

    if (!selected) return null;

    return (
        <main className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="header mb-8 lg:mb-14 relative w-full h-[25vh] md:h-[35vh] lg:h-[45vh] pt-20">
                <Image src={accessories} fill alt="Accessories Header" className="object-contain" />
            </div>

            <div className="mt-8 md:mt-12 mb-8 text-center px-4">
                <h2 className="text-3xl lg:text-5xl mb-4 md:mb-8 font-bold text-[#0FAFCA]">
                    {selected.title}
                </h2>
                <p className="max-w-[80%] lg:max-w-[60%] mx-auto text-sm md:text-lg text-gray-300">
                    {selected.description}
                </p>
            </div>

            <div className="mt-4 md:mt-12 mb-10 md:mb-20 flex flex-wrap justify-center px-4 md:px-8 lg:px-20">
                {selected.products.map((item, i) => (
                    <ProductCard product={item} key={`product-${i}`} />
                ))}
            </div>

            <Footer />
        </main>
    );
};

export default AccessoryProducts;
