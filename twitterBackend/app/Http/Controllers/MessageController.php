<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function sendMessage(Request $request, $receiver_id){
      $validator = Validator::make($request->all(), [
         'message' => 'required|max:1500',
      ]);

      // if($validator->fails()){
      //   return response()->json([
      //    'status' => false,
      //    'message' => "Validation Error",
      //    'error' => $validator->errors()->all()
      //   ]);
      // }

      $message = Message::create([
         'message' => $request->message,
         'sender_id' => Auth::user()->id,
         'receiver_id' => $receiver_id
      ]);

    //  BroadCast
     broadcast(new MessageEvent($message))->toOthers();

      return response()->json([
         'status' => true,
         'Message' => 'Message sent Successfully.',
         'erros' => null,
         'message' => $message,
       ]);
        
    }
}
