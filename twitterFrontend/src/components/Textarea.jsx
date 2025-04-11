import React from 'react'

function Textarea({label, type="text", className='', ...props }) {

  return (
    /* TEXTAREA */
    <div className="w-[97%] h-30 mt-6">
        <label className='relative' height=''>
            <textarea type={type} required
                {...props}
                className={`bg-black w-full h-full pt-7 px-3 text-[1em] border-zinc-700 rounded-md focus:border-sky-500
                            focus:border-2 border-[0.1px] outline-none text-zinc-300 peer ${className} resize-none`}
            />
            <span className='absolute left-0 -top-6 px-3 text-lg text-zinc-500 transition duration-200 peer-focus:text-sky-500
                            peer-focus:-translate-y-9 peer-focus:text-sm peer-valid:text-sm peer-valid:-translate-y-9 -translate-y-5'>
                {label}
            </span>
        </label>
    </div> 
  )
}

export default Textarea
