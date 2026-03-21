import { useState, useEffect, useCallback, useRef } from 'react';
import { loadImageWithPriority, loadVideoWithMetadata, isMobile, isSlowConnection } from '../performance';

interface MediaItem {
    id?: string | number;
    type: 'image' | 'video';
    src: string;
}

interface OptimizedMediaOptions {
    preloadCount?: number;
    priority?: boolean;
    lazyLoad?: boolean;
    onLoad?: (item: MediaItem, index: number) => void;
    onError?: (error: any, item: MediaItem, index: number) => void;
}

// Custom hook for optimized media loading
export const useOptimizedMedia = (mediaItems: MediaItem[], options: OptimizedMediaOptions = {}) => {
    const {
        preloadCount = 2,
        priority = false,
        lazyLoad = true,
        onLoad = () => { },
        onError = () => { }
    } = options;

    const [loadedItems, setLoadedItems] = useState<Set<string | number>>(new Set());
    const [loadingStates, setLoadingStates] = useState<Record<string | number, boolean>>({});
    const [isInitialized, setIsInitialized] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);

    // Determine loading strategy based on connection
    const loadingStrategy = useCallback(() => {
        if (isSlowConnection()) {
            return {
                preloadCount: 1,
                imageQuality: 60,
                lazyLoadThreshold: 100
            };
        }
        return {
            preloadCount: preloadCount,
            imageQuality: 85,
            lazyLoadThreshold: 50
        };
    }, [preloadCount]);

    // Load single media item
    const loadMediaItem = useCallback(async (item: MediaItem, index: number) => {
        const key = item.id || index;
        if (loadedItems.has(key)) return;

        setLoadingStates(prev => ({ ...prev, [key]: true }));

        try {
            if (item.type === 'image') {
                await loadImageWithPriority(item.src, index === 0 || priority);
            } else if (item.type === 'video') {
                await loadVideoWithMetadata(item.src);
            }

            setLoadedItems(prev => {
                const next = new Set(prev);
                next.add(key);
                return next;
            });
            setLoadingStates(prev => ({ ...prev, [key]: false }));
            onLoad(item, index);
        } catch (error) {
            setLoadingStates(prev => ({ ...prev, [key]: false }));
            onError(error, item, index);
        }
    }, [loadedItems, priority, onLoad, onError]);

    // Preload critical items
    useEffect(() => {
        if (!mediaItems || mediaItems.length === 0) return;

        const strategy = loadingStrategy();
        const criticalItems = mediaItems.slice(0, strategy.preloadCount);

        const preloadCritical = async () => {
            const promises = criticalItems.map((item, index) =>
                loadMediaItem(item, index)
            );

            await Promise.allSettled(promises);
            setIsInitialized(true);
        };

        preloadCritical();
    }, [mediaItems, loadMediaItem, loadingStrategy]);

    // Lazy load remaining items
    useEffect(() => {
        if (!lazyLoad || !isInitialized) return;

        const strategy = loadingStrategy();
        const remainingItems = mediaItems.slice(strategy.preloadCount);

        if (remainingItems.length === 0) return;

        // Create intersection observer for lazy loading
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const indexStr = (entry.target as HTMLElement).dataset.mediaIndex;
                        if (indexStr) {
                            const index = parseInt(indexStr);
                            const item = mediaItems[index];
                            if (item && !loadedItems.has(item.id || index)) {
                                loadMediaItem(item, index);
                            }
                        }
                    }
                });
            },
            {
                rootMargin: `${strategy.lazyLoadThreshold}px 0px`,
                threshold: 0.1
            }
        );

        // Observe remaining items
        remainingItems.forEach((_, index) => {
            const actualIndex = index + strategy.preloadCount;
            const element = document.querySelector(`[data-media-index="${actualIndex}"]`);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [isInitialized, lazyLoad, mediaItems, loadedItems, loadMediaItem, loadingStrategy]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return {
        loadedItems,
        loadingStates,
        isInitialized,
        containerRef,
        loadMediaItem,
        isLoaded: (id: string | number) => loadedItems.has(id),
        isLoading: (id: string | number) => loadingStates[id] || false
    };
};

// Hook for optimized image loading
export const useOptimizedImages = (images: string[], options: OptimizedMediaOptions = {}) => {
    const mediaItems: MediaItem[] = images.map((src, index) => ({
        id: `image-${index}`,
        type: 'image',
        src
    }));

    return useOptimizedMedia(mediaItems, options);
};

// Hook for optimized video loading
export const useOptimizedVideos = (videos: string[], options: OptimizedMediaOptions = {}) => {
    const mediaItems: MediaItem[] = videos.map((src, index) => ({
        id: `video-${index}`,
        type: 'video',
        src
    }));

    return useOptimizedMedia(mediaItems, options);
};

// Hook for carousel optimization
export const useOptimizedCarousel = (slides: any[], options: any = {}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const {
        autoPlayInterval = 5000,
        preloadCount = 1,
        priority = true
    } = options;

    // Convert slides to media items
    const mediaItems: MediaItem[] = slides.map((slide, index) => ({
        id: `slide-${index}`,
        type: slide.type || 'image',
        src: slide.src || slide,
    }));

    const mediaHook = useOptimizedMedia(mediaItems, {
        preloadCount,
        priority,
        lazyLoad: true
    });

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || !mediaHook.isInitialized) return;

        autoPlayRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % slides.length);
        }, autoPlayInterval);

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, mediaHook.isInitialized, slides.length, autoPlayInterval]);

    // Pause auto-play on hover (desktop only)
    const handleMouseEnter = useCallback(() => {
        if (!isMobile()) {
            setIsAutoPlaying(false);
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!isMobile()) {
            setIsAutoPlaying(true);
        }
    }, []);

    // Navigation functions
    const nextSlide = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    return {
        ...mediaHook,
        currentIndex,
        isAutoPlaying,
        setIsAutoPlaying,
        nextSlide,
        prevSlide,
        goToSlide,
        handleMouseEnter,
        handleMouseLeave
    };
};

const optimizedMediaExports = {
    useOptimizedMedia,
    useOptimizedImages,
    useOptimizedVideos,
    useOptimizedCarousel
};

export default optimizedMediaExports;
