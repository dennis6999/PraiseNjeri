import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, ChevronDown, Gift, CheckCircle2, Loader2, Music, Ticket, Star, Smile } from 'lucide-react';

// ==========================================
// 🛠️ CONFIGURATION: EDIT YOUR DETAILS HERE
// ==========================================
const CONFIG = {
    girlfriendsName: "Babygirl", // Her name
    birthdayDate: "March 3rd",
    mpesaAmount: "5,000", // The amount you want to send

    // Text Content
    heroSubtitle: "To the girl who outshines the stars.",
    loveNoteHeading: "My Favorite Person",
    loveNoteBody: "Happy Birthday! I wanted to make something unique for you. Every day with you feels like a gift. You deserve the world, and while I can't quite give you that, I can promise to keep trying every single day. You are my greatest adventure.",

    // Photo URLs (You can replace these Unsplash links with links to your own photos. Imgur or Google Drive direct links work best!)
    image1: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=800", // Roses/Flowers
    image2: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800", // Sparklers/Celebration
    image3: "https://images.unsplash.com/photo-1514090458221-65bb69cf640c?q=80&w=800", // Coffee/Aesthetic Date

    // NEW: Music Section
    songTitle: "Get You",
    songArtist: "Daniel Caesar ft. Kali Uchis",

    // NEW: Playful Reasons
    reasonsTitle: "Why I'm obsessed with you",
    reasons: [
        { icon: Star, title: "Your Vibe", desc: "The perfect mix of chaotic, cute, and completely unhinged in the best way possible." },
        { icon: Smile, title: "Your Laugh", desc: "Literally the best sound in the world. Even when you're laughing at my expense." },
        { icon: Heart, title: "Hoodie Thief", desc: "You steal all my clothes, but honestly, you look way better in them anyway." },
        { icon: Sparkles, title: "Just You", desc: "Because there's nobody else I'd rather do absolutely nothing with." }
    ],

    // NEW: Birthday Vouchers
    vouchersTitle: "Birthday Perks",
    vouchersSubtitle: "Screenshot to redeem. No expiry date.",
    vouchers: [
        { title: "Movie Dictator", desc: "You pick the movie/show. I promise not to complain or fall asleep (no guarantees on the sleep part)." },
        { title: "Win One Argument", desc: "Play this card to instantly win any debate. Use it wisely." },
        { title: "Free Massage", desc: "Valid for one elite-tier back rub. Tip already included." }
    ]
};

// ==========================================
// ✨ ANIMATION HOOK (DO NOT EDIT)
// ==========================================
const useScrollReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
};

