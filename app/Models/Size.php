<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Size extends Model
{
    protected $guarded = [];
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_sizes');
    }

    protected static function booted()
    {
        static::saved(function ($size) {
            Cache::forget('sizes');
        });

        static::deleted(function ($size) {
            Cache::forget('sizes');
        });
    }
}
