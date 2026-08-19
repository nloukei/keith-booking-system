import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function RoomsIndex({ auth, rooms = [] }) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Hotel Rooms & Suites</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Manage room inventory, pricing, and availability status</p>
                    </div>
                    <Link
                        href={route('admin.rooms.create')}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20"
                    >
                        + Add New Room
                    </Link>
                </div>
            }
        >
            <Head title="Rooms Management - Kei Luxe Hotel" />

            <div className="space-y-6">
                <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                    {rooms.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map((room) => (
                                <div key={room.id} className="bg-slate-900 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="px-3 py-1 bg-slate-800 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-full uppercase">
                                                {room.room_number}
                                            </span>
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase ${
                                                room.status === 'available' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                                                room.status === 'occupied' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                                                'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                                            }`}>
                                                {room.status}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-1">{room.name}</h3>
                                        <p className="text-xs text-amber-400 font-semibold mb-3">{room.type} • {room.capacity} Guests {room.size_sqm ? `• ${room.size_sqm} m²` : ''}</p>
                                        <p className="text-xs text-slate-400 line-clamp-2 mb-4">{room.description || 'No description provided.'}</p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                                        <span className="text-lg font-bold text-white">${room.price_per_night} <span className="text-xs font-normal text-slate-400">/ night</span></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                </svg>
                            </div>
                            <h5 className="text-lg font-bold text-white mb-1">No Rooms Added Yet</h5>
                            <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
                                Click the button below to add your first hotel room or suite to the system inventory.
                            </p>
                            <Link
                                href={route('admin.rooms.create')}
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
                            >
                                + Add First Room
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
