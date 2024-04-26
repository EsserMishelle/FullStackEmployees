import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DaysOff() {
  const [data, setData] = useState([]);
  //   const [employees, setEmployees] = useState([]);
  const { emp_id } = useParams();

  useEffect(() => {
    axios
      .get(`/jobhistory/${emp_id}`)
      .then((res) => {
        // const employee = res.data[0];
        console.log(res.data);
        setData(res.data);
        // setEmployees(res.data[0]);
      })
      .catch((error) => {
        console.error("Error returning jobhistory data", error);
        setData([]);
      });
  }, [emp_id]);

  if (!data || data.length === 0) {
    return <div>No job history recorded or still Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Job History</h1>
      {/* <h3>
        Emp ID: {emp_id} {data.first_name} {data.last_name}
      </h3> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dep ID</th>
            <th>Manager ID</th>
            <th>Job ID</th>
            <th>Job Starts:</th>
            <th>Job Ends:</th>
            <th>Salary</th>
            <th>Notes1</th>
            <th>Notes2</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job, index) => (
            <tr key={index}>
              <td>{job.id}</td>
              <td>{job.dep_id}</td>
              <td>{job.manager_id}</td>
              <td>{job.job_id}</td>
              <td>{job.job_starts}</td>
              <td>{job.job_ends}</td>
              <td>{job.salary}</td>
              <td>{job.notes1}</td>
              <td>{job.notes2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
