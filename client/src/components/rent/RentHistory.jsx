import React, { useState, useEffect } from "react";
import Axios from "axios";
import { format } from "date-fns";

function RentHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    const fetchRentHistory = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/history/${ownerID}`);

        if (response.data.status === "Success") {
          setData(response.data.result);
        } else {
          alert("Failed to fetch rent history from server");
        }
      } catch (error) {
        console.error("Error fetching rent history:", error);
        alert("Failed to fetch rent history");
      }
    };

    fetchRentHistory();
  }, []);

  return (
    <div className="container-fluid">
      <div className="px-5 py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Rent History</h3>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Rent History ID</th>
                <th>Rent ID</th>
                <th>Rent Due Date</th>
                <th>Payment Date</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {data.map((history, index) => {
                const formattedDueDate = format(new Date(history.datRentDue), "yyyy-MM-dd");
                const formattedPaymentDate = history.datPaymentDate ? format(new Date(history.datPaymentDate), "yyyy-MM-dd") : "-";
                return (
                  <tr key={index}>
                    <td>{history.strRentHistoryID}</td>
                    <td>{history.strRentID}</td>
                    <td>{formattedDueDate}</td>
                    <td>{formattedPaymentDate}</td>
                    <td>{history.strPaymentStatus || "-"}</td>
                    <td>{history.strPaymentMethod || "-"}</td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No rent history found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RentHistory;
