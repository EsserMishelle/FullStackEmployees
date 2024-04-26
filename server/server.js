const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees",
});

////adding a user on the main form
app.post("/add_employee", (req, res) => {
  const sql = `
    INSERT INTO employee_details
    (photo, first_name, last_name, birthdate, gender, dep_id, hiredate, manager_id, job_id, salary, email, cell_phone, home_phone, address, city, st, zip, country, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    req.body.photo,
    req.body.first_name,
    req.body.last_name,
    req.body.birthdate,
    req.body.gender,
    req.body.dep_id,
    req.body.hiredate,
    req.body.manager_id,
    req.body.job_id,
    req.body.salary,
    req.body.email,
    req.body.cell_phone,
    req.body.home_phone,
    req.body.address,
    req.body.city,
    req.body.st,
    req.body.zip,
    req.body.country,
    req.body.notes,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({ message: "Cannot add this employee " + err });
    return res.json({ success: "Employee added successfully" });
  });
});

////View employee job history
app.get("/jobhistory/:emp_id", (req, res) => {
  const emp_id = req.params.emp_id;
  const sql = `
  SELECT e.photo, e.emp_id, e.first_name, e.last_name, e.birthdate, e.gender, e.hiredate, e.email, e.cell_phone, e.home_phone, e.address, e.city, e.st, e.zip, e.country, e.notes, j.dep_id, j.manager_id, j.job_id, j.job_starts, j.job_ends, j.salary, j.notes1, j.notes2 FROM employee_details e JOIN job_history j ON e.emp_id = j.emp_id WHERE j.id=(
    SELECT MAX(j2.id)
        FROM job_history j2
        WHERE j2.emp_id= e.emp_id) AND e.emp_id=?
  `;

  db.query(sql, [emp_id], (err, results) => {
    if (err) {
      console.log("Job History query error: ", err);
      return res.status(500).json({ err: err.message });
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: "No days off found with this employee" });
    }
  });
});

////View employee days off dates and leave types
app.get("/daysoff/:emp_id", (req, res) => {
  const emp_id = req.params.emp_id;
  const sql = `
    SELECT DISTINCT e.emp_id, e.first_name, e.last_name, od.* 
    FROM employee_details e 
    JOIN daysoff od ON e.emp_id = od.emp_id
    WHERE e.emp_id=?
  `;

  db.query(sql, [emp_id], (err, results) => {
    if (err) {
      console.log("Dayoff query error: ", err);
      return res.status(500).json({ err: err.message });
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: "No days off found with this employee" });
    }
  });
});

////Add employee DaysOffEdit
app.post("/daysoff/add", (req, res) => {
  const { emp_id, leave_type, leave_starts, leave_ends, notes } = req.body;
  const sql = `INSERT INTO daysoff (emp_id, leave_type, leave_starts, leave_ends, notes) VALUES (?,?,?,?,?)`;
  db.query(
    sql,
    [emp_id, leave_type, leave_starts, leave_ends, notes],
    (err, result) => {
      if (err) {
        console.error("Error adding day off record:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Day off added", id: result.insertId });
    }
  );
});

////EDIT employee DaysOffEdit
app.put("/daysoff/update/:id", (req, res) => {
  const { id } = req.params;
  const { leave_type, leave_starts, leave_ends, notes } = req.body;
  const sql = `
    UPDATE daysoff
    SET leave_type = ?, leave_starts = ?, leave_ends = ?, notes = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [leave_type, leave_starts, leave_ends, notes, id],
    (err, result) => {
      if (err) {
        console.error("Error updating day off record:", err);
        return res
          .status(500)
          .json({ error: `Database error: ${err.sqlMessage}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Day off record not found" });
      }
      res.json({ message: "Day off updated successfully" });
    }
  );
});

////DELETE employee DaysOffEdit
app.delete("/daysoff/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM daysoff WHERE id=?";

  db.query(sql, id, (err, result) => {
    if (err) {
      console.error("Error deleting day off record:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Day Off record not found" });
    }
    res.json({ message: "Day off deleted" });
  });
});

////Get employee_details including all employees and depart name
app.get("/employees-departments", (req, res) => {
  const sql = `
   SELECT DISTINCT *, d.dep_name 
    FROM employee_details e 
    JOIN department d ON e.dep_id = d.dep_id
  `;

  // SELECT DISTINCT e.first_name, e.last_name, d.dep_name
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Database query error: ", err);
      return res.status(500).json({ err: err.message });
    }
    res.json(results);
  });
});

////Get department info
app.get("/departments", (req, res) => {
  const sql = `
SELECT DISTINCT * 
    from department 
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Database query error: ", err);
      return res.status(500).json({ err: err.message });
    }
    res.json(results);
  });
});

////get all the employees and their info
app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employee_details";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "server error" });
    res.json(result);
  });
  // if (err) {
  //   console.error("Error querying employees:", err);
  //   return res.status(500).json({ error: `Database error: ${err.message}` });
  // }
});

