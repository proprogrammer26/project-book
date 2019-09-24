<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // $this->validate($request,[
        //     'name' => 'required|string|max:50|min:3',
        //     'password' => 'required'
        // ])

        $user = User::find($request->id);

        if( $user ) {
            if( password_verify($user['password'], $request->password) ) {
                return response()->json([
                    'status' => true,
                    'message' => 'login berhasil'
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'password salah'
                ],400);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'user tidak ditemukan'
            ],404);
        }
    }

    public function register(Request $request)
    {
        $this->validate($request,[
            'name' => 'required|unique[users.name]',
            'password1' => 'required',
            'password2' => 'required',
        ]);
        
        $user = User::create([
            'name' => $request->name,
            'password' => $request->password1
        ]);

        if( $user ) {
            return response()->json([
                'status' => trur,
                'message' => 'user berhasil didaftar'
            ],404);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'resgister user gagal'
            ],400);
        }

    }
}
