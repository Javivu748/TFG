<?php

namespace App\Mail;

use App\Models\Caso;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NuevoCasoMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public Caso $caso
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nuevo caso creado: ' . $this->caso->titulo,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.casos.nuevo',
        );
    }
}