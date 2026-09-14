<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('idfs', function (Blueprint $table) {
            if (Schema::hasColumn('idfs', 'url')) {
                $table->renameColumn('url', 'configuracion'); // 👈 renombra
            }
        });
    }

    public function down(): void
    {
        Schema::table('idfs', function (Blueprint $table) {
            if (Schema::hasColumn('idfs', 'configuracion')) {
                $table->renameColumn('configuracion', 'url'); // rollback
            }
        });
    }
};
