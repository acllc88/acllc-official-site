
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  Search, 
  MessageCircle, 
  Shield, 
  Zap, 
  Cpu, 
  Instagram, 
  Facebook,
  Menu,
  X,
  Globe,
  Layout,
  Palette,
  Smartphone,
  BarChart3,
  FileText
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type View = 'home' | 'privacy' | 'terms' | 'process';

// --- Global Constants ---
const CONTACT_WHATSAPP = "212638426738";
const DEFAULT_CONTACT_MESSAGE = encodeURIComponent("Hello ACLLC, I'd like to discuss a potential project and get a consultation with a designer.");

// --- Data ---
const serviceCategories = [
  {
    category: "Website Development",
    subtitle: "Scalable, responsive, and conversion-optimized web platforms.",
    services: [
      { title: "Basic Web (3-5pg)", price: "300-500", features: ["Custom Starter Design", "Essential Mid-Range", "Premium Experience Options"] },
      { title: "Standard Web (6-10pg)", price: "500-800", highlight: true, features: ["Professional Mid-Range ($800-$1.5k)", "High-End Premium ($1.5k-$3k)", "SEO & Speed Ready"] },
      { title: "Advanced Web (10+pg)", price: "1000-1500", features: ["Enterprise Solutions", "Advanced Integrations", "Custom Logic & UI"] },
      { title: "Landing Pages", price: "100-200", features: ["Simple Conversions", "Animated Sale Pages ($200-$400)", "High-Converting Sales ($400-$800)"] },
      { title: "E-commerce Store", price: "500-1000", features: ["Small Store (1-20 products)", "Medium (20-100 products)", "Large Enterprise (100+ products)"] },
      { title: "Website Redesign", price: "200-500", features: ["Minor Updates & UI Fixes", "Full Redesign ($500-$2k)", "Complete Overhaul ($2k-$4k+)"] }
    ]
  },
  {
    category: "Performance & Care",
    subtitle: "Keep your site fast, secure, and always online.",
    services: [
      { title: "Website Maintenance", price: "50-100", customSubtitle: "/Monthly", features: ["Basic Package: Updates & Backups", "Standard: Security + Edits ($100-$200)", "Premium: Priority Support ($200-$400)"] },
      { title: "Speed Optimization", price: "100-200", highlight: true, features: ["Basic: Quick Wins & Caching", "Advanced: Core Web Vitals ($200-$400)", "Full Performance Audit ($400-$700)"] },
      { title: "Security Hardening", price: "150-300", features: ["SSL & Firewall Setup", "Malware Scanning & Removal", "Security Audit & Best Practices"] }
    ]
  },
  {
    category: "Branding & Identity",
    subtitle: "We define the visual essence and soul of your brand.",
    services: [
      { title: "Logo Design", price: "100-200", features: ["Basic concepts (2-3)", "Professional Tier ($200-$500)", "Premium Unlimited ($500-$1k)"] },
      { title: "Brand Identity", price: "300-500", highlight: true, features: ["Starter Kit (Colors/Fonts)", "Standard Kit (+Patterns)", "Complete Brand System ($1k-$2.5k)"] },
      { title: "Brand Guidelines", price: "200-400", features: ["Basic (5-10pg)", "Standard (15-25pg)", "Comprehensive 30+pg ($800-$1.5k)"] },
      { title: "Business Cards", price: "50-80", features: ["Single-sided design", "Double-sided premium", "Special Finishes available"] },
      { title: "Stationery Set", price: "150-300", features: ["Letterhead & Envelope", "Full Stationery Package", "Corporate Bundle ($300-$600)"] }
    ]
  },
  {
    category: "Marketing & Digital",
    subtitle: "Strategic assets to drive engagement and visual impact.",
    services: [
      { title: "Flyers & Brochures", price: "50-100", features: ["Single-page flyers", "Bi-fold & Tri-fold options", "Multi-page booklets"] },
      { title: "Social Media Graphics", price: "150-300", highlight: true, features: ["Pack of 10-30 posts", "Monthly Management available", "Single post options from $20"] },
      { title: "SEO Optimization", price: "150-300", features: ["Basic on-page SEO setup", "Full SEO strategy ($300-$600)", "Monthly SEO Package ($200-$500/mo)"] },
      { title: "Infographics", price: "100-200", features: ["Simple data visual", "Complex Detailed Tier", "Animated Infographics ($400-$800)"] },
      { title: "E-book Design", price: "150-300", features: ["Simple (10-15 pages)", "Standard (20-30 pages) $300-$500", "Premium (40+ pages) $500-$1k"] },
      { title: "Thumbnails", price: "15-30", features: ["Single high-quality thumbnail", "Pack of 5 ($60-$120)", "Pack of 10 ($100-$200)", "Monthly package ($150-$400)"] }
    ]
  },
  {
    category: "App Development",
    subtitle: "High-performance mobile experiences for iOS and Android.",
    services: [
      { title: "App UI/UX Design", price: "500-1000", features: ["5-10 simple screens", "Medium (15-25 screens)", "Complex (30+ screens) Tier"] },
      { title: "iOS/Android Build", price: "2000-5000", highlight: true, features: ["Simple native build", "Medium complexity ($5k-$15k)", "Enterprise Feature-rich ($15k+)"] },
      { title: "Cross-Platform", price: "3000-7000", features: ["React Native / Flutter", "One codebase, dual OS", "Advanced Scaling available"] },
      { title: "App Maintenance", price: "200-500", customSubtitle: "/Monthly", features: ["Bug fixes & updates", "Feature updates package", "Priority technical support"] },
      { title: "App Store Assets", price: "50-150", features: ["App Icon & Feature graphic", "Screenshot set (5)", "Full ASO Package ($250-$500)"] }
    ]
  }
];

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
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="relative flex items-center justify-center"
  >
    <img 
      src="https://i.postimg.cc/SnMm1Rz9/Web-Logo.png" 
      alt="ACLLC Logo" 
      className="h-8 md:h-10 w-auto object-contain"
    />
  </motion.div>
);

