import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            active: route().current('admin.dashboard'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            name: 'Rooms & Suites',
            href: route('admin.rooms.index'),
            active: route().current('admin.rooms.*'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased flex flex-col md:flex-row">
            {/* Mobile Header Bar */}
            <div className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                        </svg>
                    </div>
                    <span className="text-base font-extrabold text-white tracking-wider uppercase">Kei Luxe</span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside
                className={`${sidebarOpen ? 'block' : 'hidden'
                    } md:block w-full md:w-64 bg-slate-950/80 border-r border-slate-800 flex-shrink-0 min-h-screen p-6 flex flex-col justify-between z-40`}
            >
                <div className="space-y-8">
                    {/* Brand */}
                    <Link href="/" className="hidden md:flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                            <svg className="w-6 h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-lg font-extrabold text-white tracking-wider uppercase block leading-none">Kei Luxe</span>
                            <span className="text-[9px] tracking-[0.25em] text-amber-400 uppercase font-semibold">Admin Panel</span>
                        </div>
                    </Link>

                    {/* Nav Items */}
                    <nav className="space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-3">
                            Hotel Management
                        </div>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${item.active
                                        ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20 shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Profile Footer */}
                <div className="pt-6 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                                {user.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                <p className="text-[10px] text-amber-400 uppercase font-semibold">Administrator</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Log Out"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {header && (
                    <header className="bg-slate-950/60 border-b border-slate-800/80 px-6 py-6">
                        <div className="max-w-7xl mx-auto">{header}</div>
                    </header>
                )}
                <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
            </div>
        </div>
    );
}
