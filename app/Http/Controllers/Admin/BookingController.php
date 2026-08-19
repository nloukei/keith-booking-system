<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of all reservations and booked rooms.
     */
    public function index(Request $request): Response
    {
        $status = $request->input('status');
        $search = $request->input('search');

        $bookingsQuery = Booking::with(['user', 'room'])->latest();

        if ($status && $status !== 'all') {
            $bookingsQuery->where('status', $status);
        }

        if ($search) {
            $bookingsQuery->where(function ($q) use ($search) {
                $q->whereHas('user', function ($u) use ($search) {
                    $u->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                })->orWhereHas('room', function ($r) use ($search) {
                    $r->where('name', 'like', "%{$search}%")
                      ->orWhere('room_number', 'like', "%{$search}%");
                });
            });
        }

        $bookings = $bookingsQuery->get();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'filters' => [
                'status' => $status ?? 'all',
                'search' => $search ?? '',
            ],
            'counts' => [
                'all' => Booking::count(),
                'confirmed' => Booking::where('status', 'confirmed')->count(),
                'completed' => Booking::where('status', 'completed')->count(),
                'cancelled' => Booking::where('status', 'cancelled')->count(),
            ],
        ]);
    }

    /**
     * Update the booking status (e.g. check-in, complete, cancel).
     */
    public function updateStatus(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:confirmed,completed,cancelled',
        ]);

        $booking->update(['status' => $validated['status']]);

        return back()->with('success', "Reservation #{$booking->id} status updated to {$validated['status']}.");
    }
}
