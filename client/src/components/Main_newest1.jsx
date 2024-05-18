import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo5 from "./images/logo5.png";
export default function Main() {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#9ed8fe", minHeight: "100vh" }}
    >
      <img
        src={logo5}
        alt="logo for the employee database"
        style={{ width: "25%", height: "auto", borderRadius: "10px" }}
      />
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div
            className="card"
            style={{
              backgroundColor: "lightpink",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">To Add A New Employee</h5>
              <Link
                className="btn btn-block btn-success"
                to="/create"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  borderRadius: "7px",
                }}
              >
                Add New
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div
            className="card"
            style={{
              backgroundColor: "lightgreen",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">View All Employees</h5>
              <Link
                className="btn btn-block btn-success"
                to="/all"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  borderRadius: "7px",
                }}
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div
            className="card"
            style={{
              backgroundColor: "lightgreen",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">Search Form</h5>
              <Link
                className="btn btn-block btn-success"
                to="/search"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  borderRadius: "7px",
                }}
              >
                Search
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div
            className="card"
            style={{
              backgroundColor: "lightgreen",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">View All Departments</h5>
              <Link
                className="btn btn-block btn-success"
                to="/departments"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  borderRadius: "7px",
                  // height: "250px",
                  // width: "200px",
                }}
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
