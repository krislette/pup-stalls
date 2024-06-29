import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSalesTransactions() {
  const [transactionID, setTransactionID] = useState("");
  const [stallID, setStallID] = useState("");
  const [dateOfTransaction, setDateOfTransaction] = useState("");
  const [itemsSold, setItemsSold] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch the next transaction ID
    Axios
      .get("http://localhost:3001/transactions/getID/nextTransaction")
      .then((response) => {
        if (response.data.status === "Success") {
          setTransactionID(response.data.result);
        } else {
          console.log("Error fetching next transaction ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios
      .get(`http://localhost:3001/transactions/stalls/${ownerID}`)
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
    Axios
      .post("http://localhost:3001/transactions/create", {
        strTransactionID: transactionID,
        strStallID: stallID,
        datDateOfTransaction: dateOfTransaction,
        strItemsSold: itemsSold,
        intQuantity: quantity,
        decTotalPrice: totalPrice,
        strPaymentMethod: paymentMethod,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setRegisterStatus(response.data.message);
          navigate("/sales-and-transactions"); // Navigate to the sales and transactions page on success
          alert("Sales and transaction record added successfully");
        } else {
          console.log("Error adding sales and transaction record:", response.data.error);
          alert("Failed to add sales and transaction record");
        }
      })
      .catch((error) => {
        console.log("Error adding sales and transaction record:", error);
        alert("Failed to add sales and transaction record");
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Sales and Transaction</h2>
      <form className="row g-3 w-50">
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
          {registerStatus}
        </h1>
        <div className="col-12">
          <label className="form-label">Enter Date of Transaction</label>
          <input
            type="date"
            className="form-control"
            autoComplete="off"
            onChange={(e) => {
              setDateOfTransaction(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Item Sold Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Item Sold Name"
            autoComplete="off"
            onChange={(e) => {
              setItemsSold(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Quantity"
            autoComplete="off"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Total Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Total Price"
            step="0.01"
            autoComplete="off"
            onChange={(e) => {
              setTotalPrice(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Payment Method</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Payment Method"
            autoComplete="off"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={create}>
            Add Sales and Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSalesTransactions;