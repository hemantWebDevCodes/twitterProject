import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Loading } from '../components';

const AuthLayout = ({children, authentication= true}) => {

    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

   //  const isToken = localStorage.getItem('api_token');
   const isToken = sessionStorage.getItem('api_token');
    
    useEffect(() => {
       if(authentication && isToken ){
          navigate('/');
          setLoader(false);
       }else if(!authentication && isToken){
          navigate('/createAccount');
       }else{
          setLoader(false);
       }

    }, [isToken, navigate, authentication]);

  return loader ? <Loading /> : <> {children} </>
}

export default AuthLayout
