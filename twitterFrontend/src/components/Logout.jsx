import axios from 'axios'
import React from 'react'
import http from '../http'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'

const Logout = () => {

  const navigate = useNavigate();

  const logout = async() => {
      try {
         const response = await http.post('/logout');
        //  localStorage.removeItem('api_token');
         sessionStorage.removeItem('api_token');
         navigate('/createAccount');
         console.log(response);
      } catch (error) {
         console.log('logout Error : ', error);
      }
    }

  return (
      <Button onClick={logout} bgColor='bg-none' textColor='text-zinc-300' className="py-2 ps-10">
        Logout 
      </Button>
  )
}

export default Logout
