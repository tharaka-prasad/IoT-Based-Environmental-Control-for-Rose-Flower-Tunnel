<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = ['device_type', 'status'];

    public function getStatusAttribute($value)
    {
        return ucfirst($value);  
    }
}
