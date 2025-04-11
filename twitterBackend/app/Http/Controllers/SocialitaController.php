<?php

namespace App\Http\Controllers;

use Google\Client;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialitaController extends Controller
{

   public function googleLoginCallback(Request $request){
      
      $credential = $request->input('credential');

      $client = new Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
      $payload = $client->verifyIdToken($credential);

      if($payload){
        $user = User::updateOrCreate(
            ['email' => $payload['email']],
            [
                'name' => $payload['name'],
                'google_id' => $payload['sub'],
                'avatar' =>  $payload['picture'],
                'password' => bcrypt(Str::random(6))
            ]);
            
            Auth::login($user);

            $token = $user->createToken('Tweet Api Token')->plainTextToken;

            return response()->json([
            'status' => true,
            'message' => "logged in via Google",
            'token' => $token,
            'user' => $user
            ]);
        }else{
            return response()->json(['status' => false, 'message' => 'invalid Google  token'], 401);
        }
   }
}
