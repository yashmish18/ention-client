"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface VideoScrollCanvasProps {
    videoSrc: string;
}

export function VideoScrollCanvas({ videoSrc }: VideoScrollCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = "anonymous";
        video.preload = "auto";
        videoRef.current = video;

        video.addEventListener("loadedmetadata", () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = 1920;
                canvas.height = 1080;
            }
        });

        video.addEventListener("seeked", () => {
            const canvas = canvasRef.current;
            if (canvas && videoRef.current) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                }
            }
            if (!isLoaded) setIsLoaded(true);
        });

        video.currentTime = 0.01;

        return () => {
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [videoSrc]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (videoRef.current && videoRef.current.duration) {
            const targetTime = latest * videoRef.current.duration;
            videoRef.current.currentTime = targetTime;
        }
    });

    // Premium translate & mask animations
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
    
    // Vertical shift rather than rotation
    const textY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [0, 1, 1, 0]);
    
    // Line width expanson
    const lineWidth = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-bg w-full border-t border-ink/5 z-0">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-bg z-0">
                
                <motion.canvas
                    ref={canvasRef}
                    style={{ scale, opacity }}
                    className="w-full h-full object-cover max-w-full"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg opacity-30 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(228,227,224,0.5)_100%)] pointer-events-none" />
                
                {/* Advanced "Anatomy of Power" Overlay */}
                <motion.div 
                    style={{ y: textY, opacity: textOpacity }} 
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center px-4"
                >
                    <div className="overflow-hidden mb-6">
                        <span className="text-accent font-mono text-[10px] uppercase tracking-[0.5em] block">
                            The Anatomy of Power
                        </span>
                    </div>
                    
                    <h2 className="text-6xl md:text-8xl font-serif font-black italic text-ink tracking-tighter leading-none mb-12">
                        Engineered to <br/>
                        <span className="not-italic text-accent">Outperform.</span>
                    </h2>
                    
                    {/* Animated Line */}
                    <div className="h-[1px] w-64 bg-ink/10 mx-auto flex items-center">
                       <motion.div style={{ width: lineWidth }} className="h-[1px] bg-ink/80 origin-left" />
                    </div>
                </motion.div>

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                         <div className="w-16 h-16 border-[3px] border-ink/10 border-t-accent flex items-center justify-center rounded-full animate-spin" />
                    </div>
                )}
            </div>
        </section>
    );
}
