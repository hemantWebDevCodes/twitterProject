import React from 'react'

function Container({children}) {
  return (
    <div className='w-full h-full flex justify-center items-center bg-black relative'>
        <div className="max-w-screen-xl w-full h-full flex relative">
           {children}
       </div>
    </div>
  )
}

export default Container
