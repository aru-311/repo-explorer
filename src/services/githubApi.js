import axios from "axios";
import {formatDate} from "../Utils/Date_Formatter";

const GITHUB_API_BASE_URL = "https://api.github.com";

const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

export const getRepositories = async (query, count_per_page, page_number) => {
  try {
    const response = await githubApi.get(
      `/search/repositories?q=${query}&per_page=${count_per_page}&page=${page_number}`
    );
    return response.data;
  } catch (err) {
    console.log(err, "error in getRepositories");
    return err.response.data.message;
  }
};

export const getRepoInfo = async (owner, repo) => {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}`);
    return response.data;
  } catch (err) {
    console.log(err, "error in getRepoInfo");
    return err.response.data.message;
  }
};

export const getContributors = async (owner, repo) => {
  try {
    const response = await githubApi.get(
      `/repos/${owner}/${repo}/contributors`
    );
    return response.data;
  } catch (err) {
    console.log(err, "error in getContributors");
    return err.response.data.message;
  }
};

export const getRepoIssues = async (owner, repo) => {
  try {
    const response = await githubApi.get(
      `/repos/${owner}/${repo}/issues?state=open`
    );
    return response.data;
  } catch (err) {
    console.log(err, "error in getRepoIssues");
    return err.response.data.message;
  }
};

export const getReadme = async (owner, repo) => {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
    );
    return response.data;
  } catch (error) {
    console.log(error, "error in getReadme");
    return error.response.data.message;
  }
};

export const getRepoLanguages = async (owner, repo) => {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}/languages`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching languages for ${owner}/${repo}:`, error);
    throw error;
  }
};

export const getRepoCommitActivity = async (owner, repo) => {
  try {
    const response = await githubApi.get(
      `/repos/${owner}/${repo}/stats/commit_activity`
    );
    // Ensure data exists
    const commitActivity = response.data || [];
    // Get last 4 weeks
    const last4Weeks = commitActivity.slice(-4);
    // If you want total commits per week
    const weeklyCommits = last4Weeks.map((week) => ({
      weekStart: formatDate(new Date(week.week * 1000).toISOString()),
      totalCommits: week.total,
    }));

    return weeklyCommits;
  } catch (error) {
    console.error(
      `Error fetching commit activity for ${owner}/${repo}:`,
      error
    );
    throw error;
  }
};