////Read specific employee
app.get("/get_employee/:emp_id", (req, res) => {
  const emp_id = req.params.emp_id;
  const sql = "SELECT * FROM employee_details WHERE `emp_id`=?";
  db.query(sql, [emp_id], (err, result) => {
    if (err) res.json({ message: "Can't display the employee " + err });
    return res.json(result);
  });
});

////Edit specific employee
app.post("/edit_employee/:emp_id", (req, res) => {
  const emp_id = req.params.emp_id;
  const sql =
    "UPDATE employee_details SET `photo`=?,`first_name`=?, `last_name`=?, `birthdate`=?, `gender`=?, `hiredate`=?,`email`=?, `cell_phone`=?, `home_phone`=?, `address`=?, `city`=?, `st`=?, `zip`=?, `country`=?, `notes`=? WHERE emp_id=?";

  // "UPDATE employee_details SET `photo`=?,`first_name`=?, `last_name`=?, `birthdate`=?, `gender`=?, `hiredate`=?,`dep_id`=?, `manager_id`=?, `job_id`=?, `salary`=?, `email`=?, `cell_phone`=?, `home_phone`=?, `address`=?, `city`=?, `st`=?, `zip`=?, `country`=?, `notes`=? WHERE emp_id=?";
  const values = [
    req.body.photo,
    req.body.first_name,
    req.body.last_name,
    req.body.birthdate,
    req.body.gender,
    // req.body.dep_id,
    req.body.hiredate,
    // req.body.manager_id,
    // req.body.job_id,
    // req.body.salary,
    req.body.email,
    req.body.cell_phone,
    req.body.home_phone,
    req.body.address,
    req.body.city,
    req.body.st,
    req.body.zip,
    req.body.country,
    req.body.notes,
    emp_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error", err);
      return res
        .status(500)
        .json({ message: "couldn't update this employee" + err });
    }
    console.log("Update successful", result);
    return res.json({ success: "employee is updated" });
  });
});

////Delete a specific employee
app.delete("/delete/:emp_id", (req, res) => {
  const emp_id = req.params.emp_id;
  const sql = "DELETE FROM employee_details WHERE `emp_id`=?";
  const values = [emp_id];

  db.query(sql, values, (err, result) => {
    if (err) res.json({ message: "couldn't delete this employee " + err });
    return res.json({ success: "employee updated" });
  });
});

////Search using a paramater
app.get(`/search`, (req, res) => {
  const { query } = req.query;
  const sql = `SELECT * FROM employee_details
  WHERE CONCAT(emp_id, ' ', first_name, ' ', last_name, ' ', birthdate, ' ', gender, ' ', dep_id, ' ', hiredate, ' ', manager_id, ' ', salary, ' ', email, ' ', cell_phone, ' ', home_phone, ' ', zip, ' ', country, ' ') LIKE ?`;
  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error(`Error executing search query:`, err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

app.listen(port, () => console.log(`Server listening to ${port}`));
