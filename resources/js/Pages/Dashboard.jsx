import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, availableRooms = [], userBookings = [], filters = {}, roomTypes = [] }) {
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    const [checkIn, setCheckIn] = useState(filters.check_in_date || '');
    const [checkOut, setCheckOut] = useState(filters.check_out_date || '');
    const [guests, setGuests] = useState(filters.guests || 1);
    const [type, setType] = useState(filters.type || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');

    // Booking Modal state
    const [selectedRoom, setSelectedRoom] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        room_id: '',
        check_in_date: filters.check_in_date || '',
        check_out_date: filters.check_out_date || '',
        guests_count: filters.guests || 1,
        special_requests: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('dashboard'),
            {
                check_in_date: checkIn,
                check_out_date: checkOut,
                guests,
                type: type || undefined,
                min_price: minPrice || undefined,
                max_price: maxPrice || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const openBookingModal = (room) => {
        setSelectedRoom(room);
        setData({
            room_id: room.id,
            check_in_date: checkIn,
            check_out_date: checkOut,
            guests_count: guests > room.capacity ? room.capacity : guests,
            special_requests: '',
        });
    };

    const closeBookingModal = () => {
        setSelectedRoom(null);
        reset();
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        post(route('bookings.store'), {
            onSuccess: () => closeBookingModal(),
        });
    };

    const calculateNights = (inDate, outDate) => {
        if (!inDate || !outDate) return 1;
        const d1 = new Date(inDate);
        const d2 = new Date(outDate);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    };

    const nights = calculateNights(data.check_in_date, data.check_out_date);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Available Rooms & Reservations</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Filter luxury rooms by your preferred stay dates, guests, and price</p>
                    </div>
                </div>
            }
        >
            <Head title="Guest Portal - Kei Luxe Hotel" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* Flash & Error Notices */}
                    {flash?.success && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-sm font-medium flex items-center gap-3">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {flash.success}
                        </div>
                    )}
                    {pageErrors?.error && (
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-2xl text-sm font-medium flex items-center gap-3">
                            <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {pageErrors.error}
                        </div>
                    )}

                    {/* Search & Reservation Bar */}
                    <div className="max-w-7xl mx-auto bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 sm:p-6 rounded-3xl shadow-2xl shadow-black/50 text-left">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Check In Date */}
                            <div className="bg-slate-900/60 border border-slate-700/60 p-3 rounded-2xl">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Check-in</label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="bg-transparent border-0 text-white text-sm focus:ring-0 w-full p-0 font-medium cursor-pointer"
                                />
                            </div>

                            {/* Check Out Date */}
                            <div className="bg-slate-900/60 border border-slate-700/60 p-3 rounded-2xl">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Check-out</label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="bg-transparent border-0 text-white text-sm focus:ring-0 w-full p-0 font-medium cursor-pointer"
                                />
                            </div>

                            {/* Guests & Category */}
                            <div className="bg-slate-900/60 border border-slate-700/60 p-3 rounded-2xl">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Guests & Category</label>
                                <div className="flex gap-2">
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        className="bg-transparent border-0 text-white text-sm focus:ring-0 w-1/2 p-0 font-medium cursor-pointer"
                                    >
                                        <option value="1" className="bg-slate-900 text-white">1 Guest</option>
                                        <option value="2" className="bg-slate-900 text-white">2 Guests</option>
                                        <option value="3" className="bg-slate-900 text-white">3 Guests</option>
                                        <option value="4" className="bg-slate-900 text-white">4+ Guests</option>
                                    </select>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="bg-transparent border-0 text-white text-xs focus:ring-0 w-1/2 p-0 font-medium cursor-pointer truncate text-slate-300"
                                    >
                                        <option value="" className="bg-slate-900 text-white">All Rooms</option>
                                        {roomTypes.map((t) => (
                                            <option key={t} value={t} className="bg-slate-900 text-white">{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Submit Search Button */}
                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className="w-full h-full min-h-[50px] inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                                >
                                    Search Availability
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Available Rooms Grid */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    Available Suites & Rooms
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">
                                    Showing rooms available from <span className="text-amber-400 font-semibold">{checkIn}</span> to <span className="text-amber-400 font-semibold">{checkOut}</span> ({calculateNights(checkIn, checkOut)} {calculateNights(checkIn, checkOut) === 1 ? 'Night' : 'Nights'})
                                </p>
                            </div>
                            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                                {availableRooms.length} Available
                            </span>
                        </div>

                        {availableRooms.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {availableRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 group shadow-xl"
                                    >
                                        <div className="p-6 pb-4">
                                            {/* Top Tags */}
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="px-3 py-1 bg-slate-900 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-full uppercase">
                                                    {room.room_number}
                                                </span>
                                                <span className="px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase">
                                                    Available
                                                </span>
                                            </div>

                                            {/* Room Info */}
                                            <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                                {room.name}
                                            </h4>
                                            <p className="text-xs text-slate-400 font-medium mt-1 mb-4">
                                                {room.type} • Up to {room.capacity} Guests {room.size_sqm ? `• ${room.size_sqm} m²` : ''}
                                            </p>

                                            <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                                                {room.description || 'Experience ultimate relaxation with premium room service and bespoke amenities.'}
                                            </p>

                                            {/* Amenities Tags */}
                                            {room.amenities && room.amenities.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-[10px] bg-slate-900/90 text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded-md"
                                                        >
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                    {room.amenities.length > 3 && (
                                                        <span className="text-[10px] text-amber-400/80 px-1 py-0.5">
                                                            +{room.amenities.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Price & Book Button */}
                                        <div className="p-6 pt-4 border-t border-slate-700/60 flex items-center justify-between bg-slate-900/40">
                                            <div>
                                                <span className="text-2xl font-extrabold text-white">
                                                    ${room.price_per_night}
                                                </span>
                                                <span className="text-xs text-slate-400 font-normal"> / night</span>
                                            </div>

                                            <button
                                                onClick={() => openBookingModal(room)}
                                                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20"
                                            >
                                                Reserve Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 rounded-3xl bg-slate-800/80 border border-slate-700/80 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">No Rooms Available for These Dates</h4>
                                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                                    All suites are occupied for the requested check-in / check-out window. Please try adjusting your stay dates or guest count.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* User's Current Bookings Section */}
                    <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="text-xl font-bold text-white">Your Reservations & Stay History</h4>
                                <p className="text-xs text-slate-400">Manage your active bookings and stay schedules</p>
                            </div>
                        </div>

                        {userBookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-300">
                                    <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700/60">
                                        <tr>
                                            <th className="px-4 py-3.5 rounded-l-xl">Room / Suite</th>
                                            <th className="px-4 py-3.5">Stay Dates</th>
                                            <th className="px-4 py-3.5">Guests</th>
                                            <th className="px-4 py-3.5">Total Paid</th>
                                            <th className="px-4 py-3.5">Status</th>
                                            <th className="px-4 py-3.5 rounded-r-xl text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {userBookings.map((b) => (
                                            <tr key={b.id} className="hover:bg-slate-700/30 transition-colors">
                                                <td className="px-4 py-4">
                                                    <p className="font-bold text-white">{b.room?.name || 'Room'}</p>
                                                    <span className="text-xs text-amber-400 font-medium">{b.room?.room_number}</span>
                                                </td>
                                                <td className="px-4 py-4 text-xs font-medium">
                                                    {b.check_in_date} → {b.check_out_date}
                                                </td>
                                                <td className="px-4 py-4">{b.guests_count} {b.guests_count === 1 ? 'Guest' : 'Guests'}</td>
                                                <td className="px-4 py-4 font-bold text-amber-400">${b.total_price}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase ${
                                                        b.status === 'confirmed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                                                        b.status === 'completed' ? 'text-slate-400 bg-slate-700/20 border border-slate-600/30' :
                                                        'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                                                    }`}>
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    {b.status === 'confirmed' && (
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to cancel this reservation?')) {
                                                                    router.patch(route('bookings.cancel', b.id));
                                                                }
                                                            }}
                                                            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                                                        >
                                                            Cancel Stay
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-center">
                                <p className="text-sm text-slate-400">
                                    You don't have any reservations yet. Pick a room above to make your first booking!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            {selectedRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Confirm Reservation</span>
                                <h3 className="text-2xl font-bold text-white mt-1">{selectedRoom.name}</h3>
                                <p className="text-xs text-slate-400">{selectedRoom.type} • {selectedRoom.room_number}</p>
                            </div>
                            <button
                                onClick={closeBookingModal}
                                className="text-slate-400 hover:text-white p-2 rounded-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Check-in Date</label>
                                    <input
                                        type="date"
                                        value={data.check_in_date}
                                        onChange={(e) => setData('check_in_date', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl text-sm p-2.5 focus:border-amber-400 focus:ring-0"
                                        required
                                    />
                                    <InputError message={errors.check_in_date} className="mt-1 text-xs text-rose-400" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Check-out Date</label>
                                    <input
                                        type="date"
                                        value={data.check_out_date}
                                        onChange={(e) => setData('check_out_date', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl text-sm p-2.5 focus:border-amber-400 focus:ring-0"
                                        required
                                    />
                                    <InputError message={errors.check_out_date} className="mt-1 text-xs text-rose-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Number of Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={selectedRoom.capacity}
                                    value={data.guests_count}
                                    onChange={(e) => setData('guests_count', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl text-sm p-2.5 focus:border-amber-400 focus:ring-0"
                                    required
                                />
                                <InputError message={errors.guests_count} className="mt-1 text-xs text-rose-400" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Special Requests / Arrival Notes</label>
                                <textarea
                                    rows="2"
                                    value={data.special_requests}
                                    onChange={(e) => setData('special_requests', e.target.value)}
                                    placeholder="Early check-in, dietary preferences, airport shuttle requests..."
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl text-sm p-2.5 focus:border-amber-400 focus:ring-0 placeholder:text-slate-500"
                                ></textarea>
                            </div>

                            {/* Summary Box */}
                            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Rate Per Night:</span>
                                    <span className="font-semibold text-white">${selectedRoom.price_per_night}</span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Duration:</span>
                                    <span className="font-semibold text-white">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-700">
                                    <span>Estimated Total:</span>
                                    <span className="text-amber-400">${(nights * Number(selectedRoom.price_per_night)).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={closeBookingModal}
                                    className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                                >
                                    {processing ? 'Booking...' : 'Confirm & Book Stay'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
