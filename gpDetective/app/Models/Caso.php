<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caso extends Model
{
    /** @use HasFactory<\Database\Factories\CasoFactory> */
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descripcion',
        'estado',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
