import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-12">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
    );
}

// Disable the global footer for this segment
export const metadata = {
    title: "Dashboard | ENTI·ON",
};
