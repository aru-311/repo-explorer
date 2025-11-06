import { useCallback, useEffect, useRef, useState } from "react";
import "./AppBar.css";
import { Input, Select, Card } from "antd";
import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setPageNumber,
  toggleFavorite,
} from "../slice/githubApiSlice";
import {
  getFavoriteRepos,
  getRepositoriesThunks,
} from "../thunks/gitHubApiThunks";
import { debounce } from "lodash";

export default function RepoCard() {
  const dispatch = useDispatch();
  const {
    query,
    repositories = [],
    totalCount,
    pageNumber,
    favourites = [],
    loading,
    languageSet = [],
  } = useSelector((state) => state.gitRepoSlice);

  const [internalRepo, setInternalRepo] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  const navigate = useNavigate();

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

  // Debounced search for query changes
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(
        getRepositoriesThunks({
          query: value,
          count_per_page: 20,
          page_number: 1,
        })
      );
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    setInternalRepo(repositories);
  }, [repositories]);

  const handleQueryChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    debouncedSearch(value);
  };

  const handleFilters = (value) => {
    setSelectedLang(value);
    if (value && value != "Select Language") {
      setInternalRepo(repositories.filter((item) => item.language === value));
    } else {
      setInternalRepo(repositories);
    }
  };

  const handleRepoClick = useCallback(
    (logininfo, repoName) => {
      navigate(`/${logininfo}/${repoName}`);
    },
    [navigate]
  );

  const handleFavoriteClick = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="app-container">
      <AppBar />
      <div className="repo-card repo-body">
        <h2>Discover GitHub Repositories</h2>
        <p className="paragraph-text">
          Explore highly active GitHub projects. Use the search bar to filter by
          name, description, or language. Click any card to see details.
        </p>
        <div className="input-field">
          <Input
            size="large"
            placeholder="Search repositories..."
            value={query}
            onChange={handleQueryChange}
          />
          <Select
            defaultValue="Filter by Languages"
            value={selectedLang?.length>0 ? selectedLang:"Filter by Languages"}
            style={{ width: 200, height: 40, marginLeft: 20 }}
            onChange={(value) => handleFilters(value)}
            options={languageSet}
          />
        </div>
        <div className="repo-detail-card">
          {internalRepo?.map((item) => {
            const isFavorite = favourites.some(
              (fav) => fav.id === item.id || fav === item.node_id
            );
            return (
              <Card key={item.id} className="card-detail">
                <div className="repo-header">
                  <h2
                    className="repo-title"
                    onClick={() => handleRepoClick(item.owner.login, item.name)}
                  >
                    {item.name}
                  </h2>
                  <button
                    className={`repo-fav-btn ${
                      isFavorite ? "icon-star-filled" : "icon-star-empty"
                    }`}
                    onClick={() => handleFavoriteClick(item.node_id)}
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
