
import React, { useState, useEffect, useRef } from 'react'
import { 
  Heart, Lightbulb, Shield, Eye, Lock, MessageCircle, 
  ChevronDown, Check, MapPin, Phone, Star, Quote, 
  Calendar, User, BookOpen, Users, Brain, Activity, ArrowRight, Menu, X, Leaf
} from 'lucide-react'

// --- CONSTANTS ---
const WHATSAPP_URL = "https://wa.me/27822137053";

// --- REUSABLE COMPONENTS ---

/**
 * RevealOnScroll provides a fade-in-up animation when elements enter the viewport.
 */
const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = "", style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div 
      ref={domRef} 
      style={style}
      className={`${className} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </div>
  );
};

/**
 * ImagePlaceholder handles the loading of images.
 * It ONLY shows the filename label if the image fails to load.
 */
const ImagePlaceholder: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden bg-emerald-50/60 flex items-center justify-center border border-[#1a4a3a]/10 group ${className}`}>
      {!error && (
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)} 
        />
      )}
      
      {/* Fallback label: ONLY visible if error or not yet loaded */}
      {(error || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-50/90 p-4">
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#1a4a3a]/10 shadow-sm text-center">
             <span className="font-serif italic text-xs md:text-sm text-[#1a4a3a]">
              {error ? `Missing: ${src}` : `Loading ${src}...`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * CTA Button for WhatsApp
 */
const WhatsAppCTA: React.FC<{ label?: string; className?: string; icon?: boolean; variant?: 'primary' | 'secondary' | 'outline' }> = ({ 
  label = "Book a Free Call", 
  className = "", 
  icon = false,
  variant = 'primary'
}) => {
  const styles = {
    primary: "bg-[#1a4a3a] text-white hover:bg-[#123328] shadow-xl shadow-[#1a4a3a]/10",
    secondary: "bg-white text-[#1a4a3a] hover:bg-emerald-50 shadow-lg",
    outline: "border-2 border-[#1a4a3a] text-[#1a4a3a] hover:bg-[#1a4a3a]/5"
  };

  return (
    <a 
      href={WHATSAPP_URL} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all active:scale-95 whitespace-nowrap ${styles[variant]} ${className}`}
    >
      {icon && <MessageCircle size={18} />}
      {label}
    </a>
  );
};

// --- PAGE COMPONENTS ---

const HomePage = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#fdfcf8] px-6 md:px-12 pt-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#1a4a3a]/10 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-0 right-[-5%] w-[600px] h-[600px] bg-[#1a4a3a]/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-orange-100/30 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in slide-in-from-left duration-1000">
              <h1 className="text-5xl md:text-7xl font-bold text-[#1a4a3a] mb-6 leading-[1.1]">
                Your Journey to Optimal Wellness Starts Here
              </h1>
              <p className="text-lg md:text-xl text-[#1a4a3a]/70 mb-10 max-w-lg leading-relaxed font-light">
                Certified Health Coach & Registered Social Worker — guiding you to reclaim your health, your way, with professional support and deep empathy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <WhatsAppCTA label="Book a Free Call" icon />
                <button 
                  onClick={() => setPage('about')} 
                  className="px-8 py-4 border-2 border-[#1a4a3a] text-[#1a4a3a] rounded-full font-semibold hover:bg-[#1a4a3a]/5 transition-all active:scale-95"
                >
                  About Monique
                </button>
              </div>
            </div>
            <div className="animate-in slide-in-from-right duration-1000 delay-200">
              <ImagePlaceholder 
                src="monique-hero.jpg" 
                alt="Monique Hero" 
                className="aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[3rem] shadow-2xl shadow-[#1a4a3a]/5" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#fdfcf8]">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a4a3a]">My Coaching Values</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Heart, title: 'CONNECTION', desc: 'Fostering meaningful relationships and belonging for a happier, more fulfilling life.' },
              { icon: Lightbulb, title: 'INSPIRATION', desc: 'Staying curious and finding wonders in every stage of life, no matter the challenges.' },
              { icon: Shield, title: 'INTEGRITY', desc: 'Consistency and living by values to create a strong basis for trust and certainty.' },
              { icon: Eye, title: 'TRANSPARENCY', desc: 'Building trust through honesty and celebrating successes together to keep pushing higher.' },
              { icon: Lock, title: 'CONFIDENTIALITY', desc: 'Creating a secure space to share thoughts without fear of judgement or consequences.' }
            ].map((v, i) => (
              <RevealOnScroll key={i} className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="p-3 bg-emerald-50 rounded-full text-[#1a4a3a] w-fit mx-auto mb-4 group-hover:bg-[#1a4a3a] group-hover:text-white transition-colors duration-300">
                  <v.icon size={22} />
                </div>
                <h3 className="text-xs font-bold tracking-[0.2em] text-[#1a4a3a] mb-4 text-center">{v.title}</h3>
                <p className="text-sm text-[#1a4a3a]/60 font-light leading-relaxed text-center">{v.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const AboutPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-40">
    {/* SECTION 1: Intro Hero */}
    <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <RevealOnScroll className="animate-in slide-in-from-left duration-1000">
        <span className="text-[#1a4a3a] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">ABOUT ME</span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1a4a3a] mb-2">Hi, I'm Monique</h1>
        <h2 className="text-2xl font-serif italic text-emerald-800 mb-8">Your Health Prof.</h2>
        <p className="text-lg text-[#1a4a3a]/70 leading-relaxed mb-10 font-light">
          Welcome to my practice! As a certified health coach and registered social worker, I am dedicated to guiding you on your journey to optimal wellness. My unique blend of training allows me to support you in exploring the underlying reasons for feeling unwell or unfulfilled, while also providing encouragement and accountability. Whether in person or online, I am here to help you make meaningful changes and achieve your physical and mental health goals.
        </p>
        <WhatsAppCTA label="Book a Free Call" icon />
      </RevealOnScroll>
      <RevealOnScroll className="animate-in slide-in-from-right duration-1000 group">
        <ImagePlaceholder 
          src="monique-portrait.jpg" 
          alt="Monique Portrait" 
          className="aspect-[4/5] rounded-[3rem] shadow-xl" 
        />
      </RevealOnScroll>
    </section>

    {/* SECTION 2: My Story */}
    <section className="py-24 px-6 md:px-12 bg-white/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <RevealOnScroll className="order-2 lg:order-1 group">
          <ImagePlaceholder 
            src="monique-coaching-session.jpg" 
            alt="Monique Coaching Session" 
            className="aspect-video lg:aspect-square rounded-[3rem] shadow-lg" 
          />
        </RevealOnScroll>
        <RevealOnScroll className="order-1 lg:order-2">
          <h2 className="text-4xl font-bold text-[#1a4a3a] mb-8">My Story</h2>
          <p className="text-lg text-[#1a4a3a]/70 leading-relaxed font-light mb-6">
            I am a confident and observant coach who knows firsthand the challenges of living with a chronic illness. My personal journey has ignited my passion for empowering others to reclaim their health and thrive.
          </p>
          <p className="text-lg text-[#1a4a3a]/70 leading-relaxed font-light mb-8">
            Together, we will tackle the complexities of your health, ensuring you receive the expert support and guidance you need. Let's take this transformative journey to wellness together!
          </p>
          <WhatsAppCTA label="Let's Talk" icon />
        </RevealOnScroll>
      </div>
    </section>

    {/* SECTION 3: Quote Banner */}
    <section className="py-32 px-6 md:px-12 bg-[#1a4a3a] text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
      <RevealOnScroll className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-6">
          "Every problem has a solution"
        </h2>
        <p className="text-emerald-300 text-xl font-light tracking-wide italic mb-10">— Let's find yours...</p>
        <WhatsAppCTA label="Message Me" variant="secondary" icon />
      </RevealOnScroll>
    </section>

    {/* SECTION 4: Qualifications & Certifications */}
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <RevealOnScroll>
          <h2 className="text-4xl font-bold text-[#1a4a3a] mb-16">Qualifications & Certifications</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <RevealOnScroll className="delay-100 group">
            <div className="mb-6">
              <ImagePlaceholder 
                src="credential-hca.png" 
                alt="Health Coach Certification" 
                className="aspect-video rounded-[2.5rem] bg-white shadow-sm" 
              />
            </div>
            <p className="text-lg font-semibold text-[#1a4a3a]">Health Coach Certification</p>
          </RevealOnScroll>
          <RevealOnScroll className="delay-300 group">
            <div className="mb-6">
              <ImagePlaceholder 
                src="credential-sacssp.png" 
                alt="Registered Social Worker" 
                className="aspect-video rounded-[2.5rem] bg-white shadow-sm" 
              />
            </div>
            <p className="text-lg font-semibold text-[#1a4a3a]">Registered Social Worker</p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  </div>
)

const HealthCoachingPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-32">
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <RevealOnScroll className="space-y-6">
        <span className="text-[#1a4a3a] text-[10px] font-bold tracking-[0.4em] uppercase block">ABOUT</span>
        <h1 className="text-5xl font-bold text-[#1a4a3a]">Health Coaching</h1>
        <ImagePlaceholder 
          src="monique-coaching-intro.jpg" 
          alt="Health Coaching Intro" 
          className="aspect-[4/5] rounded-[3rem] shadow-xl" 
        />
      </RevealOnScroll>
      <RevealOnScroll className="space-y-8">
        <h2 className="text-3xl font-bold text-[#1a4a3a]">What does a health coach do?</h2>
        <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed">
          Health coaches are professionally trained to assist you to achieve your wellness goals. We are dedicated to helping you manage chronic conditions, lose weight, reduce stress, and enhance your sleep quality.
        </p>
        <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed mb-8">
          Health coaches tap into your inner strengths and work together to dismantle any self-limiting beliefs and obstacles in your path.
        </p>
        <WhatsAppCTA label="Enquire Now" icon />
      </RevealOnScroll>
    </section>

    <section className="py-24 px-6 md:px-12 bg-emerald-50/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <RevealOnScroll className="space-y-6 order-2 lg:order-1">
          <h2 className="text-3xl font-bold text-[#1a4a3a]">How do health coaches work?</h2>
          <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed mb-6">
            Accountability is a core component. Coaches serve as partners to ensure progress towards goals. We work with a biopsychosocial approach, recognizing the interconnectedness between mind and body.
          </p>
          <WhatsAppCTA label="Message for Details" variant="outline" icon />
        </RevealOnScroll>
        <RevealOnScroll className="order-1 lg:order-2 group">
          <ImagePlaceholder 
            src="monique-at-work.jpg" 
            alt="Monique at Work" 
            className="aspect-[4/5] bg-white rounded-[3rem] shadow-lg" 
          />
        </RevealOnScroll>
      </div>
    </section>
  </div>
)

const PsychosocialPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-32">
    <section className="py-20 px-6 md:px-12 text-center max-w-5xl mx-auto">
      <RevealOnScroll className="space-y-6">
        <span className="text-[#1a4a3a] text-[10px] font-bold tracking-[0.4em] uppercase block">SERVICES</span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1a4a3a]">Psychosocial Services</h1>
        <p className="text-xl text-[#1a4a3a]/60 font-light">Compassionate support and effective interventions.</p>
        <ImagePlaceholder 
          src="psychosocial-banner.jpg" 
          alt="Psychosocial Banner" 
          className="w-full aspect-[21/9] rounded-[2rem] mt-12 shadow-inner" 
        />
      </RevealOnScroll>
    </section>

    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          icon: Brain,
          title: "Mental Health",
          img: "service-mental-health.jpg",
          text: "Support for depression and anxiety through expert guidance and tailored treatment plans."
        },
        {
          icon: Shield,
          title: "Recovery Support",
          img: "service-recovery.jpg",
          text: "Assistance for substance use disorders rooted in harm reduction and dignity."
        },
        {
          icon: Heart,
          title: "Relationships",
          img: "service-couples.jpg",
          text: "Guidance for couples to improve communication and build stronger partnerships."
        }
      ].map((card, i) => (
        <RevealOnScroll key={i} className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group" style={{ transitionDelay: `${i * 150}ms` }}>
          <ImagePlaceholder 
            src={card.img} 
            alt={card.title} 
            className="w-full aspect-square rounded-2xl mb-8" 
          />
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-[#1a4a3a] mb-6"><card.icon size={24} /></div>
          <h3 className="text-2xl font-bold text-[#1a4a3a] mb-4">{card.title}</h3>
          <p className="text-sm text-[#1a4a3a]/60 leading-relaxed font-light mb-8">{card.text}</p>
          <WhatsAppCTA label="Enquire via WhatsApp" icon className="w-full mt-auto" />
        </RevealOnScroll>
      ))}
    </section>
  </div>
)

const RetreatsPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-32 min-h-screen">
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <RevealOnScroll className="animate-in slide-in-from-left duration-1000 group">
        <ImagePlaceholder 
          src="retreat-lifestyle.jpg" 
          alt="Retreat Lifestyle" 
          className="aspect-[4/5] rounded-[3rem] shadow-xl" 
        />
      </RevealOnScroll>
      <RevealOnScroll className="space-y-8">
        <span className="text-[#1a4a3a] text-[10px] font-bold tracking-[0.4em] uppercase block">RETREATS</span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1a4a3a] leading-tight">Inspiration at Every Turn</h1>
        <h2 className="text-2xl font-serif italic text-emerald-800">Transformative wellness retreats.</h2>
        <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed mb-6">
          Elevate your well-being with purpose and intention. My crafted programs guarantee a life-changing experience.
        </p>
        <WhatsAppCTA label="Join Next Retreat" icon />
      </RevealOnScroll>
    </section>
  </div>
)

const TestimonialsPage = () => {
  const testimonials = [
    { name: "Devina", text: "Truly exceptional therapist. Expert, warm, and professional." },
    { name: "Haneem", text: "Started to feel a change from the very first session. Truly grateful." },
    { name: "Melanie", text: "Exceptional contribution to my health. Safe environment without judgement." }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-32">
      <section className="py-20 px-6 md:px-12 text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1a4a3a] mb-12">Client Stories</h1>
          <WhatsAppCTA label="Message Monique" icon />
        </RevealOnScroll>
      </section>
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <RevealOnScroll key={i} className="bg-white p-10 rounded-[2.5rem] border border-emerald-50 shadow-sm">
            <Quote className="text-emerald-500 mb-6 opacity-20" size={48} />
            <p className="text-[#1a4a3a]/70 text-lg italic mb-8">"{t.text}"</p>
            <span className="font-bold text-[#1a4a3a] text-xl">— {t.name}</span>
          </RevealOnScroll>
        ))}
      </section>
    </div>
  )
}

const PackagesPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-32">
    <section className="py-20 px-6 md:px-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-[#1a4a3a] mb-6">Coaching Packages</h1>
      <WhatsAppCTA label="Ask for Pricing" variant="outline" icon />
    </section>
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {[
        { title: "REBOOT", desc: "One Month Reset" },
        { title: "ELITE", desc: "Premium Weekly Support", dark: true },
        { title: "PREMIUM", desc: "Six Month Journey" }
      ].map((pkg, i) => (
        <RevealOnScroll key={i} className="flex h-full">
          <div className={`${pkg.dark ? 'bg-[#1a4a3a] text-white scale-105' : 'bg-white'} p-10 rounded-[2.5rem] shadow-xl flex flex-col w-full h-full`}>
            <h3 className="text-3xl font-bold mb-4">{pkg.title}</h3>
            <p className="mb-10 opacity-70">{pkg.desc}</p>
            <WhatsAppCTA label="Select Package" variant={pkg.dark ? 'secondary' : 'primary'} className="mt-auto" icon />
          </div>
        </RevealOnScroll>
      ))}
    </section>
  </div>
)

const ContactPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
      <RevealOnScroll className="space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1a4a3a]">Get In Touch</h1>
        <p className="text-lg text-[#1a4a3a]/70">Ready to transform your health? Let's connect on WhatsApp for the fastest response.</p>
        <WhatsAppCTA label="Chat with Monique" icon />
      </RevealOnScroll>
      <RevealOnScroll className="delay-200">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-emerald-50">
          <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
          <WhatsAppCTA label="Connect on WhatsApp" className="w-full" icon />
        </div>
      </RevealOnScroll>
    </div>
  </div>
)

const BlogPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-40 px-6 md:px-12 max-w-7xl mx-auto pb-24">
    <h1 className="text-5xl font-bold text-[#1a4a3a] text-center mb-16">Insights</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <RevealOnScroll key={i}>
          <ImagePlaceholder src={`blog-post-${i}.jpg`} alt="Blog" className="aspect-video rounded-3xl mb-6 shadow-sm" />
          <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
          <WhatsAppCTA label="Get Updates" variant="outline" className="w-full" />
        </RevealOnScroll>
      ))}
    </div>
  </div>
)

// --- MAIN APP COMPONENT ---

export default function App() {
  const [page, setPage] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileMenuOpen(false)
  }, [page])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'health-coaching', label: 'Health Coaching' },
    { id: 'psychosocial', label: 'Psychosocial' },
    { id: 'packages', label: 'Packages' },
    { id: 'retreats', label: 'Retreats' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="min-h-screen text-[#1a4a3a] selection:bg-emerald-100">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-emerald-50 py-3 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo Area */}
          <button 
            onClick={() => setPage('home')} 
            className="flex items-center gap-2 group transition-all"
          >
            <div className="w-10 h-10 bg-[#1a4a3a] text-white rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
              <Leaf size={20} fill="currentColor" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1a4a3a] font-serif">
              Your Health Prof
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-8">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setPage(item.id)} 
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${page === item.id ? 'text-[#1a4a3a]' : 'text-[#1a4a3a]/40 hover:text-[#1a4a3a]'}`}
              >
                {item.label}
                {page === item.id && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#1a4a3a] rounded-full"></span>
                )}
              </button>
            ))}
            <WhatsAppCTA label="WhatsApp Me" className="px-5 py-2.5 text-[10px] uppercase tracking-widest" icon />
          </div>

          {/* Mobile Toggle */}
          <div className="xl:hidden text-[#1a4a3a]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-emerald-50 p-6 flex flex-col space-y-3 shadow-2xl animate-in slide-in-from-top duration-300">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setPage(item.id)} 
                className={`text-sm text-left font-bold p-4 rounded-xl ${page === item.id ? 'bg-emerald-50 text-[#1a4a3a]' : 'text-[#1a4a3a]/60'}`}
              >
                {item.label}
              </button>
            ))}
            <WhatsAppCTA label="Connect on WhatsApp" className="w-full mt-4" icon />
          </div>
        )}
      </nav>

      <main className="min-h-screen">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'about' && <AboutPage />}
        {page === 'health-coaching' && <HealthCoachingPage />}
        {page === 'psychosocial' && <PsychosocialPage />}
        {page === 'packages' && <PackagesPage />}
        {page === 'retreats' && <RetreatsPage />}
        {page === 'testimonials' && <TestimonialsPage />}
        {page === 'blog' && <BlogPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <footer className="py-20 bg-[#fdfcf8] border-t border-emerald-50 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 bg-[#1a4a3a] text-white rounded-2xl flex items-center justify-center mb-4">
              <Leaf size={24} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-bold font-serif">Your Health Prof</h3>
            <p className="text-sm opacity-40">Certified Health Coach & Social Worker</p>
          </div>
          <WhatsAppCTA label="Start Conversation" icon />
          <div className="mt-12 pt-8 border-t border-emerald-100 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-30 gap-4">
            <span>&copy; {new Date().getFullYear()} Your Health Prof</span>
            <span>Based in South Africa & Online Worldwide</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
