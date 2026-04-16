"use client";

export function Ticker() {
    return (
        <div className="bg-ink text-bg py-3 border-y border-bg/10 ticker-wrap overflow-hidden">
            <div className="ticker font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap flex">
                {[...Array(8)].map((_, i) => (
                    <span key={i} className="mx-8 shrink-0">
                        CPU: 14th Gen Intel Core i9 // RAM: 64GB LPDDR5x // STORAGE: 4TB PCIe 4.0 SSD // DISPLAY: 16&quot; 4K OLED Touch // OS: Ention OS v3.1 // MADE IN BHARAT //
                    </span>
                ))}
            </div>
        </div>
    );
}
