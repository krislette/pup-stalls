import React, { useEffect, useState } from "react";
import Axios from "axios";

function Home() {
  const [itemName, setItemName] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [welcomeMessage, setWelcomeMessage] = useState("Loading...");

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch item count
    Axios
      .get(`http://localhost:3001/items/count/${ownerID}`)
      .then((res) => {
        const count = res.data.count || 0; // Use 0 if count is undefined or null
        setItemName(count);
      })
      .catch((error) => console.log(error));

    // Fetch supplier count
    Axios
      .get("http://localhost:3001/suppliers/total/all")
      .then((res) => {
        const count = res.data.count || 0; // Use 0 if count is undefined or null
        setSupplierCount(count);
      })
      .catch((error) => console.log(error));

    // Fetch menu count
    Axios
      .get(`http://localhost:3001/menu/count/${ownerID}`)
      .then((res) => {
        const count = res.data.count || 0; // Use 0 if count is undefined or null
        setMenuCount(count);
      })
      .catch((error) => console.log(error));

    // Fetch employee count
    Axios
      .get(`http://localhost:3001/employees/count/${ownerID}`)
      .then((res) => {
        const count = res.data.count || 0; // Use 0 if count is undefined or null
        setEmployeeCount(count);
      })
      .catch((error) => console.log(error));

    // Fetch owner's name
    Axios
      .get(`http://localhost:3001/owners/${ownerID}`)
      .then((res) => {
        const ownerName = res.data.owner.strOwnerName || "Owner";
        setWelcomeMessage(`Welcome back, ${ownerName}!`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-center">
        <h3 style={{textAlign: "left"}}>{welcomeMessage}</h3>
      </div>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Suppliers</h5>
              <p className="card-text">{supplierCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Items</h5>
              <p className="card-text">{itemName}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Menu Items</h5>
              <p className="card-text">{menuCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Employees</h5>
              <p className="card-text">{employeeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;