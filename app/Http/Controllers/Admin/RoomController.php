<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    /**
     * Display a listing of rooms.
     */
    public function index(): Response
    {
        $rooms = Room::latest()->get();

        return Inertia::render('Admin/Rooms/Index', [
            'rooms' => $rooms,
        ]);
    }

    /**
     * Show the form for creating a new room.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Rooms/Create');
    }

    /**
     * Store a newly created room in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'room_number' => 'required|string|max:50|unique:rooms,room_number',
            'type' => 'required|string|max:100',
            'price_per_night' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'size_sqm' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'status' => 'required|in:available,occupied,maintenance',
        ]);

        Room::create($validated);

        return redirect()->route('admin.rooms.index')->with('success', 'Room added successfully.');
    }
}
