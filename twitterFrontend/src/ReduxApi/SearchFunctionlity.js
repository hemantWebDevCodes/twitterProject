import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../http";

const initialState = {
    searchData : [],
    error : null,
    loading : true
}

export const getSearchData = createAsyncThunk("SearchFunctionlity", async({query}, {rejectWithValue}) => {
    try {
        const response = await http.get(`http://127.0.0.1:8000/api/searchData?q=${query}`);
        console.log("search", response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.data?.response?.message);
    }
});

 export const searchQuerySlice = createSlice({
   name : 'searchQuery',
   initialState,
   reducers : {
      clearSearchResult : (state) => {
          state.searchData = [];
      },
   },
   extraReducers : (builder) => {
       builder.addCase(getSearchData.pending, (state) => {
            state.error = null;
       });

       builder.addCase(getSearchData.fulfilled, (state,action) => {
            state.loading = false;
            state.searchData = action.payload;
       });

       builder.addCase(getSearchData.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
       });
   }
 });

 export const {clearSearchResult} = searchQuerySlice.actions;
 export default searchQuerySlice.reducer;