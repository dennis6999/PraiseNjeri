import React, { useState, useEffect, useCallback, useRef } from 'react';

// ==========================================
// 🎵 BACKGROUND AUDIO SYSTEM
// ==========================================
const YOUTUBE_VIDEO_ID = 'uQFVqltOXRg'; // Get You – Daniel Caesar ft. Kali Uchis

const BackgroundAudio = ({ playing, onToggle }) => {
    const [loaded, setLoaded] = useState(false);

    // src changes to start/stop: when playing=true we load with autoplay;
    // toggling is done by swapping the src (remount iframe).
    const src = playing
        ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&rel=0&modestbranding=1&enablejsapi=0`
        : null;

    return (
        <>
            {/* Hidden iframe – plays audio only, visually invisible */}
            {src && (
                <iframe
                    key={src}
                    src={src}
                    allow="autoplay; encrypted-media"
                    style={{ position: 'fixed', width: 1, height: 1, top: -10, left: -10, opacity: 0, pointerEvents: 'none', border: 'none' }}
                    title="background-audio"
                    onLoad={() => setLoaded(true)}
                />
            )}

            {/* Slim floating music bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-md border-b border-pink-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center shadow ${playing ? 'animate-[spin_4s_linear_infinite]' : ''
                        }`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="leading-tight">
                        <p className="font-body text-[9px] text-pink-300 uppercase tracking-widest">🎵 Now Playing</p>
                        <p className="font-body text-xs font-bold text-rose-500">
                            Get You <span className="font-normal text-pink-400">– Daniel Caesar</span>
                        </p>
                    </div>
                </div>
                <button
                    onClick={onToggle}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 text-rose-500 transition-all hover:scale-110 active:scale-95 text-base"
                    title={playing ? 'Pause' : 'Play'}
                >
                    {playing ? '⏸' : '▶'}
                </button>
            </div>
        </>
    );
};
import { Heart, Sparkles, Gift, CheckCircle2, Music, Ticket, Star, Smile, ChevronLeft, ChevronRight } from 'lucide-react';

// ==========================================
// 🛠️ CONFIGURATION
// ==========================================
const CONFIG = {
    girlfriendsName: "Babygirl",
    birthdayDate: "March 3rd",

    heroSubtitle: "To the girl who outshines every star 💫",
    loveNoteHeading: "My Favorite Person",
    loveNoteBody: "Happy Birthday! I wanted to make something special just for you. Every single day with you feels like a gift I didn't deserve. You make everything brighter, sillier, and sweeter. You deserve the whole world — and while I'm still working on that, I promise to keep showing up for you every day. 🌹",

    images: Array.from({ length: 11 }, (_, i) => `/images/img${i + 1}.jpeg`),

    songTitle: "Get You",
    songArtist: "Daniel Caesar ft. Kali Uchis",

    reasonsTitle: "Why I'm completely obsessed with you 🥺",
    reasons: [
        { icon: Star, title: "Your Vibe ✨", desc: "The perfect mix of chaotic, cute, and completely unhinged — in the absolute best way possible." },
        { icon: Smile, title: "Your Laugh 😂", desc: "Literally the best sound in the world. Even when you're laughing AT me." },
        { icon: Heart, title: "Hoodie Thief 🧥", desc: "You steal all my clothes, but honestly? You look way better in them anyway." },
        { icon: Sparkles, title: "Just You 🌸", desc: "Because there's nobody else I'd rather do absolutely nothing with." }
    ],

    vouchersTitle: "Birthday Perks 🎟️",
    vouchersSubtitle: "Screenshot to redeem. No expiry date ever.",
    vouchers: [
        { emoji: "🎬", title: "Movie Dictator", desc: "You pick the movie/show. I promise not to complain or fall asleep. (No guarantees on the sleep.)" },
        { emoji: "🏆", title: "Win One Argument", desc: "Play this card to instantly win any debate. Use it wisely, queen." },
        { emoji: "💆", title: "Free Massage", desc: "Valid for one elite-tier back rub. Tip already included." }
    ]
};

