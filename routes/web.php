<?php

use App\Http\Controllers\Admin\AdminBukuController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminKategoriController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;


Route::get("/", function () {
    return redirect()->route('login');
});

Route::middleware('guest')->group(function () {
    Route::get("/register", [RegisterController::class, 'index'])->name('register');
    Route::post("/register", [RegisterController::class, 'store'])->name('register.store');
    Route::get("/login", [LoginController::class, 'index'])->name('login');
    Route::post("/login", [LoginController::class, 'login'])->name('login.store');
});



Route::middleware(['auth'])->prefix('administrator')->group(function () {
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::get("/users", [AdminUserController::class, 'index'])->name('users');

    Route::post('logout', [LoginController::class, 'logout'])->name('logout');


    /*
    |--------------------------------------------------------------------------
    | Route Untuk Kategori
    |--------------------------------------------------------------------------
    |
    |
    */
    Route::controller(AdminKategoriController::class)->group(function () {
        Route::get('/kategori', 'index');
        Route::post('/fetch/kategori', 'fetch');
        Route::post('/kategori/create', 'create');
        Route::put('/kategori/update', 'update');
        Route::delete('/kategori/{kategoris:id}', 'delete');
    });

    Route::controller(AdminBukuController::class)->group(function () {
        Route::get('/buku', 'index');
        Route::post('/fetch/buku', 'fetch');
        Route::get('/kode-buku', 'generateKodeBuku');
        Route::get('/select/kategori', 'getKategori');

        Route::post('/buku/create', 'create');
        Route::put('/buku/update', 'update');
        Route::delete('/buku/{bukus:id}', 'delete');
    });
});
