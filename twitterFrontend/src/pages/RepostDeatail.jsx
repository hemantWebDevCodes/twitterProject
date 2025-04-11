import React, { useEffect } from 'react'
import {CommentPost, Repost, LikePost, MentionUser, ShowAllComments, PostMoreOption, ConverIndiaTime} from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'; 
import { createViewPost } from '../ReduxApi/postView';

function RepostDeatail() {

  const {id} = useParams();
  const repost_id = parseInt(id);
  const dispatch = useDispatch();

  const {allReposts} = useSelector((state) => state.rePost);
  const repostDeatail = allReposts.find((repost) => repost.id === repost_id);

  useEffect(() => {
     dispatch(createViewPost(repostDeatail.id));
  }, [dispatch, repostDeatail]); 

return (
    <>
    {/* Show Post Deatail */}
    <div className="flex mt-3 border-b-[0.1px] space-x-1 border-zinc-700">
          <div className="w-[10%]">
            {
              repostDeatail?.user?.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${repostDeatail?.user?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto'/> : 
              <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{repostDeatail.user?.name[0].toUpperCase()}</h1>  
            }
          </div>
         <div className="w-[90%] flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                  <h3 className="font-semibold "> {repostDeatail.user?.name} </h3>
                  <span className='ml-2 font-thin text-zinc-500'>{`${repostDeatail.user?.slug}`}</span>
              </div>
              <span className='me-3'>  
                <PostMoreOption Repost_id={repost_id} type="Repost"/>
              </span>
            </div>
      
          <div className="mt-1">
            <p className='font-thin text-zinc-300 text-sm'>
              <MentionUser description={repostDeatail?.description} id={repostDeatail?.id} ptype="repost"/>
            </p>
          </div>
          
          {repostDeatail.image_description && (
            <div className="my-3">
              <p className='font-thin text-zinc-300 text-sm'>
                {repostDeatail.image_description}
              </p>
            </div>
          )}
    
          {repostDeatail?.image && repostDeatail?.file_type == "image" ? (
            <div className="w-[97%] h-auto mt-3">
            <img src={`http://localhost:8000/images/repost_images/${repostDeatail?.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
            </div>
          ) : ''}
      
          { repostDeatail?.image && repostDeatail?.file_type == "video" ? (
          <video className="w-[97%] h-52 mt-3" autoPlay muted controls>
              <source src={`http://localhost:8000/post_images/${repostDeatail?.image}`} type='video/mp4'/>
          </video>
          ) : ''}

         <div className="my-2 border-b-[0.1px] border-zinc-800">
            <h2 className='text-gray-500 mb-4'>
              <ConverIndiaTime convertedTime={repostDeatail.created_at} />
            </h2>
         </div>
    
        <div className="flex justify-between items-center border-b-[0.1px] px-2 border-zinc-800">
          <CommentPost post_id={repostDeatail.id} commentAction='createComment' type='post'/>     
          <Repost post_id={repostDeatail.id} />
          <LikePost post_id={repostDeatail.id} type='post' />  
        </div>
      </div>
    </div>
      {/* Show All Repost Comments */}
       <ShowAllComments Repost_id={repostDeatail.id}/>
   </>
  )
}

export default RepostDeatail