<?php

namespace App\Http\Controllers\APIAuth;

use App\Models\User;
use App\Models\Follower;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;

class UserController extends Controller{

    public function allUser() {
        $allUsers = User::where("id", '!=', Auth::user()->id)->inRandomOrder()->get();

        return response()->json([
          'status' => true,
          'message' => 'All User List',
          'allUser' => $allUsers
        ]);
    }

    public function editProfile(){
        $id = Auth::user()->id;
 
        $user = User::where('id', $id)->get();
        return $user;
     }

    public function singleProfile(string $id){
       $user = User::findOrfail($id);

       if($user){
          return response()->json(['user' => $user]);
       }else{
         return response()->json([
            'status' => false,
            'message' => 'User not Found'
         ]);
       }
    }
 
     public function updateProfile(Request $request) {
        $user = Auth::user();
 
        $validator = Validator::make($request->all(), [
          'name' => 'required|max:50',
          'bio' =>  'max:160',
          'location' => 'max:30',
          'website' => 'max:50',
         //  'profile_photo' => 'image|mimes:png,jpg,jpeg,webp',
         //  'background_img' => 'image|mimes:png,jpg,jpeg,webp',
          'dob' => 'required'
        ]);
 
        if($validator->fails()){
           return response()->json([
             'status' => false,
             'message' => 'Validation Error',
             'error' => $validator->errors()->all()
           ]);
        }
 
          // Profile image Upload
          $pro_fileName = $user->profile_img; 
         if($request->hasFile('profile_photo')){
            $pro_file = $request->file('profile_photo');
            $pro_fileName = time() . '_ProImage.' . $pro_file->getClientOriginalExtension();
            $pro_file = $pro_file->move(public_path('images/profile_images/') , $pro_fileName); 
           
            $proImgPath = public_path('/images/profile_images/' . $pro_fileName);
            $manager = new ImageManager(Driver::class);
            $proImage = $manager->read($proImgPath);
           
            // Crop image And Save Image in new foder   
            $proImage->cover(200, 200);
            $proImage = $proImage->toPng()->save(public_path('images/profile_images/thumb_pro/' . $pro_fileName));
           
            // Delete old Profile image
            File::delete(public_path('/images/profile_images/thumb_pro/') . $user->profile_photo);
            File::delete(public_path('/images/profile_images/') . $user->profile_photo);  
         }
 
         // Upload Profile Background Image
          $bg_imageName = $user->background_img;
         if($request->hasFile('background_img')){
           $bg_image = $request->file('background_img');
           $bg_imageName = time(). '_bgProImg.' . $bg_image->getClientOriginalExtension();
           $bg_image = $bg_image->move(public_path('/images/bg_profileImages/'), $bg_imageName); 
           
           // Delete old bg profile image
           File::delete(public_path('/images/bg_profileImages/') . $user->background_img);
         }

         $slug = str_replace('-','', Str::slug($request->name). rand(1000,9999));
 
         $user_id = $user->id;
         $userData = User::where('id',$user_id)->update([
           'name' => $request->name,
           'slug' => '@'.$slug,
           'bio' => $request->bio,
           'location' => $request->location,
           'website' => $request->website,
           'profile_photo' => $pro_fileName,
           'background_img' => $bg_imageName,
           'dob' => $request->dob
         ]);
 
         return response()->json([
           'status' => true,
           'message' => 'Prfile Update Successfully.',
           'result' => $request,
           'user_id' => $user_id
         ]);
           
        }
}
