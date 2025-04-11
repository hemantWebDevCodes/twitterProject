import { configureStore } from "@reduxjs/toolkit";
import createAccountSlice from '../ReduxApi/createAccount';
import postSlice from "../ReduxApi/postSlice";
import rePostSlice from "../ReduxApi/post";
import profileSlice from "../ReduxApi/profileSlice";
import postLikeSlice from "../ReduxApi/LikeAndBookmarkConcept";
import postViewSlice from "../ReduxApi/postView";
import listSlice  from "../ReduxApi/postList";
import messageSlice from "../ReduxApi/messageSlice";
import blockAccount from "../ReduxApi/BlockAccount";
import searchData from "../ReduxApi/SearchFunctionlity";
import MentionSlice from "../ReduxApi/MentionSlice";

const store = configureStore({
     reducer: {
          account : createAccountSlice,
          post : postSlice,
          rePost : rePostSlice,
          profile : profileSlice,
          likesPost : postLikeSlice,
          postView : postViewSlice,
          list : listSlice,
          message : messageSlice,
          blockAccounts : blockAccount,
          searchQuery : searchData,
          mention : MentionSlice
     }
});

export default store;