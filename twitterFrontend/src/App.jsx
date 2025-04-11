import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router'
import { Sidebar, RightSidebar, Container, TwitOpenBeforeLoading} from './components/index'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const loadingTimer = setTimeout(() => {
       setLoading(false);    
    }, 2000);
     
      return () => clearTimeout(loadingTimer);
  }, [])

  //  return loading ? <TwitOpenBeforeLoading /> :
   return  ( 
    <Container>
      <Sidebar />
      <div className='lg:w-[598px] w-[80%] min-h-screen flex flex-col lg:ms-72 ms-20 text-white border-l-[0.5px] border-r-[0.5px] border-zinc-800'>
       <Outlet />
      </div>
      <RightSidebar />
    </Container>
  ) 
  }

export default App
