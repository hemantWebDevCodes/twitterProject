import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ModalBox, Loading } from '../components';
import { MdArrowBack, IoIosLock, CgCalendarDates, IoClose, MdOutlineAddAPhoto, CiLocationOn, PiLinkSimpleBold } from '../components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert'
import { editProfile, updateProfile } from '../ReduxApi/profileSlice';

function Profile() {

  const [isModalOpen, setCloseModal] = useState(false);
  const [prevImage, setPrevImage] = useState('');
  const [prevProfileImg, setPrevProfileImg] = useState('');
  const [isOpen, setIsModalClose] = useState(false);

  const [editData, setEditData] = useState([]);
   
  // Fetch Current user Data And Set Data In State
   
  const dispatch = useDispatch();
  const {profileData, loading } = useSelector((state) => state.profile);

  
  useEffect(() => {
     dispatch(editProfile());
     setEditData(profileData);  
  },[dispatch])

  // HANDLE INPUT ON CHANGE
  function handleInput(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }
  
  // HANDLE IMAGES
  const handleImages = (e) => {
     const {name} = e.target; 
     const file = e.target.files[0];
     
     setEditData(editData => ({
        ...editData, [name] : file
     }))

    if(name === 'profile_photo'){
      setPrevProfileImg(URL.createObjectURL(file));
    }else if(name === 'background_img'){
      setPrevImage(URL.createObjectURL(file));
    }
  }

  // DISPATCH DATA
  const handleProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(editData));
  }

  const ImgPath = 'http://localhost:8000/images/';

  return loading ? <Loading /> : (
    <>
    {/* PROFILE DATA */}
    <div className="flex items-center my-2 space-x-8 ms-4">
        <MdArrowBack size="1.4em" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 text-zinc-300">
            <h1 className="text-xl font-semibold">{editData.name}</h1>
            <IoIosLock size="1.3em" />
          </div>
          <small className="text-zinc-500">0 Posts</small>
        </div>
      </div>

      {/* IMAGES */}
      <div className={`relative w-full h-1/3 ${!editData.background_img && 'bg-zinc-800'}`}>
        {prevImage || editData.background_img &&
          <img src={prevImage !== '' ? prevImage : `${ImgPath}/bg_profileImages/${editData.background_img}`} className="w-full h-full object-cover" />  
        }
       
        <div className="absolute lg:-bottom-1/4 left-5 w-32 h-32 -bottom-20 flex items-center justify-between">
        { prevProfileImg || editData.profile_photo ?
          <img src={prevProfileImg !== '' ? prevProfileImg : `${ImgPath}/profile_images/thumb_pro/${editData.profile_photo}`} className="rounded-full w-full h-full border-black border-2 object-cover" />
          :
          <h1 className='text-[4rem] w-full h-full flex justify-center items-center rounded-full bg-orange-800 ring-4 ring-black'>{profileData?.name[0]}</h1>  
        }
        </div>
      </div>

      <div className="ms-auto flex justify-end items-center mt-3">
        <Button onClick={() => setCloseModal(true)} bgColor="bg-black" className="w-36 py-3 me-4 border-zinc-600 border-[0.1px] text-sm font-bold hover:bg-zinc-900 text-white">Edit Profile</Button>
      </div>

      <div className="flex flex-col mt-6 mx-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold m-0">{editData.name}</h1>
          <IoIosLock size="1.4em" />
        </div>

        <div className="mt-3">
          <p className="text-sm">
            {editData.bio}
          </p>
        </div>

        <div className="flex flex-wrap space-x-3 mt-3">
          <div className="flex space-x-1 items-center text-zinc-400">
            <CiLocationOn size="1.3rem" />
            <span className="text-sm">{editData.location}</span>
          </div>

          <div className="flex space-x-1 items-center text-zinc-400">
            <PiLinkSimpleBold size="1.3rem" className="text-sky-600" />
            <a href="PiLinkSimpleBold.com" className="text-sm text-sky-600">{editData.website}</a>
          </div>

          <div className="flex space-x-1 items-center text-zinc-500 text-md">
            <CgCalendarDates size="1.3rem" />
            <h4>{editData.dob}</h4>
          </div>
        </div>

        <div className="flex text-sm text-zinc-400 mt-3 ml-2 space-x-5">
          <h2>Following : </h2>
          <h2>Follower : </h2>
        </div>
        <small className='mt-3 text-zinc-400'>Not followed by anyone you’re following</small>
      </div>

      {/* EDIT PROFILE FORM */}
      <form onSubmit={handleProfile}>
        <ModalBox isModalOpen={isModalOpen} onClose={() => setCloseModal(false)} modalTitle='Edit profile' btnText='Save'>
          <div className="relative w-full bg-zinc-900 h-56 flex justify-center items-center">
            <div className="relative w-[100%] h-[100%] z-10">
              {prevImage || editData.background_img ? <img src={prevImage !== '' ? prevImage : 
              `${ImgPath}/bg_profileImages/${editData.background_img}`} className="w-full h-full object-cover" /> : ''}
            </div>
           
            <div className="absolute flex justify-center items-center space-x-2 z-20">
              <label htmlFor="bg-img" className="bg-black/55 hover:bg-black/50 p-3 rounded-full cursor-pointer">
                <MdOutlineAddAPhoto size="1.4em" className="text-zinc-100" />
              </label>
              {editData.background_img && (
                <label className="bg-black/50 hover:bg-black/45 p-3 rounded-full cursor-pointer">
                  <IoClose size="1.4em" className="text-zinc-100" />
                </label>
              )}
              <Input type="file" name='background_img' id="bg-img" onChange={handleImages} className="hidden" />
            </div>
            
            <div className="absolute top-44 left-5 z-20">
              <div className="relative w-32 h-32">
                <img src={prevProfileImg !== '' ? prevProfileImg : `${ImgPath}/profile_images/thumb_pro/${editData.profile_photo}`} className="rounded-full w-full h-full border-black border-4 object-cover"/>
              </div>
              <div className="absolute top-0 left-[33%] flex justify-center">
                <label htmlFor="pro-img" className="p-2 cursor-pointer bg-black/55 hover:bg-black/50 rounded-full mt-11">
                  <MdOutlineAddAPhoto size="1.4em" className="text-zinc-200" />
                </label>
              </div>
              <Input type="file" name='profile_photo' id="pro-img" onChange={handleImages} className="hidden" />
            </div>
          </div>

          <div className="px-4 mt-16 mb-5 flex flex-col justify-center items-center">
            <Input label="Name" name='name' value={editData.name || ''} onChange={handleInput} />
            <Textarea label="Bio" name='bio' value={editData.bio || ''} onChange={handleInput} />
            <Input label="Location" name='location' value={editData.location || ''} onChange={handleInput} />
            <Input label="Website" name='website' value={editData.website || ''} onChange={handleInput} />
            <Input type="date" name='date' value={editData.dob} onChange={handleInput || ''} label="Dob" />
          </div>
        </ModalBox>
      </form>

      <Alert isOpen={isOpen} CloseAlertModal={() => setIsModalClose(false)} >
        
      </Alert>
        <button onClick={() => setIsModalClose(true)}>Open</button>
    </>
  );
}

export default Profile;
