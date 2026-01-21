
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---
type View = 'home' | 'privacy' | 'terms' | 'process';

// --- Data ---
const testimonials = [
  {
    quote: "ACLLC completely redefined our digital presence. Their attention to detail in the UI/UX phase was beyond anything we've experienced with larger agencies.",
    name: "Sarah Jenkins",
    role: "CEO at Nexus Labs"
  },
  {
    quote: "The speed of delivery without sacrificing quality is what sets them apart. We launched our landing page in record time and saw an immediate 20% jump in conversions.",
    name: "David Chen",
    role: "Marketing Director, Velo Flow"
  },
  {
    quote: "Working with ACLLC was seamless. They understood our brand vision perfectly and delivered a logo kit that truly reflects our core values.",
    name: "Elena Rodriguez",
    role: "Founder of Bloom Creative"
  }
];

// --- Components ---

const Logo = () => (
  <img 
    src="https://i.postimg.cc/SnMm1Rz9/Web-Logo.png" 
    alt="ACLLC Logo" 
    className="h-8 md:h-10 w-auto object-contain"
  />
);

const Header = ({ setView }: { setView: (v: View) => void }) => (
  <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#f0f2f4]">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-3 md:py-4">
      <div 
        className="flex items-center gap-2 md:gap-3 text-[#111318] cursor-pointer mx-auto transition-opacity hover:opacity-80"
        onClick={() => setView('home')}
      >
        <Logo />
        <h2 className="text-[#111318] text-base md:text-xl font-black tracking-tight">ACLLC</h2>
      </div>
    </div>
  </header>
);

