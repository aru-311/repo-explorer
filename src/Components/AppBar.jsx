import "./AppBar.css";
import { useNavigate } from "react-router-dom";
export default function AppBar() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h2 onClick={()=>navigate('/')}>
        {" "}
        <span className="text-blue-600">&#9733;</span> Repo Explorer
      </h2>
      <div
        style={{
          width: "250px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 className="search-icon">
          <span>&#128269;</span> Search
        </h2>
        <h2 className="search-icon" onClick={()=>navigate('/favourites')}>
          <span>&#10084;</span> Favorites
        </h2>
      </div>
    </div>
  );
}
