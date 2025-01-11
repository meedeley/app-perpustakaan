<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategori = [
            ['nama' => 'Buku Dewasa'],
            ['nama' => 'Buku Anak-anak'],
            ['nama' => 'Novel'],
            ['nama' => 'Komik'],
            ['nama' => 'Ensiklopedia'],
            ['nama' => 'Biografi'],
            ['nama' => 'Karya Ilmiah'],
            ['nama' => 'Fiksi'],
            ['nama' => 'Non-Fiksi'],
            ['nama' => 'Buku Referensi'],
        ];

        foreach ($kategori as $data) {
            Kategori::create($data);
        }
    }
}
