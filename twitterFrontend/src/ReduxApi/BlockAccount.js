import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import http from "../http";

const initialState = {
    blockData : [],
    error : null,
    loading : false
}

export const blockUser = createAsyncThunk("BlockAccounts", async({blocked_id, data}, {rejectWithValue}) => {
   try {
      const response = await axios.post(`http://localhost:8000/api/blockAccount/${blocked_id}`, data, {
        headers : {
            'Authorization' : `Bearer ${sessionStorage.getItem("api_token")}`,
            "Content-Type" : 'application/json'
        }
      });
      return response.data;
   } catch (error) {
       return rejectWithValue(error?.data?.response?.message);
   }
});

export const showBlockedUser = createAsyncThunk("showBlockedUser", 
   async(data, {rejectWithValue}) => {
      try {
         console.log("Fetching blocked users...");
         const response = await http.get('/showBlockedUser');
         console.log(response);
         return response.data.blockData;
      } catch (error) {
         console.error("API Error:", error);
         return rejectWithValue(error?.data?.response?.message);
      }
});

export const blockAccount = createSlice({
  name : "BlockAccounts",
  initialState,
  reducers : {},
  extraReducers : (builder) => {         
      builder.addCase(blockUser.pending, (state) => {
         state.loading = true;
         state.error = null;
      });

      builder.addCase(blockUser.fulfilled, (state, action) => {
         state.loading = false;
         state.blockData  = [...state.blockData, action.payload];
      });

      builder.addCase(blockUser.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload;
      });

      builder.addCase(showBlockedUser.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      
      builder.addCase(showBlockedUser.fulfilled, (state,action) => {
         state.loading = false;
         state.blockData = action.payload;
      });

      builder.addCase(showBlockedUser.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload;
      });
  }
});

export default blockAccount.reducer;