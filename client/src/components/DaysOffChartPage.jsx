import React, { useState, useEffect } from "react";
import axios from "axios";
import DaysOffChart from "./DaysOffChart";
import backgroundImageDayOffChart from "./images/metalBackground2907.jpg";

const DaysOffChartPage = () => {
  const [daysOffData, setDaysOffData] = useState([]);

  useEffect(() => {
    axios
      .get("/daysoff")
      .then((res) => {
        setDaysOffData(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch days off data", error);
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageDayOffChart})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        borderRadius: "10px",
        minHeight: "100vh",
        color: "black",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Employee Days Off Chart</h1>
      {daysOffData.length > 0 ? (
        <DaysOffChart daysOffData={daysOffData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DaysOffChartPage;
