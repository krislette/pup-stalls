import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { format } from "date-fns";

function Finances() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");
    
    Axios
      .get(`http://localhost:3001/finances/${ownerID}`)
      .then(res => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          alert("Error fetching finance records");
        }
      })
      .catch(error => console.log(error));
  }, []);

  const deleteFinanceRecord = (strFinanceID) => {
    if (window.confirm("Are you sure you want to delete this finance record?")) {
      Axios
        .delete(`http://localhost:3001/finances/delete/${strFinanceID}`)
        .then(res => {
          if (res.data.status === "Success") {
            // Update the state to remove the deleted record
            setData(data.filter(record => record.strFinanceID !== strFinanceID));
            alert("Finance record deleted successfully");
          } else {
            alert("Failed to delete finance record");
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="container-fluid">
      <div className="px-5 py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Financial Records</h3>
          <Link to="/add-finance" className="btn btn-dark">Add Finance Record</Link>
        </div>
        <div className="table-responsive" style={{ maxHeight: '580px', overflowY: 'auto' }}>
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Finance ID</th>
                <th scope="col">Date of Computation</th>
                <th scope="col">Expenses</th>
                <th scope="col">Profits</th>
                <th scope="col">Revenue</th>
                <th scope="col">Expense Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => {
                const formattedDate = format(new Date(record.datComputationDate), "yyyy-MM-dd"); // Format the date
                return (
                  <tr key={index}>
                    <td>{record.strFinanceID}</td>
                    <td>{formattedDate}</td>
                    <td>{record.decExpenses}</td>
                    <td>{record.decProfits}</td>
                    <td>{record.decRevenue}</td>
                    <td>{record.strExpenseCategory}</td>
                    <td>
                      <Link to={`edit/${record.strFinanceID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteFinanceRecord(record.strFinanceID)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No finance records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Finances;
