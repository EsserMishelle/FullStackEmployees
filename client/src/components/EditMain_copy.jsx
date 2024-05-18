import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import DaysOff from "./DaysOff";
import JobHistory from "./JobHistory";
import { Tab, Tabs } from "react-bootstrap";
import "../styles.css";

export default function EditMain() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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

  //Function to point to the prev page or nxt page

  const navigateTo = (emp_id) => {
    if (emp_id) {
      navigate(`/edit/${emp_id}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(data.birthdate) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.hiredate)
    ) {
      alert("Invalid date format. Please use YYYY-MM-DD");
      setLoading(false);
      return;
    }
    axios
      .post(`/edit_employee/${emp_id}`, data)
      .then((res) => {
        // console.log("response:", res.data);
        // setStatusMessage("Edit successful");
        // setTimeout(() => setStatusMessage(""), 5000);
        // setLoading(false);
        // navigate("/");
        setModalMessage("Edit successful");
        alert("Edit successful");
        setShowModal(true);
        setLoading(false);
        setTimeout(() => {
          setShowModal(false);
          // navigate("/");
        }, 3000);
      })
      .catch((err) => {
        // setStatusMessage("Edit failed. Please try again.");
        // console.log(err);
        // setLoading(false);
        alert("Edit failed. Please try again.");
        setModalMessage("Edit failed. Please try again.");
        setShowModal(true);
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#b4b0f5" }}>
      <Navbar />
      {/* Navigation buttons */}

      <form onSubmit={handleSubmit} className="row">
        {/* Photo and phone info column */}
        <div className="col-md-3">
          {data.photo && (
            <img
              src={data.photo}
              alt="Employee"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          )}
          <div className="form-group">
            <label htmlFor="photo">Photo&nbsp; </label>
            <input
              type="text"
              className="form-control my-2"
              placeholder="Photo URL"
              name="photo"
              value={data.photo || ""}
              onChange={(e) => setData({ ...data, photo: e.target.value })}
            />
          </div>
        </div>

        {/* Column 1 */}
        <div className="col-md-3">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="first_name"
              value={data.first_name || ""}
              onChange={(e) => setData({ ...data, first_name: e.target.value })}
              placeholder="First Name"
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="last_name"
              value={data.last_name || ""}
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
              placeholder="Last Name"
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="birthdate"
              value={data.birthdate || ""}
              onChange={(e) => setData({ ...data, birthdate: e.target.value })}
              placeholder="Birth Date (YYYY-MM-DD)"
            />
            <label htmlFor="birthdate">Birthdate</label>
          </div>
          <div className="form-floating mb-3">
            <select
              className="form-control"
              id="gender"
              value={data.gender || ""}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="LGBG">LGBG</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="gender">Gender</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="hiredate"
              value={data.hiredate || ""}
              onChange={(e) => setData({ ...data, hiredate: e.target.value })}
              placeholder="Hire Date (YYYY-MM-DD)"
            />
            <label htmlFor="hiredate">Birthdate</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="email"
              value={data.email || ""}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="cell_phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="xxx-xxx-xxxx"
              maxLength="12"
              value={data.cell_phone || ""}
              onChange={(e) => setData({ ...data, cell_phone: e.target.value })}
            />
            <label htmlFor="cell_phone">Cell Phone</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="home_phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="xxx-xxx-xxxx"
              maxLength="12"
              value={data.home_phone || ""}
              onChange={(e) => setData({ ...data, home_phone: e.target.value })}
            />
            <label htmlFor="home_phone">Home Phone</label>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-md-3">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="address"
              value={data.address || ""}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              placeholder="Address"
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="city"
              value={data.city || ""}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              placeholder="City"
            />
            <label htmlFor="city">City</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="st"
              value={data.st || ""}
              onChange={(e) => setData({ ...data, st: e.target.value })}
              placeholder="State"
            />
            <label htmlFor="st">State</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="zip"
              value={data.zip || ""}
              onChange={(e) => setData({ ...data, zip: e.target.value })}
              placeholder="Zip"
            />
            <label htmlFor="zip">Zip</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="country"
              value={data.country || ""}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              placeholder="Country"
            />
            <label htmlFor="country">Country</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="notes"
              value={data.notes || ""}
              onChange={(e) => setData({ ...data, notes: e.target.value })}
              placeholder="Notes"
            />
            <label htmlFor="notes">Notes</label>
          </div>
          {/* <button type="submit" className="btn btn-primary">
            Save
          </button> */}
          <div className="navigation-button">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            {/* <div className="navigation-button"> */}
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
      </form>
      <Tabs defaultActiveKey="jobHistory" className="my-3">
        <Tab eventKey="jobHistory" title="Job History">
          <JobHistory emp_id={emp_id} />
        </Tab>
        <Tab eventKey="daysOff" title="Days Off">
          <DaysOff emp_id={emp_id} />
        </Tab>
      </Tabs>
    </div>
  );
}
