<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sensor extends Model
{
    use HasFactory;

    protected $fillable = ['temperature', 'humidity', 'soil_moisture', 'gas', 'ldr'];
}
