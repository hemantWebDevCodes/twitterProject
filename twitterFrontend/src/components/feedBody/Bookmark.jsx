import React, { useEffect } from 'react'
import {FaRegBookmark, FaBookmark} from '../Icons'
import { useDispatch, useSelector } from 'react-redux'
import { allBookmarkData, bookmarkPostAndRepost } from '../../ReduxApi/LikeAndBookmarkConcept';

function Bookmark({post_id , Repost_id, type}) {

  const dispatch = useDispatch();
  const {bookmarkData} = useSelector((state) => state.likesPost);
  const {profileData} = useSelector((state) => state.profile);

  // Filter Bookmarks Add
  const bookmark = bookmarkData.filter((bookmark) => bookmark.post_id === post_id || bookmark.repost_id === Repost_id);  

  // Add Bookmark 
  const bookmartBtn = () => {
    dispatch(bookmarkPostAndRepost({post_id,Repost_id, type})); 
  }

  useEffect(() => {
    dispatch(allBookmarkData());
  }, []);

  return (
    <div className="flex  items-center text-zinc-400 cursor-pointer">
      <span className='hover:bg-green-500/20 p-2 rounded-full text-zinc-400'>
    { bookmark && bookmark.some((elem) => profileData.id === elem.user_id) ? 
      <FaBookmark onClick={bookmartBtn} className='text-blue-400' size="1em"/>
    :
      <FaRegBookmark onClick={bookmartBtn} size="1em"/>
    }
    </span>
 </div> 
  )
}

export default Bookmark