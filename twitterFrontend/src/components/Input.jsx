import React, { useState } from 'react'

export default function Input({ label, type="text", className='', ...props }) {
  
  return (
      
  /* INPUT */
  <div className="w-[97%] mt-7">
    <label className='relative'>
        <input type={type} required
            {...props}
            className={`bg-black w-full h-[60px]  pt-5 px-3 lg:text-[1em] tracking-wide border-zinc-700 rounded-[4px] focus:border-sky-500
                        focus:border-2 border-[0.1px] outline-none text-zinc-300 font-normal peer ${className}`}
        />
        <span className='absolute left-0 -top-1 px-3 text-lg text-zinc-500 transition duration-200 peer-focus:text-sky-500
                        peer-focus:-translate-y-5 peer-focus:text-[14px] peer-valid:text-sm peer-valid:-translate-y-5 -translate-y-3'>
          {label}
        </span>
    </label>
  </div>
)
}
