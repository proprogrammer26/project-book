<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('cors');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        
        return response()->json([
            'status' => true,
            'data' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'nama' => 'required|min:3|max:50|string',
            'password' => 'required|min:3',
            'umur' => 'required|numeric'
        ]);

        $user = User::create([
            'nama' => $request->nama,
            'password' => password_hash($request->password,PASSWORD_DEFAULT),
            'umur' => $request->umur
        ]);


        if( $user ) {
            return response()->json([
                'status' => true,
                'message' => 'user berhasil ditambahkan'
            ],201);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'user gagal ditambahkan'
            ],400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if( $user ) {
            return response()->json([
                'status' => true,
                'data' => $user
            ],200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'user tidak ditemukan'
            ],404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'nama' => 'required|min:3|max:50|string',
            'umur' => 'required|numeric'
        ]);

        $user = User::find($id);

        if( $user ) {
            $data = [
                'nama' => $request->nama,
                'umur' => $request->umur
            ]; 

            $user->update($data);

            return response()->json([
                'status' => true,
                'message' => 'user berhasil diupdate'
            ],200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'user tidak ditemukan'
            ],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);  
        $user->delete();

        $users = User::all();

        return response()->json([
            'status' => true,
            'message' => 'user berhasil dihapus',
            'data' => $users
        ],201);
    }
}
