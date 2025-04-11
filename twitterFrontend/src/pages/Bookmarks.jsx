import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Repost, CommentPost, LikePost,PostViewCount, PostMenuBar, Bookmark, PostMoreOption, Loading, SearchInput } from '../components/index';
import { Link } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { deleteBookmarks } from '../ReduxApi/LikeAndBookmarkConcept';

function Bookmarks() {
  
  const { bookmarkData,loading } = useSelector((state) => state.likesPost);
  const { profileData } = useSelector((state) => state.profile);
  const { searchData } = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  console.log('Bookmark', searchData.bookMark);

  //* Convert To  Indian Standard Time
  const convertInTime = (IndTime) => {
    const data = new Date(IndTime);
      return data.toLocaleString('en-In', { 
          timeZone : 'Asia/Kolkata',
          month : 'short',
          day : '2-digit',
    });
  }

  const deleteBookmark = () =>{
    dispatch(deleteBookmarks());
  }

  return (
  <>
    <div className="sticky top-0 bg-black z-30 pb-1">
    <div className="flex justify-between items-center px-3">
      <div className="py-2">
         <h3 className='font-bold text-xl text-zinc-300'>Bookmarks</h3>
         <small className='text-zinc-500 line-clamp-3'>{profileData?.slug}</small>
      </div> 
       <div className="z-40">
          <PostMenuBar> 
            <ul className='cursor-pointer'>
              <li className='py-2 px-2'>
                <button onClick={deleteBookmark} className="flex space-x-2 items-center">
                  <IoTrashOutline className='text-red-600 text-xl' />
                  <li className='cursor-pointer text-red-600 font-bold text-[15px]'>Clear all Bookmarks</li>
                </button>
              </li>
            </ul>
          </PostMenuBar>
       </div>
      </div>
      <div className="flex items-center px-3">
          <SearchInput type="Bookmark"/>
      </div>
</div>

{loading ? <Loading/> :
    <div className='w-full h-full'>
      {
        searchData?.bookMark?.length > 0 ?
          <div className="ms-10 py-3 text-zinc-400">
            <h4>Found in Your Bookmarks : </h4>
          </div> 
      : ""}
      {searchData?.bookMark?.length > 0 ? searchData?.bookMark?.flat()?.map((bookmark) => {
       return bookmark.user_id === profileData.id && ( 
        <>
          <div className="flex mt-3 border-b-[0.1px] space-x-1 border-zinc-700" key={bookmark.id}>
            <div className="w-[10%]">
            {
              bookmark?.user?.profile_photo 
                ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${bookmark?.user?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto'/> 
                : <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{bookmark?.user?.name[0].toUpperCase()}</h1>  
            }
          </div>
          <div className="w-[90%] flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold "> {bookmark?.user?.name} </h3>
                  <span className='ml-2 font-thin text-zinc-500'>{`${bookmark.user?.slug}`}</span>
                  <span className='ml-2 font-thin text-zinc-400 text-sm'>{convertInTime(bookmark.created_at)}</span>
                </div>
                <span className='me-3'>  
                  <PostMoreOption post_id={bookmark?.post?.id} type="post"/>
                </span>
              </div>
          

            <Link to={`http://localhost:5173/postDeatail/${bookmark?.post.id}`}>
              <div className="mt-1">
                <p className='font-thin text-zinc-300 text-sm'>
                  {bookmark?.post.description.length > 30 ? bookmark?.post?.description.split(' ').slice(0,30).join(' ') + '....' : bookmark?.post?.description}
                </p>
              </div>
              
              {bookmark?.post?.image_description && (
                <div className="my-3">
                  <p className='font-thin text-zinc-300 text-sm'>
                    {bookmark?.post?.image_description}
                  </p>
                </div>
              )}

              {bookmark?.post?.image && bookmark?.post?.file_type === "image" ? (
                <div className="w-[97%] h-auto mt-3">
                <img src={`http://localhost:8000/post_images/${bookmark?.post?.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
                </div>
              
              ) : '' 
            }
          
              { bookmark?.post?.image && bookmark?.post?.file_type === "video" ? (
              <video className="w-[97%] h-52 mt-3" autoPlay muted controls>
                  <source src={`http://localhost:8000/post_images/${bookmark?.post?.image}`} type='video/mp4'/>
              </video>
              ) : ''}
            </Link>

            <div className="flex justify-around">
              <CommentPost post_id={bookmark.post_id} commentAction="createComment" type="post" /> 
                
              <Repost post_id={bookmark.post_id} type="post"/>

              <div className="flex items-center">
                <LikePost post_id={bookmark.post_id} type="post"/>
              </div>  
              
              <PostViewCount post_id={bookmark.post_id} />

              <Bookmark post_id={bookmark.post_id} type="post" />
            </div>
          </div>
      </div>
    </>
  )}) :
      bookmarkData && bookmarkData?.map((bookmark) => {
        return bookmark.user_id === profileData.id ? ( 
          <div className="flex mt-3 border-b-[0.1px] space-x-1 border-zinc-700" key={bookmark.id}>
            <div className="w-[10%]">
            {
              bookmark?.user?.profile_photo 
                ? <img src={`http://localhost:8000/images/profile_images/thumb_pro/${bookmark?.user?.profile_photo}`} className='rounded-full w-10 h-10 mx-auto'/> 
                : <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{bookmark?.user?.name[0].toUpperCase()}</h1>  
            }
          </div>
          <div className="w-[90%] flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold "> {bookmark?.user?.name} </h3>
                  <span className='ml-2 font-thin text-zinc-500'>{`${bookmark.user?.slug}`}</span>
                  <span className='ml-2 font-thin text-zinc-400 text-sm'>{convertInTime(bookmark.created_at)}</span>
                </div>
                <span className='me-3'>  
                  <PostMoreOption post_id={bookmark?.post?.id} type="post"/>
                </span>
              </div>
          

            <Link to={`http://localhost:5173/postDeatail/${bookmark?.post.id}`}>
              <div className="mt-1">
                <p className='font-thin text-zinc-300 text-sm'>
                  {bookmark?.post.description.length > 30 ? bookmark?.post?.description.split(' ').slice(0,30).join(' ') + '....' : bookmark?.post?.description}
                </p>
              </div>
              
              {bookmark?.post?.image_description && (
                <div className="my-3">
                  <p className='font-thin text-zinc-300 text-sm'>
                    {bookmark?.post?.image_description}
                  </p>
                </div>
              )}

              {bookmark?.post?.image && bookmark?.post?.file_type === "image" ? (
                <div className="w-[97%] h-auto mt-3">
                <img src={`http://localhost:8000/post_images/${bookmark?.post?.image}`} alt="" className='w-full h-full rounded-lg object-cover mx-auto' />
                </div>
              ) : ''}
          
              { bookmark?.post?.image && bookmark?.post?.file_type === "video" ? (
              <video className="w-[97%] h-52 mt-3" autoPlay muted controls>
                  <source src={`http://localhost:8000/post_images/${bookmark?.post?.image}`} type='video/mp4'/>
              </video>
              ) : ''}
            </Link>

            <div className="flex justify-around">
              <CommentPost post_id={bookmark.post_id} commentAction="createComment" type="post" /> 
                
              <Repost post_id={bookmark.post_id} type="post"/>

              <div className="flex items-center">
                <LikePost post_id={bookmark.post_id} type="post"/>
              </div>  
              
              <PostViewCount post_id={bookmark.post_id} />

              <Bookmark post_id={bookmark.post_id} type="post" />
            </div>
          </div>
      </div>
    ) : ''})
  }
  </div> 
}
  </>
  )
}

export default Bookmarks
