import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import http from "../http";

const initialState = {
    listData : [],
    listUserData : [],
    loading : true,
    error : null
}

// Token
//  const token = localStorage.getItem('api_token');
  const token = sessionStorage.getItem('api_token');

//  Cretae List
export const createList  = createAsyncThunk('createList', async(formData, {rejectWithValue}) => {
   try {
       const response = await axios.post('http://localhost:8000/api/createPostList', formData, {
          headers : {
             'Authorization' : `Bearer ${token}`,
             'Content-Type' : 'multipart/form-data'
          }
       }); 
       return response.data;
   } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
   }
});

// Shoe All Lists
export const showAllPostLists = createAsyncThunk('showAllPostLists',
    async(data, {rejectWithValue}) => {
        try {
            const response = await http.get('/showAllPostLists', {});
            return response.data.allPostLists;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
});

// Add users in List
export const addUserList = createAsyncThunk('addUserList',
   async({follower_id, list_id, post_id, data}, {rejectWithValue}) => {
     try {
        const response = await http.post(`/addUserList/${follower_id}/${list_id}/${post_id}`);
        console.log(follower_id, list_id,post_id, data);
        return response.data.userList;
     } catch (error) {
        return rejectWithValue(error?.response?.data?.message);
     }
});

// Show Added user in list
export const showListUsers = createAsyncThunk('showListUsers', 
  async(data, {rejectWithValue}) => {
    try {
       const response = await http.get('showAllListUsers', {});
       return response.data.listUsers;
    } catch (error) {
       return rejectWithValue(error?.response?.data?.message);
    }
});
   
   // Edit List 
export const editPostList = createAsyncThunk('editPostList',
   async({list_id, formData}, {rejectWithValue}) => {
     try {
        const response = await axios.post(`http://localhost:8000/api/editPostList/${list_id}`, formData, {
           headers : {
              'Authorization' : `Bearer ${token}`,
              'Content-Type' : 'multipart/form-data'
           }
        });

        return response.data.editListData;
     } catch (error) {
        return rejectWithValue(error?.response?.data?.message);
     }
});

// Delete List
export const deletePostList = createAsyncThunk('deletePostList',
   async(list_id, {rejectWithValue}) => {
      try {
         const response = await http.post(`/deletePostList/${list_id}`);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data?.message);
      }
   }
)

export const listSlice = createSlice({
   name : 'List',
   initialState,
   reducers : { },
   extraReducers : (builder) => {
      builder.addCase(createList.pending, (state) => {
        state.error = null;
      });

      builder.addCase(createList.fulfilled, (state,action) => {
        state.loading = false;
        state.listData.push(action.payload); 
      });

      builder.addCase(createList.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Show All Posts Lists  
      builder.addCase(showAllPostLists.pending, (state) => {
        state.error = null;
      });

      builder.addCase(showAllPostLists.fulfilled, (state,action) => {
        state.loading = false;
        state.listData = action.payload; 
      });

      builder.addCase(showAllPostLists.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // Add User List
       builder.addCase(addUserList.pending, (state) => {
        state.error = null; 
       });

       builder.addCase(addUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.listUserData.push(action.payload);
       });

       builder.addCase(addUserList.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
       }); 

      // ListUsers Show
       builder.addCase(showListUsers.pending, (state) => {
        state.error = null;
       }); 

       builder.addCase(showListUsers.fulfilled, (state,action) => {
        state.loading = false;
        state.listUserData = action.payload;
       });

       builder.addCase(showListUsers.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
       });

      // Edit List
      builder.addCase(editPostList.pending, (state) => {
        state.error = null;
      }); 
 
      builder.addCase(editPostList.fulfilled, (state,action) => {
        state.loading = false;
        state.listData.push(action.payload);
      });
 
      builder.addCase(editPostList.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      });
   }
   
});

export default listSlice.reducer;