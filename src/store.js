// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import gitReducer from "./slice/githubApiSlice";

/**
 * Redux store configuration
 * - Currently includes only the `user` slice
 * - Ready to add more slices as app grows
 */
const store = configureStore({
  reducer: {
    gitRepoSlice: gitReducer,
  },
  devTools: true, // Enable Redux DevTools only in development
});

export default store;
