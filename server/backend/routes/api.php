<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix(('auth'))->group(function () {
    Route::post("registrasi", [AuthController::class, 'registrasi']);
    Route::post("login", [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout'])->name('logout');

    Route::middleware('roleIsAdmin')->group(function () {
        Route::get('/admin/users', [AdminController::class, 'index']);
        Route::get("/admin/users/{id}", [AdminController::class, 'show']);
        Route::post('/admin/users', [AdminController::class, 'store']);
        Route::put('/admin/users/{id}', [AdminController::class, 'update']);
        Route::delete("/admin/users/{id}", [AdminController::class, 'destroy']);
    });
});
