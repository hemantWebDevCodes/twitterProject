<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Models\Mention;
use App\Models\Follower;
use Illuminate\Http\Request;
use App\Helpers\MentionHelper;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
   // All POST
    public function getPost(){
       $posts = Post::with('user')->orderBy('id','desc')->get();
      
       return response()->json([
         'status' => 'true',
         'message' => 'All Post',
         'allPosts' => $posts
       ]);
    }
    
    public function logCheck(Request $request){
      $user = User::find(5); // Replace with a valid user ID
      Auth::login($user);
      dd(Auth::check()); // Should return "true"
    }
    
   //  CREATE POST
    public function createPost(Request $request){
       $validation = Validator::make($request->all(), [
           'description' => 'required|max:1000',
           'image' => 'required|mimes:png,jpg,webp,jpeg,mp4,mov,avi|max:20480',
           'image_description' => 'max:1000',
       ]);

       if($validation->passes()){

         $fileName = '';

         if($request->file('image')){
            $file = $request->file('image');
            $extention = $file->getClientOriginalExtension();
            $fileName = 'post_'.time(). '.' . $extention;
            $file = $file->move(public_path('/post_images/'), $fileName);
         }

         // Type Check
         $fileType = '';
         if(in_array($extention, ['mp4','mov','avi'])){
              $fileType = "video";
         }else if( in_array($extention, ['png','jpg','webp','jpeg'])){
             $fileType ='image';
         }         
           
          $post = Post::create([
            'description' => $request->description,
            'image' => $fileName,
            'file_type' => $fileType,
            'image_description' => $request->image_description,
            'user_id' => Auth::user()->id,
            'post_time' => now(),
          ]);

         MentionHelper::processMention($request->description, $post->id, 'post');

          return response()->json([
             'status' => true,
             'message' => 'Post created successfully.',
             'image' => asset('post_images/' . $fileName)
          ]);
       }else{
          return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'error' => $validation->errors()->all()
          ]);
       }
    }
      
      public function userPost(){
         $user_id = Auth::user()->id;

         $userPost = Post::with('user')->where('user_id', $user_id)->get();

         // return $userPost;

         return response()->json([
            'status' => 'userPost',
            'Message' => 'User Post Show',
            'userPost' => $userPost
         ]);
      }

      // User can view following user posts
      public function followingUserPosts(){
         $user = Auth::user()->id;

         $followers = Follower::where('following_id', $user)->pluck('following_id');
         $posts = Post::with('user')->whereIn('postuser_id', $followers)->get();

         return response()->json([
            'status' => 'followingUserPosts',
            'Message' => 'following User Posts',
            "posts" => $posts
         ]);         
      }

      // Delete Post
      public function deletePost($post_id){
         $user_id = Auth::user()->id;
         $postDelete = Post::where(['user_id' => $user_id, 'id' => $post_id])->delete();
         

         return response()->json([
            'status' => true,
            'Message' => "Post Deleted successful.",
            'DeletedPost' => $postDelete,
            'post_id' => $post_id
         ]);
      }

}
