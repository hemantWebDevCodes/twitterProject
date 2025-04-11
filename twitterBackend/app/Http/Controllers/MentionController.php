<?php

namespace App\Http\Controllers;

use App\Models\Mention;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MentionController extends Controller
{
    public function userMentionData(){
      $mention = Mention::with('user')->get();

        return response()->json([
           'status' => true,
           'message' => "User Mention Data.",
           'mentionData' => $mention 
        ]);
    }
}
