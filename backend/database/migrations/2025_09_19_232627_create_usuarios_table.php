<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 80);
            $table->string('apellido_paterno', 30);
            $table->string('apellido_materno', 30);
            $table->string('correo', 80)->unique();
            $table->string('password', 255);
            $table->string('telefono', 30);
            $table->string('rol', 20)->default('usuario'); // nuevo campo
            $table->boolean('estatus')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