// ==========================================
// 💖 FLOATING HEARTS BACKGROUND
// ==========================================
const FloatingHearts = () => {
    const hearts = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${10 + Math.random() * 22}px`,
        delay: `${Math.random() * 8}s`,
        duration: `${6 + Math.random() * 8}s`,
        opacity: 0.08 + Math.random() * 0.18,
        emoji: Math.random() > 0.5 ? '❤️' : '💕',
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map(h => (
                <div
                    key={h.id}
                    className="absolute bottom-[-60px] animate-float-up select-none"
                    style={{
                        left: h.left,
                        fontSize: h.size,
                        opacity: h.opacity,
                        animationDelay: h.delay,
                        animationDuration: h.duration,
                    }}
                >
                    {h.emoji}
                </div>
            ))}
        </div>
    );
};

// ==========================================
// 🎉 CONFETTI BURST
// ==========================================
const ConfettiBurst = ({ active }) => {
    if (!active) return null;
    const pieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        color: ['#FF6BB5', '#FFD700', '#FF4081', '#B388FF', '#69F0AE', '#FF8A65'][i % 6],
        left: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 0.5}s`,
        size: `${6 + Math.random() * 8}px`,
        rotate: `${Math.random() * 360}deg`,
    }));
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map(p => (
                <div
                    key={p.id}
                    className="absolute top-[-10px] animate-confetti-fall rounded-sm"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        animationDelay: p.delay,
                        transform: `rotate(${p.rotate})`,
                    }}
                />
            ))}
        </div>
    );
};

