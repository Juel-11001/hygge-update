<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Color extends Model
{
    protected $guarded = [];
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_colors');
    }

    protected static function booted()
    {
        static::saved(function ($color) {
            Cache::forget('colors');
        });

        static::deleted(function ($color) {
            Cache::forget('colors');
        });
    }
}
