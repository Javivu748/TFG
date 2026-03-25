<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    // Redirige al login de Google
    public function redirect()
    {
        return Socialite::driver('google')
            ->redirect();
    }

    // Maneja el callback de Google
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate(
                ['google_id' => $googleUser->getId()],
                [
                    'nombre' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                ]
            );

            Auth::login($user);

            if (!$user->password || !$user->telefono) {
                return redirect()->route('completar.perfil');
            }

            // Redirige a la ruta principal de tu app
            return redirect()->intended('/dashboard');

        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}