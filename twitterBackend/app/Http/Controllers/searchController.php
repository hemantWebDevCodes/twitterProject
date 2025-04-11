<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Bookmark;
use App\Models\PostList;
use Illuminate\Http\Request;

class searchController extends Controller
{
    public function searchUsers(Request $request){
        $search = $request->query('q');
        if(!$search){
            return response()->json([]);
        }

        $users = User::where('name', 'LIKE', "%{$search}%")
                 ->distinct()
                 ->get();

        $Lists = PostList::with('user')->where('name', 'LIKE', "%{$search}%")
                 ->distinct()
                 ->get();

        $bookmark = Bookmark::with('post','repost')
                ->whereHas('post', function($post) use ($search) {
                    $post->where('description', 'LIKE', "%{$search}%");
                }
                )->orWhereHas('repost', function($repost) use($search) {
                    $repost->where('description', 'LIKE', "%{$search}%");
                })
                ->distinct()
                ->get();

            return response()->json([
                'searchingData' => $users,
                'lists' => $Lists,
                'bookMark' => $bookmark
            ]);
    }
}
