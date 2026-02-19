
import React, { useState, useEffect, useRef } from 'react'
import { 
  Heart, Lightbulb, Shield, Eye, Lock, MessageCircle, 
  ChevronDown, Check, MapPin, Phone, Star, Quote, 
  Calendar, User, BookOpen, Users, Brain, Activity, ArrowRight, Menu, X
} from 'lucide-react'

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
 * ImagePlaceholder handles the loading of images and provides a fallback with a filename label.
 */
const ImagePlaceholder: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);
  
  return (
    <div className={`relative overflow-hidden bg-emerald-50/50 flex items-center justify-center border-2 border-dashed border-[#1a4a3a]/10 ${className}`}>
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
          onError={() => setError(true)} 
        />
      ) : null}
      
      {/* Label is always visible as a watermark if image loads, or central if it fails */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${error ? 'bg-emerald-50/80' : 'bg-transparent'}`}>
        <span className={`font-serif italic text-sm text-[#1a4a3a]/40 px-4 text-center ${error ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>
          {src}
        </span>
      </div>
    </div>
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
                <button onClick={() => setPage('contact')} className="px-8 py-4 bg-[#1a4a3a] text-white rounded-full font-semibold hover:bg-[#123328] transition-all shadow-xl shadow-[#1a4a3a]/10 active:scale-95">
                  Book a Free Call
                </button>
                <button onClick={() => setPage('about')} className="px-8 py-4 border-2 border-[#1a4a3a] text-[#1a4a3a] rounded-full font-semibold hover:bg-[#1a4a3a]/5 transition-all active:scale-95">
                  About Monique
                </button>
              </div>
            </div>
            <div className="animate-in slide-in-from-right duration-1000 delay-200 group">
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
        <button className="px-10 py-5 bg-[#1a4a3a] text-white rounded-full font-semibold shadow-xl shadow-[#1a4a3a]/10 hover:bg-[#123328] transition-all active:scale-95">Book a Free Call</button>
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
          <p className="text-lg text-[#1a4a3a]/70 leading-relaxed font-light">
            Together, we will tackle the complexities of your health, ensuring you receive the expert support and guidance you need. Let's take this transformative journey to wellness together!
          </p>
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
        <p className="text-emerald-300 text-xl font-light tracking-wide italic">— Let's find yours...</p>
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
                className="aspect-video rounded-[2.5rem] bg-white border border-emerald-50 shadow-sm" 
              />
            </div>
            <p className="text-lg font-semibold text-[#1a4a3a]">Health Coach Certification</p>
          </RevealOnScroll>
          <RevealOnScroll className="delay-300 group">
            <div className="mb-6">
              <ImagePlaceholder 
                src="credential-sacssp.png" 
                alt="Registered Social Worker" 
                className="aspect-video rounded-[2.5rem] bg-white border border-emerald-50 shadow-sm" 
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
      <RevealOnScroll className="space-y-6">
        <h2 className="text-3xl font-bold text-[#1a4a3a]">What does a health coach do?</h2>
        <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed">
          Health coaches are professionally trained to assist you to achieve your wellness goals. We are dedicated to helping you manage chronic conditions, lose weight, reduce stress, and enhance your sleep quality. Health coaches recognise the importance of connection and purpose to wellbeing, and bring this to the fore in the health coaching process. 
        </p>
        <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed">
          Health coaches believe that you have the answers to your health and wellness issues. We tap into your inner strengths and work together to dismantle any self-limiting beliefs and obstacles in your path. With our focused, future-oriented approach, you can expect remarkable results in just 12-15 sessions. Let's take this transformative journey toward optimal wellness together!
        </p>
      </RevealOnScroll>
    </section>

    <section className="py-24 px-6 md:px-12 bg-emerald-50/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <RevealOnScroll className="space-y-6 order-2 lg:order-1">
          <h2 className="text-3xl font-bold text-[#1a4a3a]">How do health coaches work?</h2>
          <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed">
            Health coaches are experts in creating feasible, sustainable, measurable, and exciting health goals based on the latest research and interventions. Accountability is a core component of health coaching, with coaches serving as partners to ensure progress towards goals. 
          </p>
          <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed">
            Health coaches work with a biopsychosocial approach, recognising the interconnectedness between our bodies, psyches, and social environments. Whether in-person or online, health coaching is now recognised as being highly effective and cost efficient in minimising health risks and optimising wellness. Most health coaches have hybrid practices with clients worldwide.
          </p>
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
          title: "Depression & Anxiety",
          img: "service-mental-health.jpg",
          text: "I am dedicated to providing support for individuals facing depression and anxiety through expert guidance. My individually tailored treatment plans are designed to enhance well-being while recognizing the critical connection between mental and physical health. I work in collaboration with medical practitioners, particularly psychiatrists and clinical psychologists, allowing for speedy referrals when needed."
        },
        {
          icon: Shield,
          title: "Substance Use",
          img: "service-recovery.jpg",
          text: "I provide comprehensive, evidence-based assistance for individuals facing substance use disorders and addiction. My approach is rooted in harm reduction, guiding clients on their personal journeys toward self-determined goals. I honor the rights of everyone who seeks my help, ensuring that all individuals are treated with dignity."
        },
        {
          icon: Heart,
          title: "Couples & Relationship Therapy",
          img: "service-couples.jpg",
          text: "I am here to help couples improve communication, resolve conflicts, and build amazing partnerships. My mission is to guide you through challenges quickly and effectively, with practical weekly actions designed just for you. Together, let's create healthier and happier relationships!"
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
          <p className="text-sm text-[#1a4a3a]/60 leading-relaxed font-light">{card.text}</p>
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
        <h1 className="text-5xl md:text-6xl font-bold text-[#1a4a3a] leading-tight">Finding Inspiration at Every Turn</h1>
        <h2 className="text-2xl font-serif italic text-emerald-800">With like-minded individuals!</h2>
        <p className="text-lg text-[#1a4a3a]/70 font-light leading-relaxed">
          Welcome to my wellness retreats, where we come together to elevate our well-being with purpose and intention. My expertly crafted programs seamlessly integrate self-care and enjoyment, guaranteeing a transformative experience for every participant. 
        </p>
        <a href="https://wa.me/27822137053" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#1a4a3a] text-white rounded-full font-bold hover:bg-[#123328] transition-all shadow-xl active:scale-95">
          <MessageCircle size={24} /> Reach Out on WhatsApp
        </a>
      </RevealOnScroll>
    </section>
  </div>
)

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: "Devina",
      location: "Durban, March 2024",
      text: "I am thrilled to recommend Prof. Monique Marks as a truly exceptional therapist. After trying several other therapists without feeling a connection, I was blown away by Monique's expertise, warmth, and compassion from our very first session."
    },
    {
      name: "Haneem",
      location: "Durban, July 2024",
      text: "Monique was almost instantly able to put a word to describe the state that I was in and from our very first session I started to feel a change. We've worked on small incremental changes that work for me."
    },
    {
      name: "Melanie van Wyk",
      location: "July 2025",
      text: "Professor Marks has made an exceptional contribution to my health and my life. She helped me to identify and find the building blocks to my life whilst I felt lost in chaos."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-32">
      <section className="py-20 px-6 md:px-12 text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1a4a3a]">What My Clients Say</h1>
        </RevealOnScroll>
      </section>
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <RevealOnScroll key={i} className="bg-white p-10 rounded-[2.5rem] border border-emerald-50 shadow-sm hover:shadow-xl transition-all duration-500">
            <Quote className="text-emerald-500 mb-6 opacity-20" size={48} />
            <p className="text-[#1a4a3a]/70 text-lg leading-relaxed font-light italic mb-8">"{t.text}"</p>
            <div className="flex flex-col">
              <span className="font-bold text-[#1a4a3a] text-xl">{t.name}</span>
              <span className="text-[#1a4a3a]/40 text-sm">{t.location}</span>
            </div>
          </RevealOnScroll>
        ))}
      </section>
    </div>
  )
}

