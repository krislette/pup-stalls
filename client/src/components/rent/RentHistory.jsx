import { useState, useEffect } from "react";
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
          alert("Failed to fetch rent history");
        }
      } catch (error) {
        console.error("Error fetching rent history:", error);
        alert("Failed to fetch rent history");
      }
    };

    fetchRentHistory();
  }, []);

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Rent History</h3>
      </div>
      <div className="mt-3">
        <table className="table table-hover table-striped">
          <thead>
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
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RentHistory;