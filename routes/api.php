<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\URLController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/shorten', [URLController::class, 'store']);
Route::get('/{shortened_url}', [URLController::class, 'show']);
