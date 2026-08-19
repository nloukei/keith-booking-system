import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function BookingsIndex({ auth, bookings = [], filters = {}, counts = {} }) {
    const { flash = {} } = usePage().props;

    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [search, setSearch] = useState(filters.search || '');

    const handleFilterChange = (status) => {
        setStatusFilter(status);
        router.get(
            route('admin.bookings.index'),
            {
                status: status === 'all' ? undefined : status,
                search: search || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(
            route('admin.bookings.index'),
            {
                status: statusFilter === 'all' ? undefined : statusFilter,
                search: search || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleUpdateStatus = (bookingId, newStatus) => {
        if (confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
            router.patch(route('admin.bookings.status', bookingId), {
                status: newStatus,
            }, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Reserved Rooms & Bookings</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Manage all guest room reservations, check-ins, and stay statuses</p>
                    </div>
                </div>
            }
        >
            <Head title="Booked Rooms & Reservations - Kei Luxe Hotel Admin" />

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

                {/* Status Tab Badges */}
                <div className="flex flex-wrap items-center gap-3">
                    {[
                        { key: 'all', label: 'All Bookings', count: counts.all ?? 0 },
                        { key: 'confirmed', label: 'Confirmed / Active', count: counts.confirmed ?? 0 },
                        { key: 'completed', label: 'Completed', count: counts.completed ?? 0 },
                        { key: 'cancelled', label: 'Cancelled', count: counts.cancelled ?? 0 },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => handleFilterChange(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                statusFilter === tab.key
                                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[10px] ${
                                    statusFilter === tab.key
                                        ? 'bg-slate-950 text-amber-400'
                                        : 'bg-slate-900 text-slate-400'
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search Bar & Table Container */}
                <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">All Reserved Rooms List</h3>
                            <p className="text-xs text-slate-400">Total {bookings.length} reservations matching criteria</p>
                        </div>

                        {/* Search Input */}
                        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by guest, email, room..."
                                className="bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-xs px-4 py-2.5 placeholder:text-slate-500 w-full sm:w-64"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-xl transition-colors"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Bookings Table */}
                    {bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700/60">
                                    <tr>
                                        <th className="px-4 py-3.5 rounded-l-xl">ID & Guest</th>
                                        <th className="px-4 py-3.5">Reserved Room</th>
                                        <th className="px-4 py-3.5">Check-in / Check-out</th>
                                        <th className="px-4 py-3.5">Guests</th>
                                        <th className="px-4 py-3.5">Total Paid</th>
                                        <th className="px-4 py-3.5">Status</th>
                                        <th className="px-4 py-3.5 rounded-r-xl text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {bookings.map((b) => (
                                        <tr key={b.id} className="hover:bg-slate-700/30 transition-colors">
                                            {/* Guest Column */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                                                        #{b.id}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white leading-none">{b.user?.name || 'Guest'}</p>
                                                        <p className="text-xs text-slate-400 mt-1">{b.user?.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Room Column */}
                                            <td className="px-4 py-4">
                                                <p className="font-bold text-white">{b.room?.name || 'Deleted Room'}</p>
                                                <span className="text-xs text-amber-400 font-semibold">{b.room?.room_number} • {b.room?.type}</span>
                                            </td>

                                            {/* Dates Column */}
                                            <td className="px-4 py-4 text-xs font-medium">
                                                <p className="text-white font-semibold">{b.check_in_date} → {b.check_out_date}</p>
                                                {b.special_requests && (
                                                    <p className="text-[11px] text-slate-400 italic mt-0.5 line-clamp-1" title={b.special_requests}>
                                                        Note: {b.special_requests}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Capacity / Guests */}
                                            <td className="px-4 py-4 text-xs text-slate-300">
                                                {b.guests_count} {b.guests_count === 1 ? 'Guest' : 'Guests'}
                                            </td>

                                            {/* Total Price */}
                                            <td className="px-4 py-4 font-bold text-amber-400 text-sm">
                                                ${b.total_price}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase ${
                                                        b.status === 'confirmed'
                                                            ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                                                            : b.status === 'completed'
                                                            ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                                                            : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                                                    }`}
                                                >
                                                    {b.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-4 text-right">
                                                <div className="inline-flex items-center gap-2">
                                                    {b.status === 'confirmed' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdateStatus(b.id, 'completed')}
                                                                className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold transition-colors"
                                                                title="Mark Stay Completed / Checked-out"
                                                            >
                                                                Complete
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                                                                className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold transition-colors"
                                                                title="Cancel Reservation"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                    {b.status === 'cancelled' && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                                                            className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-semibold transition-colors"
                                                        >
                                                            Reopen
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h5 className="text-lg font-bold text-white mb-1">No Reservations Found</h5>
                            <p className="text-sm text-slate-400 max-w-md mx-auto">
                                No guest bookings match the current filter or search criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
