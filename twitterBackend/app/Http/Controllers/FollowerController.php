<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    public function follow(Request $request, $follower_id){
       $following_id = Auth::user()->id;

       $isAllreadyUser = Follower::where([
                'following_id' => $following_id,
                'follower_id' => $follower_id
              ])->exists();
        
       if($isAllreadyUser){
            Follower::where([
              'following_id' => $following_id,
              'follower_id' => $follower_id
            ])->delete();
          
          return response()->json([
            'status' => 'unfollow',
            'message' => 'Unfollow Successfull',
            'isFollowing' => false
          ]);
      
       }else{
          $user = Follower::create([
            'following_id' => $following_id,
            'follower_id' =>  $follower_id
          ]);

          return response()->json([
            'status' => true,
            'message' => 'follow Successfull',
            'isFollowing' => true
        ]);
      }
    }

      public function isFollowingUser($follower_id){
        $following_id = Auth::user()->id;
        
        $isFollowExists = Follower::where([
                'follower_id' => $follower_id,
                'following_id' => $following_id
              ])->exists();

           return response()->json([
              'status' => 'following',
              'isFollowing' => $isFollowExists
           ]);
      }

      public function getFollowers($id){
        $followings = Follower::where('follower_id', $id)->count();
        $followers = Follower::where('following_id', $id)->count();

        return response()->json([
           'status' => true,
           'followers' => $followers,
           'followings' => $followings
        ]);
      }

    }
