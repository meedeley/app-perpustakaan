<?php

namespace Database\Seeders;

use App\Models\Anggota;
use App\Models\Buku;
use App\Models\Kategori;
use App\Models\Peminjaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeminjamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Kategori::query()->create([
            "nama" => "Buku Ta Aruf"
        ]);

        Buku::query()->create([
            'kode_buku' => "BUKU-001",
            'judul_buku' => "JUDUL 123",
            'pengarang' => "Nichola",
            'tahun' => 2003,
            'kategori_id' => 1
        ]);

        Anggota::query()->create([
            'user_id' => 1,
            'kode_anggota' => "ANGGOTA--1",
            'nama_anggota' => "Nichola Saputra",
            'jenis_kelamin' => "Laki Laki",
            'no_hp' => "123",
            'password_anggota' => "PASSWORD"
        ]);

        Peminjaman::query()->create([
            "kode_peminjaman" => "ABC123",
            "tanggal_pinjam" => now(),
            "jatuh_tempo" => now(),
            "anggota_id" => 1,
            "buku_id" => 1,
        ]);
    }
}
