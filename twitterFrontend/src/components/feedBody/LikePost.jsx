import React, { useEffect, useState } from 'react'
import {VscHeartFilled, FaRegHeart} from '../Icons'
import { useDispatch, useSelector } from 'react-redux';
import { likePostCount, likeRepost } from '../../ReduxApi/LikeAndBookmarkConcept';

function LikePost({post_id , Repost_id, type, comment_id}) {

    const dispatch = useDispatch();
    const {likesData} = useSelector((state) => state.likesPost);
    const {profileData} = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(likePostCount());
    }, [dispatch]);

    // Find the likes for the current post or repost
    const like = likesData.likeDataCount?.filter((likes) =>
                 likes.post_id === post_id || likes.repost_id === Repost_id || likes.post_comment_id === comment_id
    );

  // HANDLE POST AND REPOST
  const handleLikePost = () => {
        dispatch(likeRepost({Repost_id, post_id, type, comment_id}));
  }

  return (
    <div className='flex items-center hover:text-pink-600 text-zinc-400'>
      <span className='p-2 hover:bg-pink-600/20 rounded-full'>
        {like && like.some((elem) => elem.user_id === profileData.id) ? (
          <VscHeartFilled size="1.2em" onClick={handleLikePost} className='cursor-pointer text-pink-600 font-bold '/>
        ) : (
          <FaRegHeart size="1.1em" onClick={handleLikePost} className={`cursor-pointer font-bold`}/>
        )}
      </span>
     <span className='text-sm'>{like ? like?.length : 0}</span>
    </div>
  )
}

export default LikePost

