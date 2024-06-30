import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFinance() {
  const [computationDate, setComputationDate] = useState("");
  const [expenses, setExpenses] = useState("");
  const [profits, setProfits] = useState("");
  const [revenue, setRevenue] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch the next finance ID
    Axios.get("http://localhost:3001/finances/getID/nextFinance")
      .then((response) => {
        if (response.data.status === "Success") {
          // No need to store financeID in state, directly use in the form
        } else {
          console.log("Error fetching next finance ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/finances/stalls/${ownerID}`)
      .then((response) => {
        if (response.data.status === "Success") {
          // No need to store stallID in state, directly use in the form
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const createFinance = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/finances/create", {
      // strFinanceID: financeID, // Removed from payload
      // strStallID: stallID, // Removed from payload
      datComputationDate: computationDate,
      decExpenses: expenses,
      decProfits: profits,
      decRevenue: revenue,
      strExpenseCategory: expenseCategory,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setRegisterStatus(response.data.message);
          navigate("/finances"); // Navigate to the finances page on success
          alert("Finance record added successfully");
        } else {
          console.log("Error adding finance record:", response.data.error);
          alert("Failed to add finance record");
        }
      })
      .catch((error) => {
        console.log("Error adding finance record:", error);
        alert("Failed to add finance record");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <h2 className="card-header">Add Finance Record</h2>
        <div className="card-body">
          <form onSubmit={createFinance}>
            <table className="table table-bordered">
              <tbody>
                {/* Computation Date */}
                <tr>
                  <th>Computation Date</th>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setComputationDate(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Expenses */}
                <tr>
                  <th>Expenses</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Expenses"
                      step="1000"
                      autoComplete="off"
                      onChange={(e) => setExpenses(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Profits */}
                <tr>
                  <th>Profits</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Profits"
                      step="1000"
                      autoComplete="off"
                      onChange={(e) => setProfits(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Revenue */}
                <tr>
                  <th>Revenue</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Revenue"
                      step="100"
                      autoComplete="off"
                      onChange={(e) => setRevenue(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Expense Category */}
                <tr>
                  <th>Expense Category</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Expense Category"
                      autoComplete="off"
                      onChange={(e) => setExpenseCategory(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="btn btn-danger">
              Add Finance Record
            </button>
            {registerStatus && <p className="mt-3">{registerStatus}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFinance;
