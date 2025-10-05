import { Card } from "antd";
import AppBar from "./AppBar";
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
  const labels = ["Red", "Blue", "Yellow", "Green"];

  const data = {
    labels,
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        //   "rgba(153, 102, 255, 0.7)",
        //   "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: ["#fff"],
        borderWidth: 2,
      },
    ],
  };
  // Bar chart data
  const barData = {
    labels,
    datasets: [
      {
        label: "",
        data: [12, 19, 3, 5, 2, 3],
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

  const contributorsArr = [
    { name: "Arundhathi", commits: 56 },
    { name: "sample", commits: 56 },
    { name: "user", commits: 56 },
    { name: "rewe", commits: 56 },
  ];

  return (
    <div>
      <AppBar />
      <div className="back-button">
        {" "}
        <span style={{ marginRight: 5 }}>←</span>Back to Search
      </div>
      <Card>
        <h2>Quantum-Solver</h2>
        <h3>
          A highly optimized quantum simulation library for educational
          purposes.
        </h3>
        <div style={{ display: "flex" }}>
          <span className="repo-lang">
            <span
            //   className="repo-lang-dot"
            //   style={{
            //     backgroundColor: LANGUAGE_COLORS[item.language] || "#ccc",
            //   }}
            ></span>
            C++
          </span>
          <p style={{ margin: 5 }}>&#9733; 788</p>
          <p style={{ margin: 5 }}>&#9888; 5667 Open Issues</p>
          <h2 className="search-icon">
            <span>&#10084;</span>Add to Favorites
          </h2>
        </div>
        <h2>In-Depth Analysis</h2>
        <hr />
        <p className="repo-paragraph">
          This section provides a deeper look into the repository's activity and
          composition, helping you understand its maturity, development pace,
          and technical stack.
        </p>
        <div style={{ display: "flex" }}>
          <Card>
            <h2>Language Distribution</h2>
            <p>
              A proportional breakdown of the codebase by primary languages,
              indicating the technological complexity and focus.
            </p>
            <Doughnut data={data} />
          </Card>
          <Card>
            <h2>Weekly Commit Activity</h2>
            <p>
              The number of commits over the last four weeks, serving as a proxy
              for the project's development pace and maintainer engagement.
            </p>
            <Bar data={barData} options={barOptions} />
          </Card>
        </div>
        <h2>Top Contributors</h2>
        <hr />
        <p>
          Key individuals who drive the project forward, measured by their total
          contribution count.
        </p>
        <div style={{ display: "flex", justifyContent:'space-evenly' }}>
          {contributorsArr.map((item, index) => {
            return (
              <Card key={index} className="commits-card">
                <p className="smiley">☺</p>
                <p style={{margin:0}}>{item.name}</p>
                <p style={{margin:0}}>{item.commits} commits</p>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