const Hero = ({ setView }: { setView: (v: View) => void }) => (
  <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center bg-[#111318] text-white overflow-hidden">
    <div 
      className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" />
    
    <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-20 flex flex-col items-center text-center gap-6 md:gap-8">
      <div className="max-w-5xl">
        <span className="inline-block px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] md:text-sm font-black uppercase tracking-[0.3em] mb-4 md:mb-8 border border-blue-500/20 backdrop-blur-sm">
          Creative Excellence
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-[1] tracking-tight mb-4 md:mb-8">
          Transform Your Brand with <span className="text-blue-500 block">Expert Design</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto px-4 md:px-0">
          We craft visually stunning and effective designs that elevate your brand and drive results. From concept to complex web platforms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center">
          <button 
            onClick={() => setView('process')}
            className="h-14 md:h-16 px-8 md:px-12 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl md:rounded-2xl shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 text-base md:text-lg"
          >
            Our Process
          </button>
          <a 
            href="https://wa.me/212617863598"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 md:h-16 px-8 md:px-12 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-black rounded-xl md:rounded-2xl border border-white/10 transition-all flex items-center justify-center text-base md:text-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 pt-8 md:pt-16 border-t border-white/5 w-full">
        {[
          { label: "Completed Projects", value: "250+" },
          { label: "Happy Clients", value: "180+" },
          { label: "Average Rating", value: "4.9/5" },
          { label: "Support Hours", value: "24/7" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-0 md:gap-1">
            <span className="text-xl md:text-4xl font-black text-white">{stat.value}</span>
            <span className="text-gray-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingCard = ({ title, price, features, highlight = false, subtitle = "" }: any) => {
  const whatsappNumber = "212617863598";
  const message = encodeURIComponent(`Hello ACLLC, I'm interested in the ${title} service. I'd like to get started!`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className={`flex flex-col gap-5 md:gap-6 rounded-3xl md:rounded-[2rem] border border-solid p-6 md:p-8 transition-all hover:shadow-2xl hover:-translate-y-1 ${highlight ? 'border-blue-500 bg-blue-50/10' : 'border-[#dbdfe6] bg-white'}`}>
      <div className="flex flex-col gap-1 md:gap-2">
        <h3 className="text-[#111318] text-base md:text-lg font-bold leading-tight">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-[#111318] text-2xl md:text-3xl font-black leading-tight tracking-tight">${price}</span>
          {subtitle && <span className="text-[#616f89] text-[10px] md:text-xs font-bold uppercase tracking-wider">{subtitle}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 md:gap-3 py-3 md:py-4 border-t border-gray-100 flex-grow">
        {features.map((feature: string, i: number) => (
          <div key={i} className="text-[11px] md:text-xs font-medium leading-normal flex items-start gap-2.5 md:gap-3 text-gray-700">
            <div className="text-blue-600 mt-0.5 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
              </svg>
            </div>
            {feature}
          </div>
        ))}
      </div>
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3 md:py-3.5 rounded-xl font-bold transition-all text-center text-xs md:text-sm flex items-center justify-center ${highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-[#111318] hover:bg-gray-200'}`}
      >
        Choose {title}
      </a>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 md:mb-12 mt-12 md:mt-20 border-l-4 border-blue-600 pl-4 md:pl-6">
    <h3 className="text-[#111318] text-2xl md:text-4xl font-black tracking-tight">{title}</h3>
    {subtitle && <p className="text-gray-500 text-sm md:text-base mt-1 md:mt-2 font-medium">{subtitle}</p>}
  </div>
);

const Pricing = () => (
  <section id="pricing" className="px-4 md:px-6 py-12 md:py-24 bg-gray-50 flex justify-center overflow-hidden">
    <div className="max-w-7xl w-full">
      <div className="text-center mb-10 md:mb-16 flex flex-col items-center gap-3 md:gap-4">
        <span className="text-blue-600 font-bold text-[10px] md:text-sm uppercase tracking-[0.2em]">Service Catalog</span>
        <h2 className="text-[#111318] text-3xl md:text-6xl font-black leading-tight tracking-tight px-4">Transparent Pricing</h2>
        <p className="text-gray-500 text-sm md:text-lg max-w-xl px-6">World-class design and development services tailored to your budget and ambition.</p>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mt-6 md:mt-8">
          <span className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">Global Secure Checkout via Stripe Integration</span>
        </div>
      </div>

      <SectionHeader title="Recommended Bundles" subtitle="Best value for startups and established brands alike." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
        <div className="bg-[#111318] text-white p-6 md:p-8 rounded-3xl md:rounded-[2rem] flex flex-col border border-blue-900/50 shadow-2xl transform hover:scale-[1.02] transition-all">
          <span className="text-blue-500 font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">Web Focus</span>
          <h4 className="text-xl md:text-2xl font-black mb-1 leading-tight">Starter Business</h4>
          <span className="text-3xl md:text-4xl font-black mb-4 md:mb-6">$599</span>
          <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
            {["5-page custom website", "Mobile responsive", "Basic SEO setup", "Contact form", "1 month support"].map((item, i) => (
              <li key={i} className="text-[11px] md:text-xs font-medium text-gray-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <a href="https://wa.me/212617863598?text=I'm%20interested%20in%20the%20$599%20Starter%20Business%20Package" className="w-full py-3 bg-blue-600 text-center rounded-xl font-bold text-xs md:text-sm hover:bg-blue-700 transition-colors">Select Bundle</a>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2rem] flex flex-col border border-gray-200 shadow-xl group hover:border-blue-500 transition-all">
          <span className="text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">Brand Launch</span>
          <h4 className="text-xl md:text-2xl font-black mb-1 leading-tight text-[#111318]">Business Starter</h4>
          <span className="text-3xl md:text-4xl font-black mb-4 md:mb-6 text-[#111318]">$499</span>
          <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
            {["Logo design", "Business card", "Letterhead", "Social media kit (5 templates)"].map((item, i) => (
              <li key={i} className="text-[11px] md:text-xs font-medium text-gray-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <a href="https://wa.me/212617863598?text=I'm%20interested%20in%20the%20$499%20Business%20Starter%20Bundle" className="w-full py-3 bg-gray-100 text-center rounded-xl font-bold text-xs md:text-sm text-[#111318] group-hover:bg-blue-600 group-hover:text-white transition-all">Select Bundle</a>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2rem] flex flex-col border-2 border-blue-500 shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-blue-600 text-white text-[8px] md:text-[10px] px-2 py-0.5 md:py-1 rounded-full font-black uppercase tracking-tighter">Popular</div>
          <span className="text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">Complete ID</span>
          <h4 className="text-xl md:text-2xl font-black mb-1 leading-tight text-[#111318]">Brand Complete</h4>
          <span className="text-3xl md:text-4xl font-black mb-4 md:mb-6 text-[#111318]">$1,499</span>
          <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
            {["Full brand identity", "Brand guidelines", "Stationery set", "15 Social media posts", "Email signature"].map((item, i) => (
              <li key={i} className="text-[11px] md:text-xs font-medium text-gray-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <a href="https://wa.me/212617863598?text=I'm%20interested%20in%20the%20$1,499%20Brand%20Complete%20Bundle" className="w-full py-3 bg-blue-600 text-white text-center rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">Select Bundle</a>
        </div>

        <div className="bg-[#111318] text-white p-6 md:p-8 rounded-3xl md:rounded-[2rem] flex flex-col border border-purple-900/50 shadow-2xl group">
          <span className="text-purple-500 font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">Mobile Suite</span>
          <h4 className="text-xl md:text-2xl font-black mb-1 leading-tight">App Launch</h4>
          <span className="text-3xl md:text-4xl font-black mb-4 md:mb-6">$3,999</span>
          <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
            {["App UI/UX design", "App icon design", "App store graphics", "Promo social media posts"].map((item, i) => (
              <li key={i} className="text-[11px] md:text-xs font-medium text-gray-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <a href="https://wa.me/212617863598?text=I'm%20interested%20in%20the%20$3,999%20App%20Launch%20Package" className="w-full py-3 bg-purple-600 text-center rounded-xl font-bold text-xs md:text-sm hover:bg-purple-700 transition-colors">Select Bundle</a>
        </div>
      </div>

      <SectionHeader title="Website Development" subtitle="Scalable, responsive, and conversion-optimized web platforms." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
        <PricingCard title="Basic Web (3-5pg)" price="300-500" features={["Custom Starter Design", "Essential Mid-Range", "Premium Experience Options"]} />
        <PricingCard title="Standard Web (6-10pg)" price="500-800" highlight={true} features={["Professional Mid-Range ($800-$1.5k)", "High-End Premium ($1.5k-$3k)", "SEO & Speed Ready"]} />
        <PricingCard title="Advanced Web (10+pg)" price="1000-1500" features={["Enterprise Solutions", "Advanced Integrations", "Custom Logic & UI"]} />
        <PricingCard title="Landing Pages" price="100-200" features={["Simple Conversions", "Animated Sale Pages ($200-$400)", "High-Converting Sales ($400-$800)"]} />
        <PricingCard title="E-commerce Store" price="500-1000" features={["Small Store (1-20 products)", "Medium (20-100 products)", "Large Enterprise (100+ products)"]} />
        <PricingCard title="Website Redesign" price="200-500" features={["Minor Updates & UI Fixes", "Full Redesign ($500-$2k)", "Complete Overhaul ($2k-$4k+)"]} />
      </div>

      <SectionHeader title="Performance & Care" subtitle="Keep your site fast, secure, and always online." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
        <PricingCard title="Website Maintenance" price="50-100" subtitle="/Monthly" features={["Basic Package: Updates & Backups", "Standard: Security + Edits ($100-$200)", "Premium: Priority Support ($200-$400)"]} />
        <PricingCard title="Speed Optimization" price="100-200" highlight={true} features={["Basic: Quick Wins & Caching", "Advanced: Core Web Vitals ($200-$400)", "Full Performance Audit ($400-$700)"]} />
        <PricingCard title="Security Hardening" price="150-300" features={["SSL & Firewall Setup", "Malware Scanning & Removal", "Security Audit & Best Practices"]} />
      </div>

      <SectionHeader title="Branding & Identity" subtitle="We define the visual essence and soul of your brand." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
        <PricingCard title="Logo Design" price="100-200" features={["Basic concepts (2-3)", "Professional Tier ($200-$500)", "Premium Unlimited ($500-$1k)"]} />
        <PricingCard title="Brand Identity" price="300-500" highlight={true} features={["Starter Kit (Colors/Fonts)", "Standard Kit (+Patterns)", "Complete Brand System ($1k-$2.5k)"]} />
        <PricingCard title="Brand Guidelines" price="200-400" features={["Basic (5-10pg)", "Standard (15-25pg)", "Comprehensive 30+pg ($800-$1.5k)"]} />
        <PricingCard title="Business Cards" price="50-80" features={["Single-sided design", "Double-sided premium", "Special Finishes available"]} />
        <PricingCard title="Stationery Set" price="150-300" features={["Letterhead & Envelope", "Full Stationery Package", "Corporate Bundle ($300-$600)"]} />
      </div>

      <SectionHeader title="Marketing & Digital" subtitle="Strategic assets to drive engagement and visual impact." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
        <PricingCard title="Flyers & Brochures" price="50-100" features={["Single-page flyers", "Bi-fold & Tri-fold options", "Multi-page booklets"]} />
        <PricingCard title="Social Media Graphics" price="150-300" highlight={true} features={["Pack of 10-30 posts", "Monthly Management available", "Single post options from $20"]} />
        <PricingCard title="SEO Optimization" price="150-300" features={["Basic on-page SEO setup", "Full SEO strategy ($300-$600)", "Monthly SEO Package ($200-$500/mo)"]} />
        <PricingCard title="Infographics" price="100-200" features={["Simple data visual", "Complex Detailed Tier", "Animated Infographics ($400-$800)"]} />
        <PricingCard title="E-book Design" price="150-300" features={["Simple (10-15 pages)", "Standard (20-30 pages) $300-$500", "Premium (40+ pages) $500-$1k"]} />
        <PricingCard title="Thumbnails" price="15-30" features={["Single high-quality thumbnail", "Pack of 5 ($60-$120)", "Pack of 10 ($100-$200)", "Monthly package ($150-$400)"]} />
      </div>

      <SectionHeader title="App Development" subtitle="High-performance mobile experiences for iOS and Android." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
        <PricingCard title="App UI/UX Design" price="500-1000" features={["5-10 simple screens", "Medium (15-25 screens)", "Complex (30+ screens) Tier"]} />
        <PricingCard title="iOS/Android Build" price="2000-5000" highlight={true} features={["Simple native build", "Medium complexity ($5k-$15k)", "Enterprise Feature-rich ($15k+)"]} />
        <PricingCard title="Cross-Platform" price="3000-7000" features={["React Native / Flutter", "One codebase, dual OS", "Advanced Scaling available"]} />
        <PricingCard title="App Maintenance" price="200-500" subtitle="/Monthly" features={["Bug fixes & updates", "Feature updates package", "Priority technical support"]} />
        <PricingCard title="App Store Assets" price="50-150" features={["App Icon & Feature graphic", "Screenshot set (5)", "Full ASO Package ($250-$500)"]} />
      </div>

      <div className="mt-8 md:mt-12 bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
        <div className="flex-1 w-full">
          <h3 className="text-xl md:text-2xl font-black text-[#111318] mb-6 flex items-center gap-3">
             <span className="text-yellow-400 text-2xl md:text-3xl">💡</span> Quick Strategy Tips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="p-4 md:p-5 bg-blue-50 rounded-2xl">
              <span className="font-black text-[#111318] block mb-1 text-sm md:text-base">Pick Middle Tiers</span>
              <p className="text-[11px] md:text-xs text-gray-500 font-medium">Clients usually find the best balance of value and features in our mid-range offerings.</p>
            </div>
            <div className="p-4 md:p-5 bg-purple-50 rounded-2xl">
              <span className="font-black text-[#111318] block mb-1 text-sm md:text-base">Leverage Bundles</span>
              <p className="text-[11px] md:text-xs text-gray-500 font-medium">Bundles offer up to 25% savings compared to ordering services individually.</p>
            </div>
            <div className="p-4 md:p-5 bg-green-50 rounded-2xl">
              <span className="font-black text-[#111318] block mb-1 text-sm md:text-base">Retainer Benefits</span>
              <p className="text-[11px] md:text-xs text-gray-500 font-medium">Long-term partnerships secure lower hourly rates and priority production scheduling.</p>
            </div>
            <div className="p-4 md:p-5 bg-pink-50 rounded-2xl">
              <span className="font-black text-[#111318] block mb-1 text-sm md:text-base">Urgent Delivery</span>
              <p className="text-[11px] md:text-xs text-gray-500 font-medium">Rush fees (+25-50%) ensure your project jumps to the front of our global queue.</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4 md:gap-6 text-center lg:text-left pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-100">
           <p className="text-gray-500 font-medium text-xs md:text-sm">Need a custom quote for a complex project? Our consultants are available 24/7 via WhatsApp.</p>
           <a 
              href="https://wa.me/212617863598"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 bg-[#111318] text-white font-black rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg text-sm md:text-base"
           >
             Chat with a Designer
           </a>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="px-4 md:px-6 py-12 md:py-24 bg-white flex justify-center overflow-hidden">
    <div className="max-w-7xl w-full">
      <div className="text-center mb-10 md:mb-16">
        <span className="text-blue-600 font-bold text-[10px] md:text-sm uppercase tracking-widest">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#111318] mt-2 md:mt-4 tracking-tight px-4">What Our Clients Say</h2>
        <p className="text-gray-500 text-sm md:text-lg mt-2 md:mt-4 max-w-2xl mx-auto px-6">We've helped hundreds of founders turn their ideas into world-class digital brands.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-gray-50 p-6 md:p-10 rounded-3xl md:rounded-[2rem] flex flex-col gap-6 md:gap-8 border border-transparent hover:border-blue-100 hover:bg-white transition-all shadow-sm hover:shadow-xl">
            <div className="flex-grow">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-100 mb-4 md:mb-6" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"></path></svg>
              <p className="text-[#111318] text-base md:text-lg font-medium italic leading-relaxed">"{t.quote}"</p>
            </div>
            <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-[#111318] font-bold text-sm md:text-base">{t.name}</span>
                <span className="text-gray-500 text-[11px] md:text-sm">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessPage = () => (
  <section className="px-4 md:px-6 py-12 md:py-24 bg-white min-h-[70vh] flex justify-center">
    <div className="max-w-5xl w-full">
      <div className="text-center mb-12 md:mb-20 flex flex-col gap-3 md:gap-4">
        <span className="text-blue-600 font-bold text-[10px] md:text-sm uppercase tracking-[0.3em]">Execution</span>
        <h1 className="text-3xl md:text-6xl font-black text-[#111318] tracking-tight">Our Creative Journey</h1>
        <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto px-4">From initial concept to global launch, we follow a rigorous process to ensure your brand's success.</p>
      </div>
      
      <div className="relative space-y-16 md:space-y-0">
        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />
        
        {[
          { step: "01", title: "Discovery", desc: "Understanding your vision, market positioning, and business goals to build a strategic foundation.", color: "bg-blue-600" },
          { step: "02", title: "Strategy", desc: "Crafting the blueprint, user flows, and technical requirements for your digital presence.", color: "bg-purple-600" },
          { step: "03", title: "Design", desc: "High-fidelity visual design where your brand's unique identity comes to life.", color: "bg-pink-600" },
          { step: "04", title: "Develop", desc: "Building responsive, high-performance digital products with modern web technologies.", color: "bg-green-600" },
          { step: "05", title: "Refine", desc: "Rigorous testing and client collaboration to ensure every pixel and interaction is perfect.", color: "bg-yellow-500" },
          { step: "06", title: "Launch", desc: "Deployment and ongoing optimization to ensure your brand thrives in the digital landscape.", color: "bg-red-600" }
        ].map((item, idx) => (
          <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className={`sm:hidden absolute left-4 top-16 bottom-0 w-px bg-gray-100 -mb-16 last:hidden`} />
            <div className={`flex md:absolute left-0 md:left-1/2 md:-translate-x-1/2 size-12 md:size-16 rounded-xl md:rounded-2xl ${item.color} text-white font-black items-center justify-center shadow-lg z-10 text-lg md:text-xl transition-transform hover:scale-110`}>
              {item.step}
            </div>
            <div className={`w-full md:w-1/2 pl-0 md:pl-0 flex flex-col gap-2 md:gap-4 ${idx % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
              <h3 className="text-xl md:text-3xl font-bold text-[#111318]">{item.title}</h3>
              <p className="text-gray-500 text-[13px] md:text-base leading-relaxed">{item.desc}</p>
            </div>
            <div className="hidden md:block w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PrivacyPage = () => (
  <section className="px-5 md:px-6 py-12 md:py-24 bg-white flex justify-center">
    <div className="max-w-3xl w-full flex flex-col gap-6 md:gap-10">
      <h1 className="text-3xl md:text-6xl font-black text-[#111318] tracking-tight">Privacy Policy</h1>
      <div className="space-y-6 md:space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
        <p className="text-gray-400 font-medium">Effective Date: October 2026</p>
        <p>ACLLC ("we," "our," or "us") is committed to protecting your privacy. This policy explains how we collect and use data when you interact with our design services.</p>
        
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-[#111318]">1. Data Collection</h3>
          <p>We collect essential information required to deliver our services, including contact details and project briefs. We do not sell your personal data to third parties.</p>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-[#111318]">2. Secure Payment Processing</h3>
          <p>All financial transactions are handled exclusively through <strong>Stripe</strong>. ACLLC never sees or stores your full credit card details. Stripe is a PCI-compliant processor that ensures your billing information is encrypted and secure across all global payment gateways.</p>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-[#111318]">3. Cookies & Tracking</h3>
          <p>We use minimal cookies strictly for site functionality and to understand how visitors interact with our content to improve our user experience.</p>
        </div>
      </div>
    </div>
  </section>
);

const TermsPage = () => (
  <section className="px-5 md:px-6 py-12 md:py-24 bg-white flex justify-center">
    <div className="max-w-3xl w-full flex flex-col gap-6 md:gap-10">
      <h1 className="text-3xl md:text-6xl font-black text-[#111318] tracking-tight">Terms of Service</h1>
      <div className="space-y-6 md:space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
        <p className="text-gray-400 font-medium">Effective Date: October 2026</p>
        
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-[#111318]">1. Service Agreement</h3>
          <p>By engaging ACLLC for design services, you agree to the project scopes and timelines defined in your specific service quote.</p>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-[#111318]">2. Secure Payments</h3>
          <p>Payment is required as outlined in your project proposal. All transactions are secured by <strong>Stripe</strong> and integrated payment gateways. Refunds are handled on a case-by-case basis as detailed in individual project contracts.</p>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-[#111318]">3. Ownership & Usage</h3>
          <p>Upon final payment, full intellectual property rights for custom designs are transferred to the client. ACLLC retains the right to display project outcomes in our portfolio for promotional purposes unless otherwise agreed.</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <footer className="bg-white pt-12 md:pt-20 pb-10 md:pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20">
          <div className="flex flex-col items-center sm:items-start gap-5 md:gap-6 text-center sm:text-left">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setView('home')}
            >
              <Logo />
              <h2 className="text-lg md:text-xl font-black tracking-tight text-[#111318]">ACLLC</h2>
            </div>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[280px]">
              Expert creative studio delivering high-end design and scalable digital products for forward-thinking brands.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/achdouzcompanyllc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
              </a>
              <a 
                href="https://www.instagram.com/achdouzcompany/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-pink-600 hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-5 md:gap-6">
            <h3 className="text-[#111318] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">Studio</h3>
            <ul className="flex flex-col items-center sm:items-start gap-3 md:gap-4">
              <li><button onClick={() => setView('home')} className="text-gray-500 hover:text-blue-600 text-xs md:text-sm font-medium transition-colors">Services</button></li>
              <li><button onClick={() => setView('process')} className="text-gray-500 hover:text-blue-600 text-xs md:text-sm font-medium transition-colors">Our Process</button></li>
              <li><a href="https://wa.me/212617863598" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 text-xs md:text-sm font-medium transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-5 md:gap-6">
            <h3 className="text-[#111318] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">Legal</h3>
            <ul className="flex flex-col items-center sm:items-start gap-3 md:gap-4">
              <li><button onClick={() => setView('privacy')} className="text-gray-500 hover:text-blue-600 text-xs md:text-sm font-medium transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setView('terms')} className="text-gray-500 hover:text-blue-600 text-xs md:text-sm font-medium transition-colors">Terms of Service</button></li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-5 md:gap-6">
            <h3 className="text-[#111318] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">Secure</h3>
            <div className="flex flex-col items-center sm:items-start gap-2 md:gap-3">
              <p className="text-gray-500 text-xs md:text-sm max-w-[200px] sm:text-left text-center">Certified safe checkout with Stripe encryption.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 md:pt-10 border-t border-gray-100 flex flex-col items-center gap-2">
          <p className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-center">
            © 2026 ACLLC Creative Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    let title = "";
    let description = "";

    switch (view) {
      case 'home':
        title = "ACLLC | High-End UI/UX Design & Brand Strategy Studio";
        description = "ACLLC is a premium creative studio specializing in conversion-focused UI/UX design, professional logo branding, and scalable web applications. Elevate your brand today.";
        break;
      case 'process':
        title = "Our Creative Process | ACLLC Design Studio";
        description = "Discover the 6-step creative journey ACLLC follows to deliver world-class brand identities and digital products. From discovery to global launch.";
        break;
      case 'privacy':
        title = "Privacy Policy | ACLLC";
        description = "Read the ACLLC privacy policy to understand how we protect your data and ensure secure payment processing through Stripe.";
        break;
      case 'terms':
        title = "Terms of Service | ACLLC";
        description = "The terms and conditions for working with ACLLC. Learn about our service agreements, payment terms, and intellectual property rights.";
        break;
    }

    if (title) document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute('content', description);
  }, [view]);

  const handleViewChange = (newView: View) => {
    if (newView === view) return;
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const renderContent = () => {
    switch (view) {
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'process':
        return <ProcessPage />;
      default:
        return (
          <>
            <Hero setView={handleViewChange} />
            <Pricing />
            <Testimonials />
            
            <section className="px-5 md:px-6 py-12 md:py-20 bg-white flex justify-center border-y border-gray-50">
              <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                <div className="flex flex-col gap-4 md:gap-5 text-center px-4 md:px-6 group">
                  <div className="size-16 md:size-20 bg-blue-50 text-blue-600 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                    <svg width="28" height="28" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h3 className="font-black text-xl md:text-2xl text-[#111318]">High Precision</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[250px] mx-auto">Every pixel is mathematically aligned to ensure your brand feels premium and balanced.</p>
                </div>
                <div className="flex flex-col gap-4 md:gap-5 text-center px-4 md:px-6 group">
                  <div className="size-16 md:size-20 bg-purple-50 text-purple-600 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6 shadow-sm">
                    <svg width="28" height="28" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                  <h3 className="font-black text-xl md:text-2xl text-[#111318]">Rapid Delivery</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[250px] mx-auto">We don't believe in "creative blocks." Our structured process ensures deadlines are always met.</p>
                </div>
                <div className="flex flex-col gap-4 md:gap-5 text-center px-4 md:px-6 group">
                  <div className="size-16 md:size-20 bg-green-50 text-green-600 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-2 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shadow-sm">
                    <svg width="28" height="28" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                  </div>
                  <h3 className="font-black text-xl md:text-2xl text-[#111318]">AI Infused</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[250px] mx-auto">Blending human creativity with powerful AI tools to push the boundaries of what's possible.</p>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden font-inter selection:bg-blue-100 selection:text-blue-900">
      <Header setView={handleViewChange} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer setView={handleViewChange} />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
