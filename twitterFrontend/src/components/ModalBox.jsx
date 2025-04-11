import React, { useState } from 'react'
import {Button} from '../components/index'
import { IoClose } from "react-icons/io5";

function ModalBox({children, isModalOpen, formSubmitHandel,  height='90', onClose, modalTitle='', btnText=''}) {

  return (
    <>
     {isModalOpen && (
      <div className="fixed w-full h-full top-0 left-0 bg-gray-700/50 flex justify-center z-50">
         <div className={`lg:w-[44%] max-h-[90vh] h-auto shadow-2xl w-full overflow-y-auto lg:mt-10 bg-black rounded-xl`} >
          <div className="sticky z-30 top-0 py-3 bg-black/90">
            <div className="w-full flex justify-between px-3">
              <div className="flex items-center space-x-10 text-zinc-300">
                <IoClose size='1.5em' onClick={onClose} className='cursor-pointer hover:bg-zinc-900 rounded-full' />
                <h1 className='text-xl font-semibold'>{modalTitle}</h1>
              </div>
              <div className="">
                { btnText &&
                <Button type='submit' onClick={formSubmitHandel} className='py-1 px-4' bgColor='bg-zinc-100 text-zinc-900'>{btnText}</Button>}
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
     )}    
    </>
  )
}

export default ModalBox
