<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use App\User;
use DB;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::all();
        foreach( $books as $book ) {
            $book->nama_pengguna = $book->user->nama;
        }

        return response()->json([
            'status' => true,
            'data' => $books
        ],200);
    }

    public function store(Request $request)
    {
        $this->validate($request,[
            'judul' => 'required|max:100',
            'jumlah_halaman' => 'required|numeric',
            'penerbit' => 'required|string',
            'user_id' => 'required|numeric'
        ]);

        // cek umur user
        $user = User::find($request->user_id);
        if( $user ) {
            if( $user->umur < 17 ) {
                return response()->json([
                    'status' => false,
                    'message' => 'mohon maaf, anda masih terlalu muda'
                ],200);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'user tidak ditemukan'
            ],404); 
        }

        $book = Book::create($request->all());

        if( $book ) {
            return response()->json([
                'status' => true,
                'data' => 'buku berhasil ditambahkan'
            ],201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'buku gagal ditambahkan'
            ],400);
        }
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
            'judul' => 'required|max:100',
            'jumlah_halaman' => 'required|numeric',
            'penerbit' => 'required|string',
        ]);
        
        $book = Book::find($id);

        if( $book ) {
            $data = [
                'judul' => $request->judul,
                'jumlah_halaman' => $request->jumlah_halaman,
                'penerbit' => $request->penerbit
            ];
            
            $book->update($data);

            return response()->json([
                'status' => true,
                'message' => 'buku berhasil diupdate'
            ],201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'buku tidak ditemukan'
            ],404);  
        }
    }

    public function show($id)
    {
        $book = Book::find($id);
        $book->nama_pengguna = $book->user->nama;

        if( $book ) {
            return response()->json([
                'status' => true,
                'data' => $book
            ],201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'buku tidak ditemukan' 
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
        $book = Book::find($id);

        $book->delete();

        $books = Book::all();
        foreach( $books as $book ) {
            $book->nama_pengguna = $book->user->nama;
        }

        return response()->json([
            'status' => true,
            'message' => 'buku berhasil dihapus',
            'data' => $books
        ],201);
    }
}
