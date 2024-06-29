import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
      Axios.delete(`http://localhost:3001/employees/delete/${strEmployeeID}`)
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
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Your Employee List</h3>
      </div>
      <Link to="/add-employee" className="btn btn-dark">Add Employee</Link>
      <div className="mt-3">
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.strEmployeeID}</td>
                  <td>{employee.strEmployeeName}</td>
                  <td>{employee.strPosition}</td>
                  <td>
                    <Link to={`edit/${employee.strEmployeeID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => deleteEmployee(employee.strEmployeeID)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>        
      </div>
    </div>
  )
}

export default Employees;