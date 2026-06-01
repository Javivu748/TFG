<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $avatarPath = $this->descargarAvatar(
                $googleUser->getAvatar(),
                $googleUser->getId()
            );

            $user = User::updateOrCreate(
                ['google_id' => $googleUser->getId()],
                [
                    'nombre' => $googleUser->getName(),
                    'email'  => $googleUser->getEmail(),
                    'avatar' => $avatarPath,
                ]
            );

            Auth::login($user);

            if (!$user->password || !$user->telefono) {
                return redirect()->route('completar.perfil');
            }

            if (Auth::user()->rol === 'Detective') {
                return redirect()->intended(route('detective.dashboard', absolute: false));
            }

            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    private function descargarAvatar(string $url, string $googleId): string
    {
        try {
            // Aumentar resolución de la foto de Google (de 96px a 200px)
            $url = preg_replace('/=s\d+-c$/', '=s200-c', $url);

            $response = Http::timeout(10)->get($url);

            if ($response->failed()) {
                return 'avatars/default.png';
            }

            // Detectar extensión por MIME type
            $mime = $response->header('Content-Type');
            $extension = match(true) {
                str_contains($mime, 'jpeg') => 'jpg',
                str_contains($mime, 'png')  => 'png',
                str_contains($mime, 'webp') => 'webp',
                default                     => 'jpg',
            };

            $filename = 'avatars/' . $googleId . '_' . time() . '.' . $extension;

            // Guarda en storage/app/public/avatars/
            Storage::disk('public')->put($filename, $response->body());

            return $filename;

        } catch (\Exception $e) {
            return 'avatars/default.png';
        }
    }
}