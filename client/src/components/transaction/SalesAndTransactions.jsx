import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { format } from "date-fns";

function SalesAndTransactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios
      .get(`http://localhost:3001/transactions/${ownerID}`)
      .then(res => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          alert("Error");
        }
      })
      .catch(error => console.log(error));
  }, []);

  const deleteTransaction = (strTransactionID) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      Axios.delete(`http://localhost:3001/sales/delete/${strTransactionID}`)
        .then(res => {
          if (res.data.status === "Success") {
            // Update the state to remove the deleted transaction
            setData(data.filter(transaction => transaction.strTransactionID !== strTransactionID));
            alert("Transaction deleted successfully");
          } else {
            alert("Failed to delete transaction");
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Your Sales and Transactions</h3>
      </div>
      <Link to="/add-transaction" className="btn btn-dark">Add Transaction</Link>
      <div className="mt-3">
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Stall ID</th>
              <th>Date of Transaction</th>
              <th>Items Sold</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => {
              const formattedDate = format(new Date(transaction.datDateOfTransaction), "yyyy-MM-dd"); // Format the date
              return (
                <tr key={index}>
                  <td>{transaction.strTransactionID}</td>
                  <td>{transaction.strStallID}</td>
                  <td>{formattedDate}</td>
                  <td>{transaction.strItemsSold}</td>
                  <td>{transaction.intQuantity}</td>
                  <td>{transaction.decTotalPrice}</td>
                  <td>{transaction.strPaymentMethod}</td>
                  <td>
                    <Link to={`edit/${transaction.strTransactionID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => deleteTransaction(transaction.strTransactionID)}>
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

export default SalesAndTransactions;