const Header = ({ setView }: { setView: (v: View) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-500",
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer group"
          onClick={() => {
            setView('home');
            setIsMobileMenuOpen(false);
          }}
        >
          <Logo />
          <h2 className={cn(
            "text-lg md:text-xl font-black tracking-tighter transition-colors",
            isScrolled ? "text-brand-black" : "text-brand-black"
          )}>
            ACLLC
          </h2>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => setView('process')}
            className="text-sm font-bold text-brand-black hover:text-brand-accent transition-colors relative group"
          >
            Our Process
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
          </button>
          <a 
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=${DEFAULT_CONTACT_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-brand-accent transition-all shadow-xl shadow-black/10 hover:shadow-brand-accent/20 active:scale-95"
          >
            Get Started
          </a>
        </nav>

        <button 
          className="md:hidden p-2 text-brand-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/5 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-8">
              <button 
                onClick={() => {
                  setView('process');
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-black text-brand-black hover:text-brand-accent transition-colors text-left"
              >
                Our Process
              </button>
              <a 
                href={`https://wa.me/${CONTACT_WHATSAPP}?text=${DEFAULT_CONTACT_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-black text-white px-6 py-5 rounded-2xl text-center font-black text-lg shadow-xl shadow-black/10"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ setView }: { setView: (v: View) => void }) => (
  <section className="relative w-full min-h-screen flex items-center justify-center bg-brand-white text-brand-black overflow-hidden pt-20">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[100px] animate-pulse delay-700" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8 border border-brand-accent/20"
        >
          <Zap size={14} className="fill-brand-accent" />
          Creative Excellence Redefined
        </motion.span>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-10 text-balance">
          Crafting <span className="text-brand-accent italic font-serif font-normal">Digital</span> Masterpieces
        </h1>
        
        <p className="text-brand-black/60 text-base md:text-2xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto text-balance">
          We transform ambitious ideas into high-performance digital experiences. From conversion-focused UI/UX to scalable enterprise platforms.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('process')}
            className="group h-16 px-10 bg-brand-black text-white font-bold rounded-full shadow-2xl shadow-black/20 transition-all flex items-center gap-3 text-lg"
          >
            Explore Our Process
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=${DEFAULT_CONTACT_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-10 bg-brand-accent text-white font-bold rounded-full shadow-xl shadow-brand-accent/20 transition-all flex items-center justify-center text-lg hover:bg-brand-black"
          >
            Book a Consultation
          </motion.a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 w-full max-w-4xl"
      >
        {[
          { label: "Projects Delivered", value: "250+" },
          { label: "Client Satisfaction", value: "99%" },
          { label: "Global Presence", value: "12+", sub: "Countries" },
          { label: "Design Awards", value: "15+" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center md:items-start gap-1">
            <span className="text-4xl md:text-5xl font-black text-brand-black tracking-tighter">{stat.value}</span>
            <span className="text-brand-black/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const PricingCard = ({ title, price, features, highlight = false, subtitle = "" }: any) => {
  const message = encodeURIComponent(`Hello ACLLC, I'm interested in the ${title} service. I'd like to get started!`);
  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${message}`;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={cn(
        "flex flex-col gap-8 rounded-[2.5rem] border p-8 md:p-10 transition-all duration-500",
        highlight 
          ? "border-brand-accent bg-brand-accent/[0.02] shadow-2xl shadow-brand-accent/10" 
          : "border-black/5 bg-white shadow-xl shadow-black/[0.02]"
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-brand-black text-lg md:text-xl font-black tracking-tight">{title}</h3>
          {highlight && (
            <span className="w-fit px-3 py-1 bg-brand-accent text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap">
              Best Value
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-brand-black text-3xl md:text-4xl font-black tracking-tighter">${price}</span>
          {subtitle && <span className="text-brand-black/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">{subtitle}</span>}
        </div>
      </div>
      
      <div className="flex flex-col gap-4 py-6 border-t border-black/5 flex-grow">
        {features.map((feature: string, i: number) => (
          <div key={i} className="text-sm font-medium leading-relaxed flex items-start gap-3 text-brand-black/70">
            <div className="text-brand-accent mt-1 shrink-0">
              <Check size={16} strokeWidth={3} />
            </div>
            {feature}
          </div>
        ))}
      </div>
      
      <motion.a 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-full py-5 rounded-2xl font-bold transition-all text-center text-sm flex items-center justify-center gap-2",
          highlight 
            ? "bg-brand-black text-white hover:bg-brand-accent" 
            : "bg-brand-black/5 text-brand-black hover:bg-brand-black hover:text-white"
        )}
      >
        Select {title}
        <ArrowRight size={16} />
      </motion.a>
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 md:mb-12 mt-16 md:mt-24">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-px flex-grow bg-black/5" />
      <span className="text-brand-accent font-black text-[10px] md:text-xs uppercase tracking-[0.3em] whitespace-nowrap">
        {title}
      </span>
      <div className="h-px flex-grow bg-black/5" />
    </div>
    {subtitle && <p className="text-brand-black/40 text-center text-sm md:text-lg font-medium max-w-2xl mx-auto text-balance px-4">{subtitle}</p>}
  </div>
);

const Pricing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return serviceCategories;
    
    const query = searchQuery.toLowerCase().trim();
    return serviceCategories.map(cat => ({
      ...cat,
      services: cat.services.filter(s => 
        s.title.toLowerCase().includes(query) || 
        s.features.some(f => f.toLowerCase().includes(query)) ||
        cat.category.toLowerCase().includes(query)
      )
    })).filter(cat => cat.services.length > 0);
  }, [searchQuery]);

  const totalResults = filteredData.reduce((acc, cat) => acc + cat.services.length, 0);

  return (
    <section id="pricing" className="px-6 py-24 md:py-32 bg-brand-white flex justify-center overflow-hidden">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12 md:mb-20 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-accent font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6"
          >
            Service Catalog
          </motion.span>
          <h2 className="text-brand-black text-3xl sm:text-4xl md:text-7xl font-black leading-none tracking-tighter mb-6 md:mb-8 text-balance">
            Premium Solutions for <span className="italic font-serif font-normal">Modern</span> Brands
          </h2>
          <p className="text-brand-black/50 text-base md:text-xl max-w-2xl text-balance px-4">
            Transparent pricing for world-class design and development. No hidden fees, just pure excellence.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-3xl mt-10 md:mt-16 px-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search services..."
                className="w-full h-16 md:h-20 pl-12 md:pl-16 pr-6 md:pr-8 bg-white border border-black/5 rounded-2xl md:rounded-[2rem] shadow-2xl shadow-black/[0.03] focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/20 transition-all text-base md:text-lg text-brand-black placeholder-brand-black/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-brand-black/20 group-focus-within:text-brand-accent transition-colors">
                <Search size={20} className="md:w-6 md:h-6" />
              </div>
            </div>
            {searchQuery && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-sm text-brand-black/40 font-bold uppercase tracking-widest"
              >
                Found {totalResults} {totalResults === 1 ? 'service' : 'services'} for "{searchQuery}"
              </motion.p>
            )}
          </div>
        </div>

        {/* Recommended Bundles */}
        {!searchQuery && (
          <div className="mb-32">
            <SectionHeader title="Curated Bundles" subtitle="Strategic packages designed for maximum impact and efficiency." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  tag: "Web Focus", 
                  title: "Starter Business", 
                  price: "599", 
                  color: "bg-brand-black", 
                  accent: "text-brand-accent",
                  features: ["5-page custom website", "Mobile responsive", "Basic SEO setup", "Contact form", "1 month support"]
                },
                { 
                  tag: "Brand Launch", 
                  title: "Business Starter", 
                  price: "499", 
                  color: "bg-white", 
                  accent: "text-brand-accent",
                  features: ["Logo design", "Business card", "Letterhead", "Social media kit (5 templates)"]
                },
                { 
                  tag: "Complete ID", 
                  title: "Brand Complete", 
                  price: "1,499", 
                  color: "bg-white", 
                  accent: "text-brand-accent",
                  popular: true,
                  features: ["Full brand identity", "Brand guidelines", "Stationery set", "15 Social media posts", "Email signature"]
                },
                { 
                  tag: "Mobile Suite", 
                  title: "App Launch", 
                  price: "3,999", 
                  color: "bg-brand-black", 
                  accent: "text-purple-500",
                  features: ["App UI/UX design", "App icon design", "App store graphics", "Promo social media posts"]
                }
              ].map((bundle, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className={cn(
                    "relative p-10 rounded-[3rem] flex flex-col border transition-all duration-500",
                    bundle.color === "bg-brand-black" ? "bg-brand-black text-white border-white/5" : "bg-white text-brand-black border-black/5 shadow-xl shadow-black/[0.02]",
                    bundle.popular && "ring-2 ring-brand-accent"
                  )}
                >
                  {bundle.popular && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-brand-accent text-white text-[8px] md:text-[10px] px-2 md:px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg shadow-brand-accent/20">
                      Popular
                    </div>
                  )}
                  <span className={cn("font-black text-[10px] uppercase tracking-[0.3em] mb-4", bundle.accent)}>{bundle.tag}</span>
                  <h4 className="text-2xl font-black mb-2 tracking-tight">{bundle.title}</h4>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black tracking-tighter">${bundle.price}</span>
                  </div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {bundle.features.map((item, j) => (
                      <li key={j} className={cn("text-xs font-semibold flex items-start gap-3", bundle.color === "bg-brand-black" ? "text-white/50" : "text-brand-black/50")}>
                        <div className={cn("w-1.5 h-1.5 rounded-full shrink-0 mt-1.5", bundle.accent.replace('text-', 'bg-'))} /> {item}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={`https://wa.me/${CONTACT_WHATSAPP}?text=I'm%20interested%20in%20the%20$${bundle.price}%20${bundle.title}%20Package`} 
                    className={cn(
                      "w-full py-4 text-center rounded-2xl font-bold text-sm transition-all",
                      bundle.color === "bg-brand-black" ? "bg-brand-accent text-white hover:bg-blue-600" : "bg-brand-black text-white hover:bg-brand-accent"
                    )}
                  >
                    Select Bundle
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Categories and Services */}
        <div className="space-y-32">
          {filteredData.length > 0 ? (
            filteredData.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <SectionHeader title={cat.category} subtitle={cat.subtitle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.services.map((service, sIdx) => (
                    <PricingCard 
                      key={sIdx} 
                      title={service.title} 
                      price={service.price} 
                      highlight={service.highlight} 
                      features={service.features} 
                      subtitle={service.customSubtitle}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-32 text-center">
              <div className="size-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={40} className="text-brand-black/20" />
              </div>
              <h3 className="text-3xl font-black text-brand-black mb-4">No services found</h3>
              <p className="text-brand-black/40 text-lg mb-10">Try adjusting your search terms or browse our full catalog.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-8 py-4 bg-brand-black text-white font-bold rounded-full hover:bg-brand-accent transition-all"
              >
                View All Services
              </button>
            </div>
          )}
        </div>

        {/* Strategy Tips */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 bg-brand-black rounded-[3.5rem] p-10 md:p-20 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center">
                  <Zap size={24} className="text-brand-accent fill-brand-accent" />
                </div>
                <h3 className="text-3xl font-black tracking-tight">Growth Strategies</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Strategic Tiers", desc: "Our mid-range offerings are engineered for the perfect balance of ROI and features." },
                  { title: "Bundle Advantage", desc: "Save up to 25% by combining services into a cohesive brand strategy." },
                  { title: "Priority Support", desc: "Retainer models ensure your brand stays ahead with dedicated production slots." },
                  { title: "Global Scale", desc: "Our infrastructure supports rapid deployment across all major global markets." }
                ].map((tip, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="font-black text-lg text-white">{tip.title}</span>
                    <p className="text-sm text-white/50 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                <p className="text-white/70 font-medium text-lg mb-8 leading-relaxed">
                  Need a custom solution for a complex enterprise project?
                </p>
                <a 
                  href={`https://wa.me/${CONTACT_WHATSAPP}?text=${DEFAULT_CONTACT_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-16 bg-brand-accent text-white font-bold rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl shadow-brand-accent/20 text-lg gap-3"
                >
                  Consult an Expert
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="px-6 py-24 md:py-32 bg-white flex justify-center overflow-hidden">
    <div className="max-w-7xl w-full">
      <div className="text-center mb-20">
        <span className="text-brand-accent font-black text-xs uppercase tracking-[0.4em] mb-6 block">Client Success</span>
        <h2 className="text-4xl md:text-7xl font-black text-brand-black tracking-tighter text-balance">
          Trusted by <span className="italic font-serif font-normal">Visionary</span> Founders
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-50/50 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col gap-8 md:gap-10 border border-black/[0.03] hover:bg-white hover:shadow-2xl hover:shadow-black/[0.05] transition-all duration-500 group"
          >
            <div className="flex-grow">
              <div className="flex gap-1 mb-6 md:mb-8">
                {[...Array(5)].map((_, i) => (
                  <Zap key={i} size={14} className="text-brand-accent fill-brand-accent md:w-4 md:h-4" />
                ))}
              </div>
              <p className="text-brand-black text-lg md:text-xl font-medium leading-relaxed italic">"{t.quote}"</p>
            </div>
            <div className="flex items-center gap-4 pt-6 md:pt-8 border-t border-black/5">
              <div className="size-10 md:size-12 rounded-full bg-brand-black/5 flex items-center justify-center font-black text-brand-black/20 text-sm md:text-base">
                {t.name.charAt(0)}
              </div>
              <div className="flex { name: t.name, role: t.role }">
                <span className="text-brand-black font-black text-sm md:text-base">{t.name}</span>
                <span className="text-brand-black/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">{t.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessPage = ({ handleViewChange }: { handleViewChange: (v: View) => void }) => (
  <section className="px-6 py-24 md:py-32 bg-white min-h-screen flex flex-col items-center">
    <div className="max-w-6xl w-full">
      <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-accent font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6"
        >
          Our Methodology
        </motion.span>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-brand-black tracking-tighter mb-6 md:mb-8">
          The <span className="italic font-serif font-normal">Creative</span> Journey
        </h1>
        <p className="text-brand-black/50 text-base md:text-2xl max-w-3xl text-balance px-4">
          A structured, 6-step process engineered to transform your vision into a market-leading digital presence.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-32">
        {[
          { step: "01", title: "Discovery", desc: "We dive deep into your vision, market positioning, and business goals to build a strategic foundation.", icon: <Search size={24} /> },
          { step: "02", title: "Strategy", desc: "Crafting the blueprint, user flows, and technical requirements for your digital presence.", icon: <BarChart3 size={24} /> },
          { step: "03", title: "Design", desc: "High-fidelity visual design where your brand's unique identity comes to life.", icon: <Palette size={24} /> },
          { step: "04", title: "Develop", desc: "Building responsive, high-performance digital products with modern web technologies.", icon: <Cpu size={24} /> },
          { step: "05", title: "Refine", desc: "Rigorous testing and client collaboration to ensure every pixel and interaction is perfect.", icon: <Shield size={24} /> },
          { step: "06", title: "Launch", desc: "Deployment and ongoing optimization to ensure your brand thrives in the digital landscape.", icon: <Globe size={24} /> }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-gray-50/50 border border-black/[0.03] hover:bg-white hover:shadow-2xl hover:shadow-black/[0.05] transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="size-14 md:size-16 rounded-2xl bg-brand-black text-white flex items-center justify-center shadow-xl shadow-black/10 group-hover:bg-brand-accent transition-colors">
                {item.icon}
              </div>
              <span className="text-3xl md:text-4xl font-black text-brand-black/5 tracking-tighter">{item.step}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-brand-black mb-3 md:mb-4 tracking-tight">{item.title}</h3>
            <p className="text-brand-black/50 text-sm md:text-base leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-brand-black rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 text-center text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-accent/20 to-transparent pointer-events-none" />
        <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 relative z-10">Ready to start your journey?</h2>
        <p className="text-white/50 text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 relative z-10 px-4">
          Join hundreds of successful brands and experience our expert process firsthand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center relative z-10">
           <a 
              href={`https://wa.me/${CONTACT_WHATSAPP}?text=${DEFAULT_CONTACT_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 bg-brand-accent text-white font-bold rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-2xl shadow-brand-accent/20 text-base md:text-lg"
           >
             Start Your Project
           </a>
           <button 
              onClick={() => handleViewChange('home')}
              className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 bg-white text-brand-black font-bold rounded-full border border-white/10 flex items-center justify-center hover:bg-gray-100 transition-all text-base md:text-lg"
           >
             Back to Home
           </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const PrivacyPage = () => (
  <section className="px-6 py-20 md:py-32 bg-white flex justify-center min-h-screen">
    <div className="max-w-3xl w-full flex flex-col gap-8 md:gap-12">
      <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-brand-black tracking-tighter">Privacy <span className="italic font-serif font-normal">Policy</span></h1>
      <div className="space-y-8 md:space-y-12 text-brand-black/70 leading-relaxed text-base md:text-lg">
        <p className="text-brand-accent font-black uppercase tracking-widest text-xs md:text-sm">Effective Date: October 2026</p>
        <p className="text-xl font-medium text-brand-black">ACLLC ("we," "our," or "us") is committed to protecting your privacy. This policy explains how we collect and use data when you interact with our design services.</p>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-brand-black tracking-tight">1. Data Collection</h3>
          <p>We collect essential information required to deliver our services, including contact details and project briefs. We do not sell your personal data to third parties.</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-brand-black tracking-tight">2. Secure Payment Processing</h3>
          <p>All financial transactions are handled exclusively through <strong>Stripe</strong>. ACLLC never sees or stores your full credit card details. Stripe is a PCI-compliant processor that ensures your billing information is encrypted and secure across all global payment gateways.</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-brand-black tracking-tight">3. Cookies & Tracking</h3>
          <p>We use minimal cookies strictly for site functionality and to understand how visitors interact with our content to improve our user experience.</p>
        </div>
      </div>
    </div>
  </section>
);

const TermsPage = () => (
  <section className="px-6 py-20 md:py-32 bg-white flex justify-center min-h-screen">
    <div className="max-w-3xl w-full flex flex-col gap-8 md:gap-12">
      <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-brand-black tracking-tighter">Terms of <span className="italic font-serif font-normal">Service</span></h1>
      <div className="space-y-8 md:space-y-12 text-brand-black/70 leading-relaxed text-base md:text-lg">
        <p className="text-brand-accent font-black uppercase tracking-widest text-xs md:text-sm">Effective Date: October 2026</p>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-brand-black tracking-tight">1. Service Agreement</h3>
          <p>By engaging ACLLC for design services, you agree to the project scopes and timelines defined in your specific service quote.</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-brand-black tracking-tight">2. Secure Payments</h3>
          <p>Payment is required as outlined in your project proposal. All transactions are secured by <strong>Stripe</strong> and integrated payment gateways. Refunds are handled on a case-by-case basis as detailed in individual project contracts.</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-brand-black tracking-tight">3. Ownership & Usage</h3>
          <p>Upon final payment, full intellectual property rights for custom designs are transferred to the client. ACLLC retains the right to display project outcomes in our portfolio for promotional purposes unless otherwise agreed.</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <footer className="bg-brand-white pt-16 md:pt-24 pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="flex flex-col gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left">
            <div 
              className="flex items-center gap-2 md:gap-3 cursor-pointer group"
              onClick={() => setView('home')}
            >
              <Logo />
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-brand-black">ACLLC</h2>
            </div>
            <p className="text-brand-black/40 text-sm leading-relaxed max-w-xs">
              A high-end creative studio delivering precision-engineered design and scalable digital products for the world's most ambitious brands.
            </p>
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.facebook.com/achdouzcompanyllc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-gray-50 text-brand-black flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <Facebook size={18} className="md:w-5 md:h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.instagram.com/achdouzcompany/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-gray-50 text-brand-black flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all shadow-sm"
              >
                <Instagram size={18} className="md:w-5 md:h-5" />
              </motion.a>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left">
            <h3 className="text-brand-black font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">Studio</h3>
            <ul className="flex flex-col gap-3 md:gap-4">
              <li><button onClick={() => setView('home')} className="text-brand-black/70 hover:text-brand-accent text-sm font-bold transition-colors">Services</button></li>
              <li><button onClick={() => setView('process')} className="text-brand-black/70 hover:text-brand-accent text-sm font-bold transition-colors">Our Process</button></li>
              <li><a href={`https://wa.me/${CONTACT_WHATSAPP}?text=${DEFAULT_CONTACT_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="text-brand-black/70 hover:text-brand-accent text-sm font-bold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left">
            <h3 className="text-brand-black font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">Legal</h3>
            <ul className="flex flex-col gap-3 md:gap-4">
              <li><button onClick={() => setView('privacy')} className="text-brand-black/70 hover:text-brand-accent text-sm font-bold transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setView('terms')} className="text-brand-black/70 hover:text-brand-accent text-sm font-bold transition-colors">Terms of Service</button></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left">
            <h3 className="text-brand-black font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">Trust</h3>
            <div className="flex flex-col gap-3 md:gap-4 items-center sm:items-start">
              <p className="text-brand-black/40 text-sm leading-relaxed">
                Certified safe checkout with Stripe encryption. Global standards for data protection and security.
              </p>
              <div className="flex items-center gap-2 text-brand-black/20">
                <Shield size={20} className="md:w-6 md:h-6" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Payments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-black/30 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 ACLLC Creative Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-brand-black/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Globe size={12} />
              Global Operations
            </span>
          </div>
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
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', "https://i.imgur.com/woGDayJ.png");
    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', "https://i.imgur.com/woGDayJ.png");
  }, [view]);

  const handleViewChange = (newView: View) => {
    if (newView === view) return;
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (view) {
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'process':
        return <ProcessPage handleViewChange={handleViewChange} />;
      default:
        return (
          <>
            <Hero setView={handleViewChange} />
            <Pricing />
            <Testimonials />
            
            <section className="px-6 py-32 bg-brand-black text-white flex justify-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
              <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                {[
                  { 
                    icon: <Layout size={32} />, 
                    title: "High Precision", 
                    desc: "Every pixel is mathematically aligned to ensure your brand feels premium and balanced.",
                    color: "text-brand-accent"
                  },
                  { 
                    icon: <Zap size={32} />, 
                    title: "Rapid Delivery", 
                    desc: "We don't believe in creative blocks. Our structured process ensures deadlines are always met.",
                    color: "text-purple-500"
                  },
                  { 
                    icon: <Cpu size={32} />, 
                    title: "AI Infused", 
                    desc: "Blending human creativity with powerful AI tools to push the boundaries of what's possible.",
                    color: "text-emerald-500"
                  }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-6 text-center md:text-left group"
                  >
                    <div className={cn("size-20 rounded-3xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500", feature.color)}>
                      {feature.icon}
                    </div>
                    <h3 className="font-black text-3xl tracking-tight">{feature.title}</h3>
                    <p className="text-white/40 text-base leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-brand-white overflow-x-hidden font-sans selection:bg-brand-accent selection:text-white">
      <Header setView={handleViewChange} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
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
