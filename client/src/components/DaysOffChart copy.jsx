import { useEffect } from "react";
import Chart from "chart.js/auto";

function DaysOffChart({ daysOffData }) {
  useEffect(() => {
    const ctxBar = document.getElementById("barChart").getContext("2d");
    const ctxPie = document.getElementById("pieChart").getContext("2d");
    const ctxLine = document.getElementById("lineChart").getContext("2d");

    // Assuming daysOffData has been processed to fit each chart's needs
    const barChart = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: daysOffData.map((data) => data.employeeName),
        datasets: [
          {
            label: "Vacation Duration",
            data: daysOffData.map((data) => {
              const start = new Date(data.start);
              const end = new Date(data.end);
              return (end - start) / (1000 * 3600 * 24); // Duration in days
            }),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });

    const pieChart = new Chart(ctxPie, {
      type: "pie",
      data: {
        labels: daysOffData.map((data) => data.employeeName),
        datasets: [
          {
            label: "Number of Days Off",
            data: daysOffData.map((data) => {
              const start = new Date(data.start);
              const end = new Date(data.end);
              return (end - start) / (1000 * 3600 * 24);
            }),
            backgroundColor: daysOffData.map(
              () =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255
                )}, ${Math.floor(Math.random() * 255)}, 0.7)`
            ),
          },
        ],
      },
    });

    const lineChart = new Chart(ctxLine, {
      type: "line",
      data: {
        labels: daysOffData.map((data) => data.employeeName),
        datasets: [
          {
            label: "Vacation Trend",
            data: daysOffData.map((data) => {
              const start = new Date(data.start);
              const end = new Date(data.end);
              return (end - start) / (1000 * 3600 * 24);
            }),
            borderColor: "rgba(153, 102, 255, 1)",
            fill: false,
          },
        ],
      },
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
      lineChart.destroy();
    };
  }, [daysOffData]);

  return (
    <div>
      <div>
        <h2>Bar Chart - Vacation Duration</h2>
        <canvas id="barChart"></canvas>
      </div>
      <div>
        <h2>Pie Chart - Vacation Count</h2>
        <canvas id="pieChart"></canvas>
      </div>
      <div>
        <h2>Line Chart - Vacation Over Time</h2>
        <canvas id="lineChart"></canvas>
      </div>
    </div>
  );
}

export default DaysOffChart;
