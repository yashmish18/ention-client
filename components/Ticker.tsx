"use client";

export function Ticker() {
    return (
        <div className="bg-ink text-bg py-3 border-y border-bg/10 ticker-wrap overflow-hidden">
            <div className="ticker font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap flex">
                {[...Array(20)].map((_, i) => (
                    <span key={i} className="mx-8 shrink-0 text-white/70">
                        ENTION • एंटियन • என்ஷன் • এনশন • ఎన్షన్ • ಎಂಟಿಯನ್
                    </span>
                ))}
            </div>
        </div>
    );
}
