import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function RoomsIndex({ auth, rooms = [] }) {
    const { flash = {} } = usePage().props;

    const handleDeleteRoom = (room) => {
        if (confirm(`Are you sure you want to permanently delete "${room.name}" (${room.room_number})? Any associated records will also be removed.`)) {
            router.delete(route('admin.rooms.destroy', room.id));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Hotel Rooms & Suites</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Manage room inventory, pricing, availability, and deletions</p>
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
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-sm font-medium flex items-center gap-3">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {flash.success}
                    </div>
                )}

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
                                        
                                        {room.amenities && room.amenities.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {room.amenities.slice(0, 3).map((a, i) => (
                                                    <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                                                        {a}
                                                    </span>
                                                ))}
                                                {room.amenities.length > 3 && (
                                                    <span className="text-[10px] text-amber-400/80 px-1 py-0.5">
                                                        +{room.amenities.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                                        <span className="text-lg font-bold text-white">${room.price_per_night} <span className="text-xs font-normal text-slate-400">/ night</span></span>

                                        <button
                                            onClick={() => handleDeleteRoom(room)}
                                            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                                            title="Delete Room"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
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
