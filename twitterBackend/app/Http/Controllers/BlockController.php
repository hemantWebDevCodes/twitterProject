<?php

namespace App\Http\Controllers;
use App\Models\Block;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlockController extends Controller
{
    public function BlockAccount($blocked_id){

      $blocker_id = Auth::user()->id;
      $block = Block::where(['blocker_id' => $blocker_id, 'blocked_id' => $blocked_id ])->first();

      if($block){
         $unBlock = Block::where(['blocker_id' => $blocker_id, 'blocked_id' => $blocked_id ])->delete();

         return response()->json([
           'status' => true,
           'message' => "Account UnBlock Successfully.",
           'unblock' => $unBlock
         ]);
      }else{
        $block = Block::create([
            "blocker_id" => $blocker_id,
            "blocked_id" => $blocked_id
            ]);

            return response()->json([
            'status' => true,
            'Block' => $block,
            'message' => "Account Block Successfully"
            ]);
        }
    }

    public function showBlockedUser(){
      $block = Block::get();

      return response()->json([
        "status" => true,
        "blockData" => $block
      ]);
    }

}
