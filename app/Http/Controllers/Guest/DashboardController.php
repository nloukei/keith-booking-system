<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the guest dashboard with date/time room availability search and user bookings.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        $checkIn = $request->input('check_in_date', Carbon::today()->toDateString());
        $checkOut = $request->input('check_out_date', Carbon::tomorrow()->toDateString());
        $guests = (int) $request->input('guests', 1);
        $type = $request->input('type');
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');

        // Query rooms that are NOT booked between the selected dates
        $roomsQuery = Room::where('status', '!=', 'maintenance');

        if ($guests > 1) {
            $roomsQuery->where('capacity', '>=', $guests);
        }

        if ($type) {
            $roomsQuery->where('type', $type);
        }

        if ($minPrice) {
            $roomsQuery->where('price_per_night', '>=', (float) $minPrice);
        }

        if ($maxPrice) {
            $roomsQuery->where('price_per_night', '<=', (float) $maxPrice);
        }

        // Exclude rooms booked within overlapping dates
        if ($checkIn && $checkOut) {
            $roomsQuery->whereDoesntHave('bookings', function ($q) use ($checkIn, $checkOut) {
                $q->where('status', '!=', 'cancelled')
                  ->where(function ($sub) use ($checkIn, $checkOut) {
                      $sub->where('check_in_date', '<', $checkOut)
                          ->where('check_out_date', '>', $checkIn);
                  });
            });
        }

        $availableRooms = $roomsQuery->get();

        // User's current bookings
        $userBookings = Booking::with('room')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'availableRooms' => $availableRooms,
            'userBookings' => $userBookings,
            'filters' => [
                'check_in_date' => $checkIn,
                'check_out_date' => $checkOut,
                'guests' => $guests,
                'type' => $type,
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
            ],
            'roomTypes' => Room::select('type')->distinct()->pluck('type'),
        ]);
    }
}
