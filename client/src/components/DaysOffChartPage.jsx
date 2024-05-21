import React, { useState, useEffect } from "react";
import axios from "axios";
import DaysOffChart from "./DaysOffChart";
import { Link } from "react-router-dom";
import backgroundImageDayOffChart from "./images/silver30679232Blue_new5.jpg";

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
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gap: "20px",
      }}
    >
      <div>
        <Link
          className="btn btn success"
          to="/"
          style={{
            backgroundColor: "#a6a9ba",
            color: "white",
            fontFamily: "sans-serif-light",
            fontSize: "17px",
            fontWeight: "bolder",
            borderRadius: "5px",
            margin: "10px",
            boxShadow: "3px 3px gray, 0px 0px",
            maxWidth: "200px",
            width: "100%",
            textAlign: "center",
          }}
        >
          Main Menu
        </Link>
      </div>
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
