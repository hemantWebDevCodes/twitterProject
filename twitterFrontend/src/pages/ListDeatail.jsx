import React, { useEffect, useState } from 'react'
import { IoIosLock } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import {Button, Follow, ListForm, ModalBox, TwitCard} from '../components/index'
import { addUserList, createList, showListUsers } from '../ReduxApi/postList';

function ListDeatail() {
    const {id} = useParams();
    const list_id = parseInt(id);
    const dispatch = useDispatch();
    const [isModalopen, setIsModalOpen] = useState(false);
    const [FollowBtnText,setFollowBtnText] = useState('');

    const {listData, listUserData} = useSelector((state) => state.list);
    const {profileData} = useSelector((state) => state.profile);
    const {postData} = useSelector((state) => state.post);

    // Find list Deatail Data
    const listDeatail =  listData.find((list) => list.id === list_id);

    // Following and follower Count
    const memberCount = listUserData.filter((userList) => userList?.member_id === listDeatail.user_id);
    const followerCount = listUserData.filter((userList) => userList?.follower_id === listDeatail.user_id);
     
    console.log(followerCount);
    

    const follower_id = listDeatail?.user_id;  
    
    // Find Members Posts
    const memberPost = postData.filter((post) =>
       memberCount.some((data) => data.follower_id === post.user_id));

    useEffect(() => {
      dispatch(showListUsers());    
    });

    const imgPath = 'http://localhost:8000/images/';
    
    const handleAddUserList = () => {
      dispatch(addUserList({follower_id,list_id}));
      dispatch(showListUsers());    
    }

  return (
    <>
    <div className="sticky top-0 bg-black z-30 pb-1">
      <div className="px-3 py-2">
        <div className="flex items-center">
            <h1 className='font-bold text-xl'>{listDeatail?.user?.name}</h1>
            <IoIosLock size='1.4em' />
        </div>
        <h3 className='text-zinc-400 line-clamp-3'>{listDeatail?.user?.slug}</h3>
       </div> 
      </div>

      <div className=''>
        <div className="h-[45%]">
          <img src={listDeatail?.listBg_img 
              ? `${imgPath}/list_images/listBgImg/${listDeatail?.listBg_img}`
              : '/src/assets/images/defaultTwitBgImg.png'}
              className='h-full w-full object-cover' alt="List-Deatail" 
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-3 space-y-4">
           <div className="flex items-center font-bold space-x-1">
             <h1 className='text-xl'>{listDeatail?.user.name}</h1>
             <IoIosLock size='1.3em' /> 
           </div>
          <span>{listDeatail?.description}</span>

          <div className="flex">
            {listDeatail?.user?.profile_photo ? (
              <img src={`${imgPath}/profile_images/thumb_pro/${listDeatail?.user?.profile_photo}`}
                className="rounded-full h-6 w-6"
                alt="User Profile"
              />
            ) : (
                <h1 className="text-[0.9rem] w-6 h-6 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black">
                  {listDeatail?.user?.name[0].toUpperCase()}
                </h1>
             )}

            <div className="flex">
              <h1 className='font-bold ms-1'>{listDeatail?.user?.name}</h1>
              <IoIosLock size='1.3em' className='ms-1' />
              <span className='ms-1  text-zinc-500'>{listDeatail?.user?.slug}</span>
            </div>
          </div>

            <div className="flex space-x-4 text-zinc-500 text-[15px]">
              <h3>{`${memberCount ? memberCount.length : 0} Members`}</h3>
              <h3>{`${followerCount ? followerCount.length : 0} Followers`}</h3>
            </div>
          { listDeatail.user_id === profileData.id
            ? <Button bgColor='black' onClick={() => setIsModalOpen(true)} className='px-4 py-[6px]
                    border border-zinc-600 shadow-2xl text-sm'> Edit List </Button> 
            : followerCount.some((data) => data.post_list_id === list_id) ? 
              <Button onClick={handleAddUserList}
                      onMouseEnter={() => setFollowBtnText('Unfollow')}
                      onMouseLeave={() => setFollowBtnText('Following')}
                      bgColor='bg-black'
                      textColor='text-zinc-200'
                      className='text-sm w-[32%] border-[0.1px] border-zinc-600 py-[7px] hover:text-red-500 hover:border-red-500 hover:bg-zinc-900 duration-200'>
                 Following
              </Button>
             :
              <Button onClick={handleAddUserList} className='text-sm ms-4 w-[25%] py-[7px] bg-zinc-100 text-gray-800 hover:bg-zinc-200'>
                Follow
              </Button> 
          }

        </div>
      <div className="border-t border-zinc-800 mt-5">
    </div>
  </div>

  {/* List Edit Form */}
  <ListForm action='editList' list_id={listDeatail.id} isModalopen={isModalopen} setIsModalOpen={setIsModalOpen} />

  {/* Twit Posts */}
  <TwitCard filter='listMemberPost' listPostData={memberPost}/>
</>
  )
}

export default ListDeatail