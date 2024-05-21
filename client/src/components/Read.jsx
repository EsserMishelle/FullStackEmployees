import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import DaysOff from "./DaysOff";
import JobHistory from "./JobHistory";
import { Tab, Tabs } from "react-bootstrap";
import backgroundImageEditMain from "./images/silver30679232_new1.jpg";
import "../styles.css";

export default function Read() {
  const [data, setData] = useState(null);
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);

  const { emp_id } = useParams();
  const navigate = useNavigate();

  const fetchNextAndPrevId = (currentId) => {
    setNextId(parseInt(currentId) + 1);
    setPrevId(parseInt(currentId) - 1);
  };

  useEffect(() => {
    axios
      .get(`/get_employee/${emp_id}`)
      .then((res) => {
        const employee = res.data[0];
        employee.birthdate = employee.birthdate
          ? employee.birthdate.split("T")[0]
          : "";
        setData(employee);
      })
      .catch((err) => console.log(err));

    fetchNextAndPrevId(emp_id);
  }, [emp_id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const navigateTo = (emp_id) => {
    if (emp_id) {
      navigate(`/read/${emp_id}`);
    }
  };

  return (
    <div
      className="container-fluid p-4"
      style={{
        backgroundImage: `url(${backgroundImageEditMain})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        borderRadius: "10px",
        minHeight: "100vh",
        color: "black",
      }}
    >
      <Navbar />
      <div className="row">
        <div className="col-md-3">
          {data.photo && (
            <img
              src={data.photo}
              alt="Employee"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          )}
        </div>
        <div className="col-md-3">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="first_name"
              value={data.first_name || ""}
              readOnly
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="last_name"
              value={data.last_name || ""}
              readOnly
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="birthdate"
              value={data.birthdate || ""}
              readOnly
            />
            <label htmlFor="birthdate">Birthdate</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="gender"
              value={data.gender || ""}
              readOnly
            />
            <label htmlFor="gender">Gender</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="hiredate"
              value={data.hiredate || ""}
              readOnly
            />
            <label htmlFor="hiredate">Hire Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="email"
              value={data.email || ""}
              readOnly
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="cell_phone"
              value={data.cell_phone || ""}
              readOnly
            />
            <label htmlFor="cell_phone">Cell Phone</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="home_phone"
              value={data.home_phone || ""}
              readOnly
            />
            <label htmlFor="home_phone">Home Phone</label>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="address"
              value={data.address || ""}
              readOnly
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="city"
              value={data.city || ""}
              readOnly
            />
            <label htmlFor="city">City</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="st"
              value={data.st || ""}
              readOnly
            />
            <label htmlFor="st">State</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="zip"
              value={data.zip || ""}
              readOnly
            />
            <label htmlFor="zip">Zip</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="country"
              value={data.country || ""}
              readOnly
            />
            <label htmlFor="country">Country</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="notes"
              value={data.notes || ""}
              readOnly
            />
            <label htmlFor="notes">Notes</label>
          </div>
          <div className="navigation-button">
            <Button
              className="btn-editmain-navigation prev"
              variant="secondary"
              onClick={() => navigateTo(prevId)}
              disabled={!prevId}
            >
              Previous
            </Button>
            <Button
              className="btn-editmain-navigation next"
              variant="secondary"
              onClick={() => navigateTo(nextId)}
              disabled={!nextId}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="jobHistory"
        className="my-3"
        style={{ fontWeight: "bolder" }}
      >
        <Tab eventKey="daysOff" title="Days Off">
          <DaysOff emp_id={emp_id} />
        </Tab>
        <Tab eventKey="jobHistory" title="Job History">
          <JobHistory emp_id={emp_id} />
        </Tab>
      </Tabs>
    </div>
  );
}
