<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\BlockController;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\RepostController;
use App\Http\Controllers\searchController;
use App\Http\Controllers\MentionController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\PostListController;
use App\Http\Controllers\SocialitaController;

use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\APIAuth\AuthController;
use App\Http\Controllers\APIAuth\UserController;
use App\Http\Controllers\CommentReplyController;

Route::post('/signUp',[AuthController::class,'signUp']);
Route::post('/login', [AuthController::class,'login'])->name('login');

Route::post('logCheck', [PostController::class, 'logCheck']);


// Google Auth Configration Routes
Route::post('google-login', [SocialitaController::class, 'googleLoginCallback']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/allUser', [UserController::class,'allUser']);
    Route::post('/logout', [AuthController::class,'logout']);
    Route::post('/createPost', [PostController::class,'createPost']);
    Route::get('/allPost', [PostController::class,'getPost']);
    Route::get('/userPost', [PostController::class,'userPost']);
    Route::post('/like/{type}/{id}', [LikeController::class,'likePost']);
    Route::get('/likePostCount', [LikeController::class,'postLikeCount']);
    Route::post('/postView/{id}',[ViewController::class,'postView']);
    Route::get('/postViewCount',[ViewController::class,'postViewCount']);
    Route::post('/deletePost/{id}', [PostController::class, 'deletePost']);
    Route::post('/update_profile', [UserController::class,'updateProfile']);
    Route::get('/edit_profile', [UserController::class,'editProfile']);
    Route::get('/singleProfile/{id}',[UserController::class,'singleProfile']);
    Route::post('/follow/{id}', [FollowerController::class,'follow']);
    Route::get('/getFollowers/{id}', [FollowerController::class,'getFollowers']);
    Route::get('/isFollowingUser/{id}', [FollowerController::class,'isFollowingUser']);
    Route::get('/followingUserPosts', [PostController::class,'followingUserPosts']);
    Route::post('/createRepost/{type}/{id}',[RepostController::class,'createRepost']);
    Route::get('/showRepost/{id}', [RepostController::class, 'showRepost']);
    Route::get('/allReposts', [RepostController::class, 'allReposts']);
    Route::post('/deleteRepost/{id}', [RepostController::class,'deleteRepost']);
    Route::post('/create_comment/{type}/{id}', [PostCommentController::class,'createComment']);
    Route::post('/deleteComment/{id}', [PostCommentController::class,'deleteComment']);
    Route::get('/singlePostComments', [PostCommentController::class, 'singlePostComments']);
    Route::post('/createCommentReply/{id}', [CommentReplyController::class, 'createCommentReply']);
    Route::get('/showCommentReplies', [CommentReplyController::class, 'showCommentReplies']);
    Route::post('/addBookmark/{type}/{id}', [BookmarkController::class, 'addBookmark']);
    Route::get('/allBookmarkData', [BookmarkController::class,'allBokmarkData']);
    Route::post('/deleteBookmarks', [BookmarkController::class, 'DeleteBookmarks']);
    Route::post('/createPostList', [PostListController::class, 'createPostList']);
    Route::get('/showAllPostLists', [PostListController::class, 'showAllPostLists']);
    Route::post('/editPostList/{list_id}', [PostListController::class, 'editPostList']);
    Route::post('/deletePostList/{list_id}', [PostListController::class, 'deletePostList']);
    Route::post('/addUserList/{follower_Id}/{listId}/{postId}', [PostListController::class, 'addUserList']);
    Route::get('/showAllListUsers', [PostListController::class, 'showAllListUsers']);
    Route::post('/sendMessage/{receiverId}', [MessageController::class, 'sendMessage']);
    Route::post('/blockAccount/{blocked_id}', [BlockController::class, 'BlockAccount']);
    Route::get('/showBlockedUser', [BlockController::class, 'showBlockedUser']);
    Route::get('/searchData', [searchController::class, 'searchUsers']);
    Route::get('/userMentionData', [MentionController::class, 'userMentionData']);
});