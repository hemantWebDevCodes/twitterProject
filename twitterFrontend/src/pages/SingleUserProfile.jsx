import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import http from '../http';
import { Follow, Loading } from '../components';
import {MdArrowBack, IoIosLock, CiLocationOn, CgCalendarDates, PiLinkSimpleBold} from '../components/Icons'
import {Button} from '../components/index'; 
import TwitCard from '../components/feedBody/TwitCard';

 function SingleUserProfile() {

    const {id} = useParams();
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [follower, setFollower] = useState(0);
    const [following, setFollowing] = useState(0);
    const [activeTab, setActiveTab] = useState('Posts');

    useEffect(() => {
       const fetchUser = async() => {
          try {
            const response = await http.get(`singleProfile/${id}`);
            setUser(response.data.user);
            setLoading(true);
            
          } catch (error) {
            console.log('Single user profile : ' , error);
            setLoading(false);
          }
       }

       fetchUser();

    }, [id]);

    const ImgPath = 'http://localhost:8000/images/';

  return !loading ? <Loading /> : (
    <>
    <div className="flex items-center my-2 space-x-8 ms-4">
        <MdArrowBack size="1.4em" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 text-zinc-300">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <IoIosLock size="1.3em" />
          </div>
          <small className="text-zinc-500">0 Posts</small>
        </div>
      </div>

      {/* Images */}
      <div className={`relative w-full h-1/6 ${!user.background_img ? 'bg-zinc-800 h-[99%]' : ''}`}>
       {user.background_img && <img src={`${ImgPath}/bg_profileImages/${user.background_img}`} className="w-full h-full object-cover" />}
        <div className="absolute lg:-bottom-1/4 left-5 w-32 h-32 -bottom-20 flex items-center justify-between">
          {
            user.profile_photo ? <img src={`${ImgPath}/profile_images/thumb_pro/${user.profile_photo}`} className="rounded-full border-black border-2 object-cover" />
           : <h1 className='text-[4rem] w-full h-full flex justify-center items-center rounded-full bg-orange-800 ring-4 ring-black'>{user.name[0].toUpperCase()}</h1>  
          }
        </div>
      </div>
      
      <div className="flex justify-end mt-3 w-9/12 ms-32">
         <Follow following_id={user.id} follower={setFollower} following={setFollowing} />
      </div>

      <div className="flex flex-col mt-2 mx-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold m-0">{user.name}</h1>
          <IoIosLock size="1.4em" />
        </div>

        <div className="">
          <p className="text-sm text-zinc-400">
            {user.bio}
          </p>
        </div>

        <div className="flex flex-wrap space-x-3 mt-3">
          {user.location && <div className="flex space-x-1 items-center text-zinc-400">
            <CiLocationOn size="1.3rem" />
            <span className="text-sm">{user.location}</span>
          </div>}

          {user.website && <div className="flex space-x-1 items-center text-zinc-400">
            <PiLinkSimpleBold size="1.3rem" className="text-sky-600" />
            <a href="PiLinkSimpleBold.com" className="text-sm text-sky-600">{user.website}</a>
          </div>}

          <div className="flex space-x-1 items-center text-zinc-500 text-md">
            <CgCalendarDates size="1.3rem" />
            <h4 className="text-sm">Joind {user.dob}</h4>
          </div>
        </div>

        <div className="flex mt-3 space-x-3 text-sm text-zinc-500 font-semibold">
          <h2>{follower} Follower</h2>
          <h2>{following} Following </h2>
        </div>
        <small className="text-zinc-500 mt-3">Not followed by anyone you’re following</small>
      </div>   

      {/* Tabs Section - Posts,Replies,Media */}
         <div className="my-5 w-full flex justify-around border-b-[0.1px] border-zinc-800">
          <div className="w-full text-center pt-3 hover:bg-zinc-900">
            <Button onClick={() => setActiveTab('Posts')} bgColor='bg-none'
             className={`text-zinc-300 w-4/12 ${activeTab === 'Posts' ? 'border-b-4 border-blue-500' : 'border-black'} rounded-none pb-2`}>
               Posts
            </Button>
          </div>

          <div className="w-full text-center pt-3 hover:bg-zinc-900">
            <Button onClick={() => setActiveTab('Replies')} bgColor='bg-none'
             className={`text-zinc-300 w-4/12 ${activeTab === 'Replies' ? 'border-b-4 border-blue-500' : 'border-black'} rounded-none pb-2`}>
               Replies
            </Button>
          </div>

          <div className="w-full text-center pt-3 hover:bg-zinc-900">
            <Button onClick={() => setActiveTab('Media')} bgColor='bg-none'
             className={`text-zinc-300 w-4/12 ${activeTab === 'Media' ? 'border-b-4 border-blue-500' : 'border-black'} rounded-none pb-2`}>
               Media
            </Button>
          </div>
         </div>

            {activeTab === 'Posts' && <TwitCard filter={user.id}/>}

    </>
  )
}

export default SingleUserProfile
