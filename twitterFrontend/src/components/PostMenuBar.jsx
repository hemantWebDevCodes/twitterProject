import React,{useRef, useState, useEffect} from 'react'
import { SlOptions } from '../components/Icons'

function PostMenuBar({children}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState('bottom');
  const menuRef = useRef(null);

  useEffect(() => {
    if(isMenuOpen){
      const menu = menuRef.current;
      const menuBottom = menu?.getBoundingClientRect().bottom || 0;
      const windowHeight = window.innerHeight;

      if(menuBottom > windowHeight){
        setPosition('top');
      }else{
        setPosition('bottom');
      }
    }
  }, [isMenuOpen])
  
  useEffect(() => {
    
    const hideMenuBox = (event) => {
       if(menuRef.current && !menuRef.current.contains(event.target)){
           setIsMenuOpen(false);
       }
    }

     if(isMenuOpen){
        document.body.addEventListener("click", hideMenuBox);
     }

     return () => {
        document.body.removeEventListener("click", hideMenuBox);
     }
  }, [isMenuOpen]);

  const toggle = (event) => {
    event.stopPropagation(); 
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div className="relative flex justify-end items-center">
      <div className="absolute">
        <button onClick={toggle} className='py-[10px] px-[10px] rounded-full hover:bg-blue-600/10 hover:text-blue-500'>
          <SlOptions className='text-zinc-500 hover:text-blue-500' size='1em' />
        </button>
      </div>

      {isMenuOpen && 
        <div ref={menuRef}
             className={`absolute ${position === 'top' ? 'bottom-full mt-2' : 'top-full -mt-3'} border border-zinc-800
                        min-w-72 max-h-80 bg-black text-zinc-300 shadow-lg shadow-gray-400/40
                        rounded-2xl transform transition-transform duration-300 ease-out origin-top scale-y-0 border-zinc-400/50
                        ${isMenuOpen ? 'scale-y-100' : 'scale-y-0'}`}
                        style={{transformOrigin: position === 'top' ? 'bottom' : 'top' }}
        >
           {children}
        </div>
      }
    </div>
  )
}

export default PostMenuBar