// ==========================================
// 📱 SURPRISE MODAL
// ==========================================
const SurpriseModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('initial');
    useEffect(() => { if (isOpen) setStep('initial'); }, [isOpen]);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div className="w-[320px] bg-white rounded-[28px] shadow-2xl overflow-hidden border-4 border-pink-200">
                {step === 'initial' && (
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="text-5xl mb-4 animate-bounce">🎁</div>
                        <h3 className="font-display text-2xl font-bold text-rose-500 mb-2">Mystery Treat!</h3>
                        <p className="font-body text-sm text-rose-400 leading-relaxed mb-8">
                            You have a pending, highly classified birthday surprise waiting to be claimed 🤫
                        </p>
                        <button
                            onClick={() => { setStep('loading'); setTimeout(() => setStep('success'), 12000); }}
                            className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-200 text-[15px]"
                        >
                            I Accept! 💝
                        </button>
                        <button onClick={onClose} className="mt-4 text-xs text-rose-300 hover:text-rose-500 transition-colors">Maybe later</button>
                    </div>
                )}
                {step === 'loading' && (
                    <div className="p-10 flex flex-col items-center justify-center text-center space-y-5">
                        <div className="text-4xl animate-spin">💖</div>
                        <h3 className="font-display text-xl text-rose-500">Sending love...</h3>
                        <p className="font-body text-sm text-rose-400 leading-relaxed">
                            Pinging his phone for approval.<br /><br />
                            <span className="italic text-pink-400">(Just stare at him 👀 until he does it)</span>
                        </p>
                    </div>
                )}
                {step === 'success' && (
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="font-display text-2xl font-bold text-rose-500 mb-2">Approved! 🎉</h3>
                        <p className="font-body text-sm text-rose-400 leading-relaxed mb-8">
                            Check your phone messages right now. Love you! ❤️
                        </p>
                        <button onClick={onClose} className="w-full py-3.5 bg-rose-50 hover:bg-rose-100 rounded-2xl text-rose-500 font-bold transition-colors text-[15px]">
                            Close 💕
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ==========================================
// 📄 PAGES
// ==========================================

const PageHero = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-6xl md:text-7xl mb-4 animate-bounce-slow">🎂</div>

        <p className="font-body text-pink-400 tracking-[0.3em] text-xs md:text-sm uppercase mb-4 font-semibold">
            {CONFIG.birthdayDate}
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-rose-500 mb-4 leading-tight drop-shadow-sm">
            Happy Birthday,<br />
            <span className="text-pink-600 italic">{CONFIG.girlfriendsName}!</span>
        </h1>

        <p className="font-body text-base md:text-lg text-rose-400 max-w-sm mx-auto leading-relaxed mt-3">
            {CONFIG.heroSubtitle}
        </p>

        <div className="mt-10 flex items-center gap-3 bg-white border-2 border-pink-200 px-5 py-3 rounded-full shadow-lg shadow-pink-100">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 animate-[spin_4s_linear_infinite] flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
            <div className="text-left">
                <p className="text-[10px] text-pink-300 uppercase tracking-widest font-body flex items-center gap-1 mb-0.5">
                    <Music className="w-3 h-3" /> Now Playing
                </p>
                <p className="text-sm font-bold text-rose-500">{CONFIG.songTitle} <span className="font-normal text-pink-400">- {CONFIG.songArtist}</span></p>
            </div>
        </div>
    </div>
);

const PageGallery = () => (
    <div className="w-full h-full flex flex-col items-center justify-center pt-20 pb-6 px-12 md:px-16 overflow-hidden relative">
        <div className="text-4xl mb-2 mt-6">📸</div>
        <h2 className="font-display text-3xl md:text-5xl text-rose-500 mb-6 text-center z-20">
            A few of my favorite views
        </h2>

        {/* Playful, scattered grid layout for 11 images */}
        <div className="relative w-full max-w-4xl h-[60vh] flex flex-wrap justify-center gap-2 md:gap-4 overflow-y-auto pb-20 px-2 styling-scrollbar z-10">
            <style dangerouslySetInnerHTML={{
                __html: `
                .styling-scrollbar::-webkit-scrollbar { width: 6px; }
                .styling-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .styling-scrollbar::-webkit-scrollbar-thumb { background: #fca5a5; border-radius: 10px; }
            `}} />

            {CONFIG.images.map((src, i) => {
                // Randomize tilt and size slightly for that "polaroid scatter" look
                const rotate = i % 2 === 0 ? (i % 3 + 1) * -2 : (i % 3 + 1) * 2;
                const delay = i * 50;
                const isFeatured = i === 1 || i === 7; // make a couple of them larger

                return (
                    <div
                        key={i}
                        className={`group transition-all duration-500 hover:scale-110 hover:z-30 hover:-translate-y-2`}
                        style={{
                            animationDelay: `${delay}ms`,
                            animationDuration: '0.6s',
                            animationFillMode: 'both',
                            animationName: 'pop-in'
                        }}
                    >
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @keyframes pop-in {
                                0% { opacity: 0; transform: scale(0.8) translateY(20px); }
                                100% { opacity: 1; transform: scale(1) translateY(0); }
                            }
                        `}} />
                        <div
                            className={`p-2 bg-white rounded-xl border-[3px] border-pink-100 shadow-md group-hover:border-pink-300 group-hover:shadow-2xl transition-colors ${isFeatured ? 'w-[140px] md:w-[200px]' : 'w-[100px] md:w-[150px]'}`}
                            style={{ transform: `rotate(${rotate}deg)` }}
                        >
                            <img
                                src={src}
                                alt={`Memory ${i + 1}`}
                                className="w-full h-auto aspect-[3/4] object-cover rounded-lg saturate-75 group-hover:saturate-100 transition-all duration-300"
                                loading="lazy"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
        {/* Soft fade gradients for top/bottom of the scroll container */}
        <div className="absolute top-[80px] left-0 right-0 h-10 bg-gradient-to-b from-rose-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-50 via-rose-50 to-transparent z-20 pointer-events-none" />
    </div >
);

const PageReasons = () => (
    <div className="w-full h-full flex flex-col items-center justify-center pt-24 pb-6 px-12 md:px-20 overflow-hidden">
        <div className="text-4xl mb-2 flex-shrink-0">💘</div>
        <h2 className="font-display text-3xl md:text-5xl text-rose-500 mb-6 text-center flex-shrink-0">{CONFIG.reasonsTitle}</h2>
        <div className="w-full max-w-3xl overflow-y-auto styling-scrollbar pb-10 px-2 flex-1">
            <style dangerouslySetInnerHTML={{
                __html: `
                .styling-scrollbar::-webkit-scrollbar { width: 4px; }
                .styling-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .styling-scrollbar::-webkit-scrollbar-thumb { background: #fca5a5; border-radius: 10px; }
            `}} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {CONFIG.reasons.map((reason, index) => {
                    const Icon = reason.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white border-2 border-pink-200 p-5 rounded-3xl hover:border-pink-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 group cursor-default"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Icon className="w-6 h-6 text-rose-400 mb-3 group-hover:scale-125 group-hover:text-rose-600 transition-all duration-300" />
                            <h3 className="font-display text-xl text-rose-600 mb-1">{reason.title}</h3>
                            <p className="font-body text-rose-400 text-sm leading-relaxed">{reason.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

const PageVouchers = () => (
    <div className="w-full h-full flex flex-col items-center justify-center pt-20 pb-6 px-12 md:px-20 overflow-hidden">
        <div className="text-4xl mb-2 flex-shrink-0">🎀</div>
        <h2 className="font-display text-3xl md:text-5xl text-rose-500 mb-1 text-center flex-shrink-0">{CONFIG.vouchersTitle}</h2>
        <p className="font-body text-pink-400 text-xs tracking-[0.15em] uppercase mb-6 flex-shrink-0">{CONFIG.vouchersSubtitle}</p>
        <div className="w-full max-w-4xl overflow-y-auto styling-scrollbar pb-10 px-2 flex-1">
            <style dangerouslySetInnerHTML={{
                __html: `
                .styling-scrollbar::-webkit-scrollbar { width: 4px; }
                .styling-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .styling-scrollbar::-webkit-scrollbar-thumb { background: #fca5a5; border-radius: 10px; }
            `}} />
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                {CONFIG.vouchers.map((voucher, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden border-2 border-dashed border-pink-300 rounded-3xl p-6 flex-1 max-w-[320px] mx-auto md:mx-0 bg-gradient-to-b from-pink-50 to-rose-50 hover:border-rose-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-100 transition-all duration-400 group cursor-pointer"
                    >
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-200/40 rounded-full group-hover:scale-[2.5] transition-transform duration-700 ease-out" />
                        <div className="text-3xl mb-3">{voucher.emoji}</div>
                        <h3 className="font-display text-xl text-rose-500 mb-2 group-hover:text-rose-600">{voucher.title}</h3>
                        <p className="font-body text-rose-400 text-sm leading-relaxed">{voucher.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const PageMessage = () => (
    <div className="w-full h-full flex flex-col items-center justify-center pt-20 pb-6 px-12 md:px-20 text-center max-w-2xl mx-auto overflow-y-auto styling-scrollbar">
        <div className="text-5xl mb-6 animate-bounce-slow flex-shrink-0">💌</div>
        <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-8" />
        <h2 className="font-display text-3xl md:text-5xl text-rose-500 mb-8">{CONFIG.loveNoteHeading}</h2>
        <p className="font-body text-base md:text-lg text-rose-500/80 leading-loose">
            {CONFIG.loveNoteBody}
        </p>
        <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-pink-300 to-transparent mt-8" />
    </div>
);

const PageSurprise = ({ onOpenModal }) => (
    <div className="w-full h-full flex flex-col items-center justify-center pt-20 pb-6 px-12 md:px-20 text-center overflow-y-auto styling-scrollbar">
        <div className="text-6xl mb-6 animate-bounce flex-shrink-0">🎁</div>
        <h2 className="font-display text-3xl md:text-5xl text-rose-500 mb-4 flex-shrink-0">One Last Thing... 🤫</h2>
        <p className="font-body text-rose-400 max-w-sm mx-auto mb-10 leading-relaxed text-sm md:text-base">
            I couldn't fit your main present on a single page, but I left a special little button just for you 👇
        </p>
        <button
            onClick={onOpenModal}
            className="relative group overflow-hidden px-10 py-4 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold tracking-wide text-sm md:text-base shadow-xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-300 hover:scale-105 active:scale-95 transition-all duration-300"
        >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Claim Birthday Treat 💝</span>
        </button>
        <p className="mt-16 text-rose-300 font-body text-xs tracking-[0.25em] uppercase">Made with 💗 for {CONFIG.girlfriendsName}</p>
    </div>
);

// ==========================================
// 🎨 MAIN APP
// ==========================================
const PAGES = ['hero', 'gallery', 'reasons', 'vouchers', 'message', 'surprise'];
const PAGE_LABELS = ['💕', '📸', '💘', '🎀', '💌', '🎁'];

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(1);
    const [animating, setAnimating] = useState(false);
    const [showMpesaModal, setShowMpesaModal] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(false);

    const goToPage = useCallback((index) => {
        if (animating || index === currentPage || index < 0 || index >= PAGES.length) return;
        setDirection(index > currentPage ? 1 : -1);
        setAnimating(true);
        setTimeout(() => { setCurrentPage(index); setAnimating(false); }, 380);
    }, [animating, currentPage]);

    const goNext = useCallback(() => goToPage(currentPage + 1), [goToPage, currentPage]);
    const goPrev = useCallback(() => goToPage(currentPage - 1), [goToPage, currentPage]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [goNext, goPrev]);

    useEffect(() => {
        let sx = 0, sy = 0;
        const ts = (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
        const te = (e) => {
            const dx = e.changedTouches[0].clientX - sx;
            const dy = e.changedTouches[0].clientY - sy;
            if (Math.abs(dx) > Math.abs(dy)) { if (dx < -50) goNext(); else if (dx > 50) goPrev(); }
        };
        window.addEventListener('touchstart', ts);
        window.addEventListener('touchend', te);
        return () => { window.removeEventListener('touchstart', ts); window.removeEventListener('touchend', te); };
    }, [goNext, goPrev]);

    const handleUnlock = () => {
        setConfetti(true);
        setTimeout(() => { setIsOpen(true); setConfetti(false); setMusicPlaying(true); }, 1200);
    };

    // ----- WELCOME SCREEN -----
    if (!isOpen) {
        return (
            <div className="fixed inset-0 bg-gradient-to-b from-rose-50 to-pink-100 flex flex-col items-center justify-center z-50">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
                    .font-display { font-family: 'Dancing Script', cursive; }
                    .font-body { font-family: 'Nunito', sans-serif; }
                    @keyframes float-up {
                        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 0.6; }
                        100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
                    }
                    @keyframes confetti-fall {
                        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                    }
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    .animate-float-up { animation: float-up linear infinite; }
                    .animate-confetti-fall { animation: confetti-fall 1.5s ease-in forwards; }
                    .animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }
                `}} />
                <FloatingHearts />
                <ConfettiBurst active={confetti} />
                <div className="text-7xl md:text-8xl mb-6 animate-bounce-slow">💝</div>
                <p className="font-display text-3xl md:text-4xl text-rose-500 mb-3 drop-shadow-sm">
                    For {CONFIG.girlfriendsName}
                </p>
                <p className="font-body text-sm text-pink-400 mb-10 tracking-wide">{CONFIG.birthdayDate} 🎂</p>
                <button
                    onClick={handleUnlock}
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-body font-bold text-base shadow-xl shadow-pink-200 hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-2xl"
                >
                    Tap to Unlock 💗
                </button>
            </div>
        );
    }

    // ----- PAGED EXPERIENCE -----
    const slideStyle = animating
        ? { transform: `translateX(${direction * -70}px)`, opacity: 0, transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease' }
        : { transform: 'translateX(0)', opacity: 1, transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease' };

    const pages = [
        <PageHero />,
        <PageGallery />,
        <PageReasons />,
        <PageVouchers />,
        <PageMessage />,
        <PageSurprise onOpenModal={() => setShowMpesaModal(true)} />,
    ];

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-rose-50 via-pink-50 to-pink-100 text-rose-900 overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
                .font-display { font-family: 'Dancing Script', cursive; }
                .font-body { font-family: 'Nunito', sans-serif; }
                @keyframes float-up {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
                }
                @keyframes confetti-fall {
                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float-up { animation: float-up linear infinite; }
                .animate-confetti-fall { animation: confetti-fall 1.5s ease-in forwards; }
                .animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }
            `}} />

            <FloatingHearts />
            <BackgroundAudio playing={musicPlaying} onToggle={() => setMusicPlaying(p => !p)} />
            <SurpriseModal isOpen={showMpesaModal} onClose={() => setShowMpesaModal(false)} />

            {/* PAGE */}
            <div className="absolute inset-0 z-10 flex items-center justify-center" style={slideStyle}>
                {pages[currentPage]}
            </div>

            {/* PREV ARROW */}
            {currentPage > 0 && (
                <button
                    onClick={goPrev}
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-full bg-white border-2 border-pink-200 text-pink-400 hover:bg-pink-50 hover:text-rose-500 hover:border-pink-400 hover:scale-110 transition-all duration-200 shadow-md"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            )}

            {/* NEXT ARROW */}
            {currentPage < PAGES.length - 1 && (
                <button
                    onClick={goNext}
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white border-2 border-pink-200 text-pink-400 hover:bg-pink-50 hover:text-rose-500 hover:border-pink-400 hover:scale-110 transition-all duration-200 shadow-md"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            )}

            {/* DOT NAV */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {PAGE_LABELS.map((label, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i)}
                        className={`transition-all duration-300 ${i === currentPage
                            ? 'text-lg scale-125'
                            : 'text-sm opacity-40 hover:opacity-70 hover:scale-110'
                            }`}
                        title={`Page ${i + 1}`}
                        aria-label={`Go to page ${i + 1}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}