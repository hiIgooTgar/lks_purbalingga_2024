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
        $passwords = Passwords::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
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

    public function update(Request $request, $id)
    {
        $passwords = Passwords::where('id', $id)->where('user_id', Auth::id())->firstOrFail();


        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|required|string|max:255' . $passwords->id,
            'password' => 'sometimes|required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 422);
        }

        $passwords->update([
            'username' => $request->input('username', $passwords->username),
            'password' => $request->has('password') ? Hash::make($request->password) : $passwords->password,
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
            'data' => $passwords
        ]);
    }

    public function destroy($id)
    {
        $passwords = Passwords::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $passwords->delete();

        return response()->json(['message' => 'Password has been successfully deleted']);
    }
}
