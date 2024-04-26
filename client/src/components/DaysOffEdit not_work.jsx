import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

export default function DaysOffEdit() {
  const [data, setData] = useState([]);
  const [newDaysOff, setNewDaysOff] = useState({
    leave_type: "",
    leave_starts: "",
    leave_ends: "",
    notes: "",
  });
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

  ////Edit a record
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDaysOff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleInputChange = (index, event) => {
  //   const newData = data.map((item, i) => {
  //     if (i === index) {
  //       return { ...item, [event.target.name]: event.target.value };
  //     }
  //     return item;
  //   });
  //   setData(newData);
  // };

  //add a day off function
  const handleDaysOffEditAdd = () => {
    if (
      !newDaysOff.leave_type ||
      !newDaysOff.leave_starts ||
      !newDaysOff.leave_ends
    ) {
      alert("Please fill in all the fields to add a new day off");
      return;
    }
    axios
      .post("/daysoff/add", { ...newDaysOff, emp_id })
      .then((res) => {
        alert("Added successfully");
        setData([...data, { ...newDaysOff, id: res.data.id }]);
        // Add one blank record and reset new all fields
        setNewDaysOff({
          leave_type: "",
          leave_starts: "",
          leave_ends: "",
          notes: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new day off record", error);
        alert("Failed to add a new day off");
      });
  };

  const handleDaysOffEditDelete = (id) => {
    axios
      .delete(`/daysoff/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting day off", error);
        alert("Failed to delete day off");
      });
  };

  //Save (after editting) function
  const handleDaysOffEditSave = (index) => {
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
  if (!data || data.length === 0) {
    return <div>No days off recorded or still Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Employee Day Off</h1>
      <h3>Emp ID:{emp_id}</h3>
      {/* <table
        className="daysoffedit-table daysoffedit-table-striped daysoffedit-table-flex"        */}
      <div>
        <input
          type="text"
          name="leave_type"
          value={newDaysOff.leave_type}
          onChange={handleInputChange}
          placeholder="Leave Type"
        />
        <input
          type="date"
          name="leave_starts"
          value={newDaysOff.leave_starts}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="leave_ends"
          value={newDaysOff.leave_ends}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          value={newDaysOff.notes}
          onChange={handleInputChange}
          placeholder="Notes"
        />
        <button onClick={handleDaysOffEditAdd}>Add Day Off</button>
      </div>
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
                {/* <input
                  type="text"
                  name="leave_type"
                  value={dayOff.leave_type}
                  onChange={(e) => handleInputChange(index, e)}
                /> */}
                <input
                  type="text"
                  name="leave_type"
                  value={newDaysOff.leave_type}
                  onChange={handleInputChange}
                />
              </td>
              <td className="dayoffedit-leave-starts">
                <input
                  type="date"
                  name="leave_starts"
                  value={newDaysOff.leave_starts}
                  onChange={handleInputChange}
                  // onChange={(e) => handleInputChange(e)}
                  // onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td className="dayoffedit-leave-ends">
                <input
                  type="date"
                  name="leave_ends"
                  value={newDaysOff.leave_ends}
                  onChange={handleInputChange}
                  // onChange={(e) => handleInputChange(index, e)}
                  // onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td className="dayoffedit-notes">
                <input
                  type="text"
                  name="leave_notes"
                  value={newDaysOff.leave_notes}
                  onChange={handleInputChange}
                  // onChange={(e) => handleInputChange(e)}
                  // onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td className="dayoffedit-actions">
                <button onClick={() => handleDaysOffEditSave(index)}>
                  Save
                </button>
                <button onClick={handleDaysOffEditAdd}>Add</button>
                <button onClick={() => handleDaysOffEditDelete(dayOff.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
