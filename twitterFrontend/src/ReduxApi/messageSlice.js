import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../http";
import axios from "axios";

const initialState = {
    messageData : [],
    loading : true,
    error : null,
}

export const sendMessage = createAsyncThunk("sendMessage", 
    async({receiver_id, inputData}, {rejectWithValue}) => {
       try {
        const response = await axios.post(`http://localhost:8000/api/sendMessage/${receiver_id}`, inputData, {
          headers : {
            'Authorization' : `Bearer ${sessionStorage.getItem("api_token")}`,
            'Content-Type' : 'application/json'
          }
        });
        return response.data;
       } catch (error) {
        return rejectWithValue(error.data?.response?.message);
       }
    }
)

export const messageSlice = createSlice({
    name : "message",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
      builder.addCase(sendMessage.pending, (state) => {
         state.error = null;
      });

      builder.addCase(sendMessage.fulfilled, (state,action) => {
         state.loading = false;
         state.messageData.push(action.payload);
      });

      builder.addCase(sendMessage.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload;
      });
    }
});

export default messageSlice.reducer