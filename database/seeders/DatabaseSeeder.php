<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Peminjaman;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            // KategoriSeeder::class,
            // BukuSeeder::class,
            // AnggotaSeeder::class
            // PeminjamSeeder::class
        ]);
    }
}
