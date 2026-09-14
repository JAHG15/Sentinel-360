<?php

namespace App\Http\Controllers;

use App\Models\Dispositivo;
use Illuminate\Http\Request;

class DispositivoController extends Controller
{
    // Listar todos
    public function index()
    {
        return response()->json(Dispositivo::where('estatus', true)->get());
    }

    // Mostrar por ID
    public function show($id)
    {
        $dispositivo = Dispositivo::findOrFail($id);
        return response()->json($dispositivo);
    }

    // Crear nuevo
    public function store(Request $request)
    {
        $request->validate([
            'equipo' => 'required|string|max:30',
            'ip' => 'required|string|max:30',
            'mac' => 'required|string|max:30',
            'idf' => 'required|string|max:50',
            'puerto' => 'nullable|numeric',
        ]);

        $dispositivo = Dispositivo::create($request->all());
        return response()->json($dispositivo, 201);
    }

    // Actualizar
    public function update(Request $request, $id)
    {
        $dispositivo = Dispositivo::findOrFail($id);
        $dispositivo->update($request->all());
        return response()->json($dispositivo);
    }

    // Eliminar (solo cambiar estatus a false)
    public function destroy($id)
    {
        $dispositivo = Dispositivo::findOrFail($id);
        $dispositivo->estatus = false;
        $dispositivo->save();

        return response()->json(['message' => 'Dispositivo desactivado correctamente']);
    }
}
