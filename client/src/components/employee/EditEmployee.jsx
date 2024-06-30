import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const { strEmployeeID } = useParams();
  const [stallID, setItemStallID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");
    
    Axios
      .get(`http://localhost:3001/employees/${strEmployeeID}`)
      .then(response => {
        const employee = response.data.employee;
        setEmployeeName(employee.strEmployeeName);
        setEmployeePosition(employee.strPosition);
      })
      .catch(error => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios
    .get(`http://localhost:3001/items/stalls/${ownerID}`)
    .then(response => {
      if (response.data.status === "Success") {
        setItemStallID(response.data.stallID);
      } else {
        console.log("Error fetching stall ID");
      }
    })
    .catch(error => console.log(error));
  }, [strEmployeeID]);

  const updateEmployee = (e) => {
    e.preventDefault();
    Axios
      .put(`http://localhost:3001/employees/update/${strEmployeeID}`, {
        strStallID: stallID,
        strEmployeeName: employeeName,
        strPosition: employeePosition,
      })
      .then(response => {
        console.log(response);
        if (response.data.status === "Success") {
          setUpdateStatus(response.data.message);
          navigate("/employees"); // Navigate to the employees page on success
          alert("Employee updated successfully");
        } else {
          setUpdateStatus("Failed to update employee");
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Employee</h2>
      <form className="row g-3 w-50" onSubmit={updateEmployee}>
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>{updateStatus}</h1>
        <div className="col-12">
          <label className="form-label">Enter Employee Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Employee Name"
            autoComplete="off"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Employee Position</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Employee Position"
            autoComplete="off"
            value={employeePosition}
            onChange={(e) => setEmployeePosition(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-danger">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;