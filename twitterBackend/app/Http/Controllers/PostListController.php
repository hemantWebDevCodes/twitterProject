<?php

namespace App\Http\Controllers;

use App\Models\ListUser;
use App\Models\PostList;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;


class PostListController extends Controller
{
  
  //Fetch All List 
  public function showAllPostLists(){
   
    $AllPostLists = PostList::with('user')->inRandomOrder()->get();

    return response()->json([
        'status' => true,
        'Message' => 'All Post Lists Show',
        'allPostLists' => $AllPostLists
    ]);
  }  

  public function createPostList(Request $request){
     $validator = Validator::make($request->all(), [
        'name' => 'required|max:50',
        'description' => 'max:300',
        'background_img' => 'mimes:png,jpg,jpeg,webp'
     ]);

    // Form Validation 
     if($validator->fails()){
        return response()->json([
           'status' => false,
           'Message' => 'Validation Error',
           'Validation' => $validator->errors()->all()
        ]);
     }

     $fileName = '';
     $cropImg = '';
     if($request->file('listBg_img')){
        $file = $request->file('listBg_img');
        $fileName = 'listBgImg_'.time(). '.'. $file->getClientOriginalExtension();
        $cropImg = 'listCropImg_'.time(). '.'. $file->getClientOriginalExtension();
        $file = $file->move(public_path('images/list_images/listBgImg/'), $fileName);

        $filePath = public_path('/images/list_images/listBgImg/' .$fileName);
        $manager = new ImageManager(Driver::class);
        $listCropImg = $manager->read($filePath);

        // Crop image And Save Image in new foder   
        $listCropImg->cover(200, 200);
        $listCropImg = $listCropImg->toPng()->save(public_path('/images/list_images/cropListImg/' . $cropImg));
            
     }

     $user_id = Auth::user()->id;

     $PostList = PostList::create([
        'listBg_img' => $fileName,
        'cropImg' => $cropImg,
        'name' => $request->name,
        'description' => $request->description,
        'listType' => $request->listType,
        'user_id' => $user_id
     ]);

     return response()->json([
        'status' => true,
        'Messsage' => 'List created successfully.',
        'error' => null,
        'postList' => $PostList
     ]);
  }

  // Users List 
  public function addUserList($follower_id,$list_id,$post_id){
      $member_id = Auth::user()->id;

      $ifExitUserList = ListUser::where([
                              'member_id' => $member_id,
                              'follower_id' => $follower_id,
                              'post_list_id' => $list_id,
                           ]);
      
      if($ifExitUserList->exists()){
          $deleteExitUserList = $ifExitUserList->delete();

          return response()->json([
            'status' => true,
            'Message' => "list User deleted successfully.",
            'deleteListUser' => $deleteExitUserList
          ]);
      }else{
         $userList = ListUser::create([
            'member_id' => $member_id,
            'follower_id' => $follower_id,
            'post_list_id' => $list_id,
            'post_id' => $post_id
         ]);

         return response()->json([
            'status' => true,
            'Message' => "User Add in list",
            'userList' => $userList
         ]);
      }
  }  

  // Delete List 
  public function deletePostList($list_id){
   $list = PostList::where('id', $list_id)->first();
   
   // Delete Images
   File::delete(public_path('images/list_images/listBgImg/') . $list->listBg_img);
   File::delete(public_path('images/list_images/cropListImg/') . $list->cropImg);

   $deleteList = $list->delete();

   return response()->json([
     'status' => true,
     'message' => "Delete List",
     'Delete Detail' => $deleteList
   ]);
  }  

 // Show Users List
  public function showAllListUsers(){
    $listUsers = ListUser::with('member','postList')->get();

    return response()->json([
      'status' => true,
      'message' => "Show Lists USer",
      'listUsers' => $listUsers
    ]);
  }
  
  // Edit List
  public function editPostList(Request $request,$list_id){
   $validator = Validator::make($request->all(), [
      'name' => 'required|max:100',
      'description' => 'max:300',
      'background_img' => 'mimes:png,jpg,jpeg,webp'
   ]);

  // Form Validation 
   if($validator->fails()){
      return response()->json([
         'status' => false,
         'Message' => 'Validation Error',
         'Validation' => $validator->errors()->all()
      ]);
   }

   // Edit List Data
   $list = PostList::where('id', $list_id)->first();
   $user_id = Auth::user()->id;

   $fileName = '';
   $cropImg = '';
   if($request->file('listBg_img')){
      $file = $request->file('listBg_img');
      $fileName = 'listBgImg_'.time(). '.'. $file->getClientOriginalExtension();
      $cropImg = 'listCropImg_'.time(). '.'. $file->getClientOriginalExtension();
      $file = $file->move(public_path('images/list_images/listBgImg/'), $fileName);

      $filePath = public_path('/images/list_images/listBgImg/' .$fileName);
      $manager = new ImageManager(Driver::class);
      $listCropImg = $manager->read($filePath);

      // Crop image And Save Image in new foder   
      $listCropImg->cover(200, 200);
      $listCropImg = $listCropImg->toPng()->save(public_path('/images/list_images/cropListImg/' . $cropImg));
      File::delete(public_path('images/list_images/listBgImg/') . $list->listBg_img);
      File::delete(public_path('images/list_images/cropListImg/') . $list->cropImg);
   }


   $editListData = PostList::where(['id'=>$list_id,'user_id' => $user_id])->update([
     'name' => $request->name,
     'listBg_img' => $fileName,
     'cropImg' => $cropImg,
     'description' => $request->description,
     'listType' => $request->listType,
     'user_id' => $user_id, 
   ]);

   return response()->json([
      'status' => true,
      'Message' => 'List Updated Successfully',
      'editListData' => $editListData,
      'list' =>  $list->cropImg
   ]);
 }   

}
