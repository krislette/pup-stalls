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
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Supplier</h2>
      <form className="row g-3 w-50" onSubmit={updateSupplier}>
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
          {updateStatus}
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSupplier;