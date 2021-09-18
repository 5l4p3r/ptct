<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(Auth::user()){
        return redirect('/home');
    }else{
        return view('welcome');
    }
});

Auth::routes();
Route::get('/me',function(){
    return User::where('id',Auth::user()->id)->get();
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
