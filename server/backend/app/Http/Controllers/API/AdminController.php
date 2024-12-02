<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json(['data' => $users]);
    }

    public function show($id)
    {
        $users = User::findOrFail($id);
        return response()->json(['data' => $users]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|max:255|unique:users,username',
            'email' => 'required|max:255|unique:users,email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 422);
        }

        $users = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role
        ]);

        return response()->json([
            'message' => 'Data users added successfully',
            'data' => $users
        ]);
    }

    public function update(Request $request, $id)
    {
        $users = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'username' => 'sometimes|required|string|max:255|unique:users,username,' . $users->id,
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $users->id,
            'password' => 'sometimes|required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 422);
        }

        $users->update([
            'name' => $request->input('name', $users->name),
            'username' => $request->input('username', $users->username),
            'email' => $request->input('email', $users->email),
            'password' => $request->has('password') ? Hash::make($request->password) : $users->password,
            'role' => $request->input('role', $users->role)
        ]);

        return response()->json([
            'message' => 'Data users updated successfully',
            'data' => $users
        ]);
    }

    public function destroy($id)
    {
        $users = User::findOrFail($id);
        $users->delete();

        return response()->json(['message' => 'User data has been successfully deleted']);
    }
}
