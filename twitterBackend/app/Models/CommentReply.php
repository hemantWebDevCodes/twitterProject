<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentReply extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function user(){
        return $this->belongsTo(user::class);
    }

    public function postComment(){
        return $this->belongsTo(PostComment::class);
    }

}
