<?php

use App\Http\Controllers\Admin\AdminAnggotaController;
use App\Http\Controllers\Admin\AdminBukuController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminKategoriController;
use App\Http\Controllers\Admin\AdminPinjamController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/reset', function () {
    Artisan::call('migrate:fresh --seed');

    return redirect()->route('login');
});

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login.store');
});


Route::middleware(['auth'])->prefix('administrator')->group(function () {
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::get('/users', [AdminUserController::class, 'index'])->name('users');

    Route::post('logout', [LoginController::class, 'logout'])->name('logout');

    Route::controller(AdminKategoriController::class)->group(function () {
        Route::get('/kategori', 'index')->name('kategori');
        Route::post('/fetch/kategori', 'fetch');
        Route::post('/kategori/create', 'create');
        Route::put('/kategori/update', 'update');
        Route::delete('/kategori/{kategoris:id}', 'delete');
    });

    Route::controller(AdminBukuController::class)->group(function () {
        Route::get('/buku', 'index')->name('buku');
        Route::post('/fetch/buku', 'fetch');
        Route::get('/kode-buku', 'generateKodeBuku');
        Route::get('/select/kategori', 'getKategori');

        Route::post('/buku/create', 'create');
        Route::put('/buku/update', 'update');
        Route::delete('/buku/{bukus:id}', 'delete');
    });

    Route::controller(AdminAnggotaController::class)->group(function () {
        Route::get('/anggota', 'index')->name('anggota');
        Route::post('/fetch/anggota', 'fetch');
        Route::post('/print-modal/{id}', 'printModal');

        Route::post('/anggota/create', 'create');
        Route::put('/anggota/update', 'update');
        Route::delete('/anggota/{id}', 'delete');
    });

    Route::controller(AdminPinjamController::class)->group(function () {
        Route::get('/pinjam', 'index')->name('peminjam');
        Route::get('/fetch/pinjam', 'fetch');
        Route::post('/pinjam/create', 'create');

        Route::get('/select/buku', 'getBuku');
        Route::get('/select/anggota', 'getAnggota');
    });
});