const Reveal = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// ==========================================
// 📱 MYSTERY SURPRISE MODAL (SMOKE & MIRRORS)
// ==========================================
const SurpriseModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('initial'); // states: initial, loading, success

    // Reset modal state whenever it opens
    useEffect(() => {
        if (isOpen) {
            setStep('initial');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAccept = () => {
        setStep('loading');
        // Gives you exactly 12 seconds to send the money manually from your M-Pesa app!
        setTimeout(() => setStep('success'), 12000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A0E14]/80 backdrop-blur-md transition-all">
            <div className="w-[300px] bg-[#2A1620] rounded-[20px] shadow-2xl overflow-hidden transform scale-100 animate-in fade-in zoom-in duration-300 border border-[#F2B8C6]/20">

                {step === 'initial' && (
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-[#F2B8C6]/10 flex items-center justify-center mb-6">
                            <Gift className="w-8 h-8 text-[#F2B8C6]" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-white mb-2">Mystery Treat</h3>
                        <p className="font-sans text-[13px] text-white/70 leading-relaxed mb-8">
                            You have one pending, highly classified birthday surprise waiting to be claimed.
                        </p>
                        <button
                            onClick={handleAccept}
                            className="w-full py-3.5 bg-[#F2B8C6] hover:bg-[#e8a3b3] text-[#1A0E14] font-semibold rounded-xl transition-colors text-[15px] shadow-[0_0_20px_rgba(242,184,198,0.3)] hover:shadow-[0_0_25px_rgba(242,184,198,0.5)]"
                        >
                            I Accept
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-4 text-[13px] text-white/40 hover:text-white/70 transition-colors"
                        >
                            Maybe later
                        </button>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="p-10 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-2 border-[#F2B8C6]/20 border-t-[#F2B8C6] animate-spin"></div>
                            <Heart className="w-6 h-6 text-[#F2B8C6] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-serif text-xl text-white mb-2">Transmitting...</h3>
                            <p className="font-sans text-[13px] text-white/60 leading-relaxed">
                                Pinging his phone for final approval.<br /><br />
                                <span className="text-[#F2B8C6]/80 italic">(Stare at him until he authenticates it 😉)</span>
                            </p>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-white mb-2">Approved!</h3>
                        <p className="font-sans text-[13px] text-white/70 leading-relaxed mb-8">
                            The surprise has been successfully delivered. Check your phone messages right now. ❤️
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-colors text-[15px]"
                        >
                            Close
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

// ==========================================
// 🎨 MAIN APP COMPONENT
// ==========================================
export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [showMpesaModal, setShowMpesaModal] = useState(false);

    // 1. WELCOME SCREEN (Curtain)
    if (!isOpen) {
        return (
            <div className="fixed inset-0 bg-[#1A0E14] flex flex-col items-center justify-center z-50 selection:bg-[#F2B8C6] selection:text-[#1A0E14]">
                <style dangerouslySetInnerHTML={{
                    __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400&display=swap');
            .font-serif { font-family: 'Cormorant Garamond', serif; }
            .font-sans { font-family: 'Montserrat', sans-serif; }
         `}} />
                <Heart className="w-8 h-8 text-[#F2B8C6] animate-pulse mb-8" />
                <p className="font-serif text-2xl md:text-3xl text-white/90 tracking-[0.2em] uppercase mb-12">
                    For {CONFIG.girlfriendsName}
                </p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-10 py-3 rounded-full border border-[#F2B8C6]/40 text-[#F2B8C6] hover:bg-[#F2B8C6] hover:text-[#1A0E14] transition-all duration-700 tracking-[0.2em] text-sm uppercase"
                >
                    Tap to Unlock
                </button>
            </div>
        );
    }

    // 2. MAIN WEBSITE
    return (
        <div className="bg-[#1A0E14] min-h-screen text-white font-sans selection:bg-[#F2B8C6] selection:text-[#1A0E14] overflow-x-hidden">

            {/* Global Styles & Noise Texture Overlay for premium aesthetic */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        html { scroll-behavior: smooth; }
        .noise-bg {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 1; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}} />
            <div className="noise-bg"></div>

            {/* FAKE SURPRISE MODAL */}
            <SurpriseModal isOpen={showMpesaModal} onClose={() => setShowMpesaModal(false)} />

            {/* HERO SECTION */}
            <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 overflow-hidden relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#F2B8C6]/10 rounded-full blur-[100px] pointer-events-none"></div>

                <Reveal>
                    <div className="text-center px-4 relative z-10">
                        <p className="font-sans text-[#F2B8C6] tracking-[0.4em] text-xs md:text-sm uppercase mb-8 animate-pulse">
                            {CONFIG.birthdayDate}
                        </p>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-[1.1]">
                            Happy <br />
                            <span className="italic text-white/90">Birthday,</span><br />
                            {CONFIG.girlfriendsName}.
                        </h1>
                        <p className="font-sans text-base md:text-lg text-white/60 max-w-lg mx-auto font-light tracking-wide mt-8">
                            {CONFIG.heroSubtitle}
                        </p>
                    </div>
                </Reveal>

                {/* NEW: MUSIC PLAYER WIDGET */}
                <Reveal delay={400}>
                    <div className="mt-16 flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md relative z-10 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F2B8C6] to-pink-200 animate-[spin_4s_linear_infinite] flex items-center justify-center shadow-[0_0_15px_rgba(242,184,198,0.3)]">
                            <div className="w-3 h-3 bg-[#1A0E14] rounded-full"></div>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-sans flex items-center gap-1.5 mb-0.5">
                                <Music className="w-3 h-3 text-[#F2B8C6]" /> Now Playing
                            </p>
                            <p className="text-sm font-semibold text-white tracking-wide">{CONFIG.songTitle} <span className="font-light text-white/50"> - {CONFIG.songArtist}</span></p>
                        </div>
                    </div>
                </Reveal>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-5 h-5 text-white/30" />
                </div>
            </div>

            {/* MOODBOARD / GALLERY SECTION */}
            <div className="py-24 px-6 max-w-5xl mx-auto relative z-10">
                <Reveal>
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-3xl md:text-5xl text-white italic">A few of my favorite views</h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 items-center">
                    <Reveal delay={100}>
                        <div className="transform md:translate-y-12 transition-transform duration-1000 hover:-translate-y-2">
                            <div className="p-2 md:p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl">
                                <img src={CONFIG.image1} alt="Memory 1" className="w-full aspect-[4/5] object-cover rounded-xl" />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={300}>
                        <div className="transform md:-translate-y-8 transition-transform duration-1000 hover:-translate-y-12">
                            <div className="p-2 md:p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl relative">
                                <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-[#F2B8C6] rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-10">
                                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#1A0E14]" />
                                </div>
                                <img src={CONFIG.image2} alt="Memory 2" className="w-full aspect-[3/4] object-cover rounded-xl" />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={500}>
                        <div className="transform md:translate-y-20 transition-transform duration-1000 hover:translate-y-10">
                            <div className="p-2 md:p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl">
                                <img src={CONFIG.image3} alt="Memory 3" className="w-full aspect-[4/5] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* PLAYFUL REASONS SECTION */}
            <div className="py-24 px-6 max-w-5xl mx-auto relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-5xl text-white italic">{CONFIG.reasonsTitle}</h2>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CONFIG.reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <Reveal key={index} delay={index * 150}>
                                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group h-full">
                                    <Icon className="w-8 h-8 text-[#F2B8C6] mb-5 opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110 duration-300" />
                                    <h3 className="font-serif text-2xl text-white mb-3">{reason.title}</h3>
                                    <p className="font-sans text-white/60 font-light leading-relaxed text-sm">{reason.desc}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>

            {/* BIRTHDAY VOUCHERS SECTION */}
            <div className="py-24 px-6 max-w-5xl mx-auto relative z-10">
                <Reveal>
                    <div className="text-center mb-14">
                        <Ticket className="w-8 h-8 text-[#F2B8C6] mx-auto mb-4" />
                        <h2 className="font-serif text-3xl md:text-5xl text-white italic">{CONFIG.vouchersTitle}</h2>
                        <p className="font-sans text-[#F2B8C6]/70 text-xs tracking-[0.2em] mt-4 uppercase">{CONFIG.vouchersSubtitle}</p>
                    </div>
                </Reveal>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    {CONFIG.vouchers.map((voucher, index) => (
                        <Reveal key={index} delay={index * 200}>
                            <div className="relative overflow-hidden border-2 border-dashed border-[#F2B8C6]/30 rounded-xl p-8 w-full md:w-[300px] bg-gradient-to-b from-[#F2B8C6]/5 to-transparent hover:border-[#F2B8C6]/80 hover:-translate-y-2 transition-all duration-500 group cursor-pointer h-full flex flex-col justify-center">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#F2B8C6]/10 rounded-bl-full -z-10 group-hover:scale-[2] transition-transform duration-700 ease-out"></div>
                                <h3 className="font-serif text-2xl text-[#F2B8C6] mb-3 group-hover:scale-105 origin-left transition-transform duration-300">{voucher.title}</h3>
                                <p className="font-sans text-white/70 font-light text-sm leading-relaxed">{voucher.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* MESSAGE SECTION */}
            <div className="py-32 px-6 max-w-2xl mx-auto text-center relative z-10 mt-10 md:mt-20">
                <Reveal>
                    <div className="inline-block p-1 bg-gradient-to-r from-transparent via-[#F2B8C6]/30 to-transparent mb-10 w-32 h-px"></div>
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-10 italic">{CONFIG.loveNoteHeading}</h2>
                    <p className="font-sans text-base md:text-xl text-white/70 leading-loose font-light">
                        {CONFIG.loveNoteBody}
                    </p>
                    <div className="inline-block p-1 bg-gradient-to-r from-transparent via-[#F2B8C6]/30 to-transparent mt-10 w-32 h-px"></div>
                </Reveal>
            </div>

            {/* THE SURPRISE BUTTON SECTION */}
            <div className="py-32 px-6 flex flex-col items-center text-center relative z-10 bg-gradient-to-t from-[#F2B8C6]/5 to-transparent">
                <Reveal>
                    <Gift className="w-8 h-8 md:w-10 md:h-10 text-[#F2B8C6] mx-auto mb-6" />
                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">One Last Thing...</h2>
                    <p className="text-white/60 font-sans max-w-md mx-auto mb-12 leading-relaxed text-sm md:text-base">
                        I couldn't fit your main present onto this page, but I hid a little button down here for you.
                    </p>
                    <button
                        onClick={() => setShowMpesaModal(true)}
                        className="relative group overflow-hidden px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-[#F2B8C6]/50 transition-all duration-500 shadow-2xl hover:shadow-[#F2B8C6]/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F2B8C6]/0 via-[#F2B8C6]/10 to-[#F2B8C6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                        <span className="relative text-white/90 tracking-[0.2em] text-xs md:text-sm uppercase group-hover:text-[#F2B8C6] transition-colors">
                            Claim Birthday Treat
                        </span>
                    </button>
                </Reveal>
            </div>

            {/* FOOTER */}
            <div className="pb-10 pt-4 text-center text-white/20 font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase relative z-10">
                <Reveal>
                    <p>Made with ❤️ for {CONFIG.girlfriendsName}</p>
                </Reveal>
            </div>

        </div>
    );
}