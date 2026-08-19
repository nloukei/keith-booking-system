<?php

namespace App\Http\Controllers;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Store a new room booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests_count' => 'required|integer|min:1',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // Validate that capacity is not exceeded
        if ($validated['guests_count'] > $room->capacity) {
            return back()->withErrors(['guests_count' => "This room accommodates up to {$room->capacity} guests."]);
        }

        // Check if room is already booked in that date interval
        $isBooked = Booking::where('room_id', $room->id)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($validated) {
                $query->where('check_in_date', '<', $validated['check_out_date'])
                      ->where('check_out_date', '>', $validated['check_in_date']);
            })
            ->exists();

        if ($isBooked) {
            return back()->withErrors(['error' => 'Sorry, this room is already booked for the selected dates. Please choose another date or room.']);
        }

        // Calculate total nights and price
        $checkIn = Carbon::parse($validated['check_in_date']);
        $checkOut = Carbon::parse($validated['check_out_date']);
        $nights = max(1, $checkIn->diffInDays($checkOut));
        $totalPrice = $nights * (float) $room->price_per_night;

        Booking::create([
            'user_id' => $request->user()->id,
            'room_id' => $room->id,
            'check_in_date' => $validated['check_in_date'],
            'check_out_date' => $validated['check_out_date'],
            'guests_count' => $validated['guests_count'],
            'total_price' => $totalPrice,
            'status' => 'confirmed',
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        return redirect()->route('dashboard')->with('success', "Reservation confirmed for {$room->name}! Total: \${$totalPrice}");
    }

    /**
     * Cancel an active booking.
     */
    public function cancel(Request $request, Booking $booking): RedirectResponse
    {
        if ($booking->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            abort(403);
        }

        $booking->update(['status' => 'cancelled']);

        return redirect()->route('dashboard')->with('success', 'Reservation successfully cancelled.');
    }
}
