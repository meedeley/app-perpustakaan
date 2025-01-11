<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    protected $fillable = [
        'kode_peminjaman',
        'tanggal_pinjam',
        'jatuh_tempo',
        'buku_id',
        'anggota_id'
    ];
}
