import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showAllPostLists, addUserList, showListUsers } from '../ReduxApi/postList';
import { HiPlusSmall } from "react-icons/hi2";
import { MdOutlineCheck } from "react-icons/md";
import { MdArrowBack, IoIosLock } from '../components/Icons';
import { ModalBox } from '../components/index'

function ListsSuggested({ action = "Suggested", post_id, isModalopen, setIsModalOpen}) {
  const { listData, listUserData } = useSelector((state) => state.list);
  const { profileData } = useSelector((state) => state.profile);
  const [icon, setIcon] = useState(false);
  const [SubmitHandel, setSubmitHandel] = useState();
  const [selectListId, setSelectListId] = useState(null);
  const dispatch = useDispatch();

  // Filter lists based on logged-in user
  const ifAddPostInList = action === "addPostInList"; 
  const LoggedInUserLists = listData.filter((listData) => listData?.user_id === profileData.id);

  const imgPath = 'http://localhost:8000/images';

  useEffect(() => {
    dispatch(showAllPostLists());
  }, [dispatch]);
   

  // Handle adding user to list
  const handleAddUserList = (follower_id, list_id) => {
    const action = ifAddPostInList 
        ? addUserList({ follower_id, list_id, post_id }) 
        : addUserList({ follower_id, list_id });
    dispatch(action);
    dispatch(showListUsers());
  };

  const toggleIconAndSubmit = (follower_id, list_id) => {
    setIcon(!icon );
    setSubmitHandel(() => () => handleAddUserList(follower_id, list_id));
    setSelectListId(list_id);
  }

  return (
    <>
      {action === "Suggested" && (
        <>
          <div className="sticky top-0 bg-black z-30 pb-1">
            <div className="flex justify-start items-center px-3 py-3 space-x-7">
              <MdArrowBack size='1.3em' className='font-bold' />
              <h1 className='text-xl font-bold text-zinc-200'>Suggested Lists</h1>
            </div>
          </div>

          <div className="mb-7">
            <div className="w-full h-2.5/2">
              <img src="/src/assets/images/discovery-v2.png" className='w-full h-full object-cover' alt="list-suggestion" />
            </div>
            <div className="px-10 mt-7">
              <h1 className='text-2xl font-extrabold text-zinc-200'>Choose your Lists</h1>
              <p className='text-zinc-500 text-[15px] line-clamp-3 tracking-wide my-2'>
                When you follow a List, you'll be able to quickly keep up with the experts on what you care about most.
              </p>
            </div>
          </div>
        </>
      )}
 
  {/* Suggestes Lists Show */}
  { !ifAddPostInList && <div className="border-t-[0.2px] border-zinc-800 ps-4">
        <h1 className="font-bold text-xl my-4 text-gray-300">Discover new Lists</h1> 
        {listData.length > 0 && listData.map((list) => (
            <div className="flex mt-3" key={list?.id} >
              <div className="w-12 h-16">
                <img
                  src={list?.cropImg ? `${imgPath}/list_images/cropListImg/${list?.cropImg}` : '/src/assets/images/defaultListImg.png'}
                  className="rounded-sm w-full"
                  alt="List-suggestion"
                />
              </div>

              <div className="ms-3 flex justify-between w-full px-3">
                <div>
                  <div className="flex items-center">
                    <Link to={`/list/${list?.id}`}>
                      <h1 className="font-bold text-[16px] flex items-center gap-1">
                        {list.name}
                      </h1>
                    </Link>
                    <small className="text-zinc-600 font-semibold ms-2">
                      {listUserData?.filter((userList) => userList?.member_id === list?.user.id).length} members
                    </small>
                  </div>

                  <div className="flex items-center space-x-1">
                    {list?.user?.profile_photo ? (
                      <img
                        src={`${imgPath}/profile_images/thumb_pro/${list?.user?.profile_photo}`}
                        className="rounded-full h-5 w-5 lg:mx-auto"
                        alt="User Profile"
                      />
                    ) : (
                      <Link to={`/profile`}>
                        <h1 className="text-[0.8rem] w-6 h-6 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black">
                          {list?.user?.name[0].toUpperCase()}
                        </h1>
                      </Link>
                    )}
                    <h1 className="font-bold text-sm flex items-center gap-1">
                      {list?.user?.name}
                    </h1>

                    {action !== "addPostInList" && (
                      <small className="text-zinc-600 font-semibold">
                        {` . ${listUserData.filter((listUser) => listUser?.post_list_id === list.id).length} followers including `}
                      </small>
                    )}

                    <small className="text-zinc-600 font-semibold">{list?.user?.slug}</small>
                  </div>
                </div>
                <div>
                  {action !== "addPostInList" && (
                    listUserData.some((data) => data?.post_list_id === list?.id) ? (
                      <button
                        className='text-white bg-black rounded-full p-1 border border-zinc-600 duration-200 hover:text-red-600 hover:border-red-700'
                        onClick={() => handleAddUserList(list?.user?.id, list?.id)}
                      >
                        <MdOutlineCheck size='1.3em' className='font-bold' />
                      </button>
                    ) : (
                      <button
                        className='text-black bg-zinc-50 rounded-full p-1'
                        onClick={() => handleAddUserList(list?.user?.id, list?.id)}
                      >
                        <HiPlusSmall size='1.4em'/>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    }

     {/* ADD POST IN LIST */}
     {ifAddPostInList && 
      <ModalBox isModalOpen={isModalopen} formSubmitHandel={SubmitHandel} onClose={() => setIsModalOpen(false)}
                modalTitle='Pick a List' btnText='Save'>
        <div className="flex items-center py-3 border-b border-zinc-800 hover:bg-zinc-900">
          <Link className='text-[0.9em] ps-8 text-sky-500 tracking-wide'>
             Create a new List
          </Link>
        </div>
     {LoggedInUserLists.map((list) => (
            <div className="flex justify-between items-center px-8 hover:bg-zinc-950/90" key={list.id}>
              <div className="w-12 h-16">
                <img
                  src={list?.cropImg ? `${imgPath}/list_images/cropListImg/${list?.cropImg}` : '/src/assets/images/defaultListImg.png'}
                  className="rounded-sm w-full my-3"
                  alt="List-suggestion"
                />
              </div>

              <div className="ms-3 flex justify-between w-full"  onClick={() => toggleIconAndSubmit(list?.user?.id, list?.id)}>
                <div>
                  <div className="flex items-center">
                    <Link to={`/list/${list.id}`}>
                      <h1 className="font-bold flex items-center gap-1 text-[1em]">
                        {list.name} {ifAddPostInList && <IoIosLock size='1.2em' />}
                      </h1>
                    </Link>
                    <small className="text-zinc-600 font-semibold ms-2">
                      . {listUserData?.filter((userList) => userList?.member_id === list?.user.id).length} members
                    </small>
                  </div>

                  <div className="flex items-center space-x-1">
                    {list?.user?.profile_photo ? (
                      <img
                        src={`${imgPath}/profile_images/thumb_pro/${list?.user?.profile_photo}`}
                        className="rounded-full h-4 w-4 lg:mx-auto"
                        alt="User Profile"
                      />
                    ) : (
                      <Link to={`/profile`}>
                        <h1 className="text-[0.8rem] w-5 h-5 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black">
                          {list?.user?.name[0].toUpperCase()}
                        </h1>
                      </Link>
                    )}
                    <h1 className="font-bold text-sm flex items-center gap-1">
                      {list?.user?.name} {ifAddPostInList && <IoIosLock size='1.1em' />}
                    </h1>

                    <small className="text-zinc-600 font-semibold">{list?.user?.slug}</small>
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  {selectListId === list.id && icon && <MdOutlineCheck size='1.2em' className='font-bold text-blue-400' />}
                </div>
              </div>
            </div>
))}
          </ModalBox>
}
    </>
  );
}

export default ListsSuggested;



// *== Comments ==* 
// action === "Suggested" = Only Show All Suggestion Lists => Lists Component
// action === "NoSuggestedCodeShow" = Show All Suggestion With BackGround Image
// action === "addPostInList" = Show Only LoggedInUserList for Add Post in List // PostMoreOption Component