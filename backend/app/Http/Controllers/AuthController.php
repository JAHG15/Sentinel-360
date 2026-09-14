<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'password' => 'required'
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        // Validar credenciales
        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // 🚨 Validar si el usuario está inactivo
        if ($usuario->estatus == 0) {
            return response()->json(['message' => 'Usuario inactivo, no puede iniciar sesión'], 403);
        }

        // Crear token que expira en 15 minutos
        $token = $usuario->createToken('auth_token', [], now()->addMinutes(15))->plainTextToken;

        // Definir rutas permitidas según rol
        $rutas = [];
        if ($usuario->rol === 'admin') {
            $rutas = [
                '/idf' => ['GET','POST','PUT','DELETE'],
                '/dispositivos' => ['GET','POST','PUT','DELETE'],
                '/usuarios' => ['GET','POST','PUT','DELETE'],
            ];
        } else {
            $rutas = [
                '/idf' => ['GET'],
                '/dispositivos' => ['GET'],
                '/usuarios' => ['GET'],
            ];
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $usuario,
            'rutas' => $rutas
        ]);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}
