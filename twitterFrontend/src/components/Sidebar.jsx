import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Logo, Logout, Button, Loading, PostMenuBar} from './index'
import { MdHome, IoSearch, GrNotification, MdOutlineMailOutline, FaRegBookmark, RiFileListLine,
         TbEditCircle, FaRegUser, IoIosLock, 
         MdBlock} from './Icons'
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../ReduxApi/profileSlice';

function Sidebar() {

   const dispatch = useDispatch();
   const {profileData,loading} = useSelector((state) => state.profile); 

   const navItems = [
     {
      'name' : 'Home',
      'icon' : <MdHome className='text-3xl'/>,
      'navLink' : '/'
     },

     {
        'name' : 'Explore',
        'icon' : <IoSearch />,
        'navLink' : '/explore'
     },

     {
        'name' : 'Notification',
        'icon' : <GrNotification />,
        'navLink' : '/notification'
     },
     
     {
        'name' : 'Messages',
        'icon' : <MdOutlineMailOutline />,
        'navLink' : '/message'
     },

     {
        'name' : 'Bookmarks',
        'icon' : <FaRegBookmark />,
        'navLink' : '/bookmarks'
     },

     {
        'name' : 'Lists',
        'icon' : <RiFileListLine />,
        
        'navLink' : `/${profileData?.slug}/lists`  
     },

     {
        'name' : 'Profile',
        'icon' : <FaRegUser />,
        'navLink' : '/profile'
     },
     {
        'name' : 'Block',
        'icon' : <MdBlock />,
        'navLink' : '/blocked/Accounts/all'
     },
     {
        'name' : "",
         'icon' : "",
         'navLink' : "/connect_people"
     }
    ]

    useEffect(() => {
      dispatch(editProfile());
    }, [dispatch])

  return (
      <section className="fixed lg:w-[275px] w-[20%] flex flex-col h-screen">
         <Link>
           <Logo className='ml-7 size-7 lg:ml-8 mt-5 mb-3 text-white ' />
         </Link>
            {navItems.map((item) => (
               <Link to={item.navLink} 
                     key={item.name}
                     className='flex justify-start items-center space-x-4 px-4 ms-4 w-fit py-[6px] my-1 hover:bg-zinc-900
                      text-white duration-200 transition text-[1.3rem] rounded-full'>
                  <div className='text-[1.6rem]'> 
                     {item.icon}
                  </div>
                  <div className='lg:block hidden'>{ item.name}</div>
               </Link>
              )   
            )}
            
          <div className="mb-5">
            <Button bgColor='bg-slate-200' textColor='text-zinc-900' className='flex text-[15px] lg:justify-center w-fit ms-5 font-bold text-xl lg:w-56 px-3 items-center py-[12px] hover:bg-blue/50 duration-200 transition'>
                  <div className='lg:hidden block'><TbEditCircle /></div>
                  <div className='lg:block hidden'>Post</div>
            </Button>  
          </div>          
          {/* <Logout /> */}
  
         { loading ? <Loading /> :
          <div className="flex justify-between items-center mt-2 hover:bg-black/10">
           <div className="flex items-center space-x-3">
            <div className="ms-5">
              {
               profileData?.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${profileData?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto'/> : 
               <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>
                  {profileData?.name && profileData?.name[0].toUpperCase()}
               </h1>  
              }
            </div>
            <div className="flex-col lg:block hidden">
               <div className="flex items-center text-zinc-100 space-x-1">
                  <h3 className="font-semibold"> {profileData?.name} </h3>
                  <IoIosLock size='1.2rem' />
               </div>
               <span className='font-thin text-zinc-500'>{profileData?.slug}</span>
            </div>
            </div>
            <div className="">
               <PostMenuBar>
                  <ul className='cursor-pointer font-bold py-3'>
                     <li className='py-1 hover:bg-gray-950'>
                        <Logout /> {profileData.slug}
                     </li>
                  </ul>
               </PostMenuBar>
            </div>
         </div>}
      </section>
  )
}

export default Sidebar
