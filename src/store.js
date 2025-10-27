import { configureStore } from '@reduxjs/toolkit';
import gitReducer, { initialState as githubApiInitialState }  from './slice/githubApiSlice';
import { loadFromLocalStorage, saveToLocalStorage } from './Utils/localStorage';

// Load persisted favourites from localStorage
const persistedFavourites = loadFromLocalStorage('favourites');
// const persistedRepositories = loadFromLocalStorage('repositories');
const preloadedState = {
  gitRepoSlice: {
    ...githubApiInitialState,
    favourites: persistedFavourites || githubApiInitialState.favourites,
    // repositories: persistedRepositories || githubApiInitialState.repositories,
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
  // const repositories = state.gitRepoSlice?.repositories || []; // <-- safe access
  saveToLocalStorage('favourites', favourites);
  // saveToLocalStorage('repositories', repositories);
});


export default store;
