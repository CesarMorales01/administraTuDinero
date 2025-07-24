<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CateIngresosController extends Controller
{

    public function index()
    {
        $datos = app(SessionController::class)->cargarDatosGenerales();
        $categorias = $this->getListaCategorias($datos->auth->email);
        $token = csrf_token();
        $globalVars = $datos->globalVars;
        $auth = $datos->auth;
        return Inertia::render('CateIngresos/CategoriasIngresos', compact('auth', 'globalVars', 'categorias', 'token'));
    }

    public function getListaCategorias($usuario)
    {
        $categorias = DB::table('CateIngresos')->where('usuario', '=', $usuario)->orderBy("ordenUsuario", "asc")->get();
        foreach ($categorias as $key => $value) {
            $value->id = $value->codigo;
        }
        return $categorias;
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        DB::table('CateIngresos')->insert([
            'ordenUsuario' => $request->ordenUsuario,
            'usuario' => Auth::user()->email,
            'nombreCate' => $request->nombreCate,
        ]);
        return response()->json($this->getListaCategorias(Auth::user()->email), 200, []);

    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {

    }

    public function editarCategoria(Request $request)
    {
        //Editar nombre categoria
        $datos = json_decode(file_get_contents('php://input'));
        DB::table('CateIngresos')->where("codigo", "=", $datos->category->codigo)->update([
            "nombreCate" => $datos->category->nuevoNombre
        ]);
        DB::table('Ingresos')->where('categoria', '=', $datos->category->nombreCate)->where('usuario', "=", Auth::user()->email)->update([
            'categoria' => $datos->category->nuevoNombre
        ]);
        return response()->json($this->getListaCategorias(Auth::user()->email), 200, []);
    }

    public function update(Request $request, string $id)
    {
        //Reordenar categorias
        $datos = json_decode(file_get_contents('php://input'));
        foreach ($datos as $key => $value) {
            DB::table('CateIngresos')->where("codigo", "=", $value->codigo)->update([
                'ordenUsuario' => $value->ordenUsuario
            ]);
        }
        return response()->json($this->getListaCategorias(Auth::user()->email), 200, []);
    }

    public function destroy(string $id)
    {
        $getCate = DB::table('CateIngresos')->where('codigo', '=', $id)->first();
        $validarCate = DB::table('Ingresos')->where('usuario', "=", Auth::user()->email)->where('categoria', '=', $getCate->nombreCate)->first();
        if ($validarCate != null) {
            return response()->json('¡Categoria ocupada!', 200, []);
        } else {
            DB::table('CateIngresos')->where('codigo', '=', $id)->delete();
            return response()->json($this->getListaCategorias(Auth::user()->email), 200, []);
        }
    }
}