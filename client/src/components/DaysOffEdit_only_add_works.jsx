import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DaysOffEdit() {
  const [daysOff, setDaysOff] = useState([]); // Stores existing days off
  const [newDayOff, setNewDayOff] = useState({
    // Form for new day off
    leave_type: "",
    leave_starts: "",
    leave_ends: "",
    notes: "",
  });
  const { emp_id } = useParams();

  useEffect(() => {
    axios
      .get(`/daysoff/${emp_id}`)
      .then((res) => {
        setDaysOff(res.data); // Assuming res.data is the array of days off
      })
      .catch((error) => {
        console.error("Failed to fetch days off", error);
      });
  }, [emp_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDayOff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDayOff = () => {
    if (
      !newDayOff.leave_type ||
      !newDayOff.leave_starts ||
      !newDayOff.leave_ends
    ) {
      ("Please fill all fields before adding a day off.");
      return;
    }
    axios
      .post("/daysoff/add", { ...newDayOff, emp_id })
      .then((res) => {
        setDaysOff([...daysOff, { ...newDayOff, id: res.data.id }]);
        setNewDayOff({
          leave_type: "",
          leave_starts: "",
          leave_ends: "",
          notes: "",
        });
        alert("Day off added successfully!");
      })
      .catch((error) => {
        console.error("Failed to add day off", error);
        alert("Failed to add a new day off.");
      });
  };

  if (!daysOff || daysOff.length === 0) {
    return <div>Loading days off or no days off recorded...</div>;
  }

  return (
    <div>
      <h1>Edit Employee Day Off</h1>
      <h3>Emp ID: {emp_id}</h3>
      <div>
        <input
          type="text"
          name="leave_type"
          value={newDayOff.leave_type}
          onChange={handleInputChange}
          placeholder="Leave Type"
        />
        <input
          type="date"
          name="leave_starts"
          value={newDayOff.leave_starts}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="leave_ends"
          value={newDayOff.leave_ends}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          value={newDayOff.notes}
          onChange={handleInputChange}
          placeholder="Notes"
        />
        <button onClick={handleAddDayOff}>Add Day Off</button>
      </div>
      <table className="daysoffedit-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Leave Starts</th>
            <th>Leave Ends</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {daysOff.map((dayOff, index) => (
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
