import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../http'
import axios from "axios";

const initialState = {
    userReposts: [],
    allReposts : [],
    loading : true,
    error : '',
  };

  // Create Repost    

  export const createRepost = createAsyncThunk('createRepost', async ( {post_id, comment_id, type, data} , {rejectWithValue}) => {
   try {
       const url = type === "post" ? `http://localhost:8000/api/createRepost/${type}/${post_id}`
                                   : `http://localhost:8000/api/createRepost/${type}/${comment_id}`;

      const response = await axios.post(url, data, {
        headers : {
          'Authorization' : `Bearer ${sessionStorage.getItem('api_token')}`,
          "Content-Type" : 'multipart/form-data'
      }
    });
    
      return response.data;

   } catch (error) {
       return rejectWithValue(error.response?.data?.message);
   }
 })

 // Fetch Single User Repost  
 export const showRepost = createAsyncThunk('showRepost', async({post_id} , {rejectWithValue}) => {
    try {
      const response = await http.get(`/showRepost/${post_id}`);
      return response.data;
    }catch (error) {
      return rejectWithValue(error);
    }
 })

//  All Reposts Fetch
 export const showAllRepost = createAsyncThunk('showAllRepost', async() => {
   try {
      const response = await http.get('/allReposts');
      return response.data.rePosts;
   } catch (error) {
        return error;
   }
 });

export const rePostSlice = createSlice({
    name : 'rePost',
    initialState,
    reducers : { },
    extraReducers : (builder) => {

        builder.addCase(createRepost.pending, (state) => {
          state.loading = true;
          state.error = '';
        });

        builder.addCase(createRepost.fulfilled, (state,action) => {
           state.loading = false;

           if(Array.isArray(state.rePosts)){
              state.rePosts.push(action.payload); 
           }else{
              state.rePosts = [action.payload];
           }
        });

        builder.addCase(createRepost.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload
        });

        // Single User Repost 
        builder.addCase(showRepost.pending, (state) => {
          state.loading = true;
          state.error = '';
        });

        builder.addCase(showRepost.fulfilled, (state, action) => {
          state.loading = false;
          state.userReposts = action.payload;
        });

        builder.addCase(showRepost.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload;
        });

        // All Reposts 
        builder.addCase(showAllRepost.pending, (state) => {
          state.error = '';
        });

        builder.addCase(showAllRepost.fulfilled, (state, action) => {
          state.loading = false;
          state.allReposts = action.payload;
        });

        builder.addCase(showAllRepost.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload;
        });
      }
});

 export default rePostSlice.reducer