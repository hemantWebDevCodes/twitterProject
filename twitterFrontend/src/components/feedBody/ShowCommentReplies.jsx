import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showCommentReplies } from '../../ReduxApi/postSlice';
import { Repost, LikePost, PostViewCount, CommentPost, TweetForm, MentionUser, ConverIndiaTime } from '../index'
import Loading from '../Loading';
import { useParams } from 'react-router';

function ShowCommentReplies() {

  const { id } = useParams();
  const comment_id = parseInt(id);

  const dispatch = useDispatch();
  const { commentReplyData, commentData, postData, loading } = useSelector((state) => state.post);

  // Comment Filter
  const comment = commentData.find((comment) => comment.id === comment_id);

  // Post Filter
  const post = postData.find((allPost) => allPost.id === comment.post_id);

  //  Comment Reply Filter
  const replyData = commentReplyData.filter((reply) => reply.post_comment_id === comment.id);

  useEffect(() => {
    dispatch(showCommentReplies());
  }, [dispatch]);

  return (
    <>

      {/* Show Post Deatail */}
      <div className="max-w-xl w-full h-full mt-3 border-b-[0.1px] border-zinc-700">
        <div className="flex flex-wrap items-center space-x-2 ms-3">
          {
            post?.user?.profile_photo
              ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${post?.user?.profile_photo}`} className='rounded-full w-12 h-12' />
              : <h1 className='text-[1.5rem] w-12 h-12 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>
                {post.user?.name[0].toUpperCase()}
              </h1>
          }
          <div className="mt-2">
            <h3 className="font-semibold leading-4"> {post.user?.name} </h3>
            <span className='font-thin text-zinc-500'>{`@${post.user?.slug}`}</span>
          </div>
        </div>
        <div className="flex flex-col ms-3 mt-2">

          <div className="mt-1">
            <p className='text-zinc-300 text-md'>
              <MentionUser description={post?.description} id={post?.id} ptype="post" />
            </p>
          </div>

          {post.image_description && (
            <div className="my-3">
              <p className='font-thin text-zinc-300 text-sm'>
                {post.image_description}
              </p>
            </div>
          )}

          {post.image && post.file_type == "image" ? (
            <div className="w-full h-full mx-auto mt-3">
              <img src={`http://localhost:8000/post_images/${post.image}`} alt="" className='w-full h-full rounded-xl object-cover' />
            </div>
          ) : ''}

          {post.image && post.file_type == "video" ? (
            <video className="w-[97%] h-52 mt-3" autoPlay muted controls>
              <source src={`http://localhost:8000/post_images/${post.image}`} type='video/mp4' />
            </video>
          ) : ''}

          <div className="my-2 border-b-[0.1px] border-zinc-800">
            <h1 className='text-gray-400 mb-4'>
              <ConverIndiaTime convertedTime={post.created_at} />
            </h1>

          </div>

          <div className="flex justify-between items-center border-b-[0.1px] border-zinc-800">
            <CommentPost post_id={post.id} commentAction='createComment' type='post' />

            <Repost post_id={post.id} />

            <LikePost post_id={post.id} type='post' />

          </div>
        </div>
      </div>

      {/* Comment Deatail */}
      {/* Show Post Deatail */}
      <div className="max-w-xl w-full h-full mt-3 border-b-[0.1px] border-zinc-700">
        <div className="flex flex-wrap items-center space-x-2 ms-3">
          {
            comment?.user?.profile_photo
              ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${comment?.user?.profile_photo}`} className='rounded-full w-12 h-12' />
              : <h1 className='text-[1.5rem] w-12 h-12 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>
                {comment.user?.name[0].toUpperCase()}
              </h1>
          }
          <div className="mt-2">
            <h3 className="font-semibold leading-4"> {comment.user?.name} </h3>
            <span className='font-thin text-zinc-500'>{`@${comment.user?.slug}`}</span>
          </div>
        </div>
        <div className="flex flex-col ms-3 mt-2">

          <div className="mt-1">
            <p className='text-zinc-300 text-md'>
              <MentionUser description={comment?.description} id={comment?.id} ptype="comment" />
            </p>
          </div>

          {comment.image_description && (
            <div className="my-3">
              <p className='font-thin text-zinc-300 text-sm'>
                {comment.image_description}
              </p>
            </div>
          )}

          {comment.image && comment.file_type == "image" ? (
            <div className="w-full h-full mx-auto mt-3">
              <img src={`http://localhost:8000/post_images/${comment.image}`} alt="" className='w-full h-full rounded-xl object-cover' />
            </div>
          ) : ''}

          {comment.image && post.file_type == "video" ? (
            <video className="w-[97%] h-52 mt-3" autoPlay muted controls>
              <source src={`http://localhost:8000/post_images/${comment.image}`} type='video/mp4' />
            </video>
          ) : ''}

          <div className="my-2 border-b-[0.1px] border-zinc-800">
            <h1 className='text-gray-400 mb-4'>
              <ConverIndiaTime convertedTime={comment.created_at} />
            </h1>

          </div>

          <div className="flex justify-between items-center border-b-[0.1px] border-zinc-800">
            <CommentPost comment_id={comment_id} commentAction='createComment' type='post' />

            <Repost comment_id={comment.id} />

            <LikePost comment_id={comment.id} type='post' />

          </div>
        </div>
      </div>

      <TweetForm action='commentReply' type='post' comment_id={comment.id} tweetBtnText='Reply' />

      {/* Show All Post Comments */}
      {loading ? <Loading /> : replyData.length > 0 ? replyData.map((replies) => (
        <div className="flex mt-3 border-b-[0.1px] border-zinc-700" key={replies.id}>
          <div className="w-[10%]">
            {
              replies?.user?.profile_photo
                ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${replies?.user?.profile_photo}`} className='rounded-full w-12 h-12 mx-auto' />
                : <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>
                  {replies.user?.name[0].toUpperCase()}
                </h1>
            }
          </div>
          <div className="w-[90%] flex flex-col">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold "> {replies.user?.name} </h3>
              <span className='ml-2 font-thin text-zinc-500'>{`${replies.user?.slug}`}</span>
              <span className='ml-2 font-thin text-zinc-400 text-sm'><ConverIndiaTime convertedTime={replies.created_at} /></span>
            </div>
            <div className="mt-1">
              <p className='font-thin text-zinc-300 text-sm'>
                <MentionUser description={replies?.description} id={replies?.id} ptype="commentReply" />
              </p>
            </div>

            {replies.image_description && (
              <div className="my-3">
                <p className='font-thin text-zinc-300 text-sm'>
                  {replies.image_description}
                </p>
              </div>
            )}

            {replies.image && (
              <div className="w-[97%] h-auto mt-3">
                <img src={`http://localhost:8000/images/cmntReply_images/${replies.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
              </div>
            )}

            {/* <div className="flex justify-between">
              <CommentPost comment_id={comment.id} post_id={post_id} type='post' commentAction='commentReply'/> 
                    
              <Repost comment_id={comment.id} type="comment" />
      
              <div className="flex items-center">
                <LikePost comment_id={comment.id} type='comment' />
              </div>  
                  
              <PostViewCount post_id={comment.post_id} />
            </div> */}
          </div>
        </div>
      )) : <span className='text-zinc-300 text-center py-4'>No comments yet</span>}
    </>
  )
}

export default ShowCommentReplies