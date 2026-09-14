<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IdfController;
use App\Http\Controllers\DispositivoController;
use App\Http\Controllers\UsuarioController;

//Rutas del login
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

use App\Http\Middleware\RoleMiddleware;

// Rutas admin (acceso solo si rol = admin)
Route::middleware(['auth:sanctum', RoleMiddleware::class . ':admin'])->group(function () {
    Route::post('/idf', [IdfController::class, 'store']);
    Route::put('/idf/{id}', [IdfController::class, 'update']);
    Route::delete('/idf/{id}', [IdfController::class, 'destroy']);

    Route::post('/dispositivos', [DispositivoController::class, 'store']);
    Route::put('/dispositivos/{id}', [DispositivoController::class, 'update']);
    Route::delete('/dispositivos/{id}', [DispositivoController::class, 'destroy']);

    Route::post('/usuarios', [UsuarioController::class, 'store']);
    Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
    Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);
});

// Rutas de solo lectura (GET) accesibles por todos los roles
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/idf', [IdfController::class, 'index']);
    Route::get('/idf/{id}', [IdfController::class, 'show']);

    Route::get('/dispositivos', [DispositivoController::class, 'index']);
    Route::get('/dispositivos/{id}', [DispositivoController::class, 'show']);

    Route::get('/usuarios', [UsuarioController::class, 'index']);
    Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

