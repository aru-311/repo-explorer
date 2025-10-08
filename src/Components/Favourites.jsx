import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../slice/githubApiSlice";
import AppBar from "./AppBar";
export default function Favourites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { repositories, favorites } = useSelector(
    (state) => state.gitRepoSlice
  );
  localStorage.setItem("fav", JSON.stringify(favorites));

  const favItems = JSON.parse(localStorage.getItem("fav"));
  const filteredArr = repositories.filter((item) => favorites.length>0 ? favorites.includes(item.id) : favItems.includes(item.id));
  const MOCK_REPOS = [
    {
      id: 1,
      name: "Gemini-Kit",
      description:
        "A comprehensive toolkit for multi-modal AI development, focusing on rapid prototyping.",
      language: "JavaScript",
      stars: 12450,
      forks: 890,
      issues: 45,
      updated: "2024-09-28",
      languages: { JavaScript: 65, CSS: 20, HTML: 10, Python: 5 },
      commits: [25, 30, 18, 42],
      contributors: [
        { user: "AlexDev", commits: 120 },
        { user: "BreeCode", commits: 88 },
        { user: "CharlieFix", commits: 61 },
      ],
    },
    {
      id: 2,
      name: "Quantum-Solver",
      description:
        "A highly optimized quantum simulation library for educational purposes.",
      language: "C++",
      stars: 7890,
      forks: 450,
      issues: 12,
      updated: "2024-09-29",
      languages: { "C++": 90, CMake: 10 },
      commits: [10, 5, 8, 15],
      contributors: [
        { user: "DrPhysics", commits: 95 },
        { user: "Q_Hacker", commits: 42 },
      ],
    },

    {
      id: 3,
      name: "Tailwind-UI-Kit",
      description:
        "A collection of responsive and accessible components built with Tailwind CSS.",
      language: "HTML",
      stars: 22000,
      forks: 1500,
      issues: 112,
      updated: "2024-09-30",
      languages: { HTML: 50, CSS: 40, JavaScript: 10 },
      commits: [55, 60, 72, 58],
      contributors: [
        { user: "UI_Master", commits: 250 },
        { user: "StyleGuru", commits: 155 },
        { user: "ResponsiveDev", commits: 102 },
        { user: "TesterBot", commits: 50 },
      ],
    },

    {
      id: 4,
      name: "DataViz-Engine",
      description:
        "Plotting library based on canvas rendering for high-performance visualization.",
      language: "TypeScript",
      stars: 9500,
      forks: 310,
      issues: 28,
      updated: "2024-09-27",
      languages: { TypeScript: 80, Rust: 15, Documentation: 5 },
      commits: [35, 38, 41, 32],
      contributors: [
        { user: "VizKing", commits: 180 },
        { user: "TypeSafe", commits: 110 },
      ],
    },

    {
      id: 5,
      name: "Serverless-Gateway",
      description:
        "Template for building scalable serverless APIs using Node.js and AWS Lambda.",
      language: "JavaScript",
      stars: 6100,
      forks: 700,
      issues: 88,
      updated: "2024-09-25",
      languages: { JavaScript: 85, Shell: 10, YAML: 5 },
      commits: [15, 20, 12, 19],
      contributors: [
        { user: "CloudGuru", commits: 105 },
        { user: "NodeFan", commits: 75 },
        { user: "SecurityFixer", commits: 30 },
      ],
    },
  ];

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
  };
  const handleRepoClick = useCallback(
    (repoName) => {
      navigate(`/${repoName}`);
    },
    [navigate]
  );
  const handleFavoriteClick = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="app-container">
      <AppBar />
      <div className="repo-body repo-card">
        <h2>Your Favorite Repositories</h2>
        <p className="paragraph-text">
          This curated list contains all the projects you've marked as a
          favorite. This feature supports the information architecture's goal of
          retention and quick access to high-value content.
        </p>
        <div className="repo-detail-card">
          {filteredArr?.map((item) => {
            const isFavorite = favorites.includes(item.id);
            return (
              <Card key={item.id} className="card-detail">
                <div className="repo-header">
                  <h2
                    className="repo-title"
                    onClick={() => handleRepoClick(item.name)}
                  >
                    {item.name}
                  </h2>
                  <button
                    className={`repo-fav-btn ${
                      isFavorite ? "icon-star-filled" : "icon-star-empty"
                    }`}
                    onClick={() => handleFavoriteClick(item.id)}
                  >
                    &#9733;
                  </button>
                </div>
                <p>{item.description}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="repo-lang">
                    <span
                      className="repo-lang-dot"
                      style={{
                        backgroundColor:
                          LANGUAGE_COLORS[item.language] || "#ccc",
                      }}
                    ></span>
                    {item.language}
                  </span>
                  <p style={{ margin: 0 }}>&#9733; {item.stargazers_count}</p>
                  <p style={{ margin: 0 }}>&#127803; {item.forks}</p>
                  <p style={{ margin: 0 }}>&#9888; {item.open_issues}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
