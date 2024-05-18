import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); //default to 1st a page
  const [recordsPerPage, setRecordsPerPage] = useState(25); //let's dfault to 25, but user can set it to 50 or 100
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const { emp_id } = useParams();
  const navigate = useNavigate();

  //search function
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/search?query=${query}`);
      setResults(res.data);
    } catch (error) {
      console.error(`Error fetching search result:`, error);
    }
  };

  //setting page num to the user input page num dynamically
  function handleRecordChange(event) {
    setRecordsPerPage(Number(event.target.value));
    setCurrentPage(1); //reset it back to page1
  }
  function goToNextPage() {
    if (currentPage < Math.ceil(results.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  //Calculate total pages and slice dta for current page dispaly
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // console.log("Current page data: ", result);
  const currentRecords = results.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(results.length / recordsPerPage);

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
    <select
      value={recordsPerPage}
      onChange={handleRecordChange}
      style={{ height: "40px" }}
    >
      <option value={25}>25 records</option>
      <option value={50}>50 records</option>
      <option value={100}>100 records</option>
    </select>
  );

  const fetchNextAndPrevId = (currentId) => {
    setNextId(parseInt(currentId) + 1);
    setPrevId(parseInt(currentId) - 1);
  };

  useEffect(() => {
    fetchNextAndPrevId();
  }, [emp_id]);

  //useEffect with the deleted feature
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
    axios
      .get("/employees")
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch((err) => console.log(err));

    fetchNextAndPrevId(emp_id);
  }, [deleted]);

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = results.slice(indexOfFirstRecord, indexOfLastRecord);
    setDisplayedRecords(currentRecords);
  }, [currentPage, recordsPerPage, results]);

  // Debug: Check if currentRecords are calculated correctly
  useEffect(() => {
    console.log(displayedRecords);
  }, [displayedRecords]);

  function handleDelete(id) {
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const navigateTo = (emp_id) => {
    if (emp_id) {
      navigate(`/edit/${emp_id}`);
    }
  };

  return (
    <div
      className="container-fluid vh-200 vw-100"
      style={{ backgroundColor: "#c2986b" }}
    >
      <div className="d-flex justify-content-end control-panel">
        <Navbar className="navbar-custom" />
        {/* Dropdown for selecting records per page */}
        <div className="d-flex justify-content-end">
          <span>
            <div
              style={{ width: "70px", marginTop: "10px", marginRight: "40px" }}
            >
              <div style={{ height: "40px" }}>{recordsPerPageDropdown}</div>
            </div>
          </span>

          {previousButton ? (
            <button
              onClick={goToPreviousPage}
              className="search-page-button-style"
            >
              Previous
            </button>
          ) : null}
          {nextButton ? (
            <button onClick={goToNextPage} className="search-page-button-style">
              Next
            </button>
          ) : null}
        </div>
        <span>
          {currentPage} of {totalPages}
        </span>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Search key words..."
            style={{
              margin: "12px 5px 10px 10px",
              width: "300px",
              height: "40px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#9f7925",
              color: "white",
              margin: "12px 15px 10px 10px",
              fontFamily: "sans-serif-light",
              fontSize: "17px",
              padding: "5px 9px 5px 9px",
              fontWeight: "bold",
              borderRadius: "5px",
              // margin: "10px",
              boxShadow: "2px 2px gray, 0px 0px",
            }}
          >
            Search
          </button>
        </form>
      </div>

      {Array.isArray(results) && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="t-id" scope="col">
                ID
              </th>
              <th className="t-first-name" scope="col">
                First Name
              </th>
              <th className="t-last-name" scope="col">
                Last Name
              </th>

              <th className="t-birthdate" scope="col">
                Birthdate
              </th>
              <th className="t-gender" scope="col">
                Gender
              </th>

              <th className="t-dep_id" scope="col">
                Dep ID
              </th>
              <th className="t-hiredate" scope="col">
                Hiredate
              </th>
              <th
                className="t-manager_id"
                scope="col"
                style={{ fontSize: "12px" }}
              >
                Manager ID
              </th>
              <th className="t-job_id" scope="col">
                Job ID
              </th>
              <th className="t-salary" scope="col">
                salary
              </th>

              <th className="t-email" scope="col">
                Email
              </th>
              <th className="t-cell_phone" scope="col">
                Cell Phone
              </th>
              <th className="t-home_phone" scope="col">
                Home Phone
              </th>

              <th className="t-address" scope="col">
                Address
              </th>
              <th className="t-city" scope="col">
                City
              </th>
              <th className="t-st" scope="col">
                st
              </th>
              <th className="t-zip" scope="col">
                Zip
              </th>
              <th className="t-country" scope="col">
                country
              </th>
              <th className="t-action" scope="col">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {displayedRecords.map((item) => {
              return (
                <tr key={item.emp_id}>
                  <td style={{ fontSize: "14px" }}>{item.emp_id} </td>
                  <td style={{ fontSize: "14px" }}>{item.first_name} </td>
                  <td style={{ fontSize: "14px" }}>{item.last_name} </td>
                  <td style={{ fontSize: "13px" }}>
                    {new Date(item.birthdate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </td>
                  <td style={{ fontSize: "14px" }}>{item.gender} </td>

                  <td style={{ fontSize: "14px" }}>{item.dep_id} </td>
                  <td style={{ fontSize: "13px" }}>
                    {new Date(item.hiredate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </td>
                  <td style={{ fontSize: "13px" }}>{item.manager_id} </td>
                  <td style={{ fontSize: "13px" }}>{item.job_id} </td>
                  <td style={{ fontSize: "14px" }}>{item.salary} </td>

                  <td style={{ fontSize: "14px" }}>{item.email} </td>
                  <td style={{ fontSize: "14px" }}>{item.cell_phone} </td>
                  <td style={{ fontSize: "14px" }}>{item.home_phone} </td>
                  <td style={{ fontSize: "14px" }}>{item.address} </td>
                  <td style={{ fontSize: "14px" }}>{item.city} </td>
                  <td style={{ fontSize: "14px" }}>{item.st} </td>
                  <td style={{ fontSize: "14px" }}>{item.zip} </td>
                  <td style={{ fontSize: "14px" }}>{item.country} </td>

                  <td>
                    <Link
                      className="btn mx-2 btn-success"
                      to={`/read/${item.emp_id}`}
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
                      to={`/edit/${item.emp_id}`}
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
                        handleDelete(item.emp_id);
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
    </div>
  );
}
