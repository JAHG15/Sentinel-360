<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Idf;

class IdfController extends Controller
{
    // Crear
    public function store(Request $request)
    {
        $request->validate([
            'equipo' => 'required|string|max:70',
            'ip' => 'required|string|max:20',
            'ubicacion' => 'required|string|max:50',
            'url' => 'nullable|url', // ✅ ahora no es obligatoria
            'estatus' => 'required|boolean'
        ]);

        $idf = Idf::create([
            'equipo' => $request->equipo,
            'ip' => $request->ip,
            'ubicacion' => $request->ubicacion,
            'url' => $request->url, // puede venir nula
            'fecha_creacion' => now(),
            'estatus' => $request->estatus
        ]);

        return response()->json($idf, 201);
    }

    // Consultar todos
    public function index()
    {
        $idfs = Idf::where('estatus', true)->get();
        return response()->json($idfs);
    }

    // Consultar uno por id
    public function show($id)
    {
        $idf = Idf::find($id);
        if (!$idf || !$idf->estatus) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        return response()->json($idf);
    }

    // Actualizar
    public function update(Request $request, $id)
    {
        $idf = Idf::find($id);
        if (!$idf || !$idf->estatus) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        $request->validate([
            'equipo' => 'sometimes|string|max:70',
            'ip' => 'sometimes|string|max:20',
            'ubicacion' => 'sometimes|string|max:50',
            'url' => 'nullable|url', // ✅ también aquí
            'estatus' => 'sometimes|boolean'
        ]);

        $idf->update($request->all());
        return response()->json($idf);
    }

    // "Eliminar" (solo cambia estatus a false)
    public function destroy($id)
    {
        $idf = Idf::find($id);
        if (!$idf || !$idf->estatus) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        $idf->estatus = false;
        $idf->save();

        return response()->json(['message' => 'Registro desactivado correctamente']);
    }
}
