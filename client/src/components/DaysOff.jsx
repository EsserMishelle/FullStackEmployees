import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles.css";

export default function DaysOff() {
  const [data, setData] = useState([]);
  const { emp_id } = useParams();

  useEffect(() => {
    axios
      .get(`/daysoff/${emp_id}`)
      .then((res) => {
        // console.log(res.sdata);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error returning days off data", error);
        setData([]);
      });
  }, [emp_id]);

  if (!data || data.length === 0) {
    return <div>No days off recorded or still Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Day Off</h1>
      <h3>Emp ID:{emp_id}</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Leave type</th>
            <th>Leave Starts</th>
            <th>Leave Ends</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dayOff, index) => (
            <tr key={index}>
              <td>{dayOff.leave_type}</td>
              <td>{dayOff.leave_starts}</td>
              <td>{dayOff.leave_ends}</td>
              <td>{dayOff.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
