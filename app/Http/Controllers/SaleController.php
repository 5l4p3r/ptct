<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function Get()
    {
        return DB::table('sales')->join('customers','customers.id','=','sales.customer_id')
        ->get();
    }
    public function Select($id)
    {
        return DB::table('sales')->join('customers','sales.customer_id','=','customers.id')
        ->where('customer_id',$id)->get();
    }
    public function Post(Request $request)
    {
        if($request->key == 'elbicnivni')
        {
            return Sale::create([
                'date' => Carbon::parse($request->date)->translatedFormat('l, d F Y'),
                'po' => $request->po,
                'goods' => $request->goods,
                'customer_id' => $request->customer_id,
                'price' => $request->price,
            ]);
        }
    }

    public function Total()
    {
        return DB::table('sales')
        ->select([DB::raw("SUM(price) AS total")])->get();
    }
}
