<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passwords extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'username',
        'password'
    ];

    public function userModel()
    {
        return $this->belongsTo(User::class);
    }
}