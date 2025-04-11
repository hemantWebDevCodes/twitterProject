import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../http";

const initialState = {
   account: [],
   loading : true,
   error : null
}


 // SIGN UP 
 export const signUpAccount = createAsyncThunk('signUpAccount', async(data ,{rejectWithValue}) => {
    try {
      const response = await http.post('/signUp', data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
    });
    }
 })

 // SIGN IN / LOGIN
 
 export const loginAccount = createAsyncThunk('loginAccount', async(data, {rejectWithValue})=> {
    try {
       const response = await http.post('/login', data);
        
      //  localStorage.setItem('api_token', response.data.token);
       sessionStorage.setItem('api_token', response.data.token);

       window.location.href="/";

       return response;

    } catch (error) {
       return rejectWithValue({
               message: error.message,
               status: error.response?.status,
               statusText: error.response?.statusText,
           });
    }
 });

export const createAccountSlice = createSlice({
    name : 'twitter',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
       builder.addCase(signUpAccount.pending, (state) => {
         state.loading = true
         state.error = null;
       });

       builder.addCase(signUpAccount.fulfilled, (state, action) => {
         state.loading = false;
         state.account.push(action.payload);
       });

       builder.addCase(signUpAccount.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload
       });

      // Login  
       builder.addCase(loginAccount.pending, (state) => {
        state.error = null;
      });

      builder.addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account.push(action.payload);
      });

      builder.addCase(loginAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      });
    }
});

export default createAccountSlice.reducer
