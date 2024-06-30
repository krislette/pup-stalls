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
    Axios.get("http://localhost:3001/transactions/getID/nextTransaction")
      .then((response) => {
        if (response.data.status === "Success") {
          setTransactionID(response.data.result);
        } else {
          console.log("Error fetching next transaction ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/transactions/stalls/${ownerID}`)
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
    Axios.post("http://localhost:3001/transactions/create", {
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
    <div className="container mt-4">
      <div className="card shadow">
        <h2 className="card-header">Add Sales and Transaction</h2>
        <div className="card-body">
          <form onSubmit={create}>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Transaction ID</th>
                  <td>{transactionID}</td>
                </tr>
                <tr>
                  <th>Stall ID</th>
                  <td>{stallID}</td>
                </tr>
                <tr>
                  <th>Date of Transaction</th>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      autoComplete="off"
                      onChange={(e) => setDateOfTransaction(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Items Sold</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Item Sold Name"
                      autoComplete="off"
                      onChange={(e) => setItemsSold(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Quantity</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Quantity"
                      autoComplete="off"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Total Price</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Total Price"
                      step="0.01"
                      autoComplete="off"
                      onChange={(e) => setTotalPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Payment Method</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Payment Method"
                      autoComplete="off"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="btn btn-danger">
              Add Sales and Transaction
            </button>
            {registerStatus && <p className="mt-3">{registerStatus}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSalesTransactions;
