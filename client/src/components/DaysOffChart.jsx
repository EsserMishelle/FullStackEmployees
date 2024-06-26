import React, { useEffect, useState } from "react";
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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DaysOffChart = ({ daysOffData }) => {
  const [pieData, setPieData] = useState({});
  const [barData, setBarData] = useState({});

  useEffect(() => {
    if (daysOffData && daysOffData.length > 0) {
      const calculatePieData = () => {
        const leaveTypes = ["Vacation", "Sick", "Training", "Others"];
        const leaveCounts = leaveTypes.map(
          (type) => daysOffData.filter((day) => day.leave_type === type).length
        );
        const totalLeaves = leaveCounts.reduce((acc, count) => acc + count, 0);

        const leavePercentages = leaveCounts.map(
          (count) => (count / totalLeaves) * 100
        );

        setPieData({
          labels: leaveTypes,
          datasets: [
            {
              label: "Day Off Categories",
              data: leavePercentages,
              backgroundColor: [
                "rgba(70, 130, 180, 0.8)",
                "rgba(34, 139, 34, 0.8)",
                "rgba(128, 0, 0, 0.8)",
                "rgba(160, 82, 45, 0.8)",
              ],
              borderColor: [
                "rgba(70, 130, 180, 1)",
                "rgba(34, 139, 34, 1)",
                "rgba(128, 0, 0, 1)",
                "rgba(160, 82, 45, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      };

      const calculateBarData = () => {
        const months = [
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
        ];
        const leaveCountsPerMonth = months.map(
          (_, index) =>
            daysOffData.filter(
              (day) => new Date(day.leave_starts).getMonth() === index
            ).length
        );

        setBarData({
          labels: months,
          datasets: [
            {
              label: "Employee Days Off By Month",
              data: leaveCountsPerMonth,
              backgroundColor: "rgba(153, 102, 255, 0.8)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
      };

      calculatePieData();
      calculateBarData();
    }
  }, [daysOffData]);

  const pieOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "black", //black is readable, white text is pretty
        },
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
        ticks: {
          color: "black", //black is readable, white text is pretty
        },
      },
      x: {
        ticks: {
          color: "black", // black text is readable
        },
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
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "black" }}>
        Days Off by Categories
      </h2>
      <div style={{ width: "50%", margin: "0 auto" }}>
        {pieData.labels ? (
          <Pie data={pieData} options={pieOptions} />
        ) : (
          <p>Loading pie chart...</p>
        )}
      </div>

      <h2 style={{ textAlign: "center", color: "black" }}>
        Days Offs by Month
      </h2>
      <div style={{ width: "70%", margin: "0 auto" }}>
        {barData.labels ? (
          <Bar data={barData} options={barOptions} />
        ) : (
          <p>Loading bar chart...</p>
        )}
      </div>
    </div>
  );
};

export default DaysOffChart;
