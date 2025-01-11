<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class AdminAnggotaController extends Controller
{
    public function index()
    {
        return view('admin.anggota.index');
    }

    public function fetch()
    {
        $anggota = Anggota::query()->leftJoin('users', 'users.id', '=', 'anggotas.user_id')->get();

        $result = collect($anggota->map(function ($data) {
            return [
                "id" => $data->id - 1,
                "user_id" => $data->user_id,
                "username" => $data->name,
                "email" => $data->email,
                "password" => $data->password_anggota,
                "kode_anggota" => $data->kode_anggota,
                "nama_anggota" => $data->nama_anggota,
                "jenis_kelamin" => strtolower($data->jenis_kelamin),
                "no_hp" => $data->no_hp
            ];
        }));

        return DataTables::of($result)->toJson();
    }

    public function printModal($id) : JsonResponse {
        $anggota = Anggota::query()->leftJoin('users', 'users.id', '=', 'anggotas.user_id')->find($id);

        return response()->json([
            "statusCode" => 200,
            "data" => $anggota
        ]);
    }

    public function create(Request $request)
    {
        $data = $request->all();

        $validated = Validator::make($data, [
            'username' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:3',
            'kode_anggota' => 'required',
            'nama_anggota' => 'required',
            'jenis_kelamin' => 'required|string',
            'no_hp' => 'required|string',
        ]);

        if ($validated->fails()) {
            return response()->json([
                "statusCode" => 409,
                "message" => "Mohon isi form dengan benar",
                "errors" => $validated->errors(),
            ]);
        }

        $userId = $request->user()->id;

        if ($userId == 1) {
            $user = User::query()->create([
                "name" => $request->username,
                "email" => $request->email,
                "password" => Hash::make($request->password)
            ]);

            $userId = $user->id;
        }

        $data = Anggota::query()->create([
            "user_id" => $userId,
            "kode_anggota" => $request->kode_anggota,
            "nama_anggota" => $request->nama_anggota,
            "jenis_kelamin" => ucfirst($request->jenis_kelamin),
            "no_hp" => $request->no_hp,
            "password_anggota" => $request->password
        ]);

        return response()->json([
            "statusCode" => 200,
            "message" => "Sukses membuat data buku",
            "data" => $data
        ]);
    }

    public function update(Request $request)
    {
        $anggota = Anggota::query()->find($request->id);

        if (!$anggota) {
            return response()->json([
                'status' => 'error',
                'statusCode' => 404,
                'message' => 'Data anggota tidak ditemukan'
            ], 404);
        }

        $validated = Validator::make($request->all(), [
            'password' => 'nullable|string|min:8',
            'kode_anggota' => 'nullable|string|max:50',
            'nama_anggota' => 'nullable|string|max:255',
            'jenis_kelamin' => 'nullable',
            'no_hp' => 'nullable|string',
        ]);

        if ($validated->fails()) {
            return response()->json([
                'status' => 'error',
                'statusCode' => 422,
                'errors' => $validated->errors()
            ], 422);
        }

        $userId = $request->user()->id;

        if ($userId === 1) {
            if ($request->email != $anggota->user->email) {
                $user = User::create([
                    'name' => $request->username,
                    'email' => $request->email,
                    'password' => Hash::make($request->password)
                ]);
                $userId = $user->id;
            }
        }

        $anggota->update([
            'kode_anggota' => $request->kode_anggota,
            'nama_anggota' => $request->nama_anggota,
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_hp' => $request->no_hp,
            'password_anggota' => $request->password,
        ]);

        return response()->json([
            'status' => 'success',
            'statusCode' => 200,
            'message' => 'Berhasil memperbarui data anggota',
            'data' => $anggota->fresh()
        ]);
    }

    public function delete($id)
    {
        $anggota = Anggota::query()->find($id);

        $anggota->delete();

        return response()->json([
            "statusCode" => 200,
            "message" => "Sukses menghapus data anggota",
            "data" => $anggota
        ]);
    }
}
