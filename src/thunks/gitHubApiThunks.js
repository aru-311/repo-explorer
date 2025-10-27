// features/user/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRepositories,
  getRepoInfo,
  getContributors,
  getRepoIssues,
  getReadme,
  getRepoCommitActivity,
  getRepoLanguages,
  fetchRepositoriesByNodeIds,
} from "../services/githubApi.js";

export const getRepositoriesThunks = createAsyncThunk(
  "gitRepoSlice/getRepositories",
  async ({ query, count_per_page, page_number }) => {
    return await getRepositories(query, count_per_page, page_number);
  }
);

export const getRepoInfoThunks = createAsyncThunk(
  "gitRepoSlice/getRepoInfo",
  async ({ owner, repo }) => {
    return await getRepoInfo(owner, repo);
  }
);

export const getContributorsThunks = createAsyncThunk(
  "gitRepoSlice/getContributors",
  async ({ owner, repo }) => {
    return await getContributors(owner, repo);
  }
);

export const getRepoIssuesThunks = createAsyncThunk(
  "gitRepoSlice/getRepoIssues",
  async ({ owner, repo }) => {
    return await getRepoIssues(owner, repo);
  }
);

export const getReadmeThunks = createAsyncThunk(
  "gitRepoSlice/getReadme",
  async ({ owner, repo }) => {
    return await getReadme(owner, repo);
  }
);

export const getRepoLanguagesThunks = createAsyncThunk(
  "gitRepoSlice/getRepoLanguages",
  async ({ owner, repo }) => {
    return await getRepoLanguages(owner, repo);
  }
);

export const getRepoCommitActivityThunks = createAsyncThunk(
  "gitRepoSlice/getRepoCommitActivity",
  async ({ owner, repo }) => {
    return await getRepoCommitActivity(owner, repo);
  }
);

export const getFavoriteRepos = createAsyncThunk(
  "githubApi/getFavoriteRepos",
  async (nodeIds) => {
    const data = await fetchRepositoriesByNodeIds(nodeIds);
    return data;
  }
);
