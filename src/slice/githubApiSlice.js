// features/user/userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  getRepositoriesThunks,
  getRepoInfoThunks,
  getContributorsThunks,
  getRepoIssuesThunks,
  getReadmeThunks,
  getRepoLanguagesThunks,
  getRepoCommitActivityThunks,
} from "../thunks/gitHubApiThunks";

const initialState = {
  repositories: [],
  totalCount: 0,
  query: "",
  pageNumber: 1,
  favorites: [], // For homepage cards
  selectedRepo: {
    // For repo detail page
    repoInfo: null,
    contributors: [],
    issues: [],
    readme: null,
    loading: false,
    error: null,
    languages: null,
    commitActivity: null,
  },
  loading: false, // Loading for homepage API
  error: null, // Error for homepage API
};

const githubSlice = createSlice({
  name: "gitRepoSlice",
  initialState,
  reducers: {
    /**
     * Clear selected repo detail
     */
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    clearSelectedRepo: (state) => {
      state.selectedRepo = {
        repoInfo: null,
        contributors: [],
        issues: [],
        readme: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    // --- HomePage: getRepositories ---
    builder
      .addCase(getRepositoriesThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRepositoriesThunks.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload.items;
      })
      .addCase(getRepositoriesThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // --- RepoDetailPage: getRepoInfo ---
    builder
      .addCase(getRepoInfoThunks.pending, (state) => {
        state.selectedRepo.loading = true;
        state.selectedRepo.error = null;
      })
      .addCase(getRepoInfoThunks.fulfilled, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.repoInfo = action.payload;
      })
      .addCase(getRepoInfoThunks.rejected, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.error = action.error.message;
      });

    // --- RepoDetailPage: getContributors ---
    builder
      .addCase(getContributorsThunks.pending, (state) => {
        state.selectedRepo.loading = true;
        state.selectedRepo.error = null;
      })
      .addCase(getContributorsThunks.fulfilled, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.contributors = action.payload;
      })
      .addCase(getContributorsThunks.rejected, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.error = action.error.message;
      });

    // --- RepoDetailPage: getRepoIssues ---
    builder
      .addCase(getRepoIssuesThunks.pending, (state) => {
        state.selectedRepo.loading = true;
        state.selectedRepo.error = null;
      })
      .addCase(getRepoIssuesThunks.fulfilled, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.issues = action.payload;
      })
      .addCase(getRepoIssuesThunks.rejected, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.error = action.error.message;
      });

    // --- RepoDetailPage: getReadme ---
    builder
      .addCase(getReadmeThunks.pending, (state) => {
        state.selectedRepo.loading = true;
        state.selectedRepo.error = null;
      })
      .addCase(getReadmeThunks.fulfilled, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.readme = action.payload;
      })
      .addCase(getReadmeThunks.rejected, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.error = action.error.message;
      });

    // --- RepoDetailPage: getRepoLanguages ---
    builder
      .addCase(getRepoLanguagesThunks.pending, (state) => {
        state.selectedRepo.loading = true;
        state.selectedRepo.error = null;
      })
      .addCase(getRepoLanguagesThunks.fulfilled, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.languages = action.payload;
      })
      .addCase(getRepoLanguagesThunks.rejected, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.error = action.error.message;
      });

    // --- RepoDetailPage: getRepoCommitActivity ---
    builder
      .addCase(getRepoCommitActivityThunks.pending, (state) => {
        state.selectedRepo.loading = true;
        state.selectedRepo.error = null;
      })
      .addCase(getRepoCommitActivityThunks.fulfilled, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.commitActivity = action.payload;
      })
      .addCase(getRepoCommitActivityThunks.rejected, (state, action) => {
        state.selectedRepo.loading = false;
        state.selectedRepo.error = action.error.message;
      });
  },
});

export const { setQuery, setPageNumber, toggleFavorite, clearSelectedRepo } = githubSlice.actions;
export default githubSlice.reducer;
