"use client";

import { Laptop, ShoppingCart, GraduationCap, ArrowRight, Code, Brain, Settings, ShieldCheck, Zap, Globe, Building2, Truck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Ticker } from "@/components/Ticker";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LetterAnimation } from "@/components/LetterAnimation";

const Hero = () => (
  <section className="relative min-h-screen bg-ink flex flex-col items-center justify-center px-8 md:px-16 pt-32 pb-24 overflow-hidden">
    <div className="w-full max-w-[1600px] flex flex-col lg:flex-row items-center gap-16 lg:gap-24 z-10">
      {/* Left Column: Cinematic Tagline */}
      <div className="w-full lg:w-[45%] space-y-8">
        <div className="space-y-4">
          <span className="text-accent font-mono text-[2vw] font-bold tracking-[0.8em] uppercase block">
            Introducing
          </span>

          <h1 className="text-6xl md:text-8xl font-serif font-black text-bg uppercase leading-[0.85] tracking-tighter opacity-95">
            <LetterAnimation text="MADE IN" type="reveal" delay={0.2} /> <br />
            <span className="text-accent italic font-normal">
              <LetterAnimation text="India" type="reveal" delay={0.6} />
            </span>
          </h1>
        </div>

        <div className="pt-8 flex items-center gap-8">
          <h2 className="text-lg md:text-xl font-mono text-bg/70 tracking-[0.6em] uppercase whitespace-nowrap">
            <LetterAnimation
              text="ENTION® COMPUTING DEVICE"
              type="blur"
              delay={1.2}
            />
          </h2>
          <div className="h-[1px] w-full bg-white/5" />
        </div>
      </div>

      {/* Right Column: Independent Product Gallery */}
      <div className="w-full lg:w-[55%] min-h-[500px]">
        <HeroCarousel />
      </div>
    </div>

    {/* Background Depth Grid */}
    <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
      <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  </section>
);

const UserSegments = () => (
  <section className="px-8 py-2 bg-bg">
  </section>
);

const SectionHeader = ({ num, title, subtitle }: { num: string, title: string, subtitle?: string }) => (
  <div className="flex justify-between items-end mb-12 border-b border-ink/10 pb-4 text-ink">
    <div>
      <span className="font-mono text-xs opacity-50">— {num} / {title.toUpperCase()}</span>
      <h2 className="text-4xl md:text-5xl mt-2 font-bold font-serif">{title}</h2>
    </div>
    {subtitle && <span className="font-mono text-[10px] opacity-40 uppercase tracking-[0.4em] text-ink">{subtitle}</span>}
  </div>
);

const Models = () => (
  <section id="machine" className="px-8 py-24 bg-bg">
    <SectionHeader num="01" title="Models we make" />
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Students Card */}
      <div className="group relative bg-ink p-12 overflow-hidden border border-white/5 flex flex-col justify-between min-h-[500px] transition-all duration-500 hover:border-accent/20">
        <div className="z-10">
          <span className="text-accent/50 font-mono text-[10px] tracking-[0.5em] uppercase block mb-4">Targeting</span>
          <h2 className="text-5xl font-serif text-bg italic mb-6">For Students</h2>
          <p className="text-bg/40 max-w-sm leading-relaxed font-sans text-sm">
            Affordable, Lightweight, durable, and built to support your learning on the go. Engineered for the next generation of Bharat.
          </p>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/4 w-[120%] aspect-square opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000 grayscale">
          <Image
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000"
            alt="Student Series"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="z-10 pt-12">
          <Link href="/products" className="flex items-center gap-4 bg-accent text-bg px-10 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all group-button rounded-sm">
            <span>Shop Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="absolute top-10 right-10 opacity-5">
          <GraduationCap size={120} strokeWidth={0.5} className="text-bg" />
        </div>
      </div>

      {/* Professionals Card */}
      <div className="group relative bg-bg p-12 overflow-hidden border border-ink/10 flex flex-col justify-between min-h-[500px] transition-all duration-500 hover:border-accent/30">
        <div className="z-10">
          <span className="text-ink/30 font-mono text-[10px] tracking-[0.5em] uppercase block mb-4">Performance</span>
          <h2 className="text-5xl font-serif text-ink italic mb-6">For Professionals</h2>
          <p className="text-ink/50 max-w-sm leading-relaxed font-sans text-sm">
            Customizable, seamlessly switch from work tasks to meetings with reliable performance. A powerful machine ready for code, design, or research.
          </p>
        </div>

        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[120%] aspect-square opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000 grayscale">
          <Image
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000"
            alt="Professional Series"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="z-10 pt-12">
          <Link href="/products" className="flex items-center gap-4 bg-ink text-bg px-10 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all group-button rounded-sm shadow-xl">
            <span>Explore Pro</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="absolute top-10 right-10 opacity-5">
          <Code size={120} strokeWidth={0.5} className="text-ink" />
        </div>
      </div>
    </div>

  </section>
);

