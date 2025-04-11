import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../http";

const initialState = {
    mentionData : [],
    error : null,
    loading : false
}

export const userMentionData = createAsyncThunk('userMentionData', async(_,{rejectWithValue}) => {
    try {
        const response = await http.get('http://localhost:8000/api/userMentionData');
        return response?.data?.mentionData;
    } catch (error) {
        return rejectWithValue(error?.data?.response?.message || "Mention Data Show Error");
    }
});

export const MentionSlice = createSlice({
   name : 'mention',
   initialState,
   reducers : {},
   extraReducers : (builder) => {
       builder.addCase(userMentionData.pending, (state) => {
          state.loading = true;
          state.error = null;
       });

       builder.addCase(userMentionData.fulfilled, (state, action) => {
          state.loading = false;
          state.mentionData = action.payload;
       });

       builder.addCase(userMentionData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
       });
   }
});

export default MentionSlice.reducer;