<?php

namespace Database\Seeders;

use App\Models\Anggota;
use Illuminate\Database\Seeder;

class AnggotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $anggota = [
            [
                'kode_anggota' => 'ANG001',
                'nama_anggota' => 'Nichola',
                'jenis_kelamin' => 'Laki Laki',
                'no_hp' => '0971287321',
            ],
            [
                'kode_anggota' => 'ANG002',
                'nama_anggota' => 'Budi',
                'jenis_kelamin' => 'Laki Laki',
                'no_hp' => '0812345678',
            ],
            [
                'kode_anggota' => 'ANG003',
                'nama_anggota' => 'Siti',
                'jenis_kelamin' => 'Perempuan',
                'no_hp' => '0856789123',
            ],
            [
                'kode_anggota' => 'ANG004',
                'nama_anggota' => 'Andi',
                'jenis_kelamin' => 'Laki Laki',
                'no_hp' => '0823456789',
            ],
            [
                'kode_anggota' => 'ANG005',
                'nama_anggota' => 'Rina',
                'jenis_kelamin' => 'Perempuan',
                'no_hp' => '0835678912',
            ],
            [
                'kode_anggota' => 'ANG006',
                'nama_anggota' => 'Ahmad',
                'jenis_kelamin' => 'Laki Laki',
                'no_hp' => '0854567890',
            ],
            [
                'kode_anggota' => 'ANG007',
                'nama_anggota' => 'Dewi',
                'jenis_kelamin' => 'Perempuan',
                'no_hp' => '0867891234',
            ],
            [
                'kode_anggota' => 'ANG008',
                'nama_anggota' => 'Joko',
                'jenis_kelamin' => 'Laki Laki',
                'no_hp' => '0876543210',
            ],
            [
                'kode_anggota' => 'ANG009',
                'nama_anggota' => 'Mila',
                'jenis_kelamin' => 'Perempuan',
                'no_hp' => '0891234567',
            ],
            [
                'kode_anggota' => 'ANG010',
                'nama_anggota' => 'Farid',
                'jenis_kelamin' => 'Laki Laki',
                'no_hp' => '0811122233',
            ],
        ];

        foreach ($anggota as $data) {
            Anggota::create($data);
        }
    }
}
