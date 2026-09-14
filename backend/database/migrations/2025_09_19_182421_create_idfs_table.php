<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('idfs', function (Blueprint $table) {
            $table->id();
            $table->string('equipo', 70);
            $table->string('ip', 20)-> unique();
            $table->string('ubicacion', 50);
            $table->text('url'); // longitud máxima
            $table->date('fecha_creacion')->default(DB::raw('CURRENT_DATE'));
            $table->boolean('estatus')->default(true);
            $table->timestamps(); // opcional: created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('idfs');
    }
};
