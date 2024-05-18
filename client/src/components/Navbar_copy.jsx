import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link
        to="/all"
        className="btn btn-success"
        style={{
          backgroundColor: "#62badd",
          color: "white",
          fontFamily: "sans-serif-light",
          fontSize: "17px",
          fontWeight: "bolder",
          borderRadius: "5px",
          margin: "10px",
          boxShadow: "2px 2px gray, 0px 0px",
        }}
      >
        View All
      </Link>
      {/* back to main menu */}
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
        }}
      >
        Main Menu
      </Link>
      <Link
        className="btn btn success"
        to="/search"
        style={{
          backgroundColor: "lightgreen",
          color: "#675367",
          fontFamily: "sans-serif-light",
          fontSize: "17px",
          fontWeight: "bolder",
          borderRadius: "5px",
          // padding: "3px",
          margin: "10px",
          boxShadow: "3px 3px gray, 0px 0px",
        }}
      >
        Search Form
      </Link>
    </div>
  );
}