const Engineering = () => (
  <section id="spec" className="px-8 py-24 bg-ink text-bg">
    <div className="flex justify-between items-end mb-12 border-b border-bg/10 pb-4 text-bg">
      <div>
        <span className="font-mono text-xs opacity-50">— 02 / ENGINEERING</span>
        <h2 className="text-4xl md:text-5xl mt-2 font-serif font-bold italic">Syne</h2>
      </div>
      <span className="font-mono text-xs opacity-50 uppercase tracking-widest">Syne Architecture</span>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative aspect-video bg-bg/5 p-8 border border-bg/10 flex items-center justify-center overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000"
          alt="Internal Architecture"
          fill
          className="object-contain opacity-40 mix-blend-screen grayscale transition-all duration-700"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border border-accent/20 rounded-full animate-pulse capitalize" />
        </div>
      </div>
      <div className="space-y-4">
        {[
          { label: "PROCESSOR", value: "Intel Core i9 14900HX (24 Cores)" },
          { label: "GRAPHICS", value: "NVIDIA GeForce RTX 4090" },
          { label: "MEMORY", value: "64GB LPDDR5x 7200MHz" },
          { label: "STORAGE", value: "4TB PCIe Gen 4 NVMe SSD" },
          { label: "DISPLAY", value: "16-inch 4K ProMotion OLED" },
          { label: "PORTS", value: "3x Thunderbolt 4" },
          { label: "BATTERY", value: "99.9Wh Li-Polymer" },
          { label: "WEIGHT", value: "1.89 kg" },
        ].map((spec, i) => (
          <div key={i} className="flex justify-between py-3 border-b border-bg/10 font-mono text-[11px] uppercase group hover:bg-white/5 transition-colors px-2">
            <span className="opacity-50 group-hover:opacity-100 transition-opacity">{spec.label}</span>
            <span className="text-right font-bold transition-all">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyEntion = () => (
  <section id="craft" className="px-8 py-24 bg-bg border-t border-ink/5">
    <div className="flex justify-between items-end mb-12 border-b border-ink/10 pb-4 text-ink">
      <div>
        <span className="font-mono text-xs opacity-50">— 03 / WHY ENTION</span>
        <h2 className="text-4xl md:text-5xl mt-2 font-serif font-black uppercase tracking-tighter italic">Trust</h2>
      </div>
      <span className="font-mono text-xs opacity-50 uppercase tracking-widest">Philosophy</span>
    </div>

    {/* Brand Philosophy Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 border border-ink/10 mb-24">
      {[
        { id: "01", title: "Craftsmanship", desc: "Every machine is hand-assembled with obsessive attention to detail, ensuring a level of precision that mass production cannot match." },
        { id: "02", title: "Materials", desc: "We source only the finest aerospace-grade alloys and sustainable components, built to last a lifetime of rigorous professional use." },
        { id: "03", title: "Support", desc: "Our white-glove concierge support ensures that your creative flow is never interrupted, with 24/7 priority hardware assistance." },
      ].map((item, i) => (
        <div key={i} className="p-12 border-r border-ink/10 last:border-r-0 card-hover group h-full transition-all duration-300">
          <span className="text-7xl font-serif opacity-5 group-hover:opacity-100 transition-opacity select-none italic text-ink">{item.id}</span>
          <h3 className="text-3xl mt-8 mb-6 font-bold text-ink">{item.title}</h3>
          <p className="text-sm opacity-60 leading-relaxed font-sans text-ink">{item.desc}</p>
          <div className="mt-12 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-700" />
        </div>
      ))}
    </div>

    {/* Workbook Series Features */}
    <div className="pt-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter text-ink mb-6">
          Why Choose <span className="italic font-normal text-accent">Workbook</span> Series?
        </h2>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-40 text-ink max-w-2xl mx-auto">
          From customization to performance, discover what makes Ention Workbook Series the right choice for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-ink/5 pb-24">
        {[
          { icon: Settings, title: "Customizable", desc: "Configure your device to match your needs." },
          { icon: ShoppingCart, title: "Affordable", desc: "Get premium features at a fair price." },
          { icon: ShieldCheck, title: "18-Month Warranty", desc: "Enjoy peace of mind with on-site support." },
          { icon: Laptop, title: "Made in India", desc: "Proudly designed and built in Bharat." },
          { icon: Zap, title: "Performance", desc: "Experience speed and reliability every day." },
        ].map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center group cursor-default">
            <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-bg transition-all duration-500">
              <feature.icon size={24} strokeWidth={1} className="opacity-60 group-hover:opacity-100" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink mb-4 italic">{feature.title}</h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink/40 leading-relaxed group-hover:text-ink/80 transition-colors">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ExperienceProgram = () => (
  <section className="px-8 py-24 bg-ink overflow-hidden relative">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
      <div className="space-y-12">
        <div>
          <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase block mb-6">Corporate Solutions</span>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-bg uppercase leading-[0.9] tracking-tighter">
            Ention Laptop <br />
            <span className="italic font-normal text-accent/80 normal-case">Experience Program</span>
          </h2>
        </div>

        <div className="space-y-6">
          {[
            { icon: Globe, title: "Zero Obligation", desc: "Test the hardware in your environment with no purchase commitment." },
            { icon: Truck, title: "On-Site Delivery", desc: "Free sample delivery directly to your office within 48 hours." },
            { icon: Building2, title: "Corporate Offers", desc: "Exclsuve pricing and white-glove support for enterprise teams." },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="mt-1 w-5 h-5 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent transition-colors">
                <CheckCircle2 size={10} className="text-accent group-hover:text-bg" />
              </div>
              <div>
                <h3 className="text-bg text-sm font-bold uppercase tracking-widest mb-1">{item.title}</h3>
                <p className="text-bg/40 text-[10px] font-mono uppercase tracking-wider">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-8 items-center">
          <p className="text-bg/30 text-[9px] font-mono uppercase tracking-[0.3em] max-w-xs text-center sm:text-left">
            Let your team test the performance first-hand before making the switch.
          </p>
          <button className="bg-bg text-ink px-12 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-accent hover:text-bg transition-all rounded-sm shadow-2xl">
            Book Now
          </button>
        </div>
      </div>

      <div className="relative aspect-square lg:aspect-video group">
        <div className="absolute inset-0 bg-accent/5 rounded-full blur-[40px] group-hover:bg-accent/10 transition-colors duration-1000" />
        <Image
          src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000"
          alt="Corporate Experience"
          fill
          className="object-contain rotate-[-12deg] group-hover:rotate-0 transition-transform duration-1000 active:scale-95"
        />
      </div>
    </div>

    {/* Abstract Background Detail */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(242,125,38,0.02)_50%,transparent_75%)] pointer-events-none" />
  </section>
);

const Access = () => (
  <section id="order" className="px-8 py-24 bg-bg border-t border-ink/5">
    <div className="flex justify-between items-end mb-12 border-b border-ink/10 pb-4 text-ink">
      <div>
        <span className="font-mono text-xs opacity-50">— 04 / ACCESS</span>
        <h2 className="text-4xl md:text-5xl mt-2 font-serif font-black uppercase">Availability</h2>
      </div>
      <span className="font-mono text-xs opacity-50 uppercase tracking-widest">Channels</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { icon: Laptop, title: "Website", desc: "Browse our full catalog and configure your custom machine online." },
        { icon: ShoppingCart, title: "E-commerce", desc: "Available through select premium retail partners across the globe." },
        { icon: GraduationCap, title: "Campus", desc: "Special education pricing and workshops for students and faculty." },
      ].map((item, i) => (
        <div key={i} className="p-12 bg-white/20 border border-ink/5 flex flex-col items-center text-center card-hover rounded-sm group transition-all duration-300">
          <item.icon size={56} strokeWidth={0.5} className="mb-8 opacity-40 group-hover:opacity-100 transition-opacity text-accent" />
          <h3 className="text-2xl mb-3 font-bold text-ink">{item.title}</h3>
          <p className="text-[10px] opacity-50 uppercase tracking-[0.2em] leading-relaxed font-bold text-ink">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const FooterHero = () => (
  <section className="relative min-h-[70vh] bg-ink flex items-center justify-center overflow-hidden">
    <Image
      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1920"
      alt="Experience Ention"
      fill
      className="object-cover opacity-20 grayscale"
      unoptimized
    />
    <div className="z-10 text-center px-4">
      <h2 className="text-5xl md:text-8xl text-bg font-serif mb-12 italic leading-tight select-none">Feel it. <span className="not-italic opacity-90">Then decide.</span></h2>
      <Link href="/products" className="group flex items-center mx-auto space-x-6 bg-bg text-ink px-12 py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-accent hover:text-white transition-all cursor-pointer rounded-sm shadow-2xl">
        <span>Experience Ention</span>
        <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
      </Link>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-bg overflow-x-hidden">
      <main>
        <Hero />
        <Ticker />
        <UserSegments />
        <Models />
        <Engineering />
        <WhyEntion />
        <Access />
        <ExperienceProgram />
        <FooterHero />
      </main>
    </div>
  );
}
