import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import http from "../http";

const initialState = {
   postViewData : [],
   loading : false,
   error : null
}

export const createViewPost = createAsyncThunk('createViewPost', async(post_id, {rejectWithValue}) => {
    try {
        const response = await http.post(`postView/${post_id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const postViewCount = createAsyncThunk('postViewCount', async(data, {rejectWithValue}) => {
   try {
      const response = await http.get('postViewCount', data);
      return response.data.postViewCount;
   } catch (error) {
      return rejectWithValue(error);
   }
});

export const postViewSlice = createSlice({
   name : "postView",
   initialState,
   reducers : { },
   extraReducers : (builder) => {
       builder.addCase(createViewPost.pending, (state) => {
          state.loading = true;
          state.error = null;
       });

       builder.addCase(createViewPost.fulfilled, (state, action) => {
          state.postViewData.push(action.payload);
       });

       builder.addCase(createViewPost.rejected, (state,action) => {
          state.error = action.payload;
       });
        
      // Post Views Count 
       builder.addCase(postViewCount.pending, (state) => {
          state.loading = true;
          state.error = null;
       });

       builder.addCase(postViewCount.fulfilled, (state, action) => {
          state.postViewData = action.payload;
       });

       builder.addCase(postViewCount.rejected, (state, action) => {
          state.error = action.payload;
       });
   }
});

export default postViewSlice.reducer;