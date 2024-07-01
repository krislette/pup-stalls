import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { format } from "date-fns";

function SalesAndTransactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios.get(`http://localhost:3001/transactions/${ownerID}`)
      .then(res => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          alert("Error fetching transactions");
        }
      })
      .catch(error => console.log(error));
  }, []);

  const deleteTransaction = (strTransactionID) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      Axios.delete(`http://localhost:3001/transactions/delete/${strTransactionID}`)
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
    <div className="container-fluid">
      <div className="px-5 py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Sales and Transactions</h3>
          <Link to="/add-transaction" className="btn btn-dark">Add Transaction</Link>
        </div>
        <div className="table-responsive" style={{ maxHeight: '580px', overflowY: 'auto' }}>
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">Date of Transaction</th>
                <th scope="col">Items Sold</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction, index) => {
                const formattedDate = format(new Date(transaction.datDateOfTransaction), "yyyy-MM-dd"); // Format the date
                return (
                  <tr key={index}>
                    <td>{transaction.strTransactionID}</td>
                    <td>{formattedDate}</td>
                    <td>{transaction.strItemsSold}</td>
                    <td>{transaction.intQuantity}</td>
                    <td>{transaction.decTotalPrice}</td>
                    <td>{transaction.strPaymentMethod}</td>
                    <td>
                      <Link to={`edit/${transaction.strTransactionID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteTransaction(transaction.strTransactionID)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesAndTransactions;
