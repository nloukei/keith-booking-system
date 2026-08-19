import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">
            {/* Top Navigation */}
            <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between items-center">
                        <div className="flex items-center gap-8">
                            {/* Logo Badge */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-lg font-extrabold text-white tracking-wider uppercase block leading-none">Kei Luxe Hotel</span>
                                    <span className="text-[9px] tracking-[0.2em] text-amber-400 uppercase font-semibold">Portal</span>
                                </div>
                            </Link>

                            {/* Nav Links */}
                            <div className="hidden space-x-6 sm:flex">
                                {user.role === 'admin' ? (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className={`text-sm font-semibold transition-colors px-3 py-2 rounded-xl ${route().current('admin.dashboard') ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20' : 'text-slate-300 hover:text-white'}`}
                                    >
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('dashboard')}
                                        className={`text-sm font-semibold transition-colors px-3 py-2 rounded-xl ${route().current('dashboard') ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20' : 'text-slate-300 hover:text-white'}`}
                                    >
                                        My Bookings
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-xl">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-700 focus:outline-none"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                                {user.name}
                                                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">{user.role}</span>

                                                <svg
                                                    className="-me-0.5 ms-1 h-4 w-4 text-slate-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-slate-800 border border-slate-700 text-slate-200">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="text-slate-200 hover:bg-slate-700 hover:text-amber-400"
                                        >
                                            Profile Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-slate-200 hover:bg-slate-700 hover:text-rose-400"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 transition duration-150 ease-in-out hover:bg-slate-800 hover:text-white"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden border-t border-slate-800 bg-slate-900'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 px-4">
                        {user.role === 'admin' ? (
                            <ResponsiveNavLink
                                href={route('admin.dashboard')}
                                active={route().current('admin.dashboard')}
                                className="text-slate-200"
                            >
                                Admin Panel
                            </ResponsiveNavLink>
                        ) : (
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className="text-slate-200"
                            >
                                My Bookings
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-slate-800 pb-3 pt-4 px-4">
                        <div className="text-base font-semibold text-white">
                            {user.name}
                        </div>
                        <div className="text-xs text-amber-400 font-medium">
                            {user.email}
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-slate-300">
                                Profile Settings
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="text-rose-400"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sub-header Banner */}
            {header && (
                <header className="bg-slate-950/60 border-b border-slate-800/80">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content Area */}
            <main>{children}</main>
        </div>
    );
}

