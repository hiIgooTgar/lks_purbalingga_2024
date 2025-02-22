<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Passwords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminPasswordController extends Controller
{
    public function index()
    {
        $passwords = Passwords::with('user')->get();
        if ($passwords->count() > 0) {
            return response()->json([
                'data' => $passwords->map(function ($password) {
                    return [
                        'id' => $password->id,
                        'user_id' => $password->user_id,
                        'name' => $password->user->name,
                        'username' => $password->user->username,
                        'email' => $password->user->email,
                        'role' => $password->user->role,
                        'password' => $password->password,
                    ];
                })
            ]);
        } else {
            return response()->json([
                'message' => 'No passwords found',
                'data' => []
            ]);
        }
    }

    public function show($id)
    {
        $password = Passwords::with('user')->findOrFail($id);
        if (!$password) {
            return response()->json([
                'message' => 'Password not found',
                'data' => null
            ], 404);
        }
        return response()->json([
            'data' => [
                'id' => $password->id,
                'user_id'  => $password->user_id,
                'name'     => $password->user->name,
                'username' => $password->user->username,
                'email'    => $password->user->email,
                'role'     => $password->user->role,
                'password' => $password->password,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 422);
        }

        $passwords = Passwords::create([
            'user_id' => $request->user_id,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password added successfully',
            'data' => $passwords
        ]);
    }

    public function update(Request $request, $id)
    {
        $passwords = Passwords::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'password' => 'sometimes|required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 422);
        }

        $passwords->update([
            'user_id' => $request->input('user_id', $passwords->user_id),
            'password' => $request->has('password') ? Hash::make($request->password) : $passwords->password,
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
            'data' => $passwords
        ]);
    }

    public function destroy($id)
    {
        $passwords = Passwords::findOrFail($id);
        $passwords->delete();

        return response()->json(['message' => 'Password has been successfully deleted']);
    }
}