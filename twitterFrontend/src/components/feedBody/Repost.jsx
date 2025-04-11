import React,{useEffect, useState } from 'react'
import { Loading, ModalBox, TweetForm } from '../index'
import { useDispatch, useSelector } from 'react-redux';
import { showRepost } from '../../ReduxApi/post';
import {LuRepeat2} from '../Icons'

function Repost({post_id, type, comment_id}) {
    const [isModalOpen, setCloseModal] = useState(false);

    const dispatch = useDispatch();
    const {postData, loading} = useSelector((state) => state.post);
    const {allReposts} = useSelector((state) => state.rePost);

    useEffect(()=> {
       dispatch(showRepost({post_id}));
   },[dispatch,post_id])
   
   // Show post in repost form
   const originalPostData = postData.find((userPost) => userPost.id === post_id); 

   // Repost Count 
   const repostCount = allReposts.filter((repost) => repost.post_id === post_id );

return loading ? <Loading /> : (
   <>
    <div className="">
         <ModalBox isModalOpen={isModalOpen} onClose={() => setCloseModal(false)}>
            <TweetForm action="createRepost" post_id={post_id} type={type} comment_id={comment_id} originalPost={originalPostData}/>
         </ModalBox>       
   
      <div className="flex hover:hover:text-green-600 items-center text-zinc-400" onClick={() => setCloseModal(true)}>
         <span className='hover:bg-green-500/20 p-2 rounded-full text-zinc-400 cursor-pointer'>
            <LuRepeat2 size="1.3em" />
         </span>
         <span className='text-sm pt-1'>{repostCount.length}</span>
      </div> 
    </div>
  </>
)
}

export default Repost
