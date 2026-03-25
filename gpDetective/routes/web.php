<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\CompletarPerfil;
use App\Http\Controllers\ChatController;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Auth\GoogleController;

//Ruta a la Landing Page
Route::get('/', function () {
    return Inertia::render('Landing');
});


Route::get('/sobre', function () {
    return Inertia::render('Sobre');
})->name('sobre');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/completar-perfil', [CompletarPerfil::class, 'show'])->name('completar.perfil');
    Route::post('/completar-perfil', [CompletarPerfil::class, 'update']);
});

Route::get('/auth/google',          [GoogleController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleController::class, 'callback']);



require __DIR__.'/auth.php';
