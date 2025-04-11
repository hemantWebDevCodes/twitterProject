import React, { useEffect, useState } from 'react'
import http from '../../http';
import {Loading,LikePost} from '../index'
import {LuRepeat2, BiMessageRounded, GrFormView, ImSpinner7} from '../Icons'


function Folllowing() {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowingsUser = async() => {
            try {
              const response =  await http.get('/followingUserPosts', {});
             //  
             //   const posts = response.data.posts || [];
              setData(response.data.posts);
              setLoading(false);
            } catch (error) {
               setLoading(false);
            }
         }
     
         fetchFollowingsUser();
    }, [])

    const convertInTime = (IndTime) => {
        const data = new Date(IndTime);
          return data.toLocaleString('en-In', {
              timeZone : 'Asia/Kolkata',
              month : 'long',
              day : '2-digit',
              hour : '2-digit',
              minute : '2-digit'
        });
      }
  
 return loading ? <Loading /> :
  (
   <>
      {data.map((post) => (
       <div className="flex mt-3 border-b-[0.1px] border-zinc-700" key={post.id}>
         <div className="w-[10%]">
         {
           post.user.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${post.user.profile_photo}`} className='rounded-full w-12 h-12 mx-auto'/> : 
           <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{post.user?.name[0].toUpperCase()}</h1>  
         }
         </div>
         <div className="w-[90%] flex flex-col">
           <div className="flex items-center space-x-3">
              <h3 className="font-semibold "> {post.user?.name} </h3>
              <span className='ml-2 font-thin text-zinc-500'>{`@${post.user?.name.replace(' ','').toLowerCase()}`}</span>
              <span className='ml-2 font-thin text-zinc-400 text-sm'>{convertInTime(post.created_at)}</span>
           </div>
         
          <div className="mt-1">
            <p className='font-thin text-zinc-300 text-sm'>
              {post?.description}
            </p>
          </div>
         
          {post.image_description && (
           <div className="my-3">
             <p className='font-thin text-zinc-300 text-sm'>
               {post.image_description}
             </p>
           </div>
          )}

          {post.image && (
           <div className="w-[97%] h-[60%] mt-3">
            <img src={`http://localhost:8000/post_images/${post.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
           </div>
          )}

          <div className="flex justify-around">
             <div className="hover:bg-blue-600/15 rounded-full p-2 hover:text-blue-500 items-center text-zinc-400">
                 <BiMessageRounded size="1.2em" className='hover:text-blue-300 font-bold'/>
             </div>
             
             <div className="flex hover:hover:text-green-600 items-center text-zinc-400">
               <span className='hover:bg-green-500/10 rounded-full p-2'>
                 <LuRepeat2 size="1.4em" />
               </span>
               <span className='text-sm'>232</span>
             </div>

           <div className="flex items-center">
             <LikePost post_id={post.id} />
           </div>  
           
           <div className="">
             <GrFormView size="1.7em" />
           </div>
          </div>
       </div>
   </div>
))}
   </>
 )
}

export default Folllowing
