<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListUser extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function member(){
        return $this->belongsTo(user::class);
    } 

    public function postList(){
        return $this->belongsTo(PostList::class);
    }
}
