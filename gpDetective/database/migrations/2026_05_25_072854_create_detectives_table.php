<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detectives', function (Blueprint $table) {
            $table->id();                                                        
            $table->foreignId('user_id')                                        
                  ->constrained('users')                                        
                  ->onDelete('cascade');                                                                   
            $table->string('especialidad')->nullable();                         
            $table->enum('estado', ['activo', 'inactivo'])->default('activo'); 
            $table->timestamps();                                               
        });

        // Modificamos casos para añadir el detective asignado
        Schema::table('casos', function (Blueprint $table) {
            $table->foreignId('detective_id')
                  ->nullable()
                  ->constrained('detectives')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        // Primero quitamos la FK de casos antes de borrar detectives
        Schema::table('casos', function (Blueprint $table) {
            $table->dropForeign(['detective_id']);
            $table->dropColumn('detective_id');
        });

        Schema::dropIfExists('detectives');
    }
};