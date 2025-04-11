import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../http";
import axios from "axios";

const initialState = {
    profileData : [],
    allUserData : [],
    loading : true,
    error : null
}

 // EDIT PROFILE 
 export const editProfile = createAsyncThunk('editProfile', async() => {
     try {
        const response = await http.get('/edit_profile', {});
        return response.data[0];

     } catch (error) {
        throw error;
     }
 });

 // UPDATE PROFILE  
 export const updateProfile = createAsyncThunk('updateProfile', async(data,{rejectWithValue}) => {
     try {
        const response = await axios.post('http://localhost:8000/api/update_profile', data,{
            headers : {
                'Authorization' : `Bearer ${sessionStorage.getItem('api_token')}`,
                "Content-Type" : 'multipart/form-data'
            }
        });
         
         return response.data;
      } catch (error) {
          return rejectWithValue(error);
      }
 })

  // All Users / RIGHT SIDEBAR
  export const allUser = createAsyncThunk('allUser', async() => {
     try {
        const response = await http.get('/allUser', {});
        return response.data.allUser;
     } catch (error) {
        return error;
     }
  });
  

export const profileSlice = createSlice({
   name : 'Profile',
   initialState,
   reducers : {},
   extraReducers : (builder) => {
         builder.addCase(editProfile.pending,(state) => {
            state.loading = true;
            state.error = null;
         });

         builder.addCase(editProfile.fulfilled,(state,action) => {
            state.loading = false;
            state.profileData = action.payload;
         });
         
         builder.addCase(editProfile.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload
         });

        //  Update Profile
         builder.addCase(updateProfile.pending,(state) => {
            state.loading = true
            state.error = null;
         });

         builder.addCase(updateProfile.fulfilled, (state,action) => {
            state.loading = false;
            if(Array.isArray(state.profileData)){
               state.profileData.push(action.payload);
            }else{
               state.profileData = [action.payload]
            }
         });
         
         builder.addCase(updateProfile.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload
         });

         //  All USERS DATA
         builder.addCase(allUser.pending,(state) => {
            state.loading = true
            state.error = null;
         });

         builder.addCase(allUser.fulfilled, (state,action) => {
            state.loading = false;
            state.allUserData = action.payload
         });
         
         builder.addCase(allUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload
         });
   }
});

export default  profileSlice.reducer