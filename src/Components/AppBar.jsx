import "./AppBar.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../themes";
// import { FaMoon, FaSun } from "react-icons/fa";

export default function AppBar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="header">
      <h2 onClick={() => navigate("/")}>
        {" "}
        <span className="text-blue-600">&#9733;</span> Repo Explorer
      </h2>
      <div
        style={{
          width: "300px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
          aria-label="Toggle theme"
        >
          <p style={{margin:'-11px 10px 5px 10px'}}>
          {theme === "light" ? "🌙": "🔆"}
          </p>
        </button>

        <h2 className="search-icon" onClick={() => navigate("/")}>
          <span>&#128269;</span> Search
        </h2>
        <h2 className="search-icon" onClick={() => navigate("/favourites")}>
          <span>&#10084;</span> Favorites
        </h2>
      </div>
    </div>
  );
}
