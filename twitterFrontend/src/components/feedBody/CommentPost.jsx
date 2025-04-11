import React, { useEffect, useMemo, useState } from 'react';
import { ModalBox, MentionUser, TweetForm } from '../index';
import { BiMessageRounded } from '../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { showCommentReplies, singlePostComments } from '../../ReduxApi/postSlice';

function CommentPost({ post_id, Repost_id, comment_id, type, commentAction }) {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);

    const { allReposts } = useSelector((state) => state.rePost);
    const { postData, commentData, commentReplyData } = useSelector((state) => state.post);
    const postComment = commentData.filter((comments) => post_id === comments.post_id || Repost_id === comments.repost_id || comments.id === comment_id); // Filter single post comments in allComments

    // Find post in allPosts
    let commentPost;
    if (type === "post" && commentAction === "createComment") {
        commentPost = postData.find((findPost) => findPost.id === post_id);
    } else if (type === "Repost" && commentAction === "createComment") {
        commentPost = allReposts.find((findPost) => findPost.id === Repost_id);
    } else if (commentAction === "commentReply") {
        commentPost = postComment.find((comment) => comment.id === comment_id);
    }

    const commentCount = commentReplyData.filter((Reply) => Reply.post_comment_id === comment_id);

    useEffect(() => {
        dispatch(showCommentReplies());
    }, [])

    useEffect(() => {
        dispatch(singlePostComments());  // Dispatch Single Post Comments
    }, [dispatch]);



    //* Convert To Indian Standard Time
    const convertInTime = (IndTime) => {
        const data = new Date(IndTime);
        return data.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: 'short',
        });
    };

    return (
        <>
            {/* Show Comments Deatail */}
            <ModalBox isModalOpen={isModalOpen} onClose={() => setModalOpen(false)} height='80'>
                <div className="max-w-xl mx-2 h-auto flex space-x-2 mt-3" key={commentPost?.id}>
                    <div className="w-[10%]">
                        {
                            commentPost?.user?.profile_photo ? (
                                <img
                                    src={`http://localhost:8000/images/profile_images/thumb_pro/${commentPost?.user?.profile_photo}`}
                                    className='rounded-full w-12 h-12'
                                />
                            ) : (
                                <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>
                                    {commentPost?.user?.name[0].toUpperCase()}
                                </h1>
                            )
                        }
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <div className="flex items-center space-x-1">
                            <h3 className="font-semibold">{commentPost?.user?.name}</h3>
                            <span className='ml-2 font-thin text-zinc-500'>{`@${commentPost?.user?.name.replace(' ', '').toLowerCase()}`}</span>
                            <span className='ml-2 font-thin text-zinc-400 text-sm'>{convertInTime(commentPost?.created_at)}</span>
                        </div>
                        <div className="mt-1">
                            <p className='font-thin text-zinc-300 text-sm'>
                                <MentionUser description={commentPost?.description} id={commentPost?.id} ptype="comment"/>
                            </p>
                        </div>
                        {commentPost?.image_description && (
                            <div className="my-3">
                                <p className='font-thin text-zinc-300 text-sm'>
                                    {commentPost?.image_description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-10">
                    <TweetForm action={commentAction} comment_id={comment_id} post_id={post_id} 
                               Repost_id={Repost_id} type={type} tweetBtnText='Reply'/>  {/* Tweet Post Form Component*/}
                </div>
            </ModalBox>

            <div className="flex items-center hover:text-blue-500 text-zinc-400">
                <span className='hover:bg-blue-600/15 rounded-full p-2 cursor-pointer'>
                    <BiMessageRounded onClick={() => setModalOpen(true)} size="1.2em" className='font-bold' />
                </span>
                <span className='text-sm'>{postComment ? postComment.length : 0 || commentCount ? commentCount.length : 0}</span>
            </div>
        </>
    );
}

export default CommentPost;
