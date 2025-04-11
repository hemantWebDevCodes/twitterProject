import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Follow } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { allUser } from '../ReduxApi/profileSlice';

function ConnectFollowList({ limit = null }) {

  const dispatch = useDispatch();

  const { allUserData } = useSelector((state) => state.profile);

  const displayUser = limit ? allUserData.slice(0, limit) : allUserData;

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  return (
    <div className={`${limit ? 'mx-auto  p-2 rounded-xl mt-3 border-[0.1px] border-zinc-800'
      : 'px-3'}`}>
      {limit &&
        <h3 className='text-zinc-300 font-semibold ml-2 text-xl'>Who to follow</h3>
      }
      {
        displayUser.length > 0 ? displayUser.map((user) => (
          <div className="w-full flex justify-between items-center my-1 hover:bg-zinc-950 py-2 cursor-pointer" key={user.id}>
            <Link to={`http://localhost:5173/profile/${user.id}`}>
              <div className="flex space-x-2 ml-2 ">
                <div className="w-12">
                  {
                    user.profile_photo ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${user.profile_photo}`} className='rounded-full' /> :
                      <h1 className='text-[1.3rem] w-12 h-12 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{user.name[0].toUpperCase()}</h1>
                  }
                </div>
                <div className="">
                  <h2 className='hover:underline text-white font-bold'>{user.name}</h2>
                  <span className='text-zinc-400 text-sm'>{user.slug}</span>
                  {!limit && <p className='text-white text-sm'>
                    {user.bio}
                  </p>}
                </div>
              </div>
            </Link>
            <Follow following_id={user.id} width={limit ? "28%" : "19%"} />
          </div>
        )) : <p className='text-white'>No User Found</p>}
      {limit &&
        <div className="ms-3 my-3">
          <Link to='/connect_people'>
            <h2 className='text-sky-500 text-sm'>Show more</h2>
          </Link>
        </div>
      }

    </div>
  )
}

export default ConnectFollowList
