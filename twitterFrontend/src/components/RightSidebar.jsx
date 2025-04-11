import React from 'react'
import {ConnectFollowList, SearchInput, Button} from '../components/index'

const RightSidebar = () => {

  return (
    <div className='fixed w-[27%] right-3 hidden mx-auto bg-black lg:block'>
    {/* Search Input */}
    <div className="sticky top-0 w-full h-14 bg-black flex items-center shadow-2xl">
     <SearchInput />
    </div>

      <div className="mt-4 px-4 rounded-xl border-[0.1px] border-zinc-800 mx-auto h-36">
          <h1 className='text-xl mt-2 font-bold text-zinc-200'>
            Subscribe to Premium
          </h1>
          <div className="text-zinc-300 mt-2 text-sm">
             <p className=''>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
          </div>
          <div className="mt-2">
            <Button bgColor='bg-sky-600' className='w-2/6 py-2 text-sm'>Subscribe</Button>
          </div>
       </div>

       <ConnectFollowList limit={4} />

       <div className="">
        <p className='text-zinc-600 mt-3 text-sm whitespace-pre-wrap'>
          Terms of Service      Privacy Policy     Cookie Policy    Accessibility    Ads info   More..    © 2025 X Corp.
        </p>
       </div>
    </div>
  )
}

export default RightSidebar
