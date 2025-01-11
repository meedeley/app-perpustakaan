<?php

namespace Database\Seeders;

use App\Models\Buku;
use Illuminate\Database\Seeder;

class BukuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bukus = [
            [
                'kode_buku' => 'AGB123',
                'judul_buku' => 'Pemrograman Laravel Dasar',
                'pengarang' => 'Nichola',
                'tahun' => 2004,
                'kategori_id' => 1,
            ],
            [
                'kode_buku' => 'AGB124',
                'judul_buku' => 'Mengenal PHP Modern',
                'pengarang' => 'Nichola',
                'tahun' => 2005,
                'kategori_id' => 2,
            ],
            [
                'kode_buku' => 'AGB125',
                'judul_buku' => 'Dasar-dasar Algoritma',
                'pengarang' => 'Nichola',
                'tahun' => 2006,
                'kategori_id' => 3,
            ],
            [
                'kode_buku' => 'AGB126',
                'judul_buku' => 'Panduan Database MySQL',
                'pengarang' => 'Nichola',
                'tahun' => 2007,
                'kategori_id' => 4,
            ],
            [
                'kode_buku' => 'AGB127',
                'judul_buku' => 'Membangun REST API',
                'pengarang' => 'Nichola',
                'tahun' => 2008,
                'kategori_id' => 5,
            ],
            [
                'kode_buku' => 'AGB128',
                'judul_buku' => 'Framework Laravel Lanjutan',
                'pengarang' => 'Nichola',
                'tahun' => 2009,
                'kategori_id' => 6,
            ],
            [
                'kode_buku' => 'AGB129',
                'judul_buku' => 'Pemrograman JavaScript Modern',
                'pengarang' => 'Nichola',
                'tahun' => 2010,
                'kategori_id' => 7,
            ],
            [
                'kode_buku' => 'AGB130',
                'judul_buku' => 'Belajar React.js dari Nol',
                'pengarang' => 'Nichola',
                'tahun' => 2011,
                'kategori_id' => 8,
            ],
            [
                'kode_buku' => 'AGB131',
                'judul_buku' => 'Next.js untuk Frontend Developer',
                'pengarang' => 'Nichola',
                'tahun' => 2012,
                'kategori_id' => 9,
            ],
            [
                'kode_buku' => 'AGB132',
                'judul_buku' => 'Cara Efisien Menulis Kode',
                'pengarang' => 'Nichola',
                'tahun' => 2013,
                'kategori_id' => 10,
            ],
        ];

        foreach ($bukus as $buku) {
            Buku::query()->create($buku);
        }
    }
}
