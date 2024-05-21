import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("/departments")
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <h1>All Departments</h1>
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
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th style={{ width: "35px", margin: "10px 10px 10px 30px" }}> */}
            <th>Dep ID</th>
            <th>Dep Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              {/* <td style={{ width: "35px", margin: "10px 10px 10px 30px" }}></td> */}
              <td>{department.dep_id}</td>
              <td>{department.dep_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
