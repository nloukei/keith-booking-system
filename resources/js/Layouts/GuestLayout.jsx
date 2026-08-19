import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-900 text-slate-100 font-sans antialiased px-4 sm:px-6">
            {/* Header Brand Link */}
            <div className="mb-8 text-center">
                <Link href="/" className="inline-flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                        <svg className="w-7 h-7 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-xl font-extrabold text-white tracking-wider uppercase block leading-none">Kei Luxe Hotel</span>
                        <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-semibold">Luxury Hotel & Resort</span>
                    </div>
                </Link>
            </div>

            {/* Auth Form Card */}
            <div className="w-full sm:max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 p-8 rounded-3xl shadow-2xl shadow-black/60 relative z-10">
                {children}
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                <div className="w-[600px] h-[600px] bg-amber-500 rounded-full blur-[140px] mix-blend-screen"></div>
            </div>
        </div>
    );
}

