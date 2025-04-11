import React from 'react'
import { useSelector } from 'react-redux';
import {Repost, CommentPost,MentionUser,LikePost, PostViewCount, Loading, PostMoreOption} from '../index'
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js';

function ShowAllComments({post_id, Repost_id}) {
    
  const {commentData,  loading} = useSelector((state) => state.post);
  const allComments = commentData.filter((allComments) => post_id === allComments.post_id || Repost_id === allComments.repost_id);  // Filter single post comments in allComments
  const {blockData} = useSelector((state) => state.blockAccounts);
  const {profileData} = useSelector((state) => state.profile);
   
  //* Convert To Indian Standard Time
  const convertInTime = (IndTime) => {
    const data = new Date(IndTime);
      return data.toLocaleString('en-In', {
          timeZone : 'Asia/Kolkata',
          month : 'short',
          day : '2-digit',
    });
  }

      var pusher = new Pusher('3ce92970dbabbad5be44', {
        cluster: 'ap2'
      });
  
      var channel = pusher.subscribe('notification');
      channel.bind('notification', function(data) {
        alert(JSON.stringify(data));
        alert(data);
        
      });
  return (
    <>
    {/* Show All Post Comments */}
      { loading ? <Loading/> : allComments.length > 0 ? allComments.map((comment) => {
        if(blockData.some((block) => block.blocked_id === comment.user_id && block.blocker_id === profileData.id)) return null;
        return (
        <div className="flex mt-3 border-b-[0.1px] border-zinc-700 px-2" key={comment.id}>
          <div className="w-[10%]">
            {
              comment?.user?.profile_photo
               ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${comment?.user?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto'/> 
               : <h1 className='text-[1.5rem] w-10 h-10 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{comment.user?.name[0].toUpperCase()}</h1>  
            }
          </div>
          <div className="w-[87%] flex flex-col mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                 <h3 className="font-semibold "> {comment.user?.name} </h3>
                 <span className='ml-2 font-thin text-zinc-500'>{`${comment.user?.slug}`}</span>
                 <span className='ml-2 font-thin text-zinc-400 text-sm'>{convertInTime(comment.created_at)}</span>
              </div>
              <span className='me-3'>
                <PostMoreOption comment_id={comment.id} type="comment"/>
              </span>
            </div>
            <Link to={`http://localhost:5173/post/comment/${comment.id}`}>                
              <div className="mt-1">
                <p className='font-thin text-zinc-300 text-sm'>
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
      
              {comment.image && (
               <div className="w-[97%] h-auto mt-3">
                <img src={`http://localhost:8000/images/comment_images/${comment.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
               </div>
              )}
            </Link>
      
            <div className="flex justify-between">
              <CommentPost comment_id={comment.id} type='post' commentAction='commentReply'/> 
                    
              <Repost comment_id={comment.id} type="comment" />
      
              <div className="flex items-center">
                <LikePost comment_id={comment.id} type='comment' />
              </div>  
                  
              <PostViewCount post_id={comment.post_id} />
            </div>
          </div>
        </div>
      )}) : <span className='text-zinc-300 text-center py-4'>No comments yet</span>}
    </>
  )
}

export default ShowAllComments