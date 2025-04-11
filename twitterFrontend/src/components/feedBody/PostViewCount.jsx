import React, { useEffect, useState } from 'react'
import {GrFormView} from '../Icons'
import { useDispatch, useSelector } from 'react-redux';
import { postViewCount } from '../../ReduxApi/postView';
import {ModalBox, Repost, CommentPost,Bookmark, LikePost} from '../index'
import { Link } from 'react-router-dom';


function PostViewCount({post_id, Repost_id}) {
  
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();


  const { postData } = useSelector((state) => state.post);
  const {postViewData} = useSelector((state) => state.postView);
  const postViews = postViewData?.filter((allViews) => allViews.post_id === post_id || allViews.repost_id === Repost_id);

  const post = postData.find((post) => post.id === post_id);

  useEffect(() => {
     dispatch(postViewCount());
  }, [dispatch])

  //* Convert To  Indian Standard Time
  const convertInTime = (IndTime) => {
    const data = new Date(IndTime);
      return data.toLocaleString('en-In', {
          timeZone : 'Asia/Kolkata',
          month : 'short',
          day : '2-digit',
    });
  }

  return (
    <>
      <ModalBox isModalOpen={isModalOpen} modalTitle='Post Analytics' onClose={() => setModalOpen(false)} >
        <div className="lg:max-w-lg border-[0.1px] border-zinc-800 py-2 mt-2 rounded-xl mx-auto">
          <div className="flex items-center ms-2 space-x-2">
            {
              post?.user?.profile_photo 
               ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${post?.user?.profile_photo}`} className='rounded-full w-10 h-10'/> 
               : <h1 className='text-[1.3rem] w-9 h-9 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{post?.user?.name[0].toUpperCase()}</h1>  
            }
            <div className="flex text-zinc-500 space-x-2 text-[15px]">
              <h2 className='font-semibold text-zinc-100'>{post?.user?.name}</h2>
              <span className='text-[16px]'>{`${post?.user?.slug}`}</span>
              <span>{convertInTime(post?.created_at)}</span>
            </div>
          </div>
          <Link to={`http://localhost:5173/postDeatail/${post?.post_id}`}>
            <div className={`${post?.image ? 'w-full lg:flex lg:flex-row sm:flex-col' : 'flex'} p-2 space-x-2`}>
              <div className='lg:shrink-0'>
                {post?.image && post.file_type === "image" ? (  
                  <img src={`http://localhost:8000/post_images/${post?.image}`} className='rounded-lg lg:w-[150px]' />
                ) : ''}
              </div>

              <div className="text-sm text-zinc-300">
                <p className='px-2'>{post?.description}</p>
                <p>{post?.image_description}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex justify-center mx-auto gap-19">
          <div className=" items-center border-[0.1px] p-8 border-zinc-800 mx-4 mt-2 rounded-xl">
            <LikePost post_id={post?.id} type="post"/>
            <span>Like</span>
          </div>  
          <div className=" items-center border-[0.1px] p-10 border-zinc-800 mx-4 mt-2 rounded-xl">
            <CommentPost post_id={post?.id} commentAction='createComment' type="post" />
          </div>
          <div className=" items-center border-[0.1px] p-10 border-zinc-800 mx-4 mt-2 rounded-xl">    
            <Repost post_id={post?.id} />
          </div>
        </div>

        <div className="flex">
          <div className=" items-center border-[0.1px] p-10 border-zinc-800 mx-4 mt-2 rounded-xl">   
            <PostViewCount post_id={post?.id} />
          </div>
          <div className=" items-center border-[0.1px] p-10 border-zinc-800 mx-4 mt-2 rounded-xl">
            <Bookmark type='post' post_id={post?.id}/>    
          </div>
        </div>
      </ModalBox>

      <div className="flex hover:hover:text-blue-500 items-center -space-x-1 text-zinc-400">
        <span className='hover:bg-green-500/15 rounded-full p-2'>
         <GrFormView size="1.7em" onClick={() => setModalOpen(true)} />
        </span>
        <span className='text-sm mt-1'>{postViews ? postViews?.length : 0}</span>
      </div>
    </>
  )
}

export default PostViewCount
