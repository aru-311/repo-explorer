import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepoCard from "./Components/RepoCard";
import RepoDetail from "./Components/RepoDetail";
import Favourites from "./Components/Favourites";

function App() {
  return (
    <Router>
      {/* <div className="App"> */}
        <Routes>
          <Route path="/" element={<RepoCard />} />
          <Route path="/:name" element={<RepoDetail />} />
          <Route path='/favourites' element={<Favourites/>}/>
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
