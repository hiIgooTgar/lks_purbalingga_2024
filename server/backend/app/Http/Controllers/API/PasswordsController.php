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

        if ($passwords->count()) {
            return response()->json(['data' => $passwords]);
        } else {
            return response()->json([
                'message' => 'Password found',
                'data' => 'Found'
            ]);
        }
    }

    public function show($id)
    {
        $passwords = Passwords::where('user_id', Auth::id())->find($id);

        if (!$passwords) {
            return response()->json([
                'message' => 'Password not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'data' => $passwords
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
            'user_id' => Auth::id(),
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password added successfully',
            'data' => $passwords
        ]);
    }

    public function update(Request $request, $id)
    {
        $passwords = Passwords::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'password' => 'sometimes|required|min:6' . $passwords->id
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 422);
        }

        $passwords->update([
            'password' => $request->has('password') ? Hash::make($request->password) : $passwords->password,
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
            'data' => $passwords
        ]);
    }

    public function destroy($id)
    {
        $passwords = Passwords::where('user_id', Auth::id())->find($id);
        $passwords->delete();

        return response()->json(['message' => 'Password has been successfully deleted']);
    }
}