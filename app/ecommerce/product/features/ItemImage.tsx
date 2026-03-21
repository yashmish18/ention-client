'use client';

import React from 'react';
import Image from 'next/image';

interface ItemImageProps {
    img: string;
    label?: React.ReactNode;
    text?: string;
}

const ItemImage: React.FC<ItemImageProps> = ({ img, label }) => {
    return (
        <div className="flex items-center justify-center relative text-white font-normal rounded-3xl overflow-hidden">
            <Image
                src={img}
                alt="feature-img"
                className="w-[560px] h-auto"
                width={560}
                height={400}
                loading="lazy"
            />
            {label}
        </div>
    );
};

export default ItemImage;
