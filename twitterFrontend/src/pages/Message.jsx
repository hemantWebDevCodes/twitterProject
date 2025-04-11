import React from 'react'
import {MdArrowBack} from '../components/Icons'
import {Button, Follow} from '../components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Message() {

   const {allUserData} = useSelector((state) => state.profile);
  return (
  <>
    <div className="sticky top-0 bg-black z-30 pb-1">
      <div className="flex justify-start items-center px-3 py-3 space-x-7">
        <MdArrowBack size='1.3em' className='font-bold' />
        <h1 className='text-xl font-bold text-zinc-200'>Messages</h1>
      </div>
    </div>
    
    <div className="mt-10 ms-5">
      <h1 className='text-[2em] font-bold text-zinc-200'>
        Welcome to your inbox!
      </h1>
      <p className='text-zinc-500 text-sm mt-2'>
        Drop a line, share posts and more with private conversations between you <br/> and others on X. 
      </p>
      
      <Button className="py-3 px-3 mt-4 w-72">Write a message</Button>
    </div>

    <div className="w-80 p-2 rounded-xl mt-3">
    <h3 className='text-zinc-300 font-semibold ml-2 text-xl'>Who to follow</h3>
     {
        allUserData.length > 0 ? allUserData.map((user) => (
        <div className="w-full flex justify-between items-center my-1 hover:bg-zinc-950 py-2 cursor-pointer" key={user.id}>
            <Link to={`http://localhost:5173/message/${user.id}`}>
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
        </div>
     )) : <p className='text-white'>No User Found</p>}
      
    <div className="ms-3 my-3">
      <h2 className='text-sky-500 text-sm'>Show more</h2>
    </div>

  </div>
  </>
  )
}

export default Message
