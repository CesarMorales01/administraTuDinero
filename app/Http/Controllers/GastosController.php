<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use stdClass;

class GastosController extends Controller
{
    public $global = null;

    public function index()
    {
        $fechas = $this->getFechasMes();
        $datos = app(SessionController::class)->cargarDatosGenerales();
        $spends = $this->listByDate($fechas->finicial, $fechas->ffinal);
        $gastos = $spends->original->gastos;
        $listaGastos = $spends->original->listaGastos;
        $categorias = DB::table('CateGastos')->where('usuario', '=', $datos->auth->email)->orderBy("ordenUsuario", "asc")->get();
        $token = csrf_token();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        return Inertia::render('Spend/Spend', compact('auth', 'globalVars', 'gastos', 'categorias', 'token', 'listaGastos'));
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
        $gastos = null;
        $listaGastos = null;
        $usuario = Auth::user()->email;
        if ($category == '') {
            $listaGastos = DB::table('Gastos')->where('usuario', '=', $usuario)->whereBetween('fecha', [$finicial, $ffinal])->orderBy('fecha', 'desc')->orderBy('codigo', 'desc')->get();
            $gastos = DB::table('Gastos')->select(DB::raw('SUM(valor) AS suma'))->where('usuario', '=', $usuario)->whereBetween('fecha', [$finicial, $ffinal])->get();
        } else {
            $listaGastos = DB::table('Gastos')->where('usuario', '=', $usuario)->where('categoria', '=', $category)->whereBetween('fecha', [$finicial, $ffinal])->orderBy('fecha', 'desc')->orderBy('codigo', 'desc')->get();
            $gastos = DB::table('Gastos')->select(DB::raw('SUM(valor) AS suma'))->where('usuario', '=', $usuario)->where('categoria', '=', $category)->whereBetween('fecha', [$finicial, $ffinal])->get();
        }
        $gastos = $gastos[0]->suma;
        $objeto = new stdClass();
        $objeto->gastos = $gastos;
        $objeto->listaGastos = $listaGastos;
        return response()->json($objeto, 200, []);
    }

    public function store(Request $request)
    {
        $auth = Auth::user();
        DB::table('Gastos')->insert([
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
        //Mostrar saldo (Diferencia entre ingresos y gastos)
        $fechas = $this->getFechasMes();
        $datos = app(SessionController::class)->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $token = csrf_token();
        $spends = $this->listByDate($fechas->finicial, $fechas->ffinal);
        $gastos = $spends->original->gastos;
        $listaGastos = $spends->original->listaGastos;
        $incomes=app(IngresosController::class)->listByDate($fechas->finicial, $fechas->ffinal);
        $ingresos = $incomes->original->ingresos;
        $listaIngresos = $incomes->original->listaIngresos;
        $categoriasGastos = DB::table('CateGastos')->where('usuario', '=', $datos->auth->email)->orderBy("ordenUsuario", "asc")->get();
        $categoriasIngresos = DB::table('CateIngresos')->where('usuario', '=', $datos->auth->email)->orderBy("ordenUsuario", "asc")->get();
        return Inertia::render('Saldo/Saldo', compact('auth', 'globalVars', 'token', 'gastos', 'listaGastos', 'ingresos', 'listaIngresos', 'categoriasGastos', 'categoriasIngresos'));
    }

    public function edit(string $id)
    {
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
        DB::table('Gastos')->where('codigo', '=', $id)->delete();
        $fechas = $this->getFechasMes();
        return response()->json($this->listByDate($fechas->finicial, $fechas->ffinal)->original, 200, []);
    }
}
