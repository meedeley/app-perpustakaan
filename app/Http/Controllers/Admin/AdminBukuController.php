<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Buku;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class AdminBukuController extends Controller
{
    public function index()
    {
        return view('admin.master.buku.index');
    }

    public function fetch()
    {
        $data = Buku::query()
            ->select(['bukus.id', 'judul_buku', 'kode_buku', 'pengarang', 'tahun', 'k.id as kategori_id', 'k.nama as kategori'])
            ->leftJoin('kategoris as k', 'k.id', '=', 'bukus.kategori_id')
            ->get();

        return DataTables::of($data)->toJson();
    }

    public function getKategori()
    {
        $data = Kategori::query()->get();

        return response()->json([
            'statusCode' => 200,
            'data' => $data,
        ]);
    }

    public function create(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'kode_buku' => 'required',
            'judul_buku' => 'required|string',
            'pengarang' => 'required|string',
            'tahun' => 'required|numeric',
            'kategori' => 'required',
        ]);

        if ($validated->fails()) {
            return response()->json([
                'statusCode' => 409,
                'message' => 'Mohon isi form dengan benar',
                'errors' => $validated->errors(),
            ]);
        }

        $data = Buku::query()->create([
            'kode_buku' => $request->kode_buku,
            'judul_buku' => $request->judul_buku,
            'pengarang' => $request->pengarang,
            'tahun' => $request->tahun,
            'kategori_id' => $request->kategori,
        ]);

        return response()->json([
            'statusCode' => 200,
            'message' => 'Sukses membuat data buku',
            'data' => $data,
        ]);
    }

    public function update(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'kode_buku' => 'required',
            'judul_buku' => 'required|string',
            'pengarang' => 'required|string',
            'tahun' => 'required|numeric',
            'kategori' => 'required',
        ]);

        if ($validated->fails()) {
            return response()->json([
                'statusCode' => 409,
                'message' => 'Mohon isi form dengan benar',
                'errors' => $validated->errors(),
            ]);
        }

        $data = Buku::query()->find($request->id)->update([
            'kode_buku' => $request->kode_buku,
            'judul_buku' => $request->judul_buku,
            'pengarang' => $request->pengarang,
            'tahun' => $request->tahun,
            'kategori_id' => $request->kategori,
        ]);

        return response()->json([
            'statusCode' => 200,
            'message' => 'Sukses membuat data buku',
            'data' => $data,
        ]);
    }

    public function delete(int $id)
    {

        $data = Buku::query()->findOrFail($id);

        $data->delete();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Sukses menghapus data buku',
            'data' => $data,
        ]);

    }
}
