<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function Get()
    {
        return Customer::all();
    }
    public function Post(Request $request)
    {
        if($request->key == 'elbicnivni')
        {
            return Customer::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
            ]);
        }
    }
    public function Total()
    {
        return DB::table('customers')
        ->select([DB::raw("COUNT(id) AS total")])->get();
    }
}
