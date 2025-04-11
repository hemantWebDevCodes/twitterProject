<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    // Bookmark Add
    public function addBookmark($type, $id){

        $post_id = null;
        $repost_id = null;
        $user_id = Auth::user()->id;

        $type === "post" ? $post_id = $id : $repost_id = $id;
        
        // if Bookmark is already Exits.
         $bookmarkExits = Bookmark::where('user_id', $user_id)
          ->when($post_id, function($query, $post_id){
            return $query->where('post_id', $post_id);
          })
          ->when($repost_id, function($query, $repost_id){
            return $query->where('repost_id', $repost_id);
          })->first();


          if($bookmarkExits){
            // delete Bookmark
             $deleteBookmark = $bookmarkExits->delete();

             return response()->json([
               'status' => true,
               "Message" => "Delete bookMark",
               "Bookmark" => $deleteBookmark
             ]);
        }else{
            // Add Bookmark
            $bookmark = Bookmark::create([
                'user_id' => $user_id,
                'post_id' => $post_id,
                'repost_id' => $repost_id,
                'type' => $type
            ]);

            return response()->json([
                'status' => true,
                'Message' => 'Bookmark Post and Repost',
                'bookmark' => $bookmark
            ]);
        }
    }

    // All Bookmark Data 
    public function allBokmarkData(){
        $allBookmark = Bookmark::with('post','user')->get();

        return response()->json([
            'status' => true,
            "Message" => "The allBookmarks Data",
            "allBookmark" => $allBookmark
        ]);
    }

    // Delete All BookMark
   public function DeleteBookmarks(){
      $user_id = Auth::user()->id;
      $Bookmark = Bookmark::where('user_id', $user_id)->delete();

      return response()->json([
         'status' => true,
         'Message' => 'Bookmarks Delete Successfully.',
         'Bookmark' => $bookmark 
      ]);
   }
}