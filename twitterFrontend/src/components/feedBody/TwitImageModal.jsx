import React,{useState} from 'react'
import ModalBox from '../ModalBox'
import Button from '../Button';
import { IoIosArrowRoundBack } from "react-icons/io"; 
import { RiFileList2Line } from "react-icons/ri";
import { Textarea } from '../index'

function TwitImageModal({prevFile, onChangeInput}) {
  const [isModalOpen, setCloseModal] = useState(false);
  
  return (
   <>
    <ModalBox isModalOpen={isModalOpen} modalTitle='Edit image description' btnText='Save' onClose={() => setCloseModal(false)}>
        <div className="w-[80%] mb-4 h-[63%] mx-auto overflow-hidden">
            <img src={prevFile} alt="jai Shree Ram" className='rounded-md h-full w-full mx-auto object-cover my-3' />
        </div>

        <div className="bg-black px-3 ml-3 mx-auto border-t-[0.1px] border-zinc-700">
            <Textarea name='imageDescription' onChange={onChangeInput} label='Description'>
            </Textarea>
        </div>
    </ModalBox>

    <div className="flex space-x-1 items-center mt-2 ml-2">
      <RiFileList2Line className='text-zinc-500 mb-1' />
      <button onClick={() => setCloseModal(true)} className='cursor-pointer hover:underline text-sm text-zinc-500'> Add description</button>
    </div>
   </>
  )
}

export default TwitImageModal
