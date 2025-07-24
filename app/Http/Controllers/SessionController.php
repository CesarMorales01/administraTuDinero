<?php

namespace App\Http\Controllers;

use DB;
use Inertia\Inertia;
use App\Models\Globalvar;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use stdClass;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    public $global = null;

    public function __construct()
    {
        $this->global = new Globalvar();
    }
    public function index()
    {
        $auth = Auth::user();
        if ($auth) {
            return Redirect::route('home');
        } else {
            return Inertia::render('Dashboard', compact('auth'));
        }
    }

    public function home()
    {
        if (isset($_COOKIE['ultimaPantalla'])) {
            $valor_cookie = $_COOKIE['ultimaPantalla'];
            $pantallaInicio = $valor_cookie;
            if($pantallaInicio == "Gastos") {
                return Redirect::route('spend.index');
            } elseif ($pantallaInicio == "Ingresos") {
                return Redirect::route('income.index');
            } elseif ($pantallaInicio == "Saldo") {
                return Redirect::route('spend.show', "saldo");
            } else {
                return Redirect::route('spend.index');
            }
        } else {
            return Redirect::route('spend.show', "saldo");
        }
    }

    public function cargarDatosGenerales()
    {
        $datos = new stdClass();
        $datos->auth = Auth::user();
        $datos->globalVars = $this->global->getGlobalVars();
        $datos->usuarioAntiguo = DB::table('Usuarios')->where('correo', '=', $datos->auth->email)->first();
        return $datos;
    }


}
