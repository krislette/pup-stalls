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
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Supplier</h2>
      <form className="row g-3 w-50" onSubmit={createSupplier}>
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
          {registerStatus}
        </h1>
        <div className="col-12">
          <label className="form-label">Enter Supplier Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Supplier Name"
            autoComplete="off"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Contact Information</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Contact Information"
            autoComplete="off"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Supply Type</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Supply Type"
            autoComplete="off"
            value={supplyType}
            onChange={(e) => setSupplyType(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={createSupplier}>
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSupplier;