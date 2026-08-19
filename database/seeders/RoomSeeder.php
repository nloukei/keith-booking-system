<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Room;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rooms = [
            [
                'name' => 'Deluxe Ocean Suite',
                'room_number' => 'SUITE-101',
                'type' => 'Deluxe Suite',
                'price_per_night' => 299.00,
                'capacity' => 2,
                'size_sqm' => 55,
                'description' => 'Private balcony overlooking the ocean, king-size canopy bed, marble bath, and 24-hour butler service.',
                'amenities' => ['Ocean View Balcony', 'King Bed', 'Marble Bathroom & Bathtub', '24/7 Butler Service', 'High-Speed Wi-Fi'],
                'status' => 'available',
            ],
            [
                'name' => 'Penthouse Villa',
                'room_number' => 'VILLA-501',
                'type' => 'Penthouse Suite',
                'price_per_night' => 450.00,
                'capacity' => 4,
                'size_sqm' => 120,
                'description' => 'Panoramic city skyline views, private rooftop plunge pool, dedicated lounge access, and chef dining.',
                'amenities' => ['Private Plunge Pool', 'King Bed', '24/7 Butler Service', 'Smart TV & Soundbar', 'Mini-bar & Coffee Maker'],
                'status' => 'available',
            ],
            [
                'name' => 'Garden View Room',
                'room_number' => 'ROOM-204',
                'type' => 'Standard Room',
                'price_per_night' => 180.00,
                'capacity' => 2,
                'size_sqm' => 40,
                'description' => 'Serene retreat surrounding lush tropical gardens, queen bed, high-speed Wi-Fi, and rainfall shower.',
                'amenities' => ['High-Speed Wi-Fi', 'Mini-bar & Coffee Maker', 'Smart TV & Soundbar'],
                'status' => 'available',
            ],
            [
                'name' => 'Executive Horizon Suite',
                'room_number' => 'SUITE-302',
                'type' => 'Executive Villa',
                'price_per_night' => 340.00,
                'capacity' => 3,
                'size_sqm' => 75,
                'description' => 'Expansive living room area with floor-to-ceiling glass windows and luxury soaking tub.',
                'amenities' => ['Ocean View Balcony', 'King Bed', 'Marble Bathroom & Bathtub', 'High-Speed Wi-Fi'],
                'status' => 'available',
            ],
        ];

        foreach ($rooms as $room) {
            Room::updateOrCreate(['room_number' => $room['room_number']], $room);
        }
    }
}
