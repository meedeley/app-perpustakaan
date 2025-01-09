<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class AdminKategoriController extends Controller
{
    public function index()
    {
        return view('admin.master.kategori.index');
    }

    public function fetch()
    {
        $data = Kategori::query()->get();

        return DataTables::of($data)->make();
    }

    public function create(Request $request)
    {
        $validated = Validator::make($request->all(), [
            "nama" => "required|string|min:3"
        ]);

        if ($validated->fails()) {
            return response()->json([
                "statusCode" => 409,
                "message" => "Gagal membuat data kategori",
                "errors" => $validated->errors()
            ]);
        }

        $data = Kategori::query()->create([
            "nama" => $request->nama
        ]);

        return response()->json([
            "statusCode" => 200,
            "message" => "sukses membuat data kategori",
            "data" => $data
        ]);
    }

    public function update(Request $request)
    {
        $validated = Validator::make($request->all(), [
            "nama" => "required|string|min:3"
        ]);

        if ($validated->fails()) {
            return response()->json([
                "statusCode" => 409,
                "message" => "gagal update data kategori",
                "errors" => $validated->errors()
            ]);
        }

        $data = Kategori::query()->findOrFail($request->id);

        $data->update([
            "nama" => $request->nama
        ]);

        return response()->json([
            "statusCode" => 200,
            "message" => "sukses update data kategori",
        ]);
    }

    public function delete(int $id)
    {
        $data = Kategori::query()->findOrFail($id);

        $data->delete();

        return response()->json([
            "statusCode" => 200,
            "message" => "sukses menghapus data kategori"
        ]);
    }
}
