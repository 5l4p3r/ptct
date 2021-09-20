<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/customer',[CustomerController::class, 'Post']);
Route::get('/customer',[CustomerController::class, 'Get']);
Route::put('/customer',[CustomerController::class, 'Put']);
Route::delete('/customer',[CustomerController::class,'Delete']);

Route::get('/sale',[SaleController::class, 'Get']);
Route::post('/sale',[SaleController::class,'Post']);

Route::get('/sales/{id}',[SaleController::class, 'Select']);

Route::get('/totalsales',[SaleController::class,'Total']);
Route::get('/totalcustomer',[CustomerController::class,'Total']);
