import React from 'react'

const Button = ({ children,
                  className='',
                  bgColor='bg-sky-500',
                  textColor='text-gray-100',
                  ...props
                }) => {
  return (
       <button className={`font-semibold rounded-full ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
  )
}

export default Button
