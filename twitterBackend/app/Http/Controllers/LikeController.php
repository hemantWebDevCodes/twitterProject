<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function likePost(string $type, $id){

        $user_id = Auth::user()->id;

        $post_id = null;
        $repost_id=null;
        $comment_id = null;

        if($type == "post"){
           $post_id = $id;
        } else if($type == 'Repost'){
           $repost_id = $id;
        } else if($type == 'comment'){
           $comment_id = $id;
        }
 
        $exisLike = Like::where('user_id', $user_id)
           ->when($post_id, function($query, $post_id){
               return $query->where('post_id',$post_id);
           })
           ->when($repost_id, function($query, $repost_id) {
               return $query->where('repost_id',$repost_id);
           })
           ->when($comment_id, function($query, $comment_id){
               return $query->where('post_comment_id',$comment_id);
           })->first();
        
        
      //   (['user_id' => $user_id, 'post_id' => $post_id])->first();
        if($exisLike){
            $unLike = $exisLike->delete();
           
           return response()->json([
              'status' => 'unLike',
              'Message' => 'unlike post Successfully',
              'unlike' => $unLike,
              'type' => $type
            ]);
        }else{
          $postLike = Like::create([
            'user_id' => $user_id,
            'post_id' => $post_id,
            'repost_id' => $repost_id,
            'post_comment_id' => $comment_id,
            'type' => $type
          ]);

          return response()->json([
            'status' => 'Like',
            'Message' => 'Like post Successfully',
            'unlike' => $postLike,
            'type' => $type
         ]);
       }
    }

    // Post Like Count
    public function postLikeCount(){
      $postLikeCount = Like::with(['user','post'])->get();
   
      return response()->json([
         "status" => 'like',
         'Message' => 'Like Count',
         'likeDataCount' => $postLikeCount
      ]);
    }

}  
