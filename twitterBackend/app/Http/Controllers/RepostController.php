<?php

namespace App\Http\Controllers;

use App\Models\Repost;
use Illuminate\Http\Request;
use App\Helpers\MentionHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RepostController extends Controller
{
  
    public function createRepost(Request $request, $type , $id){
        $validation = Validator::make($request->all(), [
            'description' => 'required|max:1000',
            'image' => 'mimes:png,jpg,webp,jpeg,mp4,mov,avi',
            'image_description' => 'max:1000',
        ]);

        if($validation->fails()){
           return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'error' => $validation->errors()->all()
           ]);
        }

           $fileName='';
           $fileType ='';
           
          if($request->hasFile('image')){
             $file = $request->file('image');
             $extension = $file->getClientOriginalExtension();
             $fileName = time(). '.' . $extension;
             $file = $file->move(public_path('images/Repost_images/') , $fileName);
          
             // FILE TYPE CHECK
            if(in_array($extension, ['jpg','png','jpeg','webp'])){
               $fileType = 'image';
            }elseif (in_array($extension, ['mp4','mov','avi'])) {
               $fileType = "video";
            }
         }

         // Id Type 
         $post_id = null;
         $comment_id = null;
         $type == 'post' ? $post_id = $id : $comment_id = $id;

         $user_id = Auth::user()->id;
         $rePostExists = Repost::where(['user_id' => $user_id, 'post_id' => $post_id])->exists();
 
         if($rePostExists){
            return response()->json([
               'status' => false,
               'message' => 'You have already reposted this post'
            ]);
         }
           
         $repost = Repost::create([
            'description' => $request->description,
            'image' => $fileName,
            'file_type' => $fileType,
            'image_description' => $request->image_description,
            'user_id' => $user_id,
            'post_id' => $post_id,
            'post_comment_id' => $comment_id,
            'type' => $type
         ]);

         MentionHelper::processMention($repost->description, $repost->id, 'repost');

         return response()->json([
            'status' => true,
            'message' => 'Repost Successfully Created',
            'Repost' => $repost
         ]);
      }

   // ShowSingle User Post
     public function showRepost($post_id){
        $user_id = Auth::user()->id;
        $rePost = Repost::where(['user_id' => $user_id, 'post_id' => $post_id])->with(['user','post'])->get();
 
         return response()->json([
            'status' => true,
            'message' => 'Repost Show',
            'posts' => $rePost,
         ]);
      }

      public function allReposts() {
         $rePostData = Repost::with('user','post')->get();

         return response()->json([
            'status' => true,
            'Messsage' => 'All Reposts',
            'rePosts' => $rePostData,
         ]);
      }


      // Delete Repost
      public function deleteRepost($repost_id){
         $user_id = Auth::user()->id;
         
         Repost::where(['user_id' => $user_id, 'id' => $repost_id])->delete();

         return response()->json([
           'status' => "true",
           'Message' => "Repost Delete Succssfully.",
           'Repost_id' => $repost_id 
         ]);
      }
   }
