<?php

namespace App\Http\Controllers;

use App\Models\CommentReply;
use Illuminate\Http\Request;
use App\Helpers\MentionHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentReplyController extends Controller
{

   // Fetch All Comment Replies
    public function showCommentReplies(){
      $commentReplies = CommentReply::with(['user','postComment' => function($query){
          $query->with(['user','post']);
      },
     ])->get();

      return response()->json([
         "status" => true,
         "Message" => "Comment Replies Shows.",
         "commentReplies" => $commentReplies 
      ]);
    }


   // Create Comment Reply
    public function createCommentReply(Request $request, $comment_id){
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
        $fileType = '';
        
        if($request->hasFile('image')){
          $file = $request->file('image');
          $extention = $file->getClientOriginalName();
          $fileName = 'Reply_'.time() . '.' . $extention;
          $file = $file->move(public_path('images/cmntReply_images'), $fileName);

          if(in_array($extention, ['jpg','png','jpeg','webp'])){
             $fileType = "image";
          }elseif(in_array($extention, ['mp4','mov','avi'])){
             $fileType = "vedio";
          }

        }
 
        $user_id = Auth::user()->id;
 
        $commentReply = CommentReply::create([
         'description' => $request->description,
         'image' => $fileName,
         'image_description' => $request->image_description,
         'user_id' => $user_id,
         'post_comment_id' => $comment_id,
         'file_type' => $fileType
        ]);

        MentionHelper::processMention($commentReply->description, $commentReply->id, 'commentReply');
 
        return response()->json([
          'status' => true,
          'message' => 'comment Reply create succssfully',
          'error' => '',
        ]);
     }
}
