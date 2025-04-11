import React, { useState } from 'react'
import Button from '../Button';
import { IoIosArrowRoundBack } from "react-icons/io"; 
import { RiFileList2Line } from "react-icons/ri";

function TweetModal({prevFile, imageDescription,setImageDescription}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
   <>
   {isOpen && ( 
      <div className="fixed w-full h-full top-0 left-0 bg-blue-400/10">
        <div className="w-[45%] rounded-2xl flex flex-col bg-zinc-800 left-[50%] translate-x-[60%] translate-y-8">
           <div className="flex justify-between bg-black py-4 rounded-t-2xl">
               <div className='flex items-center space-x-4'>
                  <IoIosArrowRoundBack onClick={() => setIsOpen(false)} size='2rem' className='cursor-pointer'/>
                  <h3 className='text-lg'>Edit Image description</h3>    
               </div>  
               <div className="">
                  <Button className='px-4 bg-white py-1' textColor='text-zinc-950' onClick={() => setIsOpen(true)} >Save</Button>
               </div>
           </div>

           <div className="py-3 w-[70%] h-1/3 mx-auto overflow-hidden">
             <img src={prevFile} alt="jai Shree Ram" className='h-full my-3' />
           </div>

           <div className="bg-black p-2">
             <textarea value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} rows="3" className='w-[94%] ml-4 rounded-lg resize-none outline-none py-2
                      bg-black border-[0.1px] border-zinc-600 focus:border-blue-400 px-2 focus:border-2'>
             </textarea>
           </div>
        </div>
      </div>
   )}
    
    <div className="flex space-x-1 items-center mt-2 ml-2">
      <RiFileList2Line className='text-zinc-500 mb-1' />
      <button onClick={() => setIsOpen(true)} className='cursor-pointer hover:underline text-sm text-zinc-500'> Add description</button>
    </div>
   </>
  )
}

export default TweetModal
