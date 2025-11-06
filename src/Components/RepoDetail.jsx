import { Card } from "antd";
import AppBar from "./AppBar";
import React, { useState, useEffect } from "react";
import "./AppBar.css";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getRepoInfoThunks,
  getContributorsThunks,
  getRepoIssuesThunks,
  getReadmeThunks,
  getRepoCommitActivityThunks,
  getRepoLanguagesThunks,
} from "../thunks/gitHubApiThunks";
import { clearSelectedRepo, toggleFavorite } from "../slice/githubApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function RepoDetail() {
  const dispatch = useDispatch();
  const { logininfo, reponame } = useParams();
  const { selectedRepo, favourites = [] } = useSelector(
    (state) => state.gitRepoSlice
  );
  const [favoriteItems, setFavoriteIems] = useState([]);
  useEffect(() => {
    dispatch(getRepoInfoThunks({ owner: logininfo, repo: reponame }));
    dispatch(getContributorsThunks({ owner: logininfo, repo: reponame }));
    dispatch(getRepoIssuesThunks({ owner: logininfo, repo: reponame }));
    dispatch(getReadmeThunks({ owner: logininfo, repo: reponame }));
    dispatch(getRepoCommitActivityThunks({ owner: logininfo, repo: reponame }));
    dispatch(getRepoLanguagesThunks({ owner: logininfo, repo: reponame }));
    setFavoriteIems(localStorage.getItem("favourites"));
    return () => {
      dispatch(clearSelectedRepo()); // cleanup on unmount
    };
  }, [dispatch, logininfo, reponame]);

  const {
    repoInfo = {},
    contributors = [],
    issues = [],
    readme = null,
    loading,
    error,
    languages = {},
    commitActivity = [],
  } = selectedRepo;

  const {
    id,
    node_id,
    name,
    full_name,
    isPrivate,
    ownerLogin,
    ownerAvatar,
    ownerHtml,
    html_url,
    description,
    language,
    stargazers_count,
    forks_count,
    open_issues_count,
    licenseName,
    licenseUrl,
    default_branch,
    homepage,
  } = repoInfo || {};
  function commitFormatter(data) {
    let weekInfo = [];
    let commitCount = [];

    data?.forEach((item) => {
      weekInfo.push(item.weekStart);
      commitCount.push(item.totalCommits);
    });

    return { weekInfo, commitCount };
  }
  const handleFavoriteClick = (id) => {
    dispatch(toggleFavorite(id));
  };
  const { weekInfo, commitCount } = commitFormatter(commitActivity);

  const labels = Object.keys(languages || {});

  const data = {
    labels,
    datasets: [
      {
        label: "Votes",
        data: Object.values(languages || {}),
        backgroundColor: [
          "#6680B3", // steel blue
          "#80B300", // olive green
          "#809900", // dark lime
          "#E6B3B3", // pinkish
          "#66991A", // green
          "#FF99E6", // pink
          "#CCFF1A", // neon green
          "#FF1A66", // hot pink
          "#E6331A", // red orange
          "#33FFCC", // aqua
          "#FF6633", // orange
          "#FFB399", // peach
          "#FF33FF", // magenta
          "#FFFF99", // light yellow
          "#00B3E6", // sky blue
          "#E6B333", // mustard
          "#3366E6", // blue
          "#999966", // khaki
          "#99FF99", // light green
          "#B34D4D", // red brown
        ],
        borderColor: ["#fff"],
        borderWidth: 2,
      },
    ],
  };
  // Bar chart data
  const barData = {
    labels: weekInfo,
    datasets: [
      {
        label: "Commits",
        data: commitCount[1] === 0 ? [2, 4, 6, 8, 10] : commitCount,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: false,
        text: "Bar Chart Example",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    "C++": "#f34b7d",
    HTML: "#e34c26",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    CSS: "#563d7c",
    CMake: "#DAE4A9",
    Rust: "#dea584",
    Documentation: "#654C43",
    Shell: "#89e051",
    YAML: "#9e8b7e",
    Dart: "#654C41",
  };
  return (
    <div className="app-container">
      <AppBar />
      <div className="repo-body repo-card">
        {/* <div className="back-button">
          {" "}
          <span style={{ marginRight: 5 }}>←</span>Back to Search
        </div> */}
        {!repoInfo ? (
          <>
            <Skeleton />
            <Skeleton count={10} />
          </>
        ) : (
          <Card>
            <h2>{name}</h2>
            <h3>
              A highly optimized quantum simulation library for educational
              purposes.
            </h3>
            <div style={{ display: "flex" }}>
              <p className="repo-lang" style={{ marginTop: "0px" }}>
                <span
                  className="repo-lang-dot"
                  style={{
                    backgroundColor: LANGUAGE_COLORS[language] || "#ccc",
                  }}
                ></span>
                {language}
              </p>
              <p style={{ margin: 5 }}>&#9733; {stargazers_count}</p>
              <p style={{ margin: 5 }}>
                &#9888; {open_issues_count} Open Issues
              </p>
              <button
                id={`${
                  favourites.includes(node_id)
                    ? "details-favorite-btn"
                    : "details-unfavorite-btn"
                }`}
                onClick={() => handleFavoriteClick(node_id)}
              >
                {favourites.includes(node_id)
                  ? "❤ Remove from Favorites"
                  : "❤ Add to Favorites"}
              </button>
            </div>
            <h2>{name}</h2>
            <hr />
            <p className="repo-paragraph">{description}</p>
            <div style={{ display: "flex" }}>
              <Card style={{ margin: 5 }}>
                <h2>Language Distribution</h2>
                <p>
                  A proportional breakdown of the codebase by primary languages,
                  indicating the technological complexity and focus.
                </p>
                <Doughnut data={data} />
              </Card>
              <Card style={{ margin: 5 }}>
                <h2>Weekly Commit Activity</h2>
                <p>
                  The number of commits over the last four weeks, serving as a
                  proxy for the project's development pace and maintainer
                  engagement.
                </p>
                <Bar data={barData} options={barOptions} />
              </Card>
            </div>
            <h2>Top Contributors</h2>
            <hr />
            <p>
              Key individuals who drive the project forward, measured by their
              total contribution count.
            </p>
            <div className="container">
              {contributors?.map((item, index) => {
                return (
                  <Card key={index} className="commits-card">
                    {item.avatar_url ? (
                      <img
                        src={item.avatar_url}
                        style={{
                          width: "45px",
                          height: "45px",
                          margin:'0 5px',
                          borderRadius: "25px",
                        }}
                      />
                    ) : (
                      <p className="smiley">☺</p>
                    )}
                    <p style={{ margin: 0 }}>
                      <a href={item.html_url} target="_blank">
                        {item.login}
                      </a>
                    </p>
                    <p style={{ margin: 0 }}>
                      {item.contributions === 0 || 1
                        ? "1 commit"
                        : ` ${item.contributions} commits`}
                    </p>
                  </Card>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
