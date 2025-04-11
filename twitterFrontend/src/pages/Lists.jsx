import React, { useEffect, useState } from 'react'
import { SearchInput, ModalBox, ListForm, Loading } from '../components'
import { IoIosLock, PiListPlus } from '../components/Icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListsSuggested } from '../pages/Index';
import { showListUsers } from '../ReduxApi/postList';

function Lists() {

  const [isModalopen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.profile);
  const { listData, listUserData, loading } = useSelector((state) => state.list);
  const { searchData } = useSelector((state) => state.searchQuery);

  //store postListId 
  const memberId = listUserData.filter((data) => data?.member_id);

  // Filters listData
  const filteredListData = listData.filter((list) =>
    list.user_id === profileData.id ||
    memberId.some((data) => (data?.member_id === profileData.id && data?.post_list_id === list.id)
    )
  );

  const imgPath = 'http://localhost:8000/images';

  useEffect(() => {
    dispatch(showListUsers());
  }, [dispatch]);

  return (
    <>
      <div className="sticky top-0 bg-black z-30 pb-1">
        <div className="flex justify-between items-center px-3 py-2">
          <div className="flex items-center">
            <SearchInput type='Lists' />
          </div>
          <span>
            <button onClick={() => setIsModalOpen(true)}> <PiListPlus color='white' size='23px' /></button>
          </span>
        </div>
      </div>

      {/* List Form */}
      <ListForm isModalopen={isModalopen} setIsModalOpen={setIsModalOpen} />


      {/* //Search Data */}
      {
        searchData?.bookMark?.length > 0 ?
          <div className="ms-5 py-3 font-bold text-zinc-400">
            <h4>Found in Lists : </h4>
          </div>
          : ""}
      {searchData?.lists?.length === 0 ? (
        <div className="text-center text-zinc-400 py-2">No results found</div>
      ) : (
        searchData?.lists?.length > 0 ? searchData?.lists?.map((list) => (
          <div className="border-zinc-600 ps-4" key={list.id}>
            <div className="flex mt-3">
              <div className="w-12 h-16">
                <img
                  src={list?.cropImg ? `${imgPath}/list_images/cropListImg/${list?.cropImg}`
                    : '/src/assets/images/defaultListImg.png'}
                  className="rounded-sm w-full" alt="List"
                />
              </div>

              <div className="ms-3">
                <Link to={`/list/${list.id}`}>
                  <div className="flex items-center">
                    <h1 className="font-bold text-[16px] flex items-center gap-1">
                      {list.name} <IoIosLock size="1.2em" />
                    </h1>
                    <small className="text-zinc-500 font-semibold"> . member 1</small>
                  </div>
                </Link>

                <Link to={`/profile`}>
                  <div className="flex items-center space-x-1">
                    {list?.user?.profile_photo ? (
                      <img
                        src={`${imgPath}/profile_images/thumb_pro/${list?.user?.profile_photo}`}
                        className="rounded-full h-5 w-5 lg:mx-auto" alt="User Profile"
                      />
                    ) : (
                      <h1 className="text-[0.7rem] w-5 h-5 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black">
                        {list?.user?.name[0].toUpperCase()}
                      </h1>
                    )}
                    <h1 className="font-bold text-sm flex items-center gap-1">
                      {list?.user?.name} <IoIosLock size="1.2em" />
                    </h1>
                    <small className="text-zinc-500 font-semibold">{list?.user?.slug}</small>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )) : (
          //  All Lists 
          <ListsSuggested action="NoSuggestedCodeShow" />
        ))}

      <div className="ms-3 my-3">
        <Link to='/lists/suggested' className='text-blue-500 tracking-wide text-[16px]'>
          Show more
        </Link>
      </div>

      {/* Show logged-in user Lists */}
      {filteredListData?.length > 0 && filteredListData.map((list) => loading ? <Loading /> : (
        <div className="border-t-[0.2px] border-zinc-600 ps-4" key={list.id}>
          <h1 className="font-bold text-xl my-4">Your Lists</h1>
          <div className="flex mt-3">
            <div className="w-12 h-16">
              <img
                src={list?.cropImg ? `${imgPath}/list_images/cropListImg/${list?.cropImg}`
                  : '/src/assets/images/defaultListImg.png'}
                className="rounded-sm w-full" alt="List"
              />
            </div>

            <div className="ms-3">
              <Link to={`/list/${list.id}`}>
                <div className="flex items-center">
                  <h1 className="font-bold text-[16px] flex items-center gap-1">
                    {list.name} <IoIosLock size="1.2em" />
                  </h1>
                  <small className="text-zinc-500 font-semibold"> . member 1</small>
                </div>
              </Link>

              <Link to={`/profile`}>
                <div className="flex items-center space-x-1">
                  {list?.user?.profile_photo ? (
                    <img
                      src={`${imgPath}/profile_images/thumb_pro/${list?.user?.profile_photo}`}
                      className="rounded-full h-5 w-5 lg:mx-auto" alt="User Profile"
                    />
                  ) : (
                    <h1 className="text-[0.7rem] w-5 h-5 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black">
                      {list?.user?.name[0].toUpperCase()}
                    </h1>
                  )}
                  <h1 className="font-bold text-sm flex items-center gap-1">
                    {list?.user?.name} <IoIosLock size="1.2em" />
                  </h1>
                  <small className="text-zinc-500 font-semibold">{list?.user?.slug}</small>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Lists