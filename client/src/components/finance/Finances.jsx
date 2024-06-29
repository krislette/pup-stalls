import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
          alert("Error");
        }
      })
      .catch(error => console.log(error));
  }, []);

  const deleteFinanceRecord = (strFinanceID) => {
    if (window.confirm("Are you sure you want to delete this finance record?")) {
      Axios.delete(`http://localhost:3001/finances/delete/${strFinanceID}`)
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
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Your Financial Records</h3>
      </div>
      <Link to="/add-finance" className="btn btn-dark">Add Finance Record</Link>
      <div className="mt-3">
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th>Finance ID</th>
              <th>Date of Computation</th>
              <th>Expenses</th>
              <th>Profits</th>
              <th>Revenue</th>
              <th>Expense Category</th>
              <th>Action</th>
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
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => deleteFinanceRecord(record.strFinanceID)}>
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

export default Finances;