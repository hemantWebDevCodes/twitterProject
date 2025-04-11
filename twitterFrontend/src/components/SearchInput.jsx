import React, { useState } from 'react';
import { BiSearch, IoIosLock } from './Icons';
import { getSearchData, clearSearchResult } from '../ReduxApi/SearchFunctionlity';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SearchInput({type="all"}) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { searchData } = useSelector((state) => state.searchQuery);

  // Handle Search Value onChange
  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query === "") {
      dispatch(clearSearchResult());
    } else {
      dispatch(getSearchData({ query,type}));
    }
  };

  return (
    <div className="w-full flex flex-col relative">
      {/* Search Input */}
      <div className="relative w-full">
        <input
          value={search}
          onChange={handleSearchQuery}
          className="rounded-full bg-black h-11 font-semibold w-full outline-none ps-14 peer focus:bg-black
                     text-zinc-300 border border-zinc-700 focus:border-sky-500"
          placeholder="Search"
        />
        <div className="bg-black absolute rounded-s-full w-12 top-2 left-1 peer-focus:bg-black">
          <BiSearch size="1.2rem" className="mx-auto mt-1 text-zinc-300" />
        </div>
      </div>

      {/* Search Results */}
      {search?.length > 0 && (
        <div
          className="absolute top-full left-0 w-full bg-black rounded-xl border border-zinc-800 mt-2 shadow-lg
                     max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          {searchData?.lists?.length === 0 && searchData?.searchingData?.length === 0 && type=="all" ? (
            <div className="text-center text-zinc-400 py-2">No results found</div>
          ) : (
            <>
            {/* User Search Results */}
              {searchData?.searchingData?.length > 0 && type=="all" ?
                searchData?.searchingData?.flat()?.map((user) => (
                  <Link key={user?.id} to={`/profile/${user?.id}`} className="block">
                    <div className="flex items-center space-x-3 p-2 hover:bg-zinc-950 rounded-lg cursor-pointer">
                      <div className="w-12 h-12 flex items-center justify-center">
                        {user?.profile_photo ? (
                          <img
                            src={`http://localhost:8000/images/profile_images/thumb_pro/${user?.profile_photo}`}
                            className="rounded-full w-full h-full object-cover"
                            alt="Profile"
                          />
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-700 ring-4 ring-black">
                            <span className="text-zinc-300 text-xl font-bold">
                              {user?.name[0].toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-white font-bold hover:underline">{user?.name}</h2>
                        <span className="text-zinc-400 text-sm">{user?.slug}</span>
                      </div>
                    </div>
                  </Link>
                )) : ""} 
          <hr className='border-zinc-800'/>
          {/* Lists Search Results */}
              {searchData?.lists?.length > 0 && type === "all" ?
                searchData?.lists?.flat()?.map((list) => (
                  <div className="flex px-3 mt-3" key={list.id}>
                    <div className="w-12 h-16">
                      <img
                        src={list?.cropImg ? `http://localhost:8000/images/list_images/cropListImg/${list?.cropImg}`
                          : '/src/assets/images/defaultListImg.png'}
                        className="rounded-sm w-full" alt="List"
                      />
                    </div>

                    <div className="ms-3 text-white">
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
                              src={`http://localhost:8000/images/profile_images/thumb_pro/${list?.user?.profile_photo}`}
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
                )) : ""}
            </>
          )}
        </div>
      )}
    </div>
  )
}
export default SearchInput;
