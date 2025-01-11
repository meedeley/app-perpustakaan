<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    protected $table = 'bukus';

    protected $fillable = [
        'kode_buku',
        'judul_buku',
        'pengarang',
        'tahun',
        'kategori_id',
    ];
}
