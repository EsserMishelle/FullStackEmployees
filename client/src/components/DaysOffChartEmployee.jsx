import { useEffect } from "react";
import Chart from "chart.js/auto";

function DaysOffChart({ daysOffData }) {
  useEffect(() => {
    const ctxBar = document.getElementById("barChart").getContext("2d");
    const ctxPie = document.getElementById("pieChart").getContext("2d");

    // Process data to group by leave_type
    const leaveTypeData = daysOffData.reduce((acc, curr) => {
      if (!acc[curr.leave_type]) {
        acc[curr.leave_type] = [];
      }
      acc[curr.leave_type].push(curr);
      return acc;
    }, {});

    // labels and datasets for bar chart and pie chart
    const barLabels = Object.keys(leaveTypeData);
    const barData = barLabels.map((leaveType) =>
      leaveTypeData[leaveType].reduce((totalDays, data) => {
        const start = new Date(data.leave_starts);
        const end = new Date(data.leave_ends);
        return totalDays + (end - start) / (1000 * 3600 * 24);
      }, 0)
    );
    const pieLabels = barLabels;
    const pieData = barData;

    const barChart = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: barLabels,
        datasets: [
          {
            label: "Vacation Duration",
            data: barData,
            backgroundColor: "rgba(255,0,0,0.3)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
              color: "blue",
              font: {
                weight: "bold",
                size: 16,
              },
            },
          },
          x: {
            ticks: {
              color: "black",
              font: {
                weight: "bold",
                size: 16,
              },
            },
          },
        },
      },
    });

    const pieChart = new Chart(ctxPie, {
      type: "pie",
      data: {
        labels: pieLabels,
        datasets: [
          {
            label: "Number of Days Off",
            data: pieData,
            backgroundColor: pieLabels.map(
              () =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255
                )}, ${Math.floor(Math.random() * 255)}, 0.7)`
            ),
          },
        ],
      },
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, [daysOffData]);

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Bar Chart - Vacation Duration by Leave Type</h2>
        <canvas id="barChart" width="400" height="300"></canvas>
      </div>
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h2>Pie Chart - Vacation Count by Leave Type</h2>
        <canvas id="pieChart" width="400" height="300"></canvas>
      </div>
    </div>
  );
}

export default DaysOffChart;
