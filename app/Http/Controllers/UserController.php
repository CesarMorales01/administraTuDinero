<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Globalvar;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use stdClass;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetEmail;

class UserController extends Controller
{
    public $global = null;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function index()
    {

    }

    public function create()
    {
    }

    public function store(Request $request)
    {

    }

    public function show(string $email)
    {
        //buscar correo para recuperar contraseña
        $respuesta = "no existe";
        $getUser = DB::table('users')->where('email', $email)->first();
        if ($getUser != null) {
            $newpass = $this->generatepassword();
            DB::table('users')->where('email', $email)->update([
                'password' => Hash::make($newpass),
            ]);
            $getUser->newPassword=$newpass;
            $this->sendEmail($getUser);
            $respuesta = "¡Una nueva contraseña ha sido enviada a tu correo!";

        }

        return response()->json($respuesta, 200, []);
    }

    public function generatepassword()
    {
        $key = "";
        $pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
        $max = strlen($pattern) - 1;
        for ($i = 0; $i < 6; $i++) {
            $key .= substr($pattern, mt_rand(0, $max), 1);
        }
        return $key;
    }

    public function sendEmail($user)
    {
        $user->url = "https://administratudinero.tupaginaweb.site/";
        $user->urlGenial = "https://tupaginaweb.site/";
        Mail::to($user->email)->send(new PasswordResetEmail($user));
        return "Correo enviado a {$user->name}.";
    }

    public function edit(string $id)
    {
       //Seccion contacto
        $datos = app(SessionController::class)->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $info=DB::table("info_pagina")->first();
        return Inertia::render('Contact/ContactLayout', compact('auth', 'globalVars', 'info'));
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
