import React from "react";
import { Link } from "react-router-dom";
import logo5 from "./images/logo5.png";
import "../styles.css";

export default function Main() {
  return (
    <div className="container-fluid background-main d-flex flex-column align-items-center">
      <img
        src={logo5}
        alt="logo for the employee database"
        className="img-logo-main-fluid"
        style={{
          width: "35%",
          maxWidth: "300px",
          height: "auto",
          borderRadius: "10px",
          // justifySelf: "center",
        }}
      />
      <br />

      <div className="row justify-content-center align-items-center w-100">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div
            className="card-main card-main1"
            style={{
              backgroundColor: "gray",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="card-main-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-main-title text-center">Add New Employee</h5>
              <Link
                className="btn btn-block btn-success"
                to="/create"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  height: "75px",
                  width: "150px",
                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                  // opacity: 0.7,
                  borderRadius: "7px",
                }}
              >
                Add New Employee
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div
            className="card-main card-main2"
            style={{
              backgroundColor: "gray",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="card-main-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-main-title text-center">
                View All Employees
              </h5>
              <Link
                className="btn btn-block btn-success"
                to="/all"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  height: "75px",
                  width: "150px",
                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                  // opacity: 0.7,
                  borderRadius: "7px",
                }}
              >
                View all Employees
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div
            className="card-main card-main3"
            style={{
              backgroundColor: "gray",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="card-main-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-main-title text-center">Search Form</h5>
              <Link
                className="btn btn-block btn-success"
                to="/search"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  height: "50px",
                  width: "100px",
                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                  // opacity: 0.7,
                  borderRadius: "7px",
                }}
              >
                Search
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div
            className="card-main card-main4"
            style={{
              backgroundColor: "gray",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="card-main-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-main-title text-center">
                View All Departments
              </h5>
              <Link
                className="btn btn-block btn-success"
                to="/departments"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  height: "75px",
                  width: "150px",
                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                  // opacity: 0.7,
                  borderRadius: "7px",
                }}
              >
                View Departments
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div
            className="card-main card-main5"
            style={{
              backgroundColor: "gray",
              boxShadow: "2px 3px gray",
              height: "250px",
              width: "200px",
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="card-main-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-main-title text-center">
                View Days Off Charts
              </h5>
              <Link
                className="btn btn-block btn-success"
                to="/daysoffchart"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  height: "75px",
                  width: "150px",
                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                  // opacity: 0.7,
                  borderRadius: "7px",
                }}
              >
                View Charts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
