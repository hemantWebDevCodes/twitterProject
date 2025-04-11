<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Http\Request;
use App\Helpers\MentionHelper;
use App\Events\NotificationEvent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostCommentController extends Controller
{
   // Show All Comment
   public function singlePostComments() {
      $singlePostComment = PostComment::with(['user','post'])
                        ->orderBy('created_at', 'desc')
                        ->get();

      return response()->json([
         'status' => true,
         'Message' => "Post all comments",
         'singlePostComments' => $singlePostComment
      ]); 
   }

   // Create Comment
    public function createComment(Request $request, $type, $id){
       $validation = Validator::make($request->all(), [
          'description' => 'required|max:160',
          'image' => 'mimes:png,jpg,jpeg,webp',
          'image_description' => 'max:200'
       ]);

       if($validation->fails()){
          return response()->json([
             'status' => false,
             'message' => 'Validation error',
             'error' => $validation->errors()->all()
          ]);
       }

       $fileName = "";
       if($request->hasFile('image')){
         $file = $request->file('image');
         $fileName = time() . '.' . $file->getClientOriginalName();
         $file = $file->move(public_path('images/comment_images'), $fileName);
       }

      // Filter Ids
       $user_id = Auth::user()->id;
       $post_id = null;
       $repost_id = null;

       if($type == "post"){
         $post_id = $id;
       }else if($type == "Repost"){
         $repost_id = $id;
       }

      $comment = PostComment::create([
         'description' => $request->description,
        'image' => $fileName,
        'image_description' => $request->image_description,
        'user_id' => $user_id,
        'post_id' => $post_id,
        'repost_id' => $repost_id
       ]);

       MentionHelper::processMention($comment->description, $comment->id,"comment");

       broadcast(new NotificationEvent($user_id, "Hemant added a new comment!"))->toOthers();

       return response()->json([
         'status' => true,
         'message' => 'comment Posted succssfully',
         'error' => '',
         'id' => $post_id,
         'Repost_Id' => $repost_id,
         'type' => $type
       ]);
    }

   // Delete Comment
   public function deleteComment($comment_id){
      $user_id = Auth::user()->id;
      PostComment::where(['user_id' => $user_id, 'id' => $comment_id])->delete();

      return response()->json([
         'status' => true,
         'Message' => "Delete Comment Successfully",
         'comment_id' => $comment_id
      ]);
   }
}
