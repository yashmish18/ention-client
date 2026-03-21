// Performance optimization utilities for ultra-fast loading

// Preload critical resources
export const preloadCriticalResources = (): void => {
    if (typeof document === 'undefined') return;

    const criticalImages = [
        '/assets/landing_page/2A.webp',
        '/assets/landing_page/3A.webp',
        '/assets/landing_page/4A.webp',
        '/assets/Ention-Laptop-E3-Catalogue-design-2.png'
    ];

    const criticalVideos = [
        '/assets/landing_page/0709 (1)(1) (1).mp4'
    ];

    // Preload images
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Preload videos
    criticalVideos.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Optimized image loading with priority
export const loadImageWithPriority = (src: string, priority = false): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        if (priority) {
            (img as any).fetchPriority = 'high';
        }

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
};

// Optimized video loading
export const loadVideoWithMetadata = (src: string): Promise<HTMLVideoElement> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = () => resolve(video);
        video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
        video.src = src;
    });
};

// Intersection Observer for lazy loading
export const createLazyLoader = (options: {
    rootMargin?: string;
    threshold?: number | number[];
    onIntersect?: (target: Element, entry: IntersectionObserverEntry) => void;
} = {}): IntersectionObserver => {
    const {
        rootMargin = '50px 0px',
        threshold = 0.1,
        onIntersect = () => { }
    } = options;

    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                onIntersect(entry.target, entry);
            }
        });
    }, { rootMargin, threshold });
};

// Optimize scroll performance
export const optimizeScroll = (callback: () => void): (() => void) => {
    let ticking = false;

    return () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
            ticking = true;
        }
    };
};

// Preload multiple resources in parallel
export const preloadResources = async (resources: Array<{ type: string; src: string; priority?: boolean }>): Promise<PromiseSettledResult<any>[]> => {
    const promises = resources.map(resource => {
        if (resource.type === 'image') {
            return loadImageWithPriority(resource.src, resource.priority);
        } else if (resource.type === 'video') {
            return loadVideoWithMetadata(resource.src);
        }
        return Promise.resolve();
    });

    return Promise.allSettled(promises);
};

// Optimize video playback
export const optimizeVideoPlayback = (videoElement: HTMLVideoElement | null): void => {
    if (!videoElement) return;

    // Set optimal playback settings
    videoElement.playbackRate = 1.0;
    videoElement.defaultPlaybackRate = 1.0;

    // Optimize for performance
    videoElement.preload = 'metadata';
    videoElement.muted = true;
    videoElement.playsInline = true;

    // Add error handling
    videoElement.onerror = (e) => {
        console.warn('Video playback error:', e);
    };
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            if (timeout) clearTimeout(timeout);
            func(...args);
        };
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean = false;
    return function (...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Optimize animations
export const optimizeAnimation = (element: HTMLElement | null, animationType = 'transform'): (() => void) | undefined => {
    if (!element) return;

    // Use transform3d for hardware acceleration
    element.style.transform = 'translate3d(0, 0, 0)';
    element.style.willChange = animationType;

    // Clean up after animation
    const cleanup = () => {
        element.style.willChange = 'auto';
    };

    return cleanup;
};

// Performance monitoring
export const measurePerformance = <T>(name: string, fn: () => T): T => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    console.log(`${name} took ${end - start}ms`);
    return result;
};

// Async performance measurement
export const measureAsyncPerformance = async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();

    console.log(`${name} took ${end - start}ms`);
    return result;
};

// Optimize for mobile
export const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
};

// Optimize for slow connections
export const isSlowConnection = (): boolean => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const conn = (navigator as any).connection;
        return conn.effectiveType === 'slow-2g' ||
            conn.effectiveType === '2g' ||
            conn.effectiveType === '3g';
    }
    return false;
};

// Adaptive loading based on connection
export const getOptimalLoadingStrategy = () => {
    if (isSlowConnection()) {
        return {
            imageQuality: 60,
            preloadCount: 1,
            lazyLoadThreshold: 100
        };
    }

    return {
        imageQuality: 85,
        preloadCount: 3,
        lazyLoadThreshold: 50
    };
};

const performanceExports = {
    preloadCriticalResources,
    loadImageWithPriority,
    loadVideoWithMetadata,
    createLazyLoader,
    optimizeScroll,
    preloadResources,
    optimizeVideoPlayback,
    debounce,
    throttle,
    optimizeAnimation,
    measurePerformance,
    measureAsyncPerformance,
    isMobile,
    isSlowConnection,
    getOptimalLoadingStrategy
};

export default performanceExports;
