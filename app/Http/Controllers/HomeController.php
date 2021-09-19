<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if(Auth::user()->level == 'admin'){
            return view('home');
        }else{
            return view('user');
        }
    }
    public function customer()
    {
        if(Auth::user()->level == 'admin'){
            return view('home');
        }else{
            return redirect('/home');
        }
    }
    public function sale()
    {
        if(Auth::user()->level == 'admin'){
            return view('home');
        }else{
            return redirect('/home');
        }
    }
    public function sales()
    {
        if(Auth::user()->level == 'admin'){
            return view('home');
        }else{
            return redirect('/home');
        }
    }
}
