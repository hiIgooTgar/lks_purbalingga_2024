<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Passwords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordsController extends Controller
{
    public function index()
    {
        $passwords = Passwords::where('user_id', Auth::id())->get();
        return response()->json(['data' => $passwords]);
    }

    public function show($id)
    {
        $passwords = Passwords::where('id', $id)->where('user_id', Auth::id())->findOrFail();
        return response()->json(['data' => $passwords]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:255',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 422);
        }

        $passwords = Passwords::create([
            'user_id' => Auth::id(),
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password added successfully',
            'data' => $passwords
        ]);
    }

    public function destroy($id)
    {
        $passwords = Passwords::where('id', $id)->where('user_id', Auth::id())->findOrFail();
        $passwords->delete();

        return response()->json(['message' => 'Password successfully deleted']);
    }
}
