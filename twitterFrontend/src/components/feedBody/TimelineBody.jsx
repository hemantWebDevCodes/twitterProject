import React, { useState } from 'react'
import {Button, TweetForm, TwitCard, ConnectFollowList, PostDeatail} from '../index'
import Folllowing from './Folllowing';
import RepostTwit from './RepostTwit';

const TimelineBody = () => {

  const [activeTab, setActiveTab] = useState('For you');

   return (
      <>
        <div className="sticky top-0 flex justify-around border-b-[0.1px] border-zinc-800 bg-black/80 backdrop-blur-sm">
          <div className="w-full h-14 text-center hover:bg-zinc-900">
            <Button onClick={() => setActiveTab('For you')} bgColor='bg-none'
             className={`mt-4 text-zinc-300 w-3/12 ${activeTab === 'For you' ? 'border-b-4 border-blue-500' : 'border-black'} rounded-none pb-2`}>
               For you
            </Button>
          </div>

          <div className="w-full text-center hover:bg-zinc-900">
            <Button onClick={() => setActiveTab('Following')} bgColor='bg-none'
             className={`mt-4 text-zinc-300 w-4/12 ${activeTab === 'Following' ? 'border-b-4 border-blue-500' : 'border-black'} rounded-none pb-2`}>
               Following
            </Button>
          </div>

        </div>
      
      <TweetForm action="createPost" postId='' />
      {activeTab === "For you" && <> 
        <TwitCard filter='allPosts' /> </> }

        <RepostTwit/>
      
      {activeTab === "Following" && <div className="w-full"><Folllowing /> </div> }
      </>
   )
}

export default TimelineBody
