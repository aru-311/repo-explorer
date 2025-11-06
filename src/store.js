import { configureStore } from '@reduxjs/toolkit';
import gitReducer, { initialState as githubApiInitialState }  from './slice/githubApiSlice';
import { loadFromLocalStorage, saveToLocalStorage } from './Utils/localStorage';

// Load persisted favourites from localStorage
const persistedFavourites = loadFromLocalStorage('favourites');
const preloadedState = {
  gitRepoSlice: {
    ...githubApiInitialState,
    favourites: persistedFavourites || githubApiInitialState.favourites,
  },
};


// Create the store
const store = configureStore({
  reducer: {
    gitRepoSlice: gitReducer,
  },
  preloadedState,
});

// Save to localStorage whenever favourites change
store.subscribe(() => {
  const state = store.getState();
  const favourites = state.gitRepoSlice?.favourites || []; // <-- safe access
  saveToLocalStorage('favourites', favourites);
});


export default store;
