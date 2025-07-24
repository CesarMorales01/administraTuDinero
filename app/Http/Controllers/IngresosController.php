<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use stdClass;

class IngresosController extends Controller
{
    public $global = null;

    public function index()
    {
        $fechas = $this->getFechasMes();
        $datos = app(SessionController::class)->cargarDatosGenerales();
        $incomes=$this->listByDate($fechas->finicial, $fechas->ffinal);
        $ingresos = $incomes->original->ingresos;
        $listaIngresos = $incomes->original->listaIngresos;
        $categorias = DB::table('CateIngresos')->where('usuario', '=', $datos->auth->email)->orderBy("ordenUsuario", "asc")->get();
        $token = csrf_token();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        return Inertia::render('Income/Income', compact('auth', 'globalVars', 'ingresos', 'categorias', 'token', 'listaIngresos'));
    }

    public function getFechasMes()
    {
        $date = new DateTime();
        $año = $date->format("Y");
        $mes = $date->format("m");
        $finicial = $año . "-" . $mes . "-" . '01';
        $ffinal = $año . "-" . $mes . "-" . $date->format('t');
        $fechas = new stdClass();
        $fechas->finicial = $finicial;
        $fechas->ffinal = $ffinal;
        return $fechas;
    }

    public function create()
    {
    }

    public function listByDate($finicial, $ffinal, $category = '')
    {
        $ingresos = null;
        $lista = null;
        $usuario = Auth::user()->email;
        if ($category == '') {
            $lista = DB::table('Ingresos')->where('usuario', '=', $usuario)->whereBetween('fecha', [$finicial, $ffinal])->orderBy('fecha', 'desc')->get();
            $ingresos = DB::table('Ingresos')->select(DB::raw('SUM(valor) AS suma'))->where('usuario', '=', $usuario)->whereBetween('fecha', [$finicial, $ffinal])->orderBy('fecha', 'desc')->get();
        } else {
            $lista = DB::table('Ingresos')->where('usuario', '=', $usuario)->where('categoria', '=', $category)->whereBetween('fecha', [$finicial, $ffinal])->orderBy('fecha', 'desc')->get();
            $ingresos = DB::table('Ingresos')->select(DB::raw('SUM(valor) AS suma'))->where('usuario', '=', $usuario)->where('categoria', '=', $category)->whereBetween('fecha', [$finicial, $ffinal])->orderBy('fecha', 'desc')->get();
        }
        $ingresos = $ingresos[0]->suma;
        $objeto = new stdClass();
        $objeto->ingresos = $ingresos;
        $objeto->listaIngresos = $lista;
        return response()->json($objeto, 200, []);
    }

    public function store(Request $request)
    {
        $auth = Auth::user();
        DB::table('Ingresos')->insert([
            'fecha' => $request->fecha,
            'categoria' => $request->nombreCategoria,
            'valor' => $request->valor,
            'comentarios' => $request->comentario,
            'usuario' => $auth->email
        ]);
        $fechas = $this->getFechasMes();
        return response()->json($this->listByDate($fechas->finicial, $fechas->ffinal)->original, 200, []);
    }

    public function show(string $id)
    {
    }

    public function edit(string $id)
    {
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
        DB::table('Ingresos')->where('codigo', '=', $id)->delete();
        $fechas = $this->getFechasMes();
        return response()->json($this->listByDate($fechas->finicial, $fechas->ffinal)->original, 200, []);
    }
}