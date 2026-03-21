"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from 'next/image';

interface CarouselImage {
    src: string;
}

interface ImageCaraouselProps {
    images: CarouselImage[];
}

export default function ImageCaraousel({ images }: ImageCaraouselProps) {
    return (
        <div className="relative bg-blue-600 rounded-2xl overflow-hidden">
            <Swiper
                autoplay={{
                    delay: 2000,
                }}
                loop={images.length > 1}
                modules={[Autoplay]}
                pagination={{
                    clickable: true,
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={image.src}
                            alt={`Slider Image ${index}`}
                            width={800}
                            height={400}
                            className="w-full aspect-auto rounded-2xl object-fill"
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