const PackagesPage = () => {
  const FeatureItem: React.FC<{ text: string; dark?: boolean }> = ({ text, dark = false }) => (
    <li className="flex items-start gap-3 text-sm leading-relaxed">
      <Check size={18} className={dark ? 'text-emerald-300 shrink-0' : 'text-emerald-600 shrink-0'} />
      <span className={dark ? 'text-emerald-50/80' : 'text-[#1a4a3a]/70'}>{text}</span>
    </li>
  );

  return (
    <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-32">
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#1a4a3a] text-[10px] font-bold tracking-[0.4em] uppercase mb-6 block">WORK WITH ME</span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1a4a3a] mb-6">Choose Your Wellness Journey</h1>
        </div>
      </section>
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[
          {
            label: "REBOOT",
            title: "One Month Reboot",
            features: ["90-minute initial session", "3 weekly sessions", "Daily WhatsApp check-in", "Clean eating plan"]
          },
          {
            label: "MOST POPULAR",
            title: "Elite Package",
            dark: true,
            features: ["90-minute weekly sessions", "15-minute laser calls", "Daily check-ins", "Family support sessions"]
          },
          {
            label: "PREMIUM",
            title: "Six Month Premium",
            features: ["Weekly 60-min sessions", "Daily WhatsApp check-in", "Extra sessions as needed", "Chronic illness support"]
          }
        ].map((pkg, i) => (
          <RevealOnScroll key={i} className="flex h-full">
            <div className={`${pkg.dark ? 'bg-[#1a4a3a] text-white border-4 border-emerald-700/20 scale-105 shadow-2xl z-10' : 'bg-white border border-emerald-100 shadow-sm'} p-10 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 flex flex-col w-full h-full`}>
              <span className={`${pkg.dark ? 'bg-emerald-400 text-[#1a4a3a] px-3 py-1 rounded-full' : 'text-[#1a4a3a]'} text-[10px] font-bold tracking-[0.3em] uppercase mb-4 w-fit`}>{pkg.label}</span>
              <h3 className="text-3xl font-bold mb-6">{pkg.title}</h3>
              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((f, idx) => <FeatureItem key={idx} text={f} dark={pkg.dark} />)}
              </ul>
              <button className={`w-full py-4 rounded-full font-bold transition-all ${pkg.dark ? 'bg-white text-[#1a4a3a]' : 'border-2 border-[#1a4a3a] text-[#1a4a3a]'}`}>Book Now</button>
            </div>
          </RevealOnScroll>
        ))}
      </section>
    </div>
  )
}

const ContactPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
      <RevealOnScroll className="space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1a4a3a]">Let's Start Your Journey</h1>
        <p className="text-lg text-[#1a4a3a]/70 font-light">Whether you have questions or are ready to book, I'd love to hear from you. Online and in-person sessions available.</p>
        <a href="https://wa.me/27822137053" className="inline-flex items-center gap-3 px-10 py-5 bg-[#1a4a3a] text-white rounded-full font-bold hover:bg-[#123328] shadow-xl transition-all active:scale-95 group">
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" /> Chat on WhatsApp
        </a>
      </RevealOnScroll>
      <RevealOnScroll className="delay-200">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-emerald-50">
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#1a4a3a]" />
            <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#1a4a3a]" />
            <textarea rows={4} placeholder="Your health goals..." className="w-full px-5 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#1a4a3a] resize-none"></textarea>
            <button className="w-full py-5 bg-[#1a4a3a] text-white rounded-full font-bold">Send Message</button>
          </form>
        </div>
      </RevealOnScroll>
    </div>
  </div>
)

const BlogPage = () => (
  <div className="animate-in fade-in duration-700 bg-[#fdfcf8] pt-40 px-6 md:px-12 max-w-7xl mx-auto pb-24">
    <div className="text-center mb-16"><h1 className="text-5xl font-bold text-[#1a4a3a]">Health & Wellness Insights</h1></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <RevealOnScroll key={i} className="group">
          <ImagePlaceholder 
            src={`blog-post-${i}.jpg`} 
            alt="Blog Post" 
            className="aspect-[4/3] rounded-3xl mb-6 shadow-sm group-hover:shadow-lg transition-all" 
          />
          <h3 className="text-2xl font-bold text-[#1a4a3a] mb-4">Coming Soon</h3>
          <div className="flex items-center gap-2 text-sm font-bold text-[#1a4a3a]">Read More <ArrowRight size={16} /></div>
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
    { id: 'psychosocial', label: 'Psychosocial Services' },
    { id: 'packages', label: 'Packages' },
    { id: 'retreats', label: 'Retreats' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="min-h-screen text-[#1a4a3a]">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 ${scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-emerald-50 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo - Far Left */}
          <div className="flex-shrink-0 lg:w-[250px]">
            <button onClick={() => setPage('home')} className="text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap">
              Your Health Prof
            </button>
          </div>

          {/* Nav Links - Centered */}
          <div className="hidden xl:flex flex-1 justify-center items-center space-x-10">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setPage(item.id)} 
                className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all relative whitespace-nowrap ${page === item.id ? 'text-[#1a4a3a]' : 'text-[#1a4a3a]/40 hover:text-[#1a4a3a]'}`}
              >
                {item.label}
                {page === item.id && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#1a4a3a] rounded-full animate-in zoom-in duration-300"></span>
                )}
              </button>
            ))}
          </div>

          {/* Action Button - Far Right */}
          <div className="hidden xl:flex items-center justify-end lg:w-[250px]">
            <button 
              onClick={() => setPage('contact')} 
              className="px-7 py-3 bg-[#1a4a3a] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#123328] transition-all shadow-lg active:scale-95"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="xl:hidden text-[#1a4a3a] cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-emerald-50 p-6 flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setPage(item.id)} 
                className={`text-sm text-left font-bold p-4 rounded-xl transition-all ${page === item.id ? 'bg-emerald-50 text-[#1a4a3a]' : 'text-[#1a4a3a]/60'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setPage('contact')} 
              className="w-full py-5 bg-[#1a4a3a] text-white rounded-2xl text-sm font-bold shadow-lg"
            >
              Get Started
            </button>
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

      <footer className="py-20 border-t border-emerald-50 bg-[#fdfcf8] text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4">Your Health Prof</h3>
          <p className="text-sm text-[#1a4a3a]/40">Certified Health Coach & Registered Social Worker</p>
          <div className="h-px bg-emerald-50 w-24 mx-auto my-8" />
          <p className="text-xs text-[#1a4a3a]/30 uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Your Health Prof. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
