import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import http from "../http";

const initialState = {
    postData : [],
    commentData : [],
    commentReplyData : [],
    loading : true,
    error : null
}

// const token = localStorage.getItem('api_token');
  const token = sessionStorage.getItem('api_token');

const authHeader = {
    'Authorization' : `Bearer ${token}`,
    'Content-Type' : 'multipart/form-data'
}

 //  Create Post
 export const createPost = createAsyncThunk('createPost', 
   async(formData, {rejectWithValue}) => {
      try {
         const response = await axios.post('http://localhost:8000/api/createPost', formData, {
            headers : { ...authHeader }
         })

         return response.data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
 }); 

 // Show Allpost / userPost 
 export const allPosts = createAsyncThunk('allPosts',
   async({filter}, {rejectWithValue}) => {
      try {
         let apiPath = '/userPost';
         filter === "allPosts" ?  apiPath='/allPost' : '/userPost';
      
         const response = await http.get(apiPath,{});
         
         const userPost = response.data.userPost;
         const allPost =  response.data.allPosts;

         return filter === 'allPosts' ? allPost : userPost;

      } catch (error) {
           return rejectWithValue(response.data.message || 'AllPosts Error in PostSlice File.');
   }
 })

 // Create PostComment
 export const createComment = createAsyncThunk('createComment',
   async({post_id, Repost_id, type, data}, {rejectWithValue}) => {
      try {
        const url = type === "post" ? `http://localhost:8000/api/create_comment/${type}/${post_id}` : 
                                      `http://localhost:8000/api/create_comment/${type}/${Repost_id}`;
       
         const response = await http.post(url, data, {
            headers : { ...authHeader}
         });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.data?.response?.message);
      }
 });  

 // Single Post Comments
 export const singlePostComments = createAsyncThunk('singlePostComments',
   async(data, {rejectWithValue}) => {
     try {
        const response = await http.get('/singlePostComments', data);
        return response.data.singlePostComments;
     } catch (error) {
        return rejectWithValue(error.response?.data || "Error Fething Comment.");
     }
 });

//  Create Comment Reply
export const createCommentReply  = createAsyncThunk('createCommentReply',
   async({comment_id, data}, {rejectWithValue}) => {
      try {
         const response = await axios.post(`http://localhost:8000/api/createCommentReply/${comment_id}`, data, {
           headers : {...authHeader}
         });

       return response;
   } catch (error) {
      return rejectWithValue(error);
   }
});

// Show All Comments Replies
export const showCommentReplies = createAsyncThunk('showCommentReplies',
    async(data,{rejectWithValue}) => {
      try {
         const response = await http.get('/showCommentReplies', data);
         return response.data.commentReplies;
      } catch (error) {
         return rejectWithValue(response.data.message || "Show Comment Replies Error in postSlice File.");
      }
});

// deleteAction
export const deleteAction = createAsyncThunk('deleteAction',
   async({post_id, type, comment_id, Repost_id, data},{rejectWithValue}) => {
      try {
         let url;
          if(type==="post"){
            url = `/deletePost/${post_id}`;
          }else if(type==='comment'){
             url = `/deleteComment/${comment_id}`;
          } else if(type==="Repost"){
             url = `/deleteRepost/${Repost_id}`;
          }

        const response = http.post(url, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(response?.data?.message || 'Post Delete Error');
      }
});

export const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers : { },
    extraReducers : (builder) => {
     builder.addCase(createPost.pending, (state) => {
           state.error = '';
     });

     builder.addCase(createPost.fulfilled, (state,action) => {
        state.postData.push(action.payload);
        state.loading = false; 
     });

     builder.addCase(createPost.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
     });

     // Allposts / UserPost

     builder.addCase(allPosts.pending, (state) => {
         state.error = '';
     });

     builder.addCase(allPosts.fulfilled, (state,action) => {
        state.loading = false;
        state.postData = action.payload; 
     });

     builder.addCase(allPosts.rejected, (state,action) => {
      state.loading = false;
      state.error = action.payload;
     });

     // create Post Comment
     builder.addCase(createComment.pending, (state) => {
         state.error = '';
     });

     builder.addCase(createComment.fulfilled, (state,action) => {
        state.loading = false;
        state.commentData.push(action.payload); 
     });

     builder.addCase(createComment.rejected, (state,action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
     });

   // Single Posts Comments
      builder.addCase(singlePostComments.pending, (state) => {
         state.error = '';
      });

      builder.addCase(singlePostComments.fulfilled, (state,action) => {
         state.loading = false;
         state.commentData = action.payload;
      });

      builder.addCase(singlePostComments.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload;
      });

   // Create Comment Reply
      builder.addCase(createCommentReply.pending, (state) => {
         state.error = '';
      });

      builder.addCase(createCommentReply.fulfilled, (state,action) => {
         state.loading = false;
         state.commentReplyData.push(action.payload);
      });

      builder.addCase(createCommentReply.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload;
      });

   // Show All Comment Replies
   builder.addCase(showCommentReplies.pending, (state) => {
      state.error = null;
   });

   builder.addCase(showCommentReplies.fulfilled, (state,action) => {
      state.loading = false;
      state.commentReplyData = action.payload;
   });

   builder.addCase(showCommentReplies.rejected, (state,action) => {
      state.loading = false;
      state.error = action.payload;
   });
  }
});

export default postSlice.reducer