<?php

namespace App\Http\Controllers;

use App\Models\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
  // POST VIEW COUNT
    public function postViewCount() {
      $postViewCount = View::get();

      return response()->json([
        'status' => true,
        'Message' => 'Post view count',
        'postViewCount' => $postViewCount
      ]);
    }

    // CEATE POST VIEW 
    public function postView($post_id){
      $user_id = Auth::user()->id;

      $isExistsPost = View::where(['user_id' => $user_id, 'post_id' => $post_id])->exists();

      if(!$isExistsPost){
        $view = View::create([
            'user_id' => $user_id,
            'post_id' => $post_id
        ]);

        return response()->json([
            'status' => true,
            'Message' => 'Post View',
            'view' => $view
        ]);
      }
    }
}
