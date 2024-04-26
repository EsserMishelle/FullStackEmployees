import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/Main";
import All from "./components/All";
import Create from "./components/Create";
import Edit from "./components/Edit";
import EditMain from "./components/EditMain";
import Read from "./components/Read";
import SearchForm from "./components/SearchForm";
import EmpDep from "./components/EmpDep";
import DaysOff from "./components/DaysOff";
import Departments from "./components/Departments";
import JobHistory from "./components/JobHistory";

// toast.configure({
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// });

// toast.configure();
// console.log(toast);

function App() {
  // <button
  //   onClick={() => toast.success("Test Toast: This is a success message!")}
  // >
  //   Test Toast Notification
  // </button>;
  // useEffect(() => {
  //   toast("Hello, world!");
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/all" element={<All />} />
        <Route path="/create" element={<Create />} />
        {/* <Route path="/edit/:emp_id" element={<Edit />} /> */}
        <Route path="/edit/:emp_id" element={<EditMain />} />
        <Route path="/read/:emp_id" element={<Read />} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/employees-departments" element={<EmpDep />} />

        <Route path="/daysoff/:emp_id" element={<DaysOff />} />
        <Route path="/jobhistory/:emp_id" element={<JobHistory />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
