import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSupplier() {
  const { strSupplierID } = useParams();
  const [supplierName, setSupplierName] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [supplyType, setSupplyType] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios
      .get(`http://localhost:3001/suppliers/${strSupplierID}`)
      .then((response) => {
        const supplier = response.data.supplier;
        setSupplierName(supplier.strSupplierName);
        setContactInformation(supplier.strContactInformation);
        setSupplyType(supplier.strSupplyType);
      })
      .catch((error) => console.log(error));
  }, [strSupplierID]);

  const updateSupplier = (e) => {
    e.preventDefault();
    Axios
      .put(`http://localhost:3001/suppliers/update/${strSupplierID}`, {
        strSupplierName: supplierName,
        strContactInformation: contactInformation,
        strSupplyType: supplyType,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setUpdateStatus(response.data.message);
          navigate("/suppliers"); // Navigate to the suppliers page on success
          alert("Supplier updated successfully");
        } else {
          setUpdateStatus("Failed to update supplier");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-squircle p-4">
        <h2>Edit Supplier</h2>
        <form onSubmit={updateSupplier}>
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
          <button type="submit" className="btn btn-danger">Update</button>
          {updateStatus && <p className="mt-3">{updateStatus}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditSupplier;
