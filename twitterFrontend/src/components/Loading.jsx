import React, { useState } from 'react'
import { ImSpinner7 } from "react-icons/im";

function Loading() {

   return (
    <div className="w-full h-full flex justify-center items-center space-x-1 text-sky-500">
        <ImSpinner7 className='animate-spin duration-1000 mt-10' size="2rem" />
    </div>
  )
}

export default Loading
