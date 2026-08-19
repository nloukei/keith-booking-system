import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Grand Horizon Hotel & Resort - Luxury Stay & Booking" />

            <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">
                {/* Navigation Bar */}
                <nav className="w-full absolute top-0 left-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                    <svg className="w-6 h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-xl font-extrabold text-white tracking-wider uppercase block leading-none">Kei Luxe Hotel</span>
                                    <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-semibold">Luxury Hotel & Resort</span>
                                </div>
                            </div>

                            {/* Nav Links */}
                            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                                <a href="#search" className="hover:text-amber-400 transition-colors">Book Now</a>
                                <a href="#rooms" className="hover:text-amber-400 transition-colors">Rooms & Suites</a>
                                <a href="#amenities" className="hover:text-amber-400 transition-colors">Amenities</a>
                                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
                            </div>

                            {/* Auth Links */}
                            <div className="flex items-center gap-4">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-amber-400 border border-amber-400/30 rounded-xl hover:bg-amber-400/10 transition-colors"
                                    >
                                        My Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5"
                                        >
                                            Book Room
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-8">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            5-Star Luxury Experience
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6 max-w-4xl mx-auto leading-tight">
                            Experience Elegance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Unmatched Comfort</span>
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                            Escape into sanctuary. Reserve luxury suites, premium amenities, and world-class hospitality for your next unforgettable getaway.
                        </p>

                        {/* Search & Reservation Bar */}
                        <div id="search" className="max-w-4xl mx-auto bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 sm:p-6 rounded-3xl shadow-2xl shadow-black/50 text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-slate-900/60 border border-slate-700/60 p-3 rounded-2xl">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Check-in</label>
                                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="bg-transparent border-0 text-white text-sm focus:ring-0 w-full p-0 font-medium" />
                                </div>
                                <div className="bg-slate-900/60 border border-slate-700/60 p-3 rounded-2xl">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Check-out</label>
                                    <input type="date" className="bg-transparent border-0 text-white text-sm focus:ring-0 w-full p-0 font-medium" />
                                </div>
                                <div className="bg-slate-900/60 border border-slate-700/60 p-3 rounded-2xl">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Guests & Rooms</label>
                                    <select className="bg-transparent border-0 text-white text-sm focus:ring-0 w-full p-0 font-medium cursor-pointer">
                                        <option className="bg-slate-900 text-white">1 Guest, 1 Room</option>
                                        <option className="bg-slate-900 text-white">2 Guests, 1 Room</option>
                                        <option className="bg-slate-900 text-white">4 Guests, 2 Rooms</option>
                                    </select>
                                </div>
                                <div className="flex items-center">
                                    <Link
                                        href={route('register')}
                                        className="w-full h-full min-h-[50px] inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all"
                                    >
                                        Search Availability
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none">
                        <div className="w-[700px] h-[700px] bg-amber-500 rounded-full blur-[120px] mix-blend-screen"></div>
                    </div>
                </main>

                {/* Rooms Section */}
                <section id="rooms" className="py-20 bg-slate-950 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Accommodations</span>
                            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2">Featured Suites & Rooms</h2>
                            <p className="mt-4 text-slate-400 max-w-xl mx-auto">Crafted for relaxation with panoramic views and bespoke amenities.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Room Card 1 */}
                            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col hover:border-amber-500/40 transition-all duration-300 group">
                                <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-indigo-500/10 group-hover:scale-105 transition-transform duration-500"></div>
                                    <div className="relative flex justify-between items-start">
                                        <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-full">Popular</span>
                                        <span className="text-xl font-bold text-white">$299 <span className="text-xs font-normal text-slate-400">/ night</span></span>
                                    </div>
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Deluxe Ocean Suite</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        Private balcony overlooking the ocean, king-size canopy bed, marble bath, and 24-hour butler service.
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                        <span className="text-xs text-slate-400">2 Guests • 55 m²</span>
                                        <Link href={route('register')} className="text-sm font-semibold text-amber-400 hover:text-amber-300">Reserve →</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Room Card 2 */}
                            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col hover:border-amber-500/40 transition-all duration-300 group">
                                <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-emerald-500/10 group-hover:scale-105 transition-transform duration-500"></div>
                                    <div className="relative flex justify-between items-start">
                                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full">Executive</span>
                                        <span className="text-xl font-bold text-white">$450 <span className="text-xs font-normal text-slate-400">/ night</span></span>
                                    </div>
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Penthouse Villa</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        Panoramic city skyline views, private rooftop plunge pool, dedicated lounge access, and chef dining.
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                        <span className="text-xs text-slate-400">4 Guests • 120 m²</span>
                                        <Link href={route('register')} className="text-sm font-semibold text-amber-400 hover:text-amber-300">Reserve →</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Room Card 3 */}
                            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col hover:border-amber-500/40 transition-all duration-300 group">
                                <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-rose-500/10 group-hover:scale-105 transition-transform duration-500"></div>
                                    <div className="relative flex justify-between items-start">
                                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full">Standard</span>
                                        <span className="text-xl font-bold text-white">$180 <span className="text-xs font-normal text-slate-400">/ night</span></span>
                                    </div>
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Garden View Room</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        Serene retreat surrounding lush tropical gardens, queen bed, high-speed Wi-Fi, and rainfall shower.
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                        <span className="text-xs text-slate-400">2 Guests • 40 m²</span>
                                        <Link href={route('register')} className="text-sm font-semibold text-amber-400 hover:text-amber-300">Reserve →</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Amenities Section */}
                <section id="amenities" className="py-20 bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">World-Class Services</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Resort Amenities</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1">Infinity Pool & Spa</h4>
                                <p className="text-xs text-slate-400">Heated pool with ocean horizons and full-service wellness spa treatments.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1">Fine Dining</h4>
                                <p className="text-xs text-slate-400">Michelin-star rated restaurant featuring local and international cuisine.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1">24/7 Concierge</h4>
                                <p className="text-xs text-slate-400">Personalized travel arrangements, excursion booking, and airport transfers.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.414 8.414a15 15 0 0121.172 0" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1">High-Speed Wi-Fi</h4>
                                <p className="text-xs text-slate-400">Ultra-fast fiber optic connection accessible across the entire resort property.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className="bg-slate-950 py-12 border-t border-slate-800 text-slate-400 text-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-bold">
                                GH
                            </div>
                            <span className="text-lg font-bold text-white">Grand Horizon Hotel</span>
                        </div>
                        <p className="text-slate-500">
                            &copy; {new Date().getFullYear()} Grand Horizon Hotel & Resort. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

