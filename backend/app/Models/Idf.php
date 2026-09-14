<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idf extends Model
{
    use HasFactory;

    protected $table = 'idfs'; // nombre de la tabla
    protected $fillable = [
        'equipo',
        'ip',
        'ubicacion',
        'url',
        'fecha_creacion',
        'estatus'
    ];
}
