import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

export default function DaysOffEdit() {
  const [data, setData] = useState([]);
  const { emp_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/daysoff/${emp_id}`)
      .then((res) => {
        console.log("Fetched data: ", res.data);
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

  const handleInputChange = (index, event) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        return { ...item, [event.target.name]: event.target.value };
      }
      return item;
    });
    setData(newData);
  };

  const handleSave = (index) => {
    const dayOff = data[index];
    if (!dayOff.id) {
      alert("Error: Day Off record is missing an ID!");
      return;
    }
    axios
      .put(`/daysoff/update/${dayOff.id}`, dayOff)
      .then((res) => {
        alert(`Save successfully`);
      })
      .catch((error) => {
        const message = error.message ? error.response.data.message : "Failed";
        console.error("Saving error", error.response || error);
        alert(message);

        // console.error(`Error updating days off`, error);
        // alert(`Failed to save changes`);
      });
  };

  return (
    <div>
      <h1>Edit Employee Day Off</h1>
      <h3>Emp ID:{emp_id}</h3>
      {/* <table
        className="daysoffedit-table daysoffedit-table-striped daysoffedit-table-flex"        */}
      <table
        className="daysoffedit-table daysoffedit-table-striped daysoffedit-table-grid"
        style={{ backgroundColor: "#b4b0f5" }}
      >
        <thead>
          <tr>
            <th className="dayoffedit-leave-type">Leave type</th>
            <th className="dayoffedit-leave-starts">Leave Starts</th>
            <th className="dayoffedit-leave-ends">Leave Ends</th>
            <th className="dayoffedit-notes">Notes</th>
            <th className="dayoffedit-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dayOff, index) => (
            <tr key={index}>
              <td className="dayoffedit-leave-type">
                <input
                  type="text"
                  name="leave_type"
                  value={dayOff.leave_type}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td className="dayoffedit-leave-starts">
                <input
                  type="date"
                  name="leave_starts"
                  value={dayOff.leave_starts}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td className="dayoffedit-leave-ends">
                <input
                  type="date"
                  name="leave_ends"
                  value={dayOff.leave_ends}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td className="dayoffedit-notes">
                <input
                  type="text"
                  name="leave_notes"
                  value={dayOff.leave_notes}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td className="dayoffedit-actions">
                <button onClick={() => handleSave(index)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
