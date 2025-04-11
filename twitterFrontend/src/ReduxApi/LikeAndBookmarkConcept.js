import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import http from "../http";

const initialState = {
    likesData : [],
    bookmarkData : [],
    loading : true,
    error : null
}

// LIKE POST AND REPOST
export const likeRepost = createAsyncThunk('likeRepost', async({Repost_id, post_id, comment_id, type}, {rejectWithValue}) => {
    try {
        let response;
        if(type === "Repost"){
           response = await http.post(`/like/${type}/${Repost_id}`);
        }else if(type === 'post'){
           response = await http.post(`/like/${type}/${post_id}`);
        }else{
           response = await http.post(`/like/${type}/${comment_id}`);
        }

        console.log(response);

    } catch (error) {
       return rejectWithValue(error)
    }
});

// COUNT POST COUNT
export const likePostCount = createAsyncThunk('likePostCount', async(data, {rejectWithValue}) => {
     try {
        const response = await http.get(`/likePostCount`, data);
        return response.data;
     } catch (error) {
        return rejectWithValue(error);
     }
});

// Bookmark Post And Repost
export const bookmarkPostAndRepost = createAsyncThunk('bookmarkPostAndRepost',
    async({post_id, Repost_id, type}, {rejectWithValue}) => {
       try {
           const url = type === "post"
                     ?  `/addBookmark/${type}/${post_id}` 
                     : `/addBookmark/${type}/${Repost_id}`;

          const response = await http.post(url, { });
          return response.data;
       } catch (error) {
          return rejectWithValue(error?.response?.data?.message || 'Bookmark Post and Repost Add Error.');
       }
    }
);

export const allBookmarkData = createAsyncThunk('allBookmarkData',
    async(data, {rejectWithValue}) => {
       try {
           const response = await http.get('/allBookmarkData', data);
           return response.data.allBookmark;
       } catch (error) {
          return rejectWithValue(error?.response?.data?.message, 'All bookmarks data Error.');
       }
    }
)

export const deleteBookmarks = createAsyncThunk('deleteBookmarks', 
    async({data}, {rejectWithValue}) => {
      try {
         const response = await http.post('/deleteBookmarks', {});
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data?.message)
      }
    }
)


export const postLikeSlice = createSlice({
    name : 'likesPost',
    initialState,
    reducers : { },
    extraReducers : (builder) => {
    //  FOR LIKE REPOSt AND POST
       builder.addCase(likeRepost.pending, (state) => {
          state.error = null
       });

       builder.addCase(likeRepost.fulfilled, (state,action) => {
           state.loading = false;
           state.likesData.push(action.payload);
       });

       builder.addCase(likeRepost.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload;
       });

    //  FOR COUNT LIKE POST 
       builder.addCase(likePostCount.pending, (state) => {
           state.error = null;
       });

       builder.addCase(likePostCount.fulfilled, (state,action) => {
           state.loading = false;
           state.likesData = action.payload;
       });

       builder.addCase(likePostCount.rejected, (state,action) => {
           state.loading = false;
           state.error = action.payload;
       });

      // AddBookmark
      builder.addCase(bookmarkPostAndRepost.pending, (state) => {
           state.error = null;
      });

      builder.addCase(bookmarkPostAndRepost.fulfilled, (state, action) => {
          state.pending = false;
          state.bookmarkData.push(action.payload);
      });

      builder.addCase(bookmarkPostAndRepost.rejected, (state, action) => {
          state.pending = false;
          state.error = action.payload;
      });

    // AllBookmarks Data
      builder.addCase(allBookmarkData.pending, (state) => {
         state.error = null;
      });

      builder.addCase(allBookmarkData.fulfilled, (state,action) => {
         state.pending = false;
         state.bookmarkData = action.payload;
      }); 

      builder.addCase(allBookmarkData.rejected, (state,action) => {
         state.pending = false;
         state.error = action.payload;
      });
    }
});

export default postLikeSlice.reducer;