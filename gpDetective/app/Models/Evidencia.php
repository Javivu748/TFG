<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evidencia extends Model
{
    use HasFactory;

    protected $table = 'evidencias';

    protected $fillable = [
        'caso_id',
        'titulo',
        'archivo',
    ];

    // Evidencia pertenece a un Caso
    public function caso()
    {
        return $this->belongsTo(Caso::class);
    }
}
