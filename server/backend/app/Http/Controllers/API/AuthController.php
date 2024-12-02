<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function registrasi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|max:255|unique:users',
            'email' => 'required|max:255|unique:users',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) return response()->json([
            'message' => 'Invalid field',
            'errors' => $validator->errors()
        ], 422);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'data' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) return response()->json([
            'message' => 'Invalid field',
            'errors' => $validator->errors()
        ], 422);

        if (!Auth::attempt($request->only('username', 'password'))) {
            return response()->json([
                'message' => 'Email or password incorrect'
            ], 401);
        } else {
            $user = User::where('username', $request->username)->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login success',
                'data_user' => $user,
                'token' => $token
            ]);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logout success'
        ]);
    }
}
