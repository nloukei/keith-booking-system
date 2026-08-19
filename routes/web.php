<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\EnsureUserIsCustomer;
use App\Http\Controllers\Guest\DashboardController as GuestDashboardController;
use App\Http\Controllers\BookingController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified', EnsureUserIsCustomer::class])->group(function () {
    Route::get('/dashboard', [GuestDashboardController::class, 'index'])->name('dashboard');
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::patch('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
});

use App\Http\Controllers\Admin\RoomController;

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    Route::get('/admin/dashboard', function () {
        $totalReservations = \App\Models\Booking::where('status', '!=', 'cancelled')->count();
        $occupiedSuites = \App\Models\Booking::where('status', 'confirmed')
            ->where('check_in_date', '<=', \Carbon\Carbon::today())
            ->where('check_out_date', '>=', \Carbon\Carbon::today())
            ->distinct('room_id')
            ->count('room_id');
        $todayCheckIns = \App\Models\Booking::where('status', 'confirmed')
            ->whereDate('check_in_date', \Carbon\Carbon::today())
            ->count();
        $totalRevenue = \App\Models\Booking::where('status', '!=', 'cancelled')->sum('total_price');

        $latestReservations = \App\Models\Booking::with(['user', 'room'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($b) {
                return [
                    'guest_name' => $b->user->name ?? 'Guest',
                    'room_type' => $b->room->name ?? 'Suite',
                    'dates' => \Carbon\Carbon::parse($b->check_in_date)->format('M d') . ' - ' . \Carbon\Carbon::parse($b->check_out_date)->format('M d'),
                    'status' => $b->status,
                    'total' => $b->total_price,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalReservations' => $totalReservations,
                'occupiedSuites' => $occupiedSuites,
                'todayCheckIns' => $todayCheckIns,
                'totalRevenue' => number_format($totalRevenue, 2),
            ],
            'reservations' => $latestReservations,
        ]);
    })->name('admin.dashboard');

    Route::get('/admin/rooms', [RoomController::class, 'index'])->name('admin.rooms.index');
    Route::get('/admin/rooms/create', [RoomController::class, 'create'])->name('admin.rooms.create');
    Route::post('/admin/rooms', [RoomController::class, 'store'])->name('admin.rooms.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
