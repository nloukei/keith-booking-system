<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'name',
        'room_number',
        'type',
        'price_per_night',
        'capacity',
        'size_sqm',
        'description',
        'amenities',
        'status',
    ];

    protected $casts = [
        'price_per_night' => 'decimal:2',
        'capacity' => 'integer',
        'size_sqm' => 'integer',
        'amenities' => 'array',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
