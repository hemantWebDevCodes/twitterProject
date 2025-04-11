import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import post, { showAllRepost, showRepost } from '../../ReduxApi/post';
import Repost from './Repost';
import LikePost from './LikePost';
import PostViewCount from './PostViewCount';
import { Bookmark, CommentPost, ConverIndiaTime, MentionUser, PostMoreOption } from '../index';
import { Link, useNavigate } from 'react-router-dom';

function RepostTwit() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allReposts, loading } = useSelector((state) => state.rePost);
  const { blockData } = useSelector((state) => state.blockAccounts);
  const { profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(showAllRepost());
  }, [dispatch]);

  const imgPath = 'http://localhost:8000/images';

  return (
    <div className='w-full h-full'>
      {allReposts && allReposts?.map((rePost) => {
        if (blockData.some((block) => block.blocked_id === rePost.user_id && block.blocker_id === profileData.id))
          return null;

        return (
          <div className="flex mt-3 border-b-[0.1px] space-x-1 border-zinc-700" key={rePost.id}>
            <div className="w-[10%]">
              {
                rePost.user?.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${rePost.user?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto' /> :
                  <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{rePost.user?.name[0].toUpperCase()}</h1>
              }
            </div>
            <div className="w-[90%] flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold ">
                    {rePost.user?.name}
                  </h3>
                  <span className='ml-2 font-thin text-zinc-500'>
                    {`@${rePost.user?.name.replace(' ', '').toLowerCase()}`}
                  </span>
                  <span className='ml-2 font-thin text-zinc-400 text-sm'>
                    <ConverIndiaTime convertedTime={rePost?.created_at} />
                  </span>
                </div>
                <div className="me-3">
                  <PostMoreOption Repost_id={rePost.id} type='Repost' />
                </div>
              </div>
              <div onClick={() => navigate(`http://localhost:5173/repostDeatail/${rePost.id}`)}>
                <div className="mt-1">
                  <p className='font-thin text-zinc-300 text-sm'>
                    <MentionUser description={rePost?.description} id={rePost?.id} ptype="repost" />
                  </p>
                </div>

                {rePost.image_description && (
                  <div className="my-3">
                    <p className='font-thin text-zinc-300 text-sm'>
                      {rePost?.image_description}
                    </p>
                  </div>
                )}

                {rePost.image && rePost.file_type === "image" ? (
                  <div className="w-[97%] h-auto mt-3">
                    <img src={`${imgPath}/Repost_images/${rePost?.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
                  </div>
                ) : ''}

                {rePost.image && rePost.file_type === "video" ? (
                  <video className='w-[97%] h-56' autoPlay muted controls>
                    <source src={`http://localhost:8000/post_images/${rePost?.image}`} type='video/mp4' />
                  </video>
                ) : ''}
              </div>
              <div className="flex justify-around border-b-[0.1px] border-zinc-800">
                <CommentPost Repost_id={rePost ? rePost.id : null} commentAction='createComment' type="Repost" />

                <Repost Repost_id={rePost.id} />

                <div className="flex items-center">
                  <LikePost Repost_id={rePost.id} type="Repost" />
                </div>

                <PostViewCount Repost_id={rePost.id} />

                <Bookmark type='Repost' Repost_id={rePost.id} />
              </div>

              {/* USER POST */}
              <div className="lg:max-w-lg border-[0.1px] border-zinc-800 py-2 mt-2 rounded-xl">
                <div className="flex items-center ms-2 space-x-2">
                  {
                    rePost.user?.profile_photo ? <img src={`${imgPath}/profile_images/thumb_pro/${rePost?.user?.profile_photo}`} className='rounded-full w-10 h-10' /> :
                      <h1 className='text-[1.3rem] w-9 h-9 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{rePost.user?.name[0].toUpperCase()}</h1>
                  }
                  <div className="flex text-zinc-500 space-x-2 text-[15px]">
                    <h2 className='font-semibold text-zinc-100'>{rePost.user.name}</h2>
                    <span className='text-[16px]'>{`${rePost.user?.slug}`}</span>
                    <span><ConverIndiaTime convertedTime={rePost.created_at} /></span>
                  </div>
                </div>
                <Link to={`http://localhost:5173/postDeatail/${rePost?.post_id}`}>
                  <div className={`${rePost.post?.image ? 'lg:flex lg:flex-row sm:flex-col' : 'flex'} p-2 space-x-2`}>
                    <div className='lg:shrink-0'>
                      {rePost.post?.image && rePost.post.file_type === "image" ? (
                        <img src={`http://localhost:8000/post_images/${rePost.post?.image}`} className='rounded-lg lg:w-[150px]' />
                      ) : ''}
                    </div>

                    <div className="text-sm text-zinc-300">
                      <p className='px-2'>{rePost.post?.description}</p>
                      <p>{rePost.post?.image_description}</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex justify-around">
                <CommentPost post_id={rePost?.post_id} commentAction='createComment' type="post" />

                <Repost post_id={rePost.post_id} />

                <div className="flex items-center">
                  <LikePost post_id={rePost.post_id} type="post" />
                </div>

                <PostViewCount post_id={rePost.post_id} />

                <Bookmark type='post' post_id={rePost.post_id} />
              </div>
            </div>
          </div>
        )
      })}
    </div>

    // <h2>Jai Shree Ram</h2>
  )
}

export default RepostTwit
