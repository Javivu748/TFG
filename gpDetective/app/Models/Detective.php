<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detective extends Model
{
    protected $fillable = [
        'user_id',
        'especialidad',
        'estado',
    ];

    // Relación con User (1 detective → 1 user)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con Casos (1 detective → N casos)
    public function casos()
    {
        return $this->hasMany(Caso::class);
    }
}