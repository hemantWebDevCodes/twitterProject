import React,{useEffect, useState} from 'react'
import { Input, ModalBox, Textarea} from '../index'
import {IoClose, MdOutlineAddAPhoto, IoIosArrowForward} from '../Icons'
import { useDispatch, useSelector } from 'react-redux';
import { createList, deletePostList, editPostList, showAllPostLists } from '../../ReduxApi/postList';
import { Link } from 'react-router-dom';

function ListForm({action, list_id, isModalopen, setIsModalOpen}) {

    const [prevFile, setPrewFile] = useState('');
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
  
    // Input Value
    const inputHandler = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }
  
    // File Handler
    const fileHandler = (e) => {
      const file = e.target.files[0];
  
      setInputs(inputs => ({
         ...inputs, [e.target.name] : file
      }));
      setPrewFile(URL.createObjectURL(file));
    }
  

    // Edit Data Fetch
    const {listData} = useSelector((state) => state.list);
    const editList = listData.find((data) => data.id === list_id);

    useEffect(() => {
       if(editList){
          setInputs({
            name : editList?.name || '',
            description : editList?.description || '',
            listType : editList?.listType || false
        });
          setPrewFile(`http://localhost:8000/images/list_images/listBgImg/${editList?.listBg_img}`);
       }
    }, [editList]);

    // console.log(editList);

    // Form Submit Handler
    const submitHandler = (e) => {
      e.preventDefault();
      if(action === "editList"){
        dispatch(editPostList({list_id, formData : inputs}));  
      }else {
        dispatch(createList(inputs));
      }
      dispatch(showAllPostLists());
    }
  
  // Delete List Handler
  const deleteListHandler = (e) => {
    e.preventDefault();
    dispatch(deletePostList(list_id));
  }
  
  return (
    <>


      <ModalBox formSubmitHandel={submitHandler} isModalOpen={isModalopen} onClose={() => setIsModalOpen(false)} 
                modalTitle={`${action === "editList" ? 'Edit List' : 'Create a new List'}`} btnText={`${action === "editList" ? 'Done' : 'Next'}`}>
        <form>
          <div className="relative w-full h-52 flex justify-center items-center px-1">
            <img src={prevFile} width='full' height='500' />
          <div className="absolute flex z-50 space-x-3">
            <div className="px-3 py-3 flex items-center bg-zinc-700/80 cursor-pointer hover:bg-zinc-600 duration-150 rounded-full">
              <label htmlFor="img" className='cursor-pointer'>
                  <MdOutlineAddAPhoto size='1.3em'/>
                  <input type="file" name="listBg_img" id="img" hidden onChange={fileHandler} />
              </label>
            </div>
            {prevFile &&
             <div className="cursor-pointer p-3 bg-zinc-700/80 hover:bg-zinc-600 duration-150 rounded-full">
              <IoClose size='1.3em' onClick={() => setPrewFile('')}/>
             </div>
           }
           </div>
          </div>
          <div className="px-3 mt-20">
            <Input label='Name' name="name" value={inputs?.name || ''} onChange={inputHandler} />
            <Textarea label='Description' name="description" value={inputs?.description || ''} onChange={inputHandler} />
          </div>

          <div className="px-3 mt-7 mb-5 flex justify-between items-center">
            <div className="">
             <h6 className='text-zinc-200 text-[15px]'>Make private</h6>
             <small className='text-zinc-500 line-clamp-4'>When you make a List private, only you can see it.</small>
            </div>
            <div className="px-4">
               <input type="checkbox" checked={inputs?.listType || false} name="listType" onChange={inputHandler} className=' h-10 w-5 border border-zinc-800' />
            </div>
          </div>
        <Link to={`/lists/members/${list_id}`}>
          <div className="flex justify-between items-center py-3 px-5 border-t text-[15px] border-zinc-800
                          hover:bg-zinc-900 duration-100">
            <div className="text-white tracking-wide">
                <h1>Manage Members</h1>
            </div>
            <div className="">
              <IoIosArrowForward size='1.3em' className='text-zinc-500' />
            </div>
          </div>
        </Link> 

        <div className="flex justify-center items-center py-4 border-t text-[15px] border-zinc-800
                        hover:bg-red-950/40 duration-100">
          <button onClick={deleteListHandler} className='text-red-600 tracking-wide'>
            Delete List
          </button>
        </div>         
      </form>
    </ModalBox>
    </>
  )
}

export default ListForm