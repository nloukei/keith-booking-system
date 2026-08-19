import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Guest Portal</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Manage your stays, view upcoming reservations, and request services</p>
                    </div>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20"
                    >
                        + Book New Room
                    </Link>
                </div>
            }
        >
            <Head title="Guest Portal - Kei Luxe Hotel" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                            <div>
                                <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">Kei Luxe Hotel Guest</span>
                                <h3 className="text-3xl font-extrabold text-white mt-1">Welcome, {auth.user.name}</h3>
                                <p className="text-sm text-slate-300 mt-2 max-w-xl">
                                    We are delighted to have you stay with us. View your upcoming reservations or explore available luxury suites below.
                                </p>
                            </div>
                        </div>

                        {/* Ambient Glow */}
                        <div className="absolute right-0 top-0 -z-0 translate-x-10 -translate-y-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    </div>

                    {/* Active Stay / Reservations */}
                    <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="text-xl font-bold text-white">Your Upcoming Reservations</h4>
                                <p className="text-xs text-slate-400">Current active room bookings and stay details</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                </svg>
                            </div>
                            <h5 className="text-lg font-bold text-white mb-1">No Active Reservations</h5>
                            <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
                                You don't have any active stay reservations yet. Explore our Deluxe Ocean Suites and Penthouse Villas to book your stay.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
                            >
                                Explore Rooms & Book
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

