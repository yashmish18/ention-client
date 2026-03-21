import React, { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

export default function IntelCarousel() {
  const [selectedSlide, setSelectedSlide] = useState<number | null>(0);
  const [parallax, setParallax] = useState<Record<number, { x: number; y: number }>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);
  const slideRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const router = useRouter();

  // Memoized slides data
  const slides = useMemo(() => [
    "/assets/landing_page/2A.webp",
    "/assets/landing_page/3A.webp",
    "/assets/landing_page/4A.webp",
  ], []);

  // Optimized slide text variants
  const slideTextVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } },
  }), []);

  // Aggressive preloading with priority loading
  useEffect(() => {
    const preloadImages = async () => {
      const promises = slides.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, src]));
            resolve(undefined as any);
          };
          img.onerror = () => resolve(undefined as any); // Don't block on error
          img.src = src;

          // Prioritize first image
          if (index === 0) {
            img.fetchPriority = 'high';
          }
        });
      });

      // Wait for first image to load, then initialize
      await promises[0];
      setIsInitialized(true);

      // Load remaining images in background
      Promise.all(promises.slice(1));
    };

    preloadImages();
  }, [slides]);

  // Optimized mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();

    // Debounced resize handler
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimized auto-scroll for mobile
  useEffect(() => {
    if (!isMobile || !isInitialized) return;

    const interval = setInterval(() => {
      setSelectedSlide((prev) => (prev !== null ? (prev + 1) % slides.length : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, isInitialized, slides.length]);

  // Optimized slide style calculation
  const getSlideUniqueStyle = useCallback(
    (slideIndex: number): React.CSSProperties => {
      switch (slideIndex) {
        case 0:
          return {
            flexBasis: selectedSlide === 0 ? "200vw" : "clamp(8rem,30vw,18rem)",
          };
        case 1:
          return {
            flexBasis: selectedSlide === 1 ? "200vw" : "clamp(8rem,30vw,18rem)",
            transform:
              selectedSlide === 1 ? "translateY(0)" : "translateY(3.8rem)",
          };
        case 2:
          return {
            flexBasis: selectedSlide === 2 ? "200vw" : "clamp(8rem,30vw,18rem)",
            transform:
              selectedSlide === 2 ? "translateY(0)" : "translateY(3.8rem)",
          };
        default:
          return {};
      }
    },
    [selectedSlide]
  );

  // Optimized parallax effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent, idx: number) => {
    if (isMobile) return;

    const rect = slideRefs[idx].current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // Reduced movement for performance
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setParallax((prev) => ({ ...prev, [idx]: { x, y } }));
  }, [isMobile, slideRefs]);

  const handleMouseLeave = useCallback((idx: number) => {
    setParallax((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));
  }, []);

  // Optimized navigation
  const navigateToProductPage = useCallback(() => {
    router.push("/product");
  }, [router]);

  // Early return for loading state
  if (!isInitialized) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-gray-500">Loading carousel...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        alignItems: "flex-start",
        display: isMobile ? "block" : "flex",
        gap: isMobile ? "0" : "2rem",
        justifyContent: "center",
        listStyle: "none",
        margin: "0",
        padding: "0",
        transitionDuration: "0ms",
        position: "relative",
        width: isMobile ? "100vw" : "100%",
        height: isMobile ? "100vh" : "100%",
        transform: "translate3d(0px, 0px, 0px)",
        transitionDelay: "0ms",
        boxSizing: "border-box",
        zIndex: 1,
        marginLeft: isMobile ? "calc(-50vw + 50%)" : "0",
        marginRight: isMobile ? "calc(-50vw + 50%)" : "0",
        minHeight: "400px",
      }}
      className={isMobile ? "" : "w-full"}
    >
      {slides && slides.length > 0 ? (
        slides.map((slide, idx) => {
          const isLoaded = loadedImages.has(slide);
          const isSelected = selectedSlide === idx;

          return (
            <div
              key={idx}
              ref={slideRefs[idx]}
              onClick={() => !isMobile && setSelectedSlide(isSelected ? null : idx)}
              onMouseMove={(e) => !isMobile && handleMouseMove(e, idx)}
              onMouseLeave={() => !isMobile && handleMouseLeave(idx)}
              style={{
                ...(isMobile ? {
                  width: "100vw",
                  height: "100vh",
                  display: isSelected ? "block" : "none",
                  position: "relative",
                  cursor: "default"
                } : getSlideUniqueStyle(idx)),
                cursor: isMobile ? "default" : "pointer",
                willChange: isSelected ? 'transform' : 'auto', // Optimize for animations
              }}
              className={`front-page-slider relative ${isMobile ? "mobile-slide" : ""}`}
            >
              <div
                className="background-image-center front-slide-hover relative overflow-hidden"
                style={{
                  height: isMobile ? "100vh" : (
                    isSelected
                      ? "40rem"
                      : idx === 1
                        ? "clamp(20rem,70vh,35rem)"
                        : "clamp(20rem,70vh,40rem)"
                  ),
                  width: isMobile ? "100vw" : "auto",
                  transition: "transform 0.2s cubic-bezier(.23,1.01,.32,1)",
                  transform: isMobile ? "none" : ((parallax as any)[idx]
                    ? `translate3d(${(parallax as any)[idx].x || 0}px, ${(parallax as any)[idx].y || 0}px, 0)`
                    : "none"),
                }}
              >
                {/* Optimized Image with Next.js Image component */}
                <div className="relative w-full h-full">
                  <NextImage
                    src={slide}
                    alt={`Carousel slide ${idx + 1}`}
                    fill
                    className={`object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    priority={idx === 0} // Only prioritize first image
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />

                  {/* Loading placeholder */}
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                </div>
              </div>

              {!isMobile && !isSelected && (
                <div className="absolute w-full h-full top-0 left-0 slide-dark-cover"></div>
              )}
            </div>
          );
        })
      ) : (
        <div style={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          color: "#333"
        }}>
          Loading carousel...
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && slides && slides.length > 0 && (
        <>
          {/* Navigation Buttons */}
          <button
            onClick={() => setSelectedSlide((prev) => (prev !== null ? (prev - 1 + slides.length) % slides.length : 0))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center z-20 hover:bg-black/60 transition"
            style={{ outline: 'none', border: 'none' }}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={() => setSelectedSlide((prev) => (prev !== null ? (prev + 1) % slides.length : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center z-20 hover:bg-black/60 transition"
            style={{ outline: 'none', border: 'none' }}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSlide(idx)}
                className={`w-2 h-2 rounded-full transition ${selectedSlide === idx ? 'bg-white' : 'bg-white/50'
                  }`}
                style={{ outline: 'none', border: 'none' }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
