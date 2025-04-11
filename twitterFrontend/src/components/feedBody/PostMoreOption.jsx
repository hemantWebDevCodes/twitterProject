import React, { useEffect, useState } from 'react'
import {SlOptions, IoTrashOutline,HiOutlineUserAdd,MdBlock,MdOutlineViewKanban} from '../Icons'
import { useDispatch, useSelector } from 'react-redux';
import {deleteAction} from '../../ReduxApi/postSlice';
import { blockUser } from '../../ReduxApi/BlockAccount';
import {Alert, Button, Follow, ModalBox } from '../index'
import PostMenuBar from '../PostMenuBar';
import ListsSuggested from '../../pages/ListsSuggested';
import { PiListPlusFill } from "react-icons/pi";
import { Link } from 'react-router-dom';

function PostMoreOption({post_id, comment_id, type, Repost_id}) {

   const [alertModal, setAlertModal] = useState(false);
   const [blockAlertModel, setIsBlockAlertModel] = useState(false);
   const [isDeleted, setIsDeleted] = useState(false);
   const [isModalopen, setIsModalOpen] = useState(false);
   const dispatch = useDispatch();

   // useSelecter  
   const {postData,commentData} = useSelector((state) => state.post);
   const {allReposts} = useSelector((state) => state.rePost);
   const {profileData} = useSelector((state) => state.profile);
   
   // Find Cureent Post,Comment and Repost Data
   const findPost = postData.find((post) => post.id === post_id);
   const findComment = commentData.find((comment) => comment_id === comment.id);
   const findRepost  = allReposts.find((Repost) => Repost.id === Repost_id);
   
   // Check User_id === Current User ke
   const userIds = profileData?.id === findPost?.user_id || profileData?.id === findComment?.user_id ||
                   findRepost?.user_id === profileData?.id;

   // Actions, Post, Comment, Repost delete, if Condition is true
   const deletePost = (() => {
     if(type==="post"){
        dispatch(deleteAction({post_id, type}));
     }else if(type==="comment"){
        dispatch(deleteAction({comment_id, type}));
     } else if(type === "Repost"){
        dispatch(deleteAction({Repost_id, type}));
     }

     setAlertModal(false);
     setIsDeleted(true);
   });

   useEffect(() => {
      setIsDeleted(false);
      setIsDeleted(false);
   }, [isDeleted])


   // Account Block
   const blocked_id = findPost?.user?.id;
   const Repost_blocked_id = findRepost?.user?.id;
   const blockAccountBtn = (() => {
      if(blocked_id != 0){
         dispatch(blockUser({blocked_id : blocked_id}));
      }else{
         dispatch({blocked_id : Repost_blocked_id});
      }
   });

  return (
    <>
    <PostMenuBar>
      <ul className='font-bold cursor-pointer'>

         {/* Delete Post, comment, Repost */}
         { userIds &&
         <li className='py-2 px-2 hover:bg-zinc-950 rounded-t-2xl'>
            <button onClick={() => setAlertModal(true)} className="ps-2 flex space-x-2 items-center">
               <IoTrashOutline className='text-red-700 text-xl' />
               <li className='cursor-pointer text-red-700'>Delete </li>
            </button>
         </li>
         }

         {/* Follow Concept */}
         <li className='py-2 px-2 hover:bg-gray-950'>
            <div className="flex items-center ms-2">
               <span className='text-xl'><HiOutlineUserAdd/></span>
               <h5 className='text-sm ms-2'>
                  <Follow following_id={userIds} followBtnbg='bg-none'/>
                  <span className='ml-1'>
                     {findPost?.user?.slug || findComment?.user?.slug || findRepost?.user?.slug}
                  </span>
               </h5>
            </div>
         </li>

         {/* List add/remove */}
         <li className='py-2 px-2 hover:bg-zinc-950 text-sm ps-4 flex space-x-3 items-center' onClick={() => setIsModalOpen(true)}>
            <PiListPlusFill size='1.3em' />
            <span>Add/remove {findPost?.user?.slug} from</span>
         </li>
         
         <Button bgColor='hover:bg-zinc-950' className='w-full' onClick={() => setIsBlockAlertModel(true)}>
            <li className='py-2 px-2 ps-4 hover:bg-zinc-950 text-sm flex space-x-3 items-center'>
               <MdBlock size='1.3em'/>
               <span>Block {findPost?.user?.slug || findComment?.user?.slug || findRepost?.user?.slug}
               </span>
            </li>
          </Button>
         <Link to={`http://localhost:5173/postDeatail/${findPost?.id}`}>
            <li className='py-2 px-2 ps-4 hover:bg-zinc-950 rounded-b-3 text-sm flex space-x-3 items-center'>
               <MdOutlineViewKanban size='1.3em'/>
               <span>ViewPost</span> 
            </li>
         </Link>
      </ul>
      </PostMenuBar>

    {/* Delete Confirm Alert Box */}
    <Alert alertModal={alertModal} setAlertModal={() => setAlertModal(false)}  >
       <div className="px-5">
         <h2 className='font-bold text-xl pb-2'>Delete Post?</h2>
         <p className='text-zinc-400 text-sm tracking-[1px]'>
           This can't be undone and it will be removed from your profile, the timeline of any accounts
           that follow you, and from serch results.
         </p>

        <div className="flex flex-col justify-center items-center mt-6">
            <Button onClick={deletePost} bgColor='bg-red-700' className='py-2 w-10/12 h-[45px]'>Delete</Button>
            <Button onClick={() => setAlertModal(false) || setShowMoreOption(true)} bgColor='' className='border-[0.1px] border-zinc-700 py-2 w-10/12 h-[45px] mt-2'>Cancle</Button>
         </div>
       </div>
    </Alert>

    {/* Account Block Confirm Alert Box */}
    <Alert blockAlertModel={blockAlertModel} setIsBlockAlertModel={() => setIsBlockAlertModel(false)}  >
       <div className="px-5">
         <h2 className='font-bold text-xl pb-2'>Block ${findPost?.user?.slug}</h2>
         <p className='text-zinc-500 text-[15px] '>
            They will be able to see your public posts, but will no longer be able to engage with 
            them. @MyLordBebo will also not be able to follow or message you, and you will not see 
            notifications from them. 
         </p>

        <div className="flex flex-col justify-center items-center mt-6 pb-2">
            <Button onClick={blockAccountBtn} bgColor='bg-red-700' className='py-2 w-10/12 h-[45px]'>Block</Button>
            <Button onClick={() => setIsBlockAlertModel(false) || setShowMoreOption(true)} bgColor=''
                    className='border-[0.1px] border-zinc-700 hover:bg-gray-800/30 py-2 w-10/12 h-[45px] mt-2'>
                  Cancle
            </Button>
         </div>
       </div>
    </Alert>

    {/* Add Member in Lists*/}
      <ListsSuggested action='addPostInList' post_id={post_id} isModalopen={isModalopen} setIsModalOpen={setIsModalOpen}/>
    </>
  )
}

export default PostMoreOption