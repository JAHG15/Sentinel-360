<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    // Obtener todos los usuarios, sin filtrar por estatus
    public function index()
    {
        return response()->json(Usuario::all());
    }

    public function show($id)
    {
        $usuario = Usuario::findOrFail($id);
        return response()->json($usuario);
    }

    // Crear usuario
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:80',
            'apellido_paterno' => 'required|string|max:30',
            'apellido_materno' => 'required|string|max:30',
            'correo' => 'required|string|email|max:80|unique:usuarios,correo',
            'password' => 'required|string|min:6',
            'telefono' => 'required|string|max:30',
            'rol' => 'nullable|string|in:usuario,admin',
            'estatus' => 'nullable|boolean',
        ]);

        $data = $request->all();
        $data['password'] = Hash::make($request->password);

        $usuario = Usuario::create($data);
        return response()->json($usuario, 201);
    }

    // Actualizar usuario, incluyendo estatus
    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $request->validate([
            'nombre' => 'sometimes|string|max:80',
            'apellido_paterno' => 'sometimes|string|max:30',
            'apellido_materno' => 'sometimes|string|max:30',
            'correo' => 'sometimes|string|email|max:80|unique:usuarios,correo,' . $id,
            'password' => 'sometimes|string|min:6',
            'telefono' => 'sometimes|string|max:30',
            'rol' => 'sometimes|string|in:usuario,admin',
            'estatus' => 'nullable|boolean',
        ]);

        $data = $request->all();
        if(isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $usuario->update($data);
        return response()->json($usuario);
    }

    // Eliminamos destroy porque no vamos a eliminar
}
