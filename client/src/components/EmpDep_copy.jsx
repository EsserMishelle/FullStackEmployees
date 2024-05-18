import React, { useState, useEffect } from "react";
import axios from "axios";

function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("/employees-departments")
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <h1>Employee Directory</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.dep_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllEmployees;
