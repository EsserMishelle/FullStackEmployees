import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DaysOffEdit() {
  const [daysOff, setDaysOff] = useState([]);
  const [newDayOff, setNewDayOff] = useState({
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
        setDaysOff(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch days off", error);
      });
  }, [emp_id]);

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewDayOff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDaysOff = daysOff.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setDaysOff(updatedDaysOff);
  };

  const handleAddDayOff = () => {
    if (
      !newDayOff.leave_type ||
      !newDayOff.leave_starts ||
      !newDayOff.leave_ends
    ) {
      alert("Please fill all fields before adding a day off.");
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

  const handleSaveEdit = (id) => {
    const dayOff = daysOff.find((dayOff) => dayOff.id === id);
    axios
      .put(`/daysoff/update/${id}`, dayOff)
      .then(() => {
        alert("Day off updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update day off", error);
        alert("Failed to update day off.");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/daysoff/delete/${id}`)
      .then(() => {
        setDaysOff(daysOff.filter((dayOff) => dayOff.id !== id));
        alert("Day off deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete day off", error);
        alert("Failed to delete day off.");
      });
  };

  return (
    <div>
      <h1>Edit Employee Day Off</h1>
      <h3>Emp ID: {emp_id}</h3>
      <table>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Leave Starts</th>
            <th>Leave Ends</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {daysOff.map((dayOff, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="leave_type"
                  value={dayOff.leave_type}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="leave_starts"
                  value={dayOff.leave_starts}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="leave_ends"
                  value={dayOff.leave_ends}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="notes"
                  value={dayOff.notes}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <button onClick={() => handleSaveEdit(dayOff.id)}>Save</button>
                <button onClick={() => handleDelete(dayOff.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="leave_type"
                value={newDayOff.leave_type}
                onChange={handleNewInputChange}
                placeholder="New Leave Type"
              />
            </td>
            <td>
              <input
                type="date"
                name="leave_starts"
                value={newDayOff.leave_starts}
                onChange={handleNewInputChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="leave_ends"
                value={newDayOff.leave_ends}
                onChange={handleNewInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="notes"
                value={newDayOff.notes}
                onChange={handleNewInputChange}
                placeholder="Notes"
              />
            </td>
            <td>
              <button onClick={handleAddDayOff}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
