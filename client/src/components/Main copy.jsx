import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#9ed8fe", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-center">
        <Link
          className="btn btn success"
          to="/create"
          style={{
            backgroundColor: "lightpink",
            color: "#675367",
            fontFamily: "sans-serif-light",
            fontSize: "17px",
            fontWeight: "bolder",
            borderRadius: "7px",
            padding: "3px",
            margin: "10px",
            boxShadow: "2px 3px gray, 0px 0px",
          }}
        >
          Add New Employee
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        <Link
          className="btn btn success"
          to="/all"
          style={{
            backgroundColor: "lightgreen",
            color: "#675367",
            fontFamily: "sans-serif-light",
            fontSize: "17px",
            fontWeight: "bolder",
            borderRadius: "7px",
            padding: "3px",
            margin: "10px",
            boxShadow: "2px 3px gray, 0px 0px",
          }}
        >
          View All Employees
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        <Link
          className="btn btn success"
          to="/search"
          style={{
            backgroundColor: "lightgreen",
            color: "#675367",
            fontFamily: "sans-serif-light",
            fontSize: "17px",
            fontWeight: "bolder",
            borderRadius: "7px",
            padding: "3px",
            margin: "10px",
            boxShadow: "2px 3px gray, 0px 0px",
          }}
        >
          Search Form
        </Link>
      </div>

      <div className="d-flex justify-content-center">
        <Link
          className="btn btn success"
          to="/departments"
          style={{
            backgroundColor: "lightgreen",
            color: "#675367",
            fontFamily: "sans-serif-light",
            fontSize: "17px",
            fontWeight: "bolder",
            borderRadius: "7px",
            padding: "3px",
            margin: "10px",
            boxShadow: "2px 3px gray, 0px 0px",
          }}
        >
          View All Departments
        </Link>
      </div>
    </div>
  );
}
