import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import backgroundImage from "./images/metalBackground2907.jpg";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Charts = () => {
  const pieData = {
    labels: ["Vacation", "Sick Leave", "Personal Leave", "Public Holidays"],
    datasets: [
      {
        label: "Day Off Categories",
        data: [12, 8, 5, 10],
        backgroundColor: [
          "rgba(70, 130, 180, 0.8)", // Slate Blue
          "rgba(34, 139, 34, 0.8)", // Forest Green
          "rgba(128, 0, 0, 0.8)", // Maroon
          "rgba(160, 82, 45, 0.8)", // Sienna
        ],
        borderColor: [
          "rgba(70, 130, 180, 1)", // Slate Blue
          "rgba(34, 139, 34, 1)", // Forest Green
          "rgba(128, 0, 0, 1)", // Maroon
          "rgba(160, 82, 45, 1)", // Sienna
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Employee Day Offs",
        data: [2, 3, 5, 1, 0, 4, 2, 1, 3, 4, 5, 6],
        backgroundColor: "rgba(70, 130, 180, 0.8)", // Slate Blue
        borderColor: "rgba(70, 130, 180, 1)", // Slate Blue
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroudPosition: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Employee Day Off Categories</h2>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Pie data={pieData} options={pieOptions} />
      </div>

      <h2 style={{ textAlign: "center" }}>Employee Day Offs by Month</h2>
      <div style={{ width: "70%", margin: "0 auto" }}>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Charts;
