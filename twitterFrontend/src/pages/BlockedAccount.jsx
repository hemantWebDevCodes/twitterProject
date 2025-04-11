import React, { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md';
import {Button} from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blockUser } from '../ReduxApi/BlockAccount';

function BlockedAccount() {
    
    const dispatch = useDispatch();
    const [updateBlock,setUpdateBlock] = useState(false);
    const {allUserData} = useSelector((state) => state.profile);
    const {profileData} = useSelector((state) => state.profile);
    const {blockData} = useSelector((state) => state.blockAccounts);

    const blockBtn = (userId) => {
        dispatch(blockUser({blocked_id : userId}));
        setUpdateBlock(true);
     }

     useEffect(() => {

     }, [blockData]);
  
  return (
    <>
    <div className="w-full">
        <div className="flex px-5 gap-9 pt-3 items-center">
            <MdArrowBack size="1.5em " />
            <h2 className='font-bold text-xl text-zinc-300'>Blocked accounts</h2>
        </div>
    </div>
  <div className="p-2 rounded-xl mt-3 px-3">
     {
        allUserData.length > 0 ? allUserData.map((user) => {
        if(blockData.some((block) => block.blocked_id === user.id && block.blocker_id === profileData.id)) 
  
      return (
        <div className="w-full flex justify-between items-center my-1 hover:bg-zinc-950 py-2 cursor-pointer" key={user.id}>
            <Link to={`http://localhost:5173/profile/${user.id}`}>
              <div className="flex space-x-2 ml-2 items-center">
                <div className="w-12">
                  {
                    user.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${user.profile_photo}`} className='rounded-full'/> : 
                    <h1 className='text-[1.3rem] w-12 h-12 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{user.name[0].toUpperCase()}</h1>  
                  }
                </div>
                <div className="">
                  <h2 className='hover:underline text-white font-bold'>{user.name}</h2>
                  <span className='text-zinc-400 text-sm'>{user.slug}</span>
                </div>
              </div>
            </Link>

            <Button onClick={() => blockBtn(user.id)} className='py-[7px] px-4 font-thin' bgColor='bg-red-700'>
                {blockData.some((block) => block.blocked_id == user.id) ? 'Blocked' : 'Block'}
            </Button>
        </div>
     )}) : ''}

  </div>
    </>
  )
}

export default BlockedAccount