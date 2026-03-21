"use client"; // Ensure it runs only on the client side

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import type { Swiper as SwiperType } from "swiper";

export default function TestCarousel() {
  const [middleSlide, setMiddleSlide] = useState<number | null>(0);
  const totalSlides = useRef(10);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const imagesArray = [
    "/assets/all_product_page/all product carousal 6.webp",
    "/assets/all_product_page/all product carousal photo1.webp",
    "/assets/all_product_page/all product carousal photo2.webp",
    "/assets/all_product_page/all product carousal photo3.webp",
    "/assets/all_product_page/all product carousal photo4.webp",
    "/assets/all_product_page/all product carousal photo5.webp",
    "/assets/all_product_page/all product carousal photo6.webp",
    "/assets/all_product_page/Copy of copy uncut (22).webp",
  ];

  // Preload first 3 images immediately
  useEffect(() => {
    const preloadImages = async () => {
      const imagesToPreload = imagesArray.slice(0, 3);
      const promises = imagesToPreload.map((src) => {
        return new Promise<void>((resolve) => {
          // Use a safer approach for image preloading
          if (typeof window !== 'undefined') {
            const img = new window.Image();
            img.onload = () => {
              setLoadedImages(prev => new Set([...prev, src]));
              resolve();
            };
            img.onerror = () => {
              // If image fails to load, still resolve to prevent blocking
              resolve();
            };
            img.src = src;
          } else {
            // Server-side rendering fallback
            resolve();
          }
        });
      });
      await Promise.all(promises);
    };
    preloadImages();
  }, [imagesArray]);

  useEffect(() => {
    // middleSlide state updated
  }, [middleSlide]);

  const getStyle = useCallback(
    (index: number) => {
      if (middleSlide === null) return {};
      const previndex =
        middleSlide - 1 >= 0 ? middleSlide - 1 : totalSlides.current - 1;
      const nextindex =
        middleSlide + 1 < totalSlides.current ? middleSlide + 1 : 0;
      // if middle slide
      if (middleSlide === index)
        return {
          opacity: "1",
          transform: "scale(1.5)",
          filter: "none",
        };
      else if (previndex === index || nextindex === index)
        return {
          opacity: "0.5",
          transform: "scale(0.6)",
          filter: "blur(8px)",
        };
      else
        return {
          opacity: "0.4",
          transform: "scale(0.5)",
          filter: "blur(16px)",
        };
    },
    [middleSlide]
  );

  const swiperRef = useRef<SwiperType | null>(null);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Change active slide
    }
  };

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        speed={600}
        slidesPerView={1.6}
        spaceBetween={-120}
        loop={false}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        style={{ width: '100vw', maxWidth: '100vw', overflow: 'visible' }}
        onSlideChange={(swiper) => setMiddleSlide(swiper.realIndex)}
      >
        {imagesArray.map((image, index) => {
          const isActive = middleSlide === index;
          const isLoaded = loadedImages.has(image);

          return (
            <SwiperSlide key={index}>
              <div
                style={{
                  width: '80vw',
                  maxWidth: '900px',
                  aspectRatio: '16/10',
                  minHeight: '500px',
                  margin: '0 auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2rem',
                  boxSizing: 'border-box',
                  transform: isActive ? 'scale(1.08)' : 'scale(0.85)',
                  transition: 'transform 0.5s, box-shadow 0.5s',
                }}
                className="text-2xl font-bold"
              >
                <Image
                  src={image}
                  alt="laptop image"
                  width={800}
                  height={400}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: isLoaded ? 1 : 0.7,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index < 3}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex justify-center mt-5">
        {imagesArray.map((image, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedImage(index);
              goToSlide(index);
            }}
          >
            <Image
              src={image}
              alt="laptop image"
              className={`w-16 h-16 object-contain border-gray-300 rounded m-3 cursor-pointer ${selectedImage === index ? "border-2" : "border"
                }`}
              width={64}
              height={64}
              loading={index < 3 ? "eager" : "lazy"}
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
