import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSupplier() {
  const [supplierName, setSupplierName] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [supplyType, setSupplyType] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  const createSupplier = (e) => {
    e.preventDefault(); // Prevents default form submission

    Axios.post("http://localhost:3001/suppliers/create", {
      strSupplierName: supplierName,
      strContactInformation: contactInformation,
      strSupplyType: supplyType,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setRegisterStatus(response.data.message);
          navigate("/suppliers"); // Navigate to the suppliers page on success
          alert("Supplier added successfully");
        } else {
          console.log("Error adding supplier:", response.data.error);
          alert("Failed to add supplier");
        }
      })
      .catch((error) => {
        console.log("Error adding supplier:", error);
        alert("Failed to add supplier");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-squircle p-4">
        <h2>Add Supplier</h2>
        <form onSubmit={createSupplier}>
          <div className="mb-3">
            <label htmlFor="supplierName" className="form-label">Supplier Name</label>
            <input
              type="text"
              className="form-control"
              id="supplierName"
              placeholder="Enter Supplier Name"
              autoComplete="off"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactInfo" className="form-label">Contact Information</label>
            <input
              type="text"
              className="form-control"
              id="contactInfo"
              placeholder="Enter Contact Information"
              autoComplete="off"
              value={contactInformation}
              onChange={(e) => setContactInformation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="supplyType" className="form-label">Supply Type</label>
            <input
              type="text"
              className="form-control"
              id="supplyType"
              placeholder="Enter Supply Type"
              autoComplete="off"
              value={supplyType}
              onChange={(e) => setSupplyType(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-danger">Add Supplier</button>
          {registerStatus && <p className="mt-3">{registerStatus}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddSupplier;
