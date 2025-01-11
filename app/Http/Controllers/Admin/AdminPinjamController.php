<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use App\Models\Buku;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class AdminPinjamController extends Controller
{
    public function index()
    {
        return view('admin.pinjaman.index');
    }

    public function fetch()
    {
        $data = Peminjaman::query()->join('bukus as b', 'b.id', '=', 'buku_id')->join('anggotas as a', 'a.id', '=', 'anggota_id')->get();

        return DataTables::of($data)->toJson();
    }

    public function getBuku()
    {
        $data = Buku::query()->get(['id', 'judul_buku']);

        return response()->json([
            "statusCode" => 200,
            "data" => $data
        ]);
    }

    public function getAnggota()
    {
        $data = Anggota::query()->get(['id', 'nama_anggota']);

        return response()->json([
            "statusCode" => 200,
            "data" => $data
        ]);
    }

    public function create(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'kode_pinjam' => 'required|string|max:255',
            'tanggal_pinjam' => 'required|date',
            'jatuh_tempo' => 'required|date',
            'buku' => 'required',
            'anggota' => 'required',
        ]);

        if ($validated->fails()) {
            return response()->json([
                'statusCode' => 409,
                'message' => 'Gagal membuat data peminjaman',
                'errors' => $validated->errors(),
            ], 409);
        }

        $data = Peminjaman::create([
            'kode_peminjaman' => $request->kode_pinjam,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'jatuh_tempo' => $request->jatuh_tempo,
            'buku_id' => $request->buku,
            'anggota_id' => $request->anggota,
        ]);

        return response()->json([
            'statusCode' => 200,
            'message' => 'Sukses membuat data peminjaman',
            'data' => $data,
        ], 200);
    }
}
