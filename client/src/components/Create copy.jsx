import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Create() {
  // const [phoneNumber, setPhoneNumber] = useState("");

  const [values, setValues] = useState({
    photo: "",
    first_name: "",
    last_name: "",
    birthdate: "",
    gender: "",

    dep_id: "",
    hiredate: "",
    manager_id: "",
    salary: "",

    email: "",
    cell_phone: "",
    home_phone: "",

    address: "",
    city: "",
    st: "",
    zip: "",
    country: "",

    notes: "",
  });

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
      setValues({
        ...values,
        [name]: formatPhoneNumber(value),
      });
    } else {
      setValues({
        ...values,
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

    if (!isValidDate(values.birthdate)) {
      alert("Invalid date format. Please use YYYY-MM-DD");
      return;
    }
    axios
      .post("/add_employee", values)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="container vh-200 vw-200"
      style={{ backgroundColor: "#ceebba" }}
    >
      <div className="row">
        <h3>Add Employee </h3>
        <div className="d-flex justify-content-end">
          <Navbar />
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div className="d-flex">
            <fieldset
              style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
            >
              <legend
                style={{
                  justifyContent: "right",
                  float: "right",
                  color: "darkgreen",
                }}
              >
                Personalia:
              </legend>

              <div className="form-group my-3">
                <label htmlFor="first_name">First Name&nbsp; </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  onChange={(e) =>
                    setValues({ ...values, first_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="last_name">Last Name&nbsp; </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  onChange={(e) =>
                    setValues({ ...values, last_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="">Birth Date&nbsp; </label>
                <input
                  type="text"
                  name="birthdate"
                  placeholder="YYYY-MM-DD"
                  required
                  onChange={(e) =>
                    setValues({ ...values, birthdate: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="gender">Gender&nbsp; </label>
                <input
                  type="text"
                  name="gender"
                  required
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value })
                  }
                />
              </div>
            </fieldset>
            {/*Image container  */}
            <div
              className="photo-container"
              style={{
                textAlign: "center",
                flex: 1,
                margin: "20px 0 20px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {values.photo && (
                <img
                  src={values.photo}
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
                value={values.photo}
                onChange={(e) =>
                  setValues({ ...values, photo: e.target.value })
                }
                style={{ margin: "20px 0 20px 20px", maxWidth: "100%" }}
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
                type="text"
                name="dep_id"
                required
                onChange={(e) =>
                  setValues({ ...values, dep_id: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="">Hire Date&nbsp; </label>
              <input
                type="text"
                name="hiredate"
                placeholder="YYYY-MM-DD"
                required
                onChange={(e) =>
                  setValues({ ...values, hiredate: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="manager_id">Manager ID&nbsp; </label>
              <input
                type="number"
                name="manager_id"
                required
                onChange={(e) =>
                  setValues({ ...values, manager_id: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="job_id">Job ID&nbsp; </label>
              <input
                type="text"
                name="job_id"
                required
                onChange={(e) =>
                  setValues({ ...values, dep_id: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="salary">Salary&nbsp; </label>
              <input
                type="number"
                name="salary"
                required
                onChange={(e) =>
                  setValues({ ...values, salary: e.target.value })
                }
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
              Contact Info:
            </legend>
            <div className="form-group my-3">
              <label htmlFor="email">Email&nbsp; </label>
              <input
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="cell_phone">Cell Phone&nbsp; </label>
              <input
                type="tel"
                name="cell_phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="xxx-xxx-xxxx"
                maxLength="12"
                required
                // onChange={(e) =>
                //   setValues({ ...values, cell_phone: e.target.value })
                // }
                onChange={handleInputTelephoneChange}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="home_phone">Home Phone&nbsp; </label>
              <input
                type="tel"
                name="home_phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                placeholder="xxx-xxx-xxxx"
                maxLength="12"
                onChange={handleInputTelephoneChange}
                // onChange={(e) =>
                //   setValues({ ...values, home_phone: e.target.value })
                // }
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
                type="text"
                name="address"
                required
                onChange={(e) =>
                  setValues({ ...values, address: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="city">City&nbsp; </label>
              <input
                type="text"
                name="city"
                required
                onChange={(e) => setValues({ ...values, city: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="st">state&nbsp; </label>
              <input
                type="text"
                name="st"
                required
                onChange={(e) => setValues({ ...values, st: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="zip">Zipcode&nbsp; </label>
              <input
                type="text"
                name="zip"
                required
                onChange={(e) => setValues({ ...values, zip: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="country">Country&nbsp; </label>
              <input
                type="text"
                name="country"
                default="USA"
                required
                onChange={(e) =>
                  setValues({ ...values, country: e.target.value })
                }
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
              <textarea
                type="text"
                name="notes"
                cols="30"
                rows="10"
                onChange={(e) =>
                  setValues({ ...values, notes: e.target.value })
                }
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
    </div>
  );
}
