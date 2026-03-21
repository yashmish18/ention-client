'use client';

import React from 'react';
import { Navbar, Footer } from '../index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-use';
import { FaLaptopCode } from 'react-icons/fa';

// Assets
import accessoriesHeader from '@/assets/accessories.png';
import placeholderProduct from '@/assets/accessory.png';

interface Product {
    name?: string;
    price?: number;
    slug?: string;
    image?: any;
    rating?: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [cart, setCart] = useLocalStorage<any[]>('cart', []);
    const router = useRouter();

    const handleCheckout = (e: React.MouseEvent) => {
        e.preventDefault();
        if (product.slug) {
            setCart([...(cart || []), { slug: product.slug, quantity: 1 }]);
            router.push('/ecommerce/checkout');
        }
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 py-5 lg:px-4 flex justify-center">
            <div className="px-6 py-8 border border-[#0FAFCA] rounded-2xl hover:bg-[#0FAFCA]/5 transition-all group flex flex-col w-full max-w-sm">
                <div className="w-full aspect-square flex items-center justify-center mb-6 bg-gray-900/50 rounded-xl overflow-hidden">
                    {product?.image || placeholderProduct ? (
                        <Image
                            src={product?.image || placeholderProduct}
                            width={200}
                            height={200}
                            alt={product?.name || "Product"}
                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <FaLaptopCode size={64} className="text-gray-700" />
                    )}
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold mb-3 text-white line-clamp-2">
                        {product?.name || 'ENTion Premium Accessory'}
                    </h2>
                    <div className="flex justify-between items-center mt-auto">
                        <div>
                            <p className="text-2xl font-black text-[#0FAFCA]">₹{product?.price || 1499}</p>
                            <div className="flex gap-1 mt-1">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < (product.rating || 4) ? 'bg-[#FBB040]' : 'bg-gray-700'}`} />
                                ))}
                            </div>
                        </div>
                        <button
                            className="px-6 py-2 bg-[#0FAFCA] hover:bg-[#007E9E] text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
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

const AccessoriesPage: React.FC = () => {
    // Use mock products for now as the original file was also using placeholders
    const mockProducts: Product[] = [
        { name: 'Original replacement battery for laptop J60J5 compatible with Dell Latitude E7270 E7470 [ 7.6 V / 55 Wh ] High Performance battery Pack- 1 YEAR REPLACEMENT WARRANTY', price: 2499, slug: 'battery-1' },
        { name: 'ENTion Workbook Charger', price: 1299, slug: 'charger-1' },
        { name: 'ENTion Laptop Stand', price: 999, slug: 'stand-1' },
        { name: 'ENTion Protective Sleeve', price: 599, slug: 'sleeve-1' },
        { name: 'Extended Warranty - 1 Year', price: 1999, slug: 'warranty-ext' },
    ];

    return (
        <main className="bg-black min-h-screen text-white">
            <Navbar />

            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden pt-20">
                <Image
                    src={accessoriesHeader}
                    fill
                    alt="Accessories"
                    className="object-contain opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="relative z-10 -mt-20 px-4 mb-20">
                <div className="max-w-4xl mx-auto text-center bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white uppercase italic">
                        Accessories
                    </h2>
                    <p className="text-gray-300 text-lg font-medium leading-relaxed">
                        Blazing-fast chargers, durable batteries, and essential peripherals designed for your ENTion Workbook.
                        The ultimate companions for your professional ecosystem.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
                <div className="flex flex-wrap justify-center">
                    {mockProducts.map((p, i) => (
                        <ProductCard product={p} key={i} />
                    ))}
                    {/* Fill up with some placeholders to match original file's 12 items loop */}
                    {Array(7).fill(0).map((_, i) => (
                        <ProductCard product={{}} key={`placeholder-${i}`} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default AccessoriesPage;
