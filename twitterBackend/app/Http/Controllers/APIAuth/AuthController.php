<?php

namespace App\Http\Controllers\APIAuth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function signUp(Request $request){
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|max:6',
            'dob' => 'required',
            'mobile_number' => 'required|numeric|min:10',
        ]);

        if($validation->passes()){
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'dob' => $request->dob,
                'mobile_number' => $request->mobile_number
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Account Created Succefully',
            ]);
        }else{
            return response()->json([
               'status' => false,
               'message' => 'Validation Error',
               'error' => $validation->errors()->all()
            ]);
        }
    }

    // Login 
    public function login(Request $request){
        $validation = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validation->fails()){
            return response()->json([
                'status' => false,
                'Message' => 'Validation Error',
                'error' => $validation->errors()->all()
            ]);
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $authUser = Auth::user();
            return response()->json([
                'status' => true,
                'message' => 'You are logged in Successfully.',
                'token' => $authUser->createToken('Tweet Api Token')->plainTextToken,
                'token_type' => 'bearer'
            ]);
        }else{
            return response()->json([
               'status' => false,
               'message' => 'Either Email/Password IsInvalid.'
            ]);
        }
    }


    public function logout(Request $request){ 
       $user = $request->user();
       $user->tokens()->delete();

        return response()->json([
            'Msg' => "Logout Successfully."
        ]);
    }
    

    // Forgot Password

    // public function forgorPassword(Request $request){
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email|exists:users,email'
    //     ]);

    //     if($validator->fails()){
    //         return redirect()->route()->withInput()->withError($validator);
    //     }

    //     $password_token = Str::random(50);

    //     DB::table('password_reset_tokens')->where('email', $request->email)->delete();
    //     DB::table('password_reset_tokens')->insert([
    //        'email' => $request->email,
    //        'password_token' => $password_token,
    //        'created_at' => now()
    //     ]);

    //     $user = User::where('email', $request->email)->first();
    //     $maildata = [
    //         'token' => $password_token,
    //         'user' => $user,
    //         'subject' => 'You Have requested to Change Your Password'
    //     ];

    //     Mail::to($request->email)->send(new ResetPasswordMail($maildata));
    // }
}
