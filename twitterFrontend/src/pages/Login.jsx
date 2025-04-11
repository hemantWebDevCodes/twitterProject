import React, { useEffect, useState } from 'react'
import {Input,Logo} from '../components'; 
import axios from 'axios';
import { useNavigate } from 'react-router';

function Login() {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(['']);
    const [authError, setAuthError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login', {email, password});
            const data = response.data;

            if(data.status){
              sessionStorage.setItem('api_token', data.token);
              navigate('/');
            }else{ setAuthError(data.message) }

            console.log(response);
            if(data.status === false){
               setError([data.error[0], data.error[1]])
            }

        } catch (error) {
            console.log('login Error : ', error);
            // setError('Something went Wrong Please Try again. later.');
        }
    }

    useEffect(() => {
      if(sessionStorage.getItem('api_token'))(
         navigate('/')
      )
    },[navigate])

  return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/3 flex flex-col h-full text-white bg-black rounded-md px-10">
        <form onSubmit={handleLogin}>
        <div className="flex justify-center py-4">
            <Logo className={`h-10 w-7 ml-2`} />
        </div>
           <div className="">
              <h2 className='text-2xl font-bold'>Sign in To X</h2>
           </div>
           <div className="my-4 w-full text-start">
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} label='Enter email,or username' className='font-semibold' /> 
              {<small className='text-red-600'>{error[0] && error[0]}</small>}           
           </div>

           <div className="mb-2 w-full text-start"> 
              <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='font-semibold' label='Password' />        
              <small className='text-red-600'>{error[1] && error[1]}</small>       
           </div>

           <div className="mb-2 mt-4">
              <button type='submit' className='w-full bg-slate-300 text-gray-600 font-bold py-3 rounded-full'>Log in</button>
           </div>
           
            <div className="mb-2 text-center">
               <small className='text-red-500 text-sm tracking-wider'>{authError}</small>
            </div>

           <div className="text-start text-gray-500 mb-7">
             <small className='text-sm'>Don't have an account? <span className='text-blue-700'>Sign up</span></small>
           </div>

           </form>
        </div>
      </div>      
  )
}

export default Login
