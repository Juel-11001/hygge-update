<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Brand extends Model
{
    protected $guarded = [];


    public function scopeActive($query)
    {
        return $query->where('status', 1);        
    }
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', 1);
    }
    /** brand observer */
    protected static function booted()
    {
        static::saved(function ($brand) {
            Cache::forget('brands');
        });

        static::deleted(function ($brand) {
            Cache::forget('brands');
        });
    }
}
