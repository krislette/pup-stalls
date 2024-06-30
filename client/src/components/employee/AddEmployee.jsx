import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [employeeID, setEmployeeID] = useState("");
  const [stallID, setStallID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch the next employee ID
    Axios.get("http://localhost:3001/employees/getID/nextEmployee")
      .then((response) => {
        if (response.data.status === "Success") {
          setEmployeeID(response.data.result);
        } else {
          console.log("Error fetching next employee ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/items/stalls/${ownerID}`)
      .then((response) => {
        if (response.data.status === "Success") {
          setStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const create = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/employees/create", {
      strStallID: stallID,
      strEmployeeID: employeeID,
      strEmployeeName: employeeName,
      strPosition: employeePosition,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setRegisterStatus(response.data.message);
          navigate("/employees"); // Navigate to the employees page on success
          alert("Employee added successfully");
        } else {
          console.log("Error adding employee:", response.data.error);
          alert("Failed to add employee");
        }
      })
      .catch((error) => {
        console.log("Error adding employee:", error);
        alert("Failed to add employee");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add Employee</h2>
          <form className="row g-3">
            <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px", width: "100%" }}>
              {registerStatus}
            </h1>
            <div className="col-12">
              <label className="form-label">Enter Employee Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Employee Name"
                autoComplete="off"
                onChange={(e) => {
                  setEmployeeName(e.target.value);
                }}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Enter Employee Position</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Employee Position"
                autoComplete="off"
                onChange={(e) => {
                  setEmployeePosition(e.target.value);
                }}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-danger" onClick={create}>
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
