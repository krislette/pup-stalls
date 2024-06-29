import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSalesAndTransactions() {
  const { strTransactionID } = useParams();
  const [stallID, setStallID] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [itemsSold, setItemsSold] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios
      .get(`http://localhost:3001/transactions/${strTransactionID}`)
      .then(response => {
        const transaction = response.data.transaction;
        setStallID(transaction.strStallID);
        setTransactionDate(transaction.datDateOfTransaction);
        setItemsSold(transaction.strItemsSold);
        setQuantity(transaction.intQuantity);
        setTotalPrice(transaction.decTotalPrice);
        setPaymentMethod(transaction.strPaymentMethod);
      })
      .catch(error => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios
      .get(`http://localhost:3001/transactions/stalls/${ownerID}`)
      .then(response => {
        if (response.data.status === "Success") {
          setStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch(error => console.log(error));
  }, [strTransactionID]);

  const updateTransaction = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:3001/transactions/update/${strTransactionID}`, {
      strStallID: stallID,
      datDateOfTransaction: transactionDate,
      strItemsSold: itemsSold,
      intQuantity: quantity,
      decTotalPrice: totalPrice,
      strPaymentMethod: paymentMethod
    })
    .then(response => {
      console.log(response);
      if (response.data.status === "Success") {
        setUpdateStatus(response.data.message);
        navigate("/sales-and-transactions"); // Navigate to the sales and transactions page on success
        alert("Transaction updated successfully");
      } else {
        setUpdateStatus("Failed to update transaction");
      }
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Sales and Transaction</h2>
      <form className="row g-3 w-50" onSubmit={updateTransaction}>
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>{updateStatus}</h1>
        <div className="col-12">
          <label className="form-label">Transaction Date</label>
          <input
            type="date"
            className="form-control"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Item Sold Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Item Sold Name"
            value={itemsSold}
            onChange={(e) => setItemsSold(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Total Price</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Total Price"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Payment Method</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSalesAndTransactions;