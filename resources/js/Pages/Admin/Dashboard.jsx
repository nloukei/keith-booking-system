import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({ auth, stats = {}, reservations = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Admin Executive Portal</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Overview of resort occupancy, reservations, and management</p>
                    </div>
                    <span className="px-3.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                        Live System Active
                    </span>
                </div>
            }
        >
            <Head title="Admin Management Portal - Kei Luxe Hotel" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-inner">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Welcome back, {auth.user.name}</h3>
                                    <p className="text-sm text-slate-400">Kei Luxe Hotel Management Panel • Superadmin Access</p>
                                </div>
                            </div>
                        </div>

                        {/* Background Ambient Decor */}
                        <div className="absolute right-0 top-0 -z-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    </div>

                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs uppercase font-semibold tracking-wider">Total Reservations</span>
                                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-3xl font-extrabold text-white">{stats.totalReservations ?? 0}</p>
                            <span className="text-xs text-slate-400 mt-2 block">System Total</span>
                        </div>

                        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs uppercase font-semibold tracking-wider">Occupied Suites</span>
                                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <p className="text-3xl font-extrabold text-white">{stats.occupiedSuites ?? 0}</p>
                            <span className="text-xs text-amber-400 mt-2 block">Active Occupancy</span>
                        </div>

                        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs uppercase font-semibold tracking-wider">Today's Check-Ins</span>
                                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <p className="text-3xl font-extrabold text-emerald-400">{stats.todayCheckIns ?? 0}</p>
                            <span className="text-xs text-slate-400 mt-2 block">Scheduled Arrival</span>
                        </div>

                        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs uppercase font-semibold tracking-wider">Total Revenue</span>
                                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-3xl font-extrabold text-white">${stats.totalRevenue ?? 0}</p>
                            <span className="text-xs text-slate-400 mt-2 block">Gross Bookings</span>
                        </div>
                    </div>

                    {/* Management Table Overview */}
                    <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="text-xl font-bold text-white">Guest Reservations</h4>
                                <p className="text-xs text-slate-400">Live feed of active bookings</p>
                            </div>
                        </div>

                        {reservations.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-300">
                                    <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700/60">
                                        <tr>
                                            <th className="px-4 py-3.5 rounded-l-xl">Guest</th>
                                            <th className="px-4 py-3.5">Suite Type</th>
                                            <th className="px-4 py-3.5">Dates</th>
                                            <th className="px-4 py-3.5">Status</th>
                                            <th className="px-4 py-3.5 rounded-r-xl">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {reservations.map((item, index) => (
                                            <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                                                <td className="px-4 py-4 font-semibold text-white">{item.guest_name}</td>
                                                <td className="px-4 py-4">{item.room_type}</td>
                                                <td className="px-4 py-4 text-xs">{item.dates}</td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">{item.status}</span>
                                                </td>
                                                <td className="px-4 py-4 font-bold text-amber-400">${item.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                    </svg>
                                </div>
                                <h5 className="text-lg font-bold text-white mb-1">No Reservations Found</h5>
                                <p className="text-sm text-slate-400 max-w-md mx-auto">
                                    There are currently no guest reservations recorded in the database.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


