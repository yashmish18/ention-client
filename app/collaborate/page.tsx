import ContactForm from '@/components/ContactForm';

// ... other imports if any

export default function CollaboratePage() {
    return (
        <main className="min-h-screen w-full bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full flex flex-col items-center justify-center py-24 px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-xl uppercase italic">Collaborate With <span className="text-gray-900">ENTION</span></h1>
                <p className="text-lg md:text-2xl text-cyan-100 max-w-3xl mx-auto mb-6 font-bold leading-relaxed">We believe in the power of partnership to drive innovation. ENTION is actively seeking collaborations with investors, technology partners, and distributors who share our vision.</p>
            </section>
            {/* Why Partner With Us */}
            <section className="py-12 px-4 w-full max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#0FAFCA]/20 to-transparent rounded-full blur-xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-1 bg-gradient-to-r from-[#0FAFCA] to-white rounded-full"></div>
                                <span className="text-white font-black text-xs uppercase tracking-[0.2em]">Strategy 2026</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none tracking-tighter uppercase italic">
                                Why Partner With
                                <span className="block text-[#0FAFCA] drop-shadow-md">ENTION?</span>
                            </h2>
                            <p className="text-lg text-cyan-100 mb-8 leading-relaxed font-bold">
                                ENTION is not just a laptop company; we are a <span className="px-2 bg-white text-[#0FAFCA] rounded-md font-black">hub of innovation</span>, committed to pushing the boundaries of technology.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-500 group">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 size-12 text-[#0FAFCA] mt-1 bg-white p-2 rounded-2xl group-hover:rotate-12 transition-transform">
                                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-2.25M21 12l-3.75 2.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Market Leadership</h3>
                                    <p className="text-base text-cyan-100 font-bold mt-2">Benefit from our established brand presence and rapidly growing market share in the premium laptop segment.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-500 group">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 size-12 text-[#0FAFCA] mt-1 bg-white p-2 rounded-2xl group-hover:-rotate-12 transition-transform">
                                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Innovative Pipeline</h3>
                                    <p className="text-base text-cyan-100 font-bold mt-2">Gain access to our pipeline of next-generation products that are set to redefine the user experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Become an Investor + Contact Form */}
            <section className="py-20 px-4 bg-black/20 backdrop-blur-2xl rounded-[3rem] shadow-2xl my-24 w-full max-w-7xl border border-white/5">
                <div className="grid md:grid-cols-2 gap-16 p-8 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic">Become an Investor</h2>
                        <p className="text-lg text-cyan-100 mb-8 font-bold leading-relaxed">ENTION presents a compelling investment opportunity in the rapidly growing laptop market. We have a proven track record of innovation, strong financial fundamentals, and a clear strategic vision.</p>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                "Established market presence with recognition",
                                "Innovative product pipeline & tech",
                                "Strong financial position & growth",
                                "Experienced leadership & execution"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition">
                                    <div className="flex-shrink-0 size-8 bg-[#0FAFCA] rounded-full flex items-center justify-center text-white">
                                        <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="w-5 h-5">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <p className="text-md font-black text-white uppercase tracking-tight">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-[#0FAFCA]/20 blur-3xl rounded-full"></div>
                        <ContactForm className="relative z-10" />
                    </div>
                </div>
            </section>

            {/* Partnership Opportunities */}
            <section className="py-20 px-4 w-full max-w-7xl">
                <h2 className="text-4xl font-black text-white text-center mb-16 tracking-tighter uppercase italic">The ENtion Advantage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Made In India Pride", desc: "Supporting domestic manufacturing and technological advancement." },
                        { title: "Cutting-Edge Tech", desc: "Powered by latest innovations for exceptional performance." },
                        { title: "Affordability", desc: "Tailored for every budget without performance compromise." },
                        { title: "Sustainability", desc: "Eco-friendly manufacturing for a greener future." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform border-b-8 border-[#0FAFCA]">
                            <h3 className="text-xl font-black text-[#133B5C] uppercase tracking-tight">{item.title}</h3>
                            <p className="text-sm text-gray-500 font-bold mt-4 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <div className="h-24" />
        </main>
    );
}

