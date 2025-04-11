import React from 'react'
  import {Button, ConnectFollowList} from  '../components/index'
// import  ConnectFollowList  from '../components/ConnectFollowList'

function ConnectPeople() {
  return (
    <>
      <div className="sticky top-0 flex justify-around border-b-[0.1px] border-zinc-800 bg-black/80 backdrop-blur-sm">
          <div className="w-full h-14 text-center hover:bg-zinc-900">
            <Button onClick={() => setActiveTab('For you')} bgColor='bg-none'
             className={`mt-4 text-zinc-300 w-3/12`} >
               For you
            </Button>
          </div>
      </div>

      <ConnectFollowList />
    </>
  )
}

export default ConnectPeople