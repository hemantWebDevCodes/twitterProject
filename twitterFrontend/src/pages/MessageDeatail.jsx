import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import {Button} from '../components/index'
import { sendMessage } from '../ReduxApi/messageSlice';
import echo from '../echo'
import Pusher from 'pusher-js';

function MessageDeatail() {
    
  Pusher.logToConsole = true;
  
    // Reciver Id get
    const {id} = useParams();
    const receiver_id = parseInt(id); 
    const [inputData, setInputData] = useState({});
    const dispatch = useDispatch();

    // All Users Data Fetch
    const {allUserData} = useSelector((state) => state.profile);

    // Filter Sender ID
    const receiverData = allUserData.find((data) => data.id === receiver_id);

    // Set Inputs Value
    const inputValue = (e) => {
      setInputData({...inputData, [e.target.name] : e.target.value});
    }
    
    const sendMessageOnSubmit = (e) => {
      e.preventDefault();
      dispatch(sendMessage({ receiver_id, inputData}));
    }

    // Message Fetch

    useEffect(() => {
      const channel = echo.private(`twitChat.${receiver_id}`);
      console.log(channel);
      channel.listen('message.sent', (event) => {
          console.log('Message received:', event);
          alert(JSON.stringify(event));
      }).error((error) => {
          // console.error('Error subscribing to channel:', error);
      });
  
      return () => {
          echo.leaveChannel(`twitChat.${receiver_id}`);
      };


  }, [receiver_id]);


  return (
    <>
   <div className="w-80 p-2 rounded-xl mt-3">
        <div className="w-full flex justify-between items-center my-1 hover:bg-zinc-950 py-2 cursor-pointer" key={receiverData.id}>
            <Link to={`http://localhost:5173/message/${receiverData.slug}/${receiverData.id}`}>
              <div className="flex space-x-2 ml-2 items-center">
                <div className="w-12">
                  {
                    receiverData.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${receiverData.profile_photo}`} className='rounded-full'/> : 
                    <h1 className='text-[1.3rem] w-12 h-12 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{receiverData.name[0].toUpperCase()}</h1>  
                  }
                </div>
                <div className="">
                  <h2 className='hover:underline text-white font-bold'>{receiverData.name}</h2>
                  <span className='text-zinc-400 text-sm'>{receiverData.slug}</span>
                </div>
              </div>
            </Link>
        </div>
    </div>

  <div className="w-full h-full mb-2 border">
    <form onSubmit={sendMessageOnSubmit}>
      <div className="flex justify-end items-end w-full h-full border">
        <div className="w-full">
          <input type="text" onChange={inputValue} name='message' placeholder='Enter Message '
           className='py-2 px-4 rounded-s-lg w-full outline-none bg-black border-[1px]'/>
        </div>
        <div className="w-full">
          <Button className='py-2 px-10 rounded-none border-[1px]'>Send</Button>
        </div>
      </div>
    </form>


    <div >
      <h1>Chat Messages</h1>
      <ul className='text-white'>

      </ul>
  </div>
  </div>
 </>
  )
}

export default MessageDeatail
