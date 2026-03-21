'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import computer1 from '../public/assets/Ention-Laptop-E3-Catalogue-design-2.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NextImage from 'next/image';

const ImageSlider = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const [videosLoaded, setVideosLoaded] = useState(new Set());
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoized slider data to prevent re-renders
  const sliderObj = useMemo(() => [
    {
      img: computer1,
      ref: video1Ref,
      video: '/assets/landing_page/0709 (1)(1) (1).mp4',
      id: 0,
    },
    {
      img: computer1,
      ref: video2Ref,
      video: '/assets/landing_page/0709 (1)(1) (1).mp4',
      id: 1,
    },
    {
      img: computer1,
      ref: video3Ref,
      video: '/assets/landing_page/0709 (1)(1) (1).mp4',
      id: 2,
    },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Optimized navigation functions
  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderObj.length);
  }, [sliderObj.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderObj.length - 1 : prevIndex - 1
    );
  }, [sliderObj.length]);

  // Aggressive preloading
  useEffect(() => {
    const preloadResources = async () => {
      // Preload images
      const imagePromises = sliderObj.map((slider) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => new Set([...prev, slider.id]));
            resolve(undefined);
          };
          img.onerror = () => resolve(undefined); // Don't block on error
          img.src = slider.img.src;
        });
      });

      // Preload videos with aggressive optimization
      const videoPromises = sliderObj.map((slider) => {
        return new Promise((resolve) => {
          const video = document.createElement('video');
          video.preload = 'metadata'; // Only load metadata initially
          video.muted = true;
          video.playsInline = true;
          video.onloadedmetadata = () => {
            setVideosLoaded(prev => new Set([...prev, slider.id]));
            resolve(undefined);
          };
          video.onerror = () => resolve(undefined); // Don't block on error
          video.src = slider.video;
        });
      });

      // Wait for critical resources
      await Promise.all([...imagePromises.slice(0, 1), ...videoPromises.slice(0, 1)]);
      setIsInitialized(true);

      // Load remaining resources in background
      Promise.all([...imagePromises.slice(1), ...videoPromises.slice(1)]);
    };

    preloadResources();
  }, [sliderObj]);

  // Auto-advance with optimized timing
  useEffect(() => {
    if (!isInitialized) return;

    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [isInitialized, nextImage]);

  // Optimized video playback
  useEffect(() => {
    if (!isInitialized) return;

    const playVideos = () => {
      [video1Ref, video2Ref, video3Ref].forEach((ref, index) => {
        if (ref.current && videosLoaded.has(index)) {
          ref.current.play().catch(() => {
            // Silent fail for autoplay restrictions
          });
        }
      });
    };

    // Delay video playback slightly to ensure smooth loading
    const timer = setTimeout(playVideos, 100);
    return () => clearTimeout(timer);
  }, [isInitialized, videosLoaded]);

  // Optimized render with early return
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center gap-8 lg:gap-16 min-h-[400px]">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-[400px] flex items-center justify-center">
          <div className="text-gray-500">Loading slider...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-8 lg:gap-16">
      {/* Previous Button */}
      <button
        onClick={prevImage}
        className="min-w-[50px] h-[50px] rounded-full transition flex center hover:bg-white/80"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      {/* Slider Container */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            willChange: 'transform', // Optimize for animations
          }}
        >
          {sliderObj.map((slider, index) => {
            const isImageLoaded = imagesLoaded.has(slider.id);
            const isVideoLoaded = videosLoaded.has(slider.id);

            return (
              <div key={slider.id} className="relative w-full h-full flex-shrink-0">
                {/* Optimized Image */}
                <div className="relative w-full h-full">
                  <NextImage
                    src={slider.img.src}
                    alt={`Slide ${index + 1}`}
                    width={1200}
                    height={800}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    priority={index === 0} // Only prioritize first image
                    loading={index === 0 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />

                  {/* Loading placeholder */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                </div>

                {/* Video Overlay */}
                <div className="absolute rounded-md top-[16px] lg:top-[5%] left-[40px] lg:left-[8%] w-[396px] lg:w-[84%] h-[230px] lg:h-[73%] bg-black overflow-hidden">
                  {isVideoLoaded ? (
                    <video
                      className={`w-full h-full object-contain transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      src={slider.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      ref={slider.ref}
                      onLoadStart={() => {
                        // Optimize video loading
                        if (slider.ref.current) {
                          slider.ref.current.playbackRate = 1.0;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
                      <div className="text-white text-sm">Loading video...</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={nextImage}
        className="min-w-[50px] h-[50px] rounded-full transition flex center hover:bg-white/80"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
