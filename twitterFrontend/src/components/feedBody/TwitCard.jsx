import React, { useEffect,} from 'react'
import {Bookmark,MentionUser , CommentPost, LikePost, Loading, PostMoreOption, ConverIndiaTime} from '../index'
import PostViewCount from './PostViewCount';
import Repost from './Repost';
import { useDispatch, useSelector } from 'react-redux';
import { allPosts } from '../../ReduxApi/postSlice';
import { Link, useNavigate } from 'react-router-dom';
import { showBlockedUser } from "../../ReduxApi/BlockAccount";
import { userMentionData } from '../../ReduxApi/MentionSlice';

function TwitCard({filter, listPostData}) {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {postData, loading} = useSelector((state) => state.post);
   const {blockData} = useSelector((state) => state.blockAccounts);
   const {profileData} = useSelector((state) => state.profile);
   
   // Show Posts if Condition is true
    const showPosts = filter === "listMemberPost" ? listPostData : postData;
   


    useEffect(() => {
      dispatch(allPosts({filter}));
    }, [dispatch, filter]);

    useEffect(() => {
      dispatch(showBlockedUser());
  }, [dispatch]);

  useEffect(() => {
      dispatch(userMentionData());
  }, [dispatch ]);
   
  return loading ? <Loading /> : (
    <div className='w-full h-full'>
      {showPosts?.map((post) => {

       if(blockData.some((block) => block.blocked_id === post.user_id && block.blocker_id === profileData.id))
         return null;

      if(filter==='allPosts' || filter === postData[0].user.id  || filter === "listMemberPost"){ 
        return ( 
          <div className="flex mt-3 border-b-[0.1px] space-x-1 border-zinc-700" key={post.id}>
            <div className="w-[10%]">
            {
              post?.user?.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${post?.user?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto'/> : 
              <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{post.user?.name[0].toUpperCase()}</h1>  
            }
          </div>
          <div className="w-[90%] flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold "> {post.user?.name} </h3>
                  <span className='ml-2 font-thin text-zinc-500'>{`${post.user?.slug}`}</span>
                  <span className='ml-2 font-thin text-zinc-400 text-sm'>
                    <ConverIndiaTime convertedTime={post.created_at} />
                  </span>
                </div>
                <span className='me-3'>  
                  <PostMoreOption post_id={post.id} type="post"/>
                </span>
              </div>
          
            <div className="cursor-pointer" onClick={() => navigate(`/postDeatail/${post.id}`)}> 
              <div className="mt-1">
                <p className='font-thin text-zinc-300 text-sm px-1'>
                  <MentionUser description={post?.description?.length > 30 ? post?.description?.split(' ').slice(0,30).join(' ') + '....' : post?.description}
                               id={post?.id} ptype="post"
                   />
                </p>
              </div>
              
              {post.image_description && (
                <div className="my-3">
                  <p className='font-thin text-zinc-300 text-sm'>
                    {post.image_description}
                  </p>
                </div>
              )}

              {post?.image && post?.file_type == "image" ? (
                <div className="w-[97%] h-auto mt-3">
                <img src={`http://localhost:8000/post_images/${post?.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
                </div>
              ) : ''}
          
              { post?.image && post?.file_type == "video" ? (
              <video className="w-[97%] h-52 mt-3" autoPlay muted controls>
                  <source src={`http://localhost:8000/post_images/${post?.image}`} type='video/mp4'/>
              </video>
              ) : ''}
          </div>

            <div className="flex justify-around items-center">
              <CommentPost post_id={post.id} commentAction="createComment" type="post" /> 
                
              <Repost post_id={post.id} type="post"/>

              <div className="flex items-center">
                <LikePost post_id={post.id} type="post"/>
              </div>  
              
              <PostViewCount post_id={post.id} />

              <Bookmark post_id={post.id} type="post" />
            </div>
          </div>
      </div>
    )}
  })
  }
    
  </div>
  )}

export default TwitCard
