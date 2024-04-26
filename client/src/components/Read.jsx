import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import DaysOff from "./DaysOff";
import JobHistory from "./JobHistory";
import { Tab, Tabs } from "react-bootstrap";
import "../styles.css";

export default function Read() {
  const [data, setData] = useState(null); //Start with null, making sue no data yet
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);

  const { emp_id } = useParams();
  const navigate = useNavigate();

  const fetchNextAndPrevId = (currentId) => {
    // Placeholder logic, replace with your actual logic or API calls
    setNextId(parseInt(currentId) + 1);
    setPrevId(parseInt(currentId) - 1);
  };
  useEffect(() => {
    axios
      .get(`/get_employee/${emp_id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));

    fetchNextAndPrevId(emp_id);
  }, [emp_id]);

  //check to see if data is still null
  if (!data) {
    return <div>Loading...</div>;
  }

  const navigateTo = (emp_id) => {
    if (emp_id) {
      navigate(`/read/${emp_id}`);
    }
  };
  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#a7dfdb" }}>
      <h3 style={{ color: "blue" }}>Read Only</h3>
      <Navbar />
      <div className="row">
        {data.photo && (
          <div className="col-md-3">
            <img
              src={data.photo}
              alt="Employee"
              style={{ width: "80%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        )}
        <div className="col-md-9">
          <h1>Employee ID#: {emp_id}</h1>
          <div className="mb-3">
            <strong>First Name: </strong>
            {data.first_name}
            <br />
            <strong>Last Name: </strong> {data.last_name}
            <br />
            <strong>Birthdate: </strong> {data.birthdate}
            <br />
            <strong>Gender: </strong> {data.gender}
            <br />
            <strong>Email: </strong> {data.email}
            <br />
            <strong>Cell Phone: </strong> {data.cell_phone}
            <br />
            <strong>Home Phone: </strong> {data.home_phone}
            <br />
            <strong>Hiredate: </strong> {data.hiredate}
            <br />
            <strong>Address: </strong> {data.address}
            <br />
            <strong>City: </strong> {data.city}
            <br />
            <strong>St:</strong> {data.st}
            <br />
            <strong>Zip: </strong> {data.zip}
            <br />
            <strong>Country: </strong> {data.country}
            <br />
          </div>
          <Tabs defaultActiveKey="jobHistory" className="mb-3">
            <Tab eventKey="jobHistory" title="Job History">
              <JobHistory emp_id={emp_id} />
            </Tab>
            <Tab eventKey="daysOff" title="Days Off">
              <DaysOff emp_id={emp_id} />
            </Tab>
          </Tabs>
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
    </div>
  );
}
// return (
//   <div className="container-fluid p-4" style={{ backgroundColor: "#b4b0f5" }}>
//     <Navbar />

//     <h1>Employee ID#: {emp_id} </h1>

//     <ul className="list-group">
//       <div className="d-flex">
//         <fieldset
//           style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
//         >
//           <legend
//             style={{
//               justifyContent: "right",
//               float: "right",

//               color: "black",

//               width: "10%",
//             }}
//           >
//             {/* Personalia: */}
//           </legend>

//           <li className="list-group-item">
//             <b>Emp ID:&nbsp;</b>
//             {data.emp_id}
//           </li>
//           <li className="list-group-item">
//             <b>First Name: &nbsp;</b>
//             {data.first_name}
//           </li>
//           <li className="list-group-item">
//             <b>Last Name: &nbsp;</b>
//             {data.last_name}
//           </li>
//           <li className="list-group-item">
//             <b>Birthdate: &nbsp;</b>
//             {data.birthdate
//               ? new Date(data.birthdate).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "2-digit",
//                 })
//               : ""}
//           </li>
//           <li className="list-group-item">
//             <b>Gender: &nbsp;</b>
//             {data.gender}
//           </li>
//         </fieldset>
//         <div
//           className="photo-container"
//           style={{
//             textAlign: "center",
//             margin: "20px 0 20px 20px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           {data.photo && (
//             <img
//               src={data.photo}
//               alt="Employee"
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "200px",
//                 margin: "20px 0 20px 20px",
//                 objectFit: "cover",
//                 borderRadius: "10px",
//                 boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//               }}
//             />
//           )}
//           {/* <input
//             type="text"
//             placeholder="Photo URL"
//             value={data.photo || ""}
//             onChange={(e) => setData({ ...data, photo: e.target.value })}
//             style={{ margin: "20px 0 20px 20px" }}
//           /> */}
//         </div>
//       </div>
//       <br />

//       <fieldset
//         style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
//       >
//         <legend
//           style={{
//             justifyContent: "right",
//             float: "right",

//             color: "darkgreen",

//           }}
//         >
//           Work Info:
//         </legend>

//         <li className="list-group-item">
//           <b>Dep ID: &nbsp;</b>
//           {data.dep_id}
//         </li>
//         <li className="list-group-item">
//           <b>Hiredate: &nbsp;</b>
//           {data.hiredate
//             ? new Date(data.hiredate).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "2-digit",
//               })
//             : ""}
//         </li>
//         <li className="list-group-item">
//           <b>Manager ID:&nbsp;</b>
//           {data.manager_id}
//         </li>
//         <li className="list-group-item">
//           <b>Job ID: &nbsp;</b>
//           {data.job_id}
//         </li>
//         <li className="list-group-item">
//           <b>Salary:&nbsp;</b>
//           {data.salary}
//         </li>
//       </fieldset>

//       <br />

//       <fieldset
//         style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
//       >
//         <legend
//           style={{
//             justifyContent: "right",
//             float: "right",

//             color: "darkgreen",

//           }}
//         >
//           Contact Info:
//         </legend>
//         <li className="list-group-item">
//           <b>Email: &nbsp;</b>
//           {data.email}
//         </li>
//         <li className="list-group-item">
//           <b>Cell Phone: &nbsp;</b>
//           {data.cell_phone}
//         </li>
//         <li className="list-group-item">
//           <b>Home Phone: &nbsp;</b>
//           {data.home_phone}
//         </li>
//       </fieldset>
//       <br />

//       <fieldset
//         style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
//       >
//         <legend
//           style={{
//             justifyContent: "right",
//             float: "right",

//             color: "darkgreen",

//           }}
//         >
//           Mailing Address:
//         </legend>
//         <li className="list-group-item">
//           <b>Address: &nbsp;</b>
//           {data.address}
//         </li>
//         <li className="list-group-item">
//           <b>City: &nbsp;</b>
//           {data.city}
//         </li>
//         <li className="list-group-item">
//           <b>State: &nbsp;</b>
//           {data.st}
//         </li>
//         <li className="list-group-item">
//           <b>Zip: &nbsp;</b>
//           {data.zip}
//         </li>
//         <li className="list-group-item">
//           <b>Country: &nbsp;</b>
//           {data.country}
//         </li>
//       </fieldset>
//       <br />

//       <fieldset
//         style={{ border: "2px solid gray", padding: "5px", width: "40%" }}
//       >
//         <legend
//           style={{
//             justifyContent: "right",
//             float: "right",

//             color: "darkgreen",

//           }}
//         >
//           Others:
//         </legend>

//         <li className="list-group-item">
//           <b>Notes: &nbsp;</b>
//           {data.notes}
//         </li>
//       </fieldset>
//     </ul>
//     <div className="navigation-button">
//       {/* <div className="navigation-button"> */}
//       <Button
//         className="btn-editmain-navigation prev"
//         variant="secondary"
//         onClick={() => navigateTo(prevId)}
//         disabled={!prevId}
//       >
//         Previous
//       </Button>
//       <Button
//         className="btn-editmain-navigation next"
//         variant="secondary"
//         onClick={() => navigateTo(nextId)}
//         disabled={!nextId}
//       >
//         Next
//       </Button>
//     </div>
//   </div>
// );
// }
