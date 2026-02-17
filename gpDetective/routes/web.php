<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use Inertia\Inertia;

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
});

Route::post('/chat', [ChatController::class, 'sendMessage']);
Route::post('/chat/stream', [ChatController::class, 'streamMessage']);

require __DIR__.'/auth.php';
