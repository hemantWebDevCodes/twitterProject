import React from 'react'
import { FaXTwitter } from "react-icons/fa6";

function Logo({className="text-white sm:h-16 sm:w-10", ...props}) {
  return (
    <div className=''>
        <FaXTwitter className={`${className}`} {...props}/>
    </div>
  )
}

export default Logo
