import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function CreateRoom({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        room_number: '',
        type: 'Deluxe Suite',
        price_per_night: '',
        capacity: 2,
        size_sqm: '',
        description: '',
        amenities: [],
        status: 'available',
    });

    const availableAmenities = [
        'High-Speed Wi-Fi',
        'Ocean View Balcony',
        'King Bed',
        'Marble Bathroom & Bathtub',
        '24/7 Butler Service',
        'Mini-bar & Coffee Maker',
        'Smart TV & Soundbar',
        'Private Plunge Pool',
    ];

    const handleAmenityToggle = (amenity) => {
        if (data.amenities.includes(amenity)) {
            setData('amenities', data.amenities.filter((a) => a !== amenity));
        } else {
            setData('amenities', [...data.amenities, amenity]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.rooms.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Add New Suite / Room</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Register a new room unit into the hotel inventory system</p>
                </div>
            }
        >
            <Head title="Add New Room - Kei Luxe Hotel" />

            <div className="max-w-4xl mx-auto">
                <form onSubmit={submit} className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Room Name */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Room / Suite Name <span className="text-amber-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 placeholder:text-slate-500"
                                placeholder="e.g. Presidential Ocean Suite"
                                required
                            />
                            <InputError message={errors.name} className="mt-1 text-rose-400 text-xs" />
                        </div>

                        {/* Room Number */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Room Number / Code <span className="text-amber-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.room_number}
                                onChange={(e) => setData('room_number', e.target.value)}
                                className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 placeholder:text-slate-500"
                                placeholder="e.g. SUITE-501"
                                required
                            />
                            <InputError message={errors.room_number} className="mt-1 text-rose-400 text-xs" />
                        </div>

                        {/* Room Type */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Category / Type <span className="text-amber-400">*</span>
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 cursor-pointer"
                            >
                                <option value="Standard Room">Standard Room</option>
                                <option value="Deluxe Suite">Deluxe Suite</option>
                                <option value="Executive Villa">Executive Villa</option>
                                <option value="Penthouse Suite">Penthouse Suite</option>
                            </select>
                            <InputError message={errors.type} className="mt-1 text-rose-400 text-xs" />
                        </div>

                        {/* Price per Night */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Price Per Night ($) <span className="text-amber-400">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price_per_night}
                                onChange={(e) => setData('price_per_night', e.target.value)}
                                className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 placeholder:text-slate-500"
                                placeholder="299.00"
                                required
                            />
                            <InputError message={errors.price_per_night} className="mt-1 text-rose-400 text-xs" />
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Max Guest Capacity <span className="text-amber-400">*</span>
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3"
                                required
                            />
                            <InputError message={errors.capacity} className="mt-1 text-rose-400 text-xs" />
                        </div>

                        {/* Room Size (SQM) */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Room Size (m²)
                            </label>
                            <input
                                type="number"
                                value={data.size_sqm}
                                onChange={(e) => setData('size_sqm', e.target.value)}
                                className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 placeholder:text-slate-500"
                                placeholder="55"
                            />
                            <InputError message={errors.size_sqm} className="mt-1 text-rose-400 text-xs" />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                            Initial Status
                        </label>
                        <div className="flex gap-4">
                            {['available', 'occupied', 'maintenance'].map((st) => (
                                <label key={st} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300 uppercase">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={st}
                                        checked={data.status === st}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="text-amber-400 focus:ring-amber-400 bg-slate-900 border-slate-700"
                                    />
                                    {st}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                            Room Description
                        </label>
                        <textarea
                            rows="3"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 placeholder:text-slate-500"
                            placeholder="Describe suite features, view highlights, and bedding layout..."
                        ></textarea>
                        <InputError message={errors.description} className="mt-1 text-rose-400 text-xs" />
                    </div>

                    {/* Amenities Checkboxes */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                            Included Amenities
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {availableAmenities.map((item) => (
                                <label
                                    key={item}
                                    onClick={() => handleAmenityToggle(item)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                                        data.amenities.includes(item)
                                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                                            : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-600'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.amenities.includes(item)}
                                        onChange={() => {}}
                                        className="rounded border-slate-700 bg-slate-900 text-amber-400 focus:ring-amber-400"
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex justify-end gap-4 border-t border-slate-700/60">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
                        >
                            {processing ? 'Saving Room...' : 'Create & Save Room'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
