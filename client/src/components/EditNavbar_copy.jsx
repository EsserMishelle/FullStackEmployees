import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function EditNavbar() {
  const [data, setData] = useState({});
  const { emp_id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_employee/${emp_id}`)
      .then((res) => {
        const employee = res.data[0];
        if (employee.birthdate) {
          const formattedDate = employee.birthdate.split("T")[0];
          employee.birthdate = formattedDate;
        }
        setData(employee);
      })
      .catch((err) => console.log(err));
  }, [emp_id]);

  // Adding dashes to phone number
  function formatPhoneNumber(value) {
    const numericValue = value.replace(/\D/g, "");
    //Format as xxx-xxx-xxxx
    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 6) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(
        3,
        6
      )}-${numericValue.slice(6, 10)}`;
    }
  }
  //Combining formatPhoneNumber with handleChange
  function handleInputTelephoneChange(e) {
    const { name, value } = e.target;
    //check if the input change is for a phone number field
    if (name === "cell_phone" || name === "home_phone") {
      setData({
        ...data,
        [name]: formatPhoneNumber(value),
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  }

  // Make sure date is entered according to YYYY-MM-DD
  const isValidDate = (dateStr) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  };

  const navigate = useNavigate();
  //validating date format
  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidDate(data.birthdate)) {
      alert("Invalid date format. Please use YYYY-MM-DD");
      return;
    }
    axios
      .post(`/edit_employee/${emp_id}`, data)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  console.log(data.photo);
  return (
    <div
      className="container-fluid vw-200 vh-1000"
      style={{ backgroundColor: "#b4b0f5" }}
    >
      <Navbar />
      <h1>Employee ID#: {emp_id} </h1>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className="d-flex">
          <fieldset
            style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
          >
            <legend
              style={{
                justifyContent: "right",
                float: "right",
                // background: "lightgray",
                color: "darkgreen",
                // padding: "3px",
              }}
            >
              Personalia:
            </legend>

            <div className="form-group my-3">
              <label htmlFor="first_name">First Name&nbsp; </label>
              <input
                value={data.first_name || ""}
                type="text"
                name="first_name"
                required
                onChange={(e) =>
                  setData({ ...data, first_name: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="last_name">Last Name&nbsp; </label>
              <input
                value={data.last_name || ""}
                type="text"
                name="last_name"
                required
                onChange={(e) =>
                  setData({ ...data, last_name: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="">Birth Date&nbsp; </label>
              <input
                value={data.birthdate || ""}
                type="text"
                name="birthdate"
                placeholder="YYYY-MM-DD"
                required
                onChange={(e) =>
                  setData({ ...data, birthdate: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="gender">Gender&nbsp; </label>
              <input
                value={data.gender || ""}
                type="text"
                name="gender"
                required
                onChange={(e) => setData({ ...data, gender: e.target.value })}
              />
            </div>
          </fieldset>
          {/*Image container  */}
          <div
            className="photo-container"
            style={{
              textAlign: "center",
              margin: "20px 0 20px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "100%",
            }}
          >
            {data.photo && (
              <img
                src={data.photo}
                alt="Employee"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  margin: "20px 0 20px 20px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
            )}
            <input
              type="text"
              placeholder="Photo URL"
              value={data.photo || ""}
              onChange={(e) => setData({ ...data, photo: e.target.value })}
              style={{ maxWidth: "100%", margin: "20px 0 20px 20px" }}
            />
          </div>
        </div>
        <br />

        <fieldset
          style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
        >
          <legend
            style={{
              justifyContent: "right",
              float: "right",
              // background: "lightgray",
              color: "darkgreen",
              // padding: "3px",
            }}
          >
            Work Info:
          </legend>
          <div className="form-group my-3">
            <label htmlFor="dep_id">Dep ID&nbsp; </label>
            <input
              value={data.dep_id || ""}
              type="text"
              name="dep_id"
              required
              onChange={(e) => setData({ ...data, dep_id: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="">Hire Date&nbsp; </label>
            <input
              value={data.hiredate || ""}
              type="text"
              name="hiredate"
              placeholder="YYYY-MM-DD"
              required
              onChange={(e) => setData({ ...data, hiredate: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="manager_id">Manager ID&nbsp; </label>
            <input
              value={data.manager_id || ""}
              type="number"
              name="manager_id"
              required
              onChange={(e) => setData({ ...data, manager_id: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="job_id">Job ID&nbsp; </label>
            <input
              value={data.job_id || ""}
              type="text"
              name="job_id"
              required
              onChange={(e) => setData({ ...data, job_id: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="salary">Salary&nbsp; </label>
            <input
              value={data.salary || ""}
              type="number"
              name="salary"
              required
              onChange={(e) => setData({ ...data, salary: e.target.value })}
            />
          </div>
        </fieldset>
        {/* </div> */}
        <br />

        <fieldset
          style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
        >
          <legend
            style={{
              justifyContent: "right",
              float: "right",
              // background: "lightgray",
              color: "darkgreen",
              // padding: "3px",
            }}
          >
            Contact Info:
          </legend>
          <div className="form-group my-3">
            <label htmlFor="email">Email: &nbsp; </label>
            <input
              value={data.email || ""}
              type="email"
              name="email"
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
              // style={{ width: "90%" }}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="cell_phone">Cell Phone&nbsp; </label>
            <input
              value={data.cell_phone || ""}
              type="tel"
              name="cell_phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="xxx-xxx-xxxx"
              maxLength="12"
              required
              // onChange={(e) => setData({ ...data, cell_phone: e.target.value })}
              onChange={handleInputTelephoneChange}
              // style={{ width: "80%" }}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="home_phone">Home Phone&nbsp; </label>
            <input
              value={data.home_phone || ""}
              type="tel"
              name="home_phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="xxx-xxx-xxxx"
              required
              maxLength="12"
              onChange={handleInputTelephoneChange}

              // onChange={(e) => setData({ ...data, home_phone: e.target.value })}
            />
          </div>
        </fieldset>
        <br />

        <fieldset
          style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
        >
          <legend
            style={{
              justifyContent: "right",
              float: "right",
              // background: "lightgray",
              color: "darkgreen",
              // padding: "3px",
            }}
          >
            Mailing Address:
          </legend>
          <div className="form-group my-3">
            <label htmlFor="address">Address&nbsp; </label>
            <input
              value={data.address || ""}
              type="text"
              name="address"
              required
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="city">City&nbsp; </label>
            <input
              value={data.city || ""}
              type="text"
              name="city"
              required
              onChange={(e) => setData({ ...data, city: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="st">ST&nbsp; </label>
            <input
              value={data.st || ""}
              type="text"
              name="st"
              required
              onChange={(e) => setData({ ...data, st: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="zip">Zip&nbsp; </label>
            <input
              value={data.zip || ""}
              type="text"
              name="zip"
              required
              onChange={(e) => setData({ ...data, zip: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="country">Country&nbsp; </label>
            <input
              value={data.country || ""}
              type="text"
              name="country"
              default="USA"
              required
              onChange={(e) => setData({ ...data, country: e.target.value })}
            />
          </div>
        </fieldset>
        <br />

        <fieldset
          style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
        >
          <legend
            style={{
              justifyContent: "right",
              float: "right",
              // background: "lightgray",
              color: "darkgreen",
              // padding: "3px",
            }}
          >
            Others:
          </legend>
          <div className="form-group my-3">
            <label htmlFor="notes">Notes&nbsp; </label>
            {/* <input
            value={data.notes || ""}
            type="text"
            name="notes"
            required
            onChange={(e) => setData({ ...data, notes: e.target.value })}
          /> */}
            <textarea
              value={data.notes || ""}
              type="text"
              name="notes"
              cols="30"
              rows="10"
              onChange={(e) => setData({ ...data, notes: e.target.value })}
            ></textarea>
          </div>
        </fieldset>
        <br />

        <div className="form-group my-3">
          <button
            type="submit"
            className="btn btn-success"
            style={{
              backgroundColor: "#6f9364",
              color: "white",
              fontFamily: "sans-serif-light",
              fontSize: "17px",
              fontWeight: "bolder",
              borderRadius: "5px",
              margin: "10px",
              boxShadow: "2px 2px gray, 0px 0px",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
