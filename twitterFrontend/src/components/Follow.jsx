import React, { useEffect, useState } from 'react'
import {Button} from '../components/index'
import http from '../http';

function Follow({following_id, follower, following, followBtnbg, width="23%"}) {

  const [isFollow, setIsUnfollow] = useState(false);
  const [followingText, setFollowingText] = useState('Following');

  // isFollowing current user Cheack
  useEffect(() => {
    const isFollowingUser = async() => {
      try {
         const response =  await http.get(`/isFollowingUser/${following_id}`);
         if(response.data.status){
            setIsUnfollow(response.data.isFollowing);
         }
      } catch (error) {
        console.log('Following Error: ', error);
      }
    }

    // Get Follower User
    const getFollower = async() => {
       try {
          const response = await http.get(`/getFollowers/${following_id}`);
            
          if(response.data.status){
            follower(response.data.followers);
            following(response.data.followings);
          }

          // console.log(response.data);
       } catch (error) {
        console.log('Get Followers Error : ', error);
       }
    } 

    isFollowingUser();
    getFollower();
    
  },[following_id]);
  
  // Follow and following user
  const handleFollow = async() => {
    try {
      const response = await http.post(`/follow/${following_id}`);
      if(response.data.status){
          setIsUnfollow(response.data.isFollowing);
      }
    } catch (error) {
      console.log('Folllow Error : ', error);
    }
  }

  return (
    <>
    { isFollow ? 
        <Button onClick={handleFollow}
                onMouseEnter={() => setFollowingText('Unfollow')}
                onMouseLeave={() => setFollowingText('Following')}
                bgColor='bg-black'
                textColor='text-zinc-200'
                style={{width}}
                className={`text-sm ${followBtnbg ? followBtnbg : 'border-[0.1px] border-zinc-600 py-[7px] hover:text-red-500 hover:border-red-500 hover:bg-zinc-900 duration-200'}`}>
            {followingText}
        </Button>
       :

        <Button style={{width}} onClick={handleFollow} bgColor={followBtnbg} className={`text-sm ${followBtnbg ? followBtnbg : 'ms-4 py-[7px] bg-zinc-100 text-gray-800 hover:bg-zinc-200'}`}>
          Follow
        </Button> 
    }
   </>
  )
}

export default Follow
