<?php 

namespace App\Helpers;

use App\Models\User;
use App\Models\Mention;
use Illuminate\Support\Facades\Auth;


  class MentionHelper {
     public static function processMention($content, $id, $type){
          //  Mentions Handle
        preg_match_all('/@(\w+)/', $content, $mentions);

        if(!empty($mentions[1])){
           $mentionUserIds = [];
           
           foreach($mentions[1] as $username){
              $mentionedUser = User::where('slug', '@'.$username)->first();
             
              if($mentionedUser){
                 $mentionUserIds[] = [
                    "id" => $mentionedUser->id, 
                    "slug" => $mentionedUser->slug,
                 ];
              }
          
          } 

              if(!empty($mentionUserIds)){
                 Mention::create([
                    'user_id' => Auth::user()->id,
                    'mentions' => $mentionUserIds,
                    'type' => $type,
                    'type_id' => $id,
                 ]);
              }
        }
     }
  }
?>