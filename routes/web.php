<?php
use App\Http\Controllers\CateGastosController;
use App\Http\Controllers\CateIngresosController;
use App\Http\Controllers\GastosController;
use App\Http\Controllers\IngresosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SessionController::class, 'index'])->name('dashboard');
Route::get('/searchemailuser/{email}', [UserController::class, 'show']);


Route::middleware('auth')->group(function () {
    Route::get('/home', [SessionController::class, 'home'])->name('home');
    Route::resource('/spend', GastosController::class);
    Route::get('/spend/list/bydate/{finicial}/{ffinal}/{category?}', [GastosController::class, 'listByDate']);
    Route::post('/editarcategoriagasto', [CateGastosController::class, 'editarCategoria']);
    Route::resource('/catespend', CateGastosController::class);
    Route::post('/editarcategoriaingresos', [CateIngresosController::class, 'editarCategoria']);
    Route::resource('/cateincome', CateIngresosController::class);
    Route::get('/income/list/bydate/{finicial}/{ffinal}/{category?}', [IngresosController::class, 'listByDate']);
    Route::resource('/income', IngresosController::class);
    Route::resource('/user', UserController::class);
    

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    


});

require __DIR__ . '/auth.php';
