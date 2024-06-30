import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditFinance() {
  const { strFinanceID } = useParams();
  const [stallID, setStallID] = useState("");
  const [computationDate, setComputationDate] = useState("");
  const [expenses, setExpenses] = useState("");
  const [profits, setProfits] = useState("");
  const [revenue, setRevenue] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch finance details by ID
    Axios
      .get(`http://localhost:3001/finances/${strFinanceID}`)
      .then(response => {
        const finance = response.data.finance;
        setStallID(finance.strStallID);
        setComputationDate(finance.datComputationDate);
        setExpenses(finance.decExpenses);
        setProfits(finance.decProfits);
        setRevenue(finance.decRevenue);
        setExpenseCategory(finance.strExpenseCategory);
      })
      .catch(error => console.log(error));

    // Fetch stall ID based on owner ID
    Axios
      .get(`http://localhost:3001/finances/stalls/${ownerID}`)
      .then(response => {
        if (response.data.status === "Success") {
          setStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch(error => console.log(error));
  }, [strFinanceID]);

  const updateFinance = (e) => {
    e.preventDefault();
    Axios
      .put(`http://localhost:3001/finances/update/${strFinanceID}`, {
        strStallID: stallID,
        datComputationDate: computationDate,
        decExpenses: expenses,
        decProfits: profits,
        decRevenue: revenue,
        strExpenseCategory: expenseCategory
      })
      .then(response => {
        console.log(response);
        if (response.data.status === "Success") {
          setUpdateStatus(response.data.message);
          navigate("/finances"); // Navigate to the finances page on success
          alert("Finance record updated successfully");
        } else {
          setUpdateStatus("Failed to update finance record");
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Finance Record</h2>
      <form className="row g-3 w-50" onSubmit={updateFinance}>
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>{updateStatus}</h1>
        <div className="col-12">
          <label className="form-label">Computation Date</label>
          <input
            type="date"
            className="form-control"
            value={computationDate}
            onChange={(e) => setComputationDate(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Expenses</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Expenses"
            step="1000"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Profits</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Profits"
            step="1000"
            value={profits}
            onChange={(e) => setProfits(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Revenue</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Revenue"
            step="1000"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Expense Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Expense Category"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
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

export default EditFinance;