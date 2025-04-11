import React, { useReducer, useState } from 'react'
import {Button, ConnectFollowList, ModalBox} from '../components/index'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addUserList } from '../ReduxApi/postList';

function ManageMember() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [listTab, setListTab] = useState('Members');

  const {id} = useParams();
  const list_id = parseInt(id);
  const dispatch = useDispatch();

  const {listUserData} = useSelector((state) => state.list);
  const {allUserData, profileData} = useSelector((state) => state.profile); 

  // find List Members
  const memberLists = listUserData.filter((data) => 
          data?.member_id === profileData.id && data?.post_list_id === list_id
        );
   
  const membersData = memberLists.map((list) => {
    return allUserData.filter((data) => data.id === list.follower_id);
  }).flat();

  // Member User and Suggested users Show
  const userDataToRender = listTab === "Members" ? membersData : allUserData;
     
  // Form submit Handler
  const AddOrRemoveMemberHandel = (follower_id,list_id) => {
    dispatch(addUserList({follower_id, list_id}));
  }

  return(
   <>
    <ModalBox isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle='Manage members'>
      <div className="mt-4 flex justify-between items-end text-center border-b border-zinc-700 tracking-wide">
        <div className="w-full">
          <Button onClick={() => setListTab('Members')} className={`border-b-4 ${listTab === "Members" ? 'rounded-sm border-sky-400' : 'border-black'} pb-3`} bgColor='bg-none'>
            {`Members (${memberLists?.length})`}
          </Button>
        </div>
        <div className="w-full">
          <Button onClick={() => setListTab('Suggested')} className={`border-b-4 ${listTab === 'Suggested' ? 'rounded-sm border-sky-400' : 'border-black'} pb-3`} bgColor='bg-none'>
            Suggested
          </Button>
        </div>
      </div>

      {userDataToRender.map((users) => (
          <div className="flex mt-3 px-4 my-4" key={users.id}>
            <div className="w-12 h-16">
              { users?.profile_photo ?
              <img
                  src={`http://localhost:8000/images/profile_images/thumb_pro/${users?.profile_photo}`}
                  className="rounded-full w-full" alt="List"
              />
              : <h1 className="text-[1.5rem] w-12 h-12 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black">
                  {users?.name[0].toUpperCase()}
                </h1>
              }
              </div>
            <div className="w-full px-2">
              <div className="flex justify-between items-center">
                <div className="">
                   <h1 className='font-bold tracking-wide'>{users?.name}</h1>
                   <span className='climb-2 text-[15px] tracking-wide text-zinc-400'>{users?.slug}</span>
                </div>
                <div className="">
                  { listUserData.some((data) => data.follower_id === users.id) ? 
                    <Button bgColor='bg-red-600' onClick={() => AddOrRemoveMemberHandel(users?.id,list_id)} textColor='text-white' className='hover:bg-red-700 py-[7px] px-4 font-medium text-sm'>
                      Remove
                  </Button> :
                  <Button bgColor='bg-zinc-100' onClick={() => AddOrRemoveMemberHandel(users?.id,list_id)} textColor='text-black' className='py-[7px] px-4 font-medium text-sm'>
                     Add
                  </Button>
                  }
                </div>
              </div>
              <div className="">
                 <p>{users?.bio}</p>
              </div>
            </div>
          </div>
        ))}
      
    </ModalBox>
   </>
  )
}

export default ManageMember