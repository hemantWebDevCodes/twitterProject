import React, { useState,useEffect } from 'react'
import { FaXTwitter } from '../components/Icons'
import { Button, ModalBox, Logo, Input } from '../components'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount, signUpAccount } from '../ReduxApi/createAccount';
import { Link } from 'react-router-dom';
import GoogleLoginBtn from '../components/GoogleLoginBtn';

function CreateAccount() {

  const [isModalOpen, setCloseModal] = useState(false);
  const [isSecondModalOpen, setIsSecondModalClose ] = useState(false);

  // const [error, setError] = useState(['']);
  // const [authError, setAuthError] = useState('');
  
  const [accountInput, setAccountInput] = useState({});

  const {loading, error} = useSelector((state) => state.account);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
     setAccountInput({ ...accountInput, [e.target.name] : e.target.value});
  }

  const handleSignup = (e) => {
     e.preventDefault();

     dispatch(signUpAccount(accountInput));
  }


  const handleLogin = (e) => {
     e.preventDefault();
     dispatch(loginAccount(accountInput));
  }

  
  useEffect(() => {
    if(sessionStorage.getItem('api_token')){
       navigate('/')
    }
  },[navigate])

  return (
    <div className='w-full h-screen grid lg:grid-cols-2 grid-cols-1 bg-black'>
      <div className="flex ms-20 lg:justify-center items-center">
          <FaXTwitter className='lg:size-80 size-12 text-zinc-200'/>
      </div>
      <div className="flex flex-col lg:mt-10 mx-auto lg:justify-center">
        <div className="">
          <h1 className='lg:text-[4rem] text-[3rem] text-zinc-200 font-bold'>Happening now</h1>
        </div>

        <div className="mt-9">
          <h1 className='font-bold lg:text-4xl text-xl text-zinc-300'>Join today.</h1>
        </div>

        <div className="mt-10 w-80">      
          <GoogleLoginBtn />
        </div>

        <div className="flex items-center my-4 w-80">
          <div className="flex-grow h-px bg-gray-300/40"></div>
          <span className="px-4 text-gray-200 text-md">or</span>
          <div className="flex-grow h-px bg-gray-300/40"></div>
        </div>


        <div className="lg:w-full mt-2">
          <Button className='w-4/6 shadow-xl py-2 text-md hover:bg-sky-600 duration-200' onClick={() => setCloseModal(true)}>Create Account</Button>
        </div>

        <div className="text-zinc-300 mt-14">
          <h1 className='font-semibold'>Already have an account?</h1>
          <div className="mt-3 lg:w-full">
          <Button bgColor='bg-black' onClick={() => setIsSecondModalClose(true)} className='w-4/6 border-[0.1px] border-zinc-500 text-sky-500 py-2 text-md hover:bg-zinc-900 duration-200'>Sign in</Button>
          </div>
        </div>

     {/* Sign Up */}
    <ModalBox isModalOpen={isModalOpen} onClose={() => setCloseModal(false)} modalTitle={<FaXTwitter size='1.7em' className='lg:ml-48 ml-36'/>} > 
      <form onSubmit={handleSignup}>
          <h2 className='mt-5 ms-20 text-3xl font-bold text-white'>Create your account</h2>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-9/12">
            <Input name='name' onChange={handleInput} label='Name' className='text-black'/>
          </div>

          <div className="w-9/12">
            <Input name='email' onChange={handleInput} label='Email'/>
          </div>

          <div className="w-9/12">
            <Input type="password" name='password' onChange={handleInput} label='Password'/>
          </div>

          <div className="w-9/12">
            <Input type='date' name='dob' onChange={handleInput} />
          </div>
            
          <div className="w-9/12 pb-5">
            <Input name='mobile_number' onChange={handleInput} label='Phone Number'/>
          </div>

          <div className="sticky bottom-0 py-7 w-full border-t-[0.1px] border-zinc-900 bg-black">
            <Button type='submit' bgColor='bg-zinc-500' textColor='text-black' className='w-5/6 py-3 ml-10 shadow-xl hover:bg-zinc-600'>SignUp</Button>
          </div>

        </div>
      </form>
    </ModalBox>

    <ModalBox isModalOpen={isSecondModalOpen} onClose={() => setIsSecondModalClose(false)} modalTitle={<FaXTwitter size='1.7em' className='lg:ml-48 ml-36'/>} >
      <form onSubmit={handleLogin}>
        <h1 className='text-3xl font-bold text-white text-start ms-32 mt-6'>Sign in to X</h1>
         <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="mt-2 w-7/12 text-start">
               <Input type='email' name='email' onChange={handleInput} label='Phone,email,or username' className='font-semibold' /> 
               {/* {<small className='text-red-600'>{error[0] && error[0]}</small>}            */}
            </div>

            <div className="mb-2 w-7/12 text-start"> 
               <Input type='password' name='password' onChange={handleInput} className='font-semibold' label='Password'/>        
               {/* <small className='text-red-600'>{error[1] && error[1]}</small>        */}
            </div>

            <div className="mb-2 mt-4 w-full lg:ms-60 ms-48">
               <Button type='submit' className='w-7/12 bg-zinc-100 hover:bg-zinc-200 text-gray-800 font-bold py-3 rounded-full'>Log in</Button>
            </div>
            
            <div className="mb-2 mt-4 w-full lg:ms-60 ms-48 ">
               <Button type='submit' bgColor='bg-black' className='w-7/12 border border-zinc-500 hover:bg-zinc-800 text-gray-400 font-bold py-3 rounded-full'>forgot Password</Button>
            </div>

            <div className="mb-2 text-center">
              {/* <small className='text-red-500 text-sm tracking-wider'>{authError}</small> */}
            </div>

            <div className="text-start mt-10 text-gray-500 ">
              <h2 className='text-md'>Don't have an account? <span className='text-sky-500 cursor-pointer hover:underline'
                 onClick={() => setIsSecondModalClose(false) || setCloseModal(true)}>Sign up</span></h2>
            </div>
        </div>
      </form>
    </ModalBox>
      
  </div>
</div>
  )
}

export default CreateAccount
