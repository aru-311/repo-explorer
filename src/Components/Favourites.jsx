import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../slice/githubApiSlice";
import AppBar from "./AppBar";
import { getFavoriteRepos } from "../thunks/gitHubApiThunks";

export default function Favourites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favourites = [] } = useSelector(
    (state) => state.gitRepoSlice
  );
  const localData = JSON.parse(localStorage.getItem("favourites"));
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites"));
    const nodeIds = stored?.map((item) => item) || [];
    if (nodeIds.length) {
      dispatch(getFavoriteRepos(nodeIds));
    }
  }, [dispatch]);

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
          {favourites?.map((item) => {
              const isFavorite = localData?.some(
                (fav) => fav?.id === item?.id || fav === item?.id
              );
              return (
                <Card key={item?.id} className="card-detail">
                  <div className="repo-header">
                    <h2
                      className="repo-title"
                      onClick={() => handleRepoClick(item?.name)}
                    >
                      {item?.name}
                    </h2>
                    <button
                      className={`repo-fav-btn ${
                        isFavorite ? "icon-star-filled" : "icon-star-empty"
                      }`}
                      onClick={() => handleFavoriteClick(item?.id)}
                    >
                      &#9733;
                    </button>
                  </div>
                  <p>{item?.description}</p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span className="repo-lang">
                      <span
                        className="repo-lang-dot"
                        style={{
                          backgroundColor:
                            LANGUAGE_COLORS[item?.primaryLanguage?.name] ||
                            item?.primaryLanguage?.color,
                        }}
                      ></span>
                      {item?.primaryLanguage?.name}
                    </span>
                    <p style={{ margin: 0 }}>&#9733; {item?.stargazerCount}</p>
                    <p style={{ margin: 0 }}>&#127803; {item?.forkCount}</p>
                    <p style={{ margin: 0 }}>
                      &#9888; {item?.openIssues?.totalCount}
                    </p>
                  </div>
                </Card>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
