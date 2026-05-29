<?php

use App\Http\Controllers\PerfilController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\CompletarPerfil;
use App\Http\Controllers\ChatController;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CasoController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DetectiveController;

//Ruta a la Landing Page
Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/servicios', function () {
    return Inertia::render('Servicios');
})->name('servicios');

Route::get('/preguntas', function () {
    return Inertia::render('Preguntas');
})->name('preguntas');

Route::get('/sobre', function () {
    return Inertia::render('Sobre');
})->name('sobre');

// Rutas protegidas para detectives
Route::middleware(['auth', 'es.detective'])->group(function () {
    Route::get('/detective/dashboard', [DetectiveController::class, 'index'])
         ->name('detective.dashboard');

    Route::get('/detective/casos/{id}', [DetectiveController::class, 'show'])
         ->name('detective.caso');

    Route::get('/detective/evidencia/{id}/descargar', [DetectiveController::class, 'descargarEvidencia'])
         ->name('detective.evidencia.descargar');
    Route::delete('/detective/casos/{id}', [DetectiveController::class, 'cerrarCaso'])->name('detective.caso.eliminar');
    
});

Route::get('/dashboard', [CasoController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'es.admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/usuarios/{user}', [AdminController::class, 'detalleUsuario'])->name('admin.usuario.detalle');
    Route::delete('/admin/usuarios/{user}', [AdminController::class, 'eliminarUsuario'])->name('admin.usuario.eliminar');
    Route::post('/admin/casos/{id}/alternar-estado', [AdminController::class, 'alternarEstado'])->name('admin.caso.alternar-estado');
    Route::delete('/admin/casos/{id}', [AdminController::class, 'eliminarCaso'])->name('admin.caso.eliminar');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [PerfilController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [PerfilController::class, 'update'])->name('profile.update');
    Route::get('/completar-perfil', [CompletarPerfil::class, 'show'])->name('completar.perfil');
    Route::post('/completar-perfil', [CompletarPerfil::class, 'update']);
    Route::get('/crear-caso', [CasoController::class, 'create'])->name('crear.caso');
    Route::post('/crear-caso', [CasoController::class, 'store'])->name('crear.caso.store');
    Route::get('/casos/{caso}/evidencias/crear', [CasoController::class, 'createEvidencia'])->name('caso.evidencia.create');
    Route::post('/casos/{caso}/evidencias', [CasoController::class, 'storeEvidencia'])->name('caso.evidencia.store');
});

Route::get('/auth/google',          [GoogleController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleController::class, 'callback']);



require __DIR__.'/auth.php';
