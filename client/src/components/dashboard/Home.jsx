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

    const fetchItemCount = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/items/count/${ownerID}`);
        const count = response.data.count || 0;
        setItemName(count);
      } catch (error) {
        console.error("Error fetching item count:", error);
      }
    };

    const fetchSupplierCount = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/suppliers/total/all");
        const count = response.data.count || 0;
        setSupplierCount(count);
      } catch (error) {
        console.error("Error fetching supplier count:", error);
      }
    };

    const fetchMenuCount = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/menu/count/${ownerID}`);
        const count = response.data.count || 0;
        setMenuCount(count);
      } catch (error) {
        console.error("Error fetching menu count:", error);
      }
    };

    const fetchEmployeeCount = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/employees/count/${ownerID}`);
        const count = response.data.count || 0;
        setEmployeeCount(count);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    const fetchOwnerName = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/owners/${ownerID}`);
        const ownerName = response.data.owner.strOwnerName || "Owner";
        setWelcomeMessage(`Welcome back, ${ownerName}!`);
      } catch (error) {
        console.error("Error fetching owner name:", error);
      }
    };

    fetchItemCount();
    fetchSupplierCount();
    fetchMenuCount();
    fetchEmployeeCount();
    fetchOwnerName();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">{welcomeMessage}</h3>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Suppliers</h5>
              <p className="card-text">{supplierCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Items</h5>
              <p className="card-text">{itemName}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Menu Items</h5>
              <p className="card-text">{menuCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
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
