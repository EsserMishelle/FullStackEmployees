import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import backgroundImageAll from "./images/liquidwave25479890_reverse.jpg";
export default function All() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); //default to 1st a page
  const [recordsPerPage, setRecordsPerPage] = useState(25); //let's dfault to 25, but user can set it to 50 or 100

  //useEffect on deleting an employee
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    axios
      .get("/employees")
      .then((res) => {
        // console.log("All Employees Data are: ", res.data);
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("Data is not an array", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  }, [deleted]);

  //deleting an employee
  function handleDelete(emp_id) {
    axios
      .delete(`/delete/${emp_id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //setting page num to the user input page num dynamically
  function handleRecordChange(event) {
    setRecordsPerPage(Number(event.target.value));
    setCurrentPage(1); //reset it back to page1
  }

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  //Calculate total pages and slice dta for current page dispaly
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // console.log("Current page data: ", data);
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  //Components for previous and next btns
  const previousButton =
    currentPage > 1 ? (
      <button onClick={goToPreviousPage}>Previous</button>
    ) : null;

  const nextButton =
    currentPage < totalPages ? (
      <button onClick={goToNextPage}>Next</button>
    ) : null;

  //Dropdown for selectiong number of records to be displayed per page
  const recordsPerPageDropdown = (
    <select value={recordsPerPage} onChange={handleRecordChange}>
      <option value={25}>25 records</option>
      <option value={50}>50 records</option>
      <option value={100}>100 records</option>
    </select>
  );

  return (
    <div
      className="container-fluid vh-200 vw-100"
      // style={{ backgroundColor: "#9ed8fe" }}
      style={{
        backgroundImage: `url(${backgroundImageAll})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        borderRadius: "10px",
        minHeight: "100vh",
        color: "black",
      }}
    >
      {/* Dropdown for selecting records per page */}
      <div className="d-flex justify-content-end">
        <span>
          <div
            style={{ width: "70px", marginTop: "10px", marginRight: "40px" }}
          >
            {recordsPerPageDropdown}
          </div>
        </span>
        <Navbar />

        {/* Add a new employee  */}
        <Link
          className="btn btn success"
          to="/create"
          style={{
            backgroundColor: "#f28885",
            color: "white",
            // color: "#675367",
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

      {/* The table and its data */}
      {Array.isArray(currentRecords) && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="t-photo" scope="col">
                photo
              </th>
              <th className="t-id" scope="col">
                ID{" "}
              </th>
              <th className="t-first-name" scope="col">
                First Name{" "}
              </th>
              <th className="t-last-name" scope="col">
                Last Name{" "}
              </th>

              <th className="t-birthdate" scope="col">
                Birthdate{" "}
              </th>
              <th className="t-gender" scope="col">
                Gender{" "}
              </th>

              <th className="t-dep_id" scope="col">
                Dep ID{" "}
              </th>
              <th className="t-hiredate" scope="col">
                Hiredate{" "}
              </th>
              <th
                className="t-manager_id"
                scope="col"
                style={{ fontSize: "12px" }}
              >
                Manager ID{" "}
              </th>
              <th className="t-job_id" scope="col">
                Job ID{" "}
              </th>
              <th className="t-salary" scope="col">
                salary{" "}
              </th>

              <th className="t-email" scope="col">
                Email{" "}
              </th>
              <th className="t-cell_phone" scope="col">
                Cell Phone{" "}
              </th>
              <th className="t-home_phone" scope="col">
                Home Phone{" "}
              </th>

              <th className="t-address" scope="col">
                Address{" "}
              </th>
              <th className="t-city" scope="col">
                City{" "}
              </th>
              <th className="t-st" scope="col">
                st{" "}
              </th>
              <th className="t-zip" scope="col">
                Zip{" "}
              </th>
              <th className="t-country" scope="col">
                country{" "}
              </th>

              <th className="t-action" scope="col">
                Actions{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((employee) => {
              return (
                <tr key={employee.emp_id}>
                  <td>
                    {" "}
                    <img
                      src={employee.photo}
                      alt="employee"
                      style={{ width: "35px" }}
                    />{" "}
                  </td>
                  <td style={{ fontSize: "14px" }}>{employee.id} </td>
                  <td style={{ fontSize: "14px" }}>{employee.first_name} </td>
                  <td style={{ fontSize: "14px" }}>{employee.last_name} </td>
                  <td style={{ fontSize: "13px" }}>
                    {new Date(employee.birthdate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </td>
                  <td style={{ fontSize: "14px" }}>{employee.gender} </td>

                  <td style={{ fontSize: "14px" }}>{employee.dep_id} </td>
                  <td style={{ fontSize: "13px" }}>
                    {new Date(employee.hiredate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </td>
                  <td style={{ fontSize: "13px" }}>{employee.manager_id} </td>
                  <td style={{ fontSize: "13px" }}>{employee.job_id} </td>
                  <td style={{ fontSize: "14px" }}>{employee.salary} </td>

                  <td style={{ fontSize: "14px" }}>{employee.email} </td>
                  <td style={{ fontSize: "14px" }}>{employee.cell_phone} </td>
                  <td style={{ fontSize: "14px" }}>{employee.home_phone} </td>
                  <td style={{ fontSize: "14px" }}>{employee.address} </td>
                  <td style={{ fontSize: "14px" }}>{employee.city} </td>
                  <td style={{ fontSize: "14px" }}>{employee.st} </td>
                  <td style={{ fontSize: "14px" }}>{employee.zip} </td>
                  <td style={{ fontSize: "14px" }}>{employee.country} </td>

                  <td>
                    <Link
                      className="btn mx-2 btn-success"
                      to={`/read/${employee.emp_id}`}
                      style={{
                        backgroundColor: "#93ae5e",
                        fontFamily: "sans-serif-light",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        margin: "1px",
                        padding: "1px",
                        boxShadow: "1px 1px gray, 0px 0px",
                      }}
                    >
                      Read
                    </Link>
                    <Link
                      className="btn mx-2 btn-success"
                      // to={`/edit/${employee.emp_id}`}
                      to={`/edit/${employee.emp_id}`}
                      style={{
                        backgroundColor: "#bbb2fa",
                        fontFamily: "sans-serif-light",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        margin: "1px",
                        padding: "1px",
                        boxShadow: "1px 1px gray, 0px 0px",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(employee.emp_id);
                      }}
                      className="btn mx-2 btn-danger"
                      style={{
                        backgroundColor: "#f60434",
                        fontFamily: "sans-serif-light",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        margin: "1px",
                        padding: "1px",
                        boxShadow: "1px 1px gray, 0px 0px",
                      }}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div
        className="pagination-controls d-flex justify-content-between"
        style={{
          // paddingBottom: "30px",
          marginBottom: "20px",
          marginTop: "-10px",
          marginRight: "40px",
        }}
      >
        {previousButton}
        <span>
          {currentPage} of {totalPages}
        </span>
        {nextButton}
      </div>
    </div>
  );
}
