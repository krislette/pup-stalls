import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Employees() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios
      .get(`http://localhost:3001/employees/${ownerID}`)
      .then(res => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          alert("Error");
        }
      })
      .catch(error => console.log(error));
  }, []);

  const deleteEmployee = (strEmployeeID) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      Axios
        .delete(`http://localhost:3001/employees/delete/${strEmployeeID}`)
        .then(res => {
          if (res.data.status === "Success") {
            // Update the state to remove the deleted employee
            setData(data.filter(employee => employee.strEmployeeID !== strEmployeeID));
            alert("Employee deleted successfully");
          } else {
            alert("Failed to delete employee");
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="container-fluid">
      <div className="px-5 py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Employee List</h3>
          <Link to="/add-employee" className="btn btn-dark">Add Employee</Link>
        </div>
        <div className="table-responsive" style={{ maxHeight: '580px', overflowY: 'auto' }}>
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Position</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.strEmployeeID}</td>
                  <td>{employee.strEmployeeName}</td>
                  <td>{employee.strPosition}</td>
                  <td>
                    <Link to={`edit/${employee.strEmployeeID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(employee.strEmployeeID)}>Delete</button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;
