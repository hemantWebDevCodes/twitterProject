import React, { useEffect, useRef, useState } from 'react'; // Removed unused 'act' import
import { MdOutlineEmojiEmotions, Picker, RxImage } from '../Icons'
import { Button, ConverIndiaTime, Textarea } from '../index';
import TwitImageModal from './TwitImageModal';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, createCommentReply, createPost } from '../../ReduxApi/postSlice';
import { createRepost } from '../../ReduxApi/post';
import { Mention, MentionsInput } from 'react-mentions';
import { useNavigate } from 'react-router';

function TweetForm({ action, post_id, Repost_id, comment_id, originalPost = null, type, tweetBtnText }) {
   const dispatch = useDispatch();
   const textareaRef = useRef(null);
   const navigate = useNavigate();
   const {allUserData,profileData} = useSelector((state) => state.profile);

   const [showEmoji, setShowPicker] = useState(false);
   const [prevFile, setPrevFile] = useState('');
   const [posts, setPosts] = useState({description : ''});
   
   const imgPath = 'http://localhost:8000/images/';
   
   useEffect(() => adjustHeight(), [posts.description]);

   //  Auto height textarea
   const adjustHeight = () => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }

   // Handle emoji selection
   const addEmoji = (e) => {
      let emo = e.unified.split('-');
      const codeEmoji = emo.map((elem) => String.fromCodePoint('0x' + elem));
      setPosts(prev => ({ ...prev, description: (prev.description || "") + codeEmoji }));
   };
   
   // Handle input change and update post data state
   const handleInput = (event,newValue) => {
      setPosts({ ...posts, description : newValue});
      adjustHeight();
   }

   // Handle file input and update post data state
   const fileHandler = (e) => {
      const { name } = e.target;
      const file = e.target.files[0];

      setPosts(posts => ({...posts, [name]: file}));
      if (name === 'image') setPrevFile(URL.createObjectURL(file));
   }

   // Handle form submission
   const handleSubmit = (e) => {
      e.preventDefault();
      if (action === 'createPost') {
         dispatch(createPost(posts));
      }
      else if (action === 'createRepost') {
         if (type === "comment") {
            dispatch(createRepost({ comment_id, type, data: posts }));
         }
         else if (type === "post") {
            dispatch(createRepost({ post_id, type, data: posts }));
         }
      }
      else if (action === 'createComment') {
         dispatch(createComment({ post_id, Repost_id, type, data: posts }));
      } else {
         dispatch(createCommentReply({ comment_id, data: posts }));
      }
      setPosts({description : ''});
      setPrevFile("");
   }

   // Handle Mention Profile
   const handleMentionClick = (user_id) => {
       navigate(`/profile/${user_id}`);
   }

   useEffect(() => adjustHeight(), []);

   return (
      <div className='border-b-[0.5px] pb-3 border-zinc-800'>
         <form onSubmit={handleSubmit}>
            <div className="flex justify-start pt-3">
               <div className="w-[10%]">
                  {profileData.profile_photo ?
                     <img src={`${imgPath}/profile_images/thumb_pro/${profileData?.profile_photo}`} className='rounded-full h-10 w-10 lg:mx-auto' /> :
                     <h1 className='text-[1.5rem] w-12 h-12 mx-auto flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>{profileData?.name && profileData?.name[0].toUpperCase()}</h1>
                  }
               </div>

               <div className="w-[85%] flex flex-col justify-start">
                  <div className="h-auto relative">
                     <MentionsInput
                        inputRef={textareaRef}
                        type="text"
                        name='description'
                        onChange={handleInput}
                        value={posts?.description || ""}
                        placeholder='What is Happening?'
                        rows='2'
                        style={{ resize: 'none' }}
                        className='mt-2 w-full h-auto peer overflow-hidden box-border text-xl bg-black outline-none'
                     >
                      <Mention 
                         trigger="@"
                         data={
                           allUserData.map(user => ({
                                    id: String(user?.id),
                                    display: String(user?.slug || user?.name || 'user')
                                }))
                              
                        }
                         markup="@[__display__](__id__)"
                         className="text-sky-500 font-semibold"
                         renderSuggestion={(suggestion, search, highlightedDisplay) => (
                           <div className="absolute z-30 bg-zinc-900 text-white border border-gray-700 overflow-auto">
                              {highlightedDisplay}
                           </div>
                        )}
                        onAdd={(id) => handleMentionClick(id)}
                      />
                     </MentionsInput>
                  </div>

                  <div className="w-full h-full mx-auto">
                     {prevFile && <img src={prevFile} alt='img-found' className='rounded-3xl w-[514px]' />}
                     {prevFile &&
                        <TwitImageModal prevFile={prevFile} onChangeInput={handleInput} />
                     }
                  </div>

                  {/* Repost Data Show */}
                  {originalPost && (
                     <div className="lg:max-w-xl border-[0.1px] w-full border-zinc-800 py-1 mt-2 mx-auto rounded-2xl">
                        <div className="flex space-x-2 items-center ms-3">
                           {
                              originalPost.user?.profile_photo ?
                                 <img
                                    src={`${imgPath}/profile_images/thumb_pro/${originalPost?.user?.profile_photo}`}
                                    className='rounded-full w-12 h-12 ms-2'
                                 />
                                 :
                                 <h1 className='text-[1.5rem] w-10 h-10 flex justify-center items-center rounded-full text-zinc-300 bg-orange-700 ring-4 ring-black'>
                                    {originalPost?.user?.name[0]?.toUpperCase()}
                                 </h1>
                           }
                           <div className="flex space-x-2 text-zinc-400">
                              <h2>{originalPost.user?.name}</h2>
                              <span className='text-zinc-600 text-[16px]'>
                                 {`@${String(originalPost?.user?.name || '').replace(/\s+/g, '').toLowerCase()}`}
                              </span>
                              <span><ConverIndiaTime convertedTime={originalPost.created_at} /> </span>
                           </div>
                        </div>

                        <div className="flex p-3 space-x-2">
                           <div className="shrink-0">
                              {originalPost?.image && (
                                 <img
                                    src={`http://localhost:8000/post_images/${originalPost.image}`}
                                    className='rounded-lg'
                                    width='150'
                                 />
                              )}
                           </div>
                           <div className="text-sm text-zinc-400">
                              <p>{originalPost?.description}</p>
                              <p>{originalPost?.image_description}</p>
                           </div>
                        </div>
                     </div>
                  )}

                  <div className="flex justify-between pb-2 items-center peer-focus:border-t-[0.1px] peer-focus:border-sky-700">
                     <div className="flex space-x-3">
                        <div>
                           <label htmlFor={action === 'createPost' ? 'img' : 'image'}>
                              <RxImage size='1.2rem' className='text-lg cursor-pointer text-sky-600 font-bold' />
                              <input
                                 type='file'
                                 name='image'
                                 id={action === 'createPost' ? 'img' : 'image'}
                                 onChange={fileHandler}
                                 className='hidden'
                              />
                           </label>
                        </div>

                        <MdOutlineEmojiEmotions
                           name='description'
                           size='1.3rem'
                           onClick={() => setShowPicker(!showEmoji)}
                           className='text-xl font-bold cursor-pointer text-sky-600'
                        />
                     </div>

                     <div className="w-20">
                        <Button type='submit' className={`w-full py-2 hover:bg-sky-600 ${posts?.description === '' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                           {tweetBtnText ? tweetBtnText : 'Post'}
                        </Button>
                     </div>
                  </div>
                  <div className="absolute z-30 top-44">
                     {showEmoji &&
                        <Picker
                           height={390}
                           width={300}
                           searchDisabled
                           onEmojiClick={addEmoji}
                           theme='dark'
                        />
                     }
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}

export default TweetForm;
