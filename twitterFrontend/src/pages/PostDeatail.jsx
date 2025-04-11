import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import {CommentPost,MentionUser, LikePost, Loading, Repost, TweetForm, ShowAllComments, PostMoreOption, ConverIndiaTime} from '../components/index';
import { createViewPost } from '../ReduxApi/postView';

function PostDeatail() {

  const {id} = useParams();
  const post_id = parseInt(id); 
  const dispatch = useDispatch();
  
  const {postData, loading} = useSelector((state) => state.post);
  const postDeatail = postData.find((post) => post.id === post_id); // Filter Post in allPosts

  // Creaete View Count
  useEffect(() => {
     if(postDeatail){
        dispatch(createViewPost(postDeatail.id));
     }
  }, [dispatch,postDeatail]);

  return loading ? <Loading/> : (
    <>
      {/* Show Post Deatail */}
        <div className="flex mt-3 border-b-[0.1px] space-x-1 border-zinc-700" key={postDeatail.id}>
          <div className="w-[10%]">
            {
              postDeatail?.user?.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${postDeatail?.user?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto'/> : 
              <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{postDeatail.user?.name[0].toUpperCase()}</h1>  
            }
          </div>
          <div className="w-[90%] flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                  <h3 className="font-semibold "> {postDeatail.user?.name} </h3>
                  <span className='ml-2 font-thin text-zinc-500'>{`${postDeatail.user?.slug}`}</span>
              </div>
              <span className='me-3'>  
                <PostMoreOption post_id={postDeatail.id} type="post"/>
              </span>
            </div>
      
          <div className="mt-1">
            <p className='font-thin text-zinc-300 text-sm'>
              <MentionUser description={postDeatail?.description} id={postDeatail.id} ptype="post" />
            </p>
          </div>
          
          {postDeatail.image_description && (
            <div className="my-3">
              <p className='font-thin text-zinc-300 text-sm'>
                {postDeatail.image_description}
              </p>
            </div>
          )}
    
          {postDeatail?.image && postDeatail?.file_type == "image" ? (
            <div className="w-[97%] h-auto mt-3">
            <img src={`http://localhost:8000/post_images/${postDeatail?.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
            </div>
          ) : ''}
      
          { postDeatail?.image && postDeatail?.file_type == "video" ? (
          <video className="w-[97%] h-52 mt-3" autoPlay muted controls>
              <source src={`http://localhost:8000/post_images/${postDeatail?.image}`} type='video/mp4'/>
          </video>
          ) : ''}

         <div className="my-2 border-b-[0.1px] border-zinc-800">
            <h2 className='text-gray-500 mb-4'>
              <ConverIndiaTime convertedTime={postDeatail.created_at} />
            </h2>
         </div>
    
        <div className="flex justify-between items-center border-b-[0.1px] px-2 border-zinc-800">
          <CommentPost post_id={postDeatail.id} commentAction='createComment' type='post'/>     
          <Repost post_id={postDeatail.id} />
          <LikePost post_id={postDeatail.id} type='post' />  
        </div>
      </div>
    </div>
        <TweetForm action='createComment' type='post' post_id={post_id} tweetBtnText="Reply"/> 
        <ShowAllComments post_id={post_id} />    
    </>
    )   
  }
    

export default PostDeatail
