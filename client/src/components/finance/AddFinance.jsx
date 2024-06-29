import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFinance() {
  const [financeID, setFinanceID] = useState("");
  const [stallID, setStallID] = useState("");
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
          setFinanceID(response.data.result);
        } else {
          console.log("Error fetching next finance ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/finances/stalls/${ownerID}`)
      .then((response) => {
        if (response.data.status === "Success") {
          setStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const createFinance = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/finances/create", {
      strFinanceID: financeID,
      strStallID: stallID,
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
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Finance Record</h2>
      <form className="row g-3 w-50">
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
          {registerStatus}
        </h1>
        <div className="col-12">
          <label className="form-label">Enter Computation Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setComputationDate(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Expenses</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Expenses"
            step="1000"
            autoComplete="off"
            onChange={(e) => setExpenses(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Profits</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Profits"
            step="1000"
            autoComplete="off"
            onChange={(e) => setProfits(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Revenue</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Revenue"
            step="100"
            autoComplete="off"
            onChange={(e) => setRevenue(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Expense Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Expense Category"
            autoComplete="off"
            onChange={(e) => setExpenseCategory(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={createFinance}>
            Add Finance Record
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFinance;