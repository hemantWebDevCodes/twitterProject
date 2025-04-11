import React, { useState } from 'react'
import {Button} from '../components/index'
import { IoClose } from "react-icons/io5";

function Alert({ children,alertModal, setAlertModal, blockAlertModel, setIsBlockAlertModel,btnText='save'}) {

  return alertModal || blockAlertModel ? (
    <>
      <div className="fixed w-full h-screen top-0 left-0 bg-cyan-950/50 flex justify-center items-center" onClick={setAlertModal}>
         <div className="lg:w-[30%] lg:h-[54%] sm:w-[40%] xl:w-[25%]  w-80 overflow-y-auto lg:mt-10 bg-black rounded-xl">
          <div className="sticky z-30 top-0 py-3 bg-black">
            <div className="w-full flex justify-between px-3">
              <div className="flex items-center space-x-10 text-zinc-300">
                <IoClose size='1.5em' onClick={setAlertModal || setIsBlockAlertModel} className='cursor-pointer hover:bg-zinc-900 rounded-full' />
                <h1 className='text-xl font-semibold'></h1>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>  
    </>
  ) : '';
}

export default Alert
