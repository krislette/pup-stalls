import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditItem() {
  const { strItemID } = useParams();
  const [itemStallID, setItemStallID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemPurchasePrice, setItemPurchasePrice] = useState("");
  const [itemSupplierID, setItemSupplierID] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios.get(`http://localhost:3001/items/${strItemID}`)
      .then(response => {
        const item = response.data.item;
        setItemName(item.strItemName);
        setItemType(item.strItemType);
        setItemPurchasePrice(item.decPurchasePrice);
        setItemSupplierID(item.strSupplierID);
      })
      .catch(error => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/items/stalls/${ownerID}`)
      .then(response => {
        if (response.data.status === "Success") {
          setItemStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch(error => console.log(error));
  }, [strItemID]);

  const updateItem = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:3001/items/update/${strItemID}`, {
      strStallID: itemStallID, // Ensure strStallID is included
      strItemName: itemName,
      strItemType: itemType,
      decPurchasePrice: itemPurchasePrice,
      strSupplierID: itemSupplierID
    }).then(response => {
      console.log(response);
      if (response.data.status === "Success") {
        setUpdateStatus(response.data.message);
        navigate("/items"); // Navigate to the items page on success
        alert("Item updated successfully");
      } else {
        setUpdateStatus("Failed to update item");
      }
    }).catch(error => console.log(error));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Item</h2>
      <form className="row g-3 w-50" onSubmit={updateItem}>
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>{updateStatus}</h1>
        <div className="col-12">
          <label className="form-label">Enter Item Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Item Name"
            autoComplete="off"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Item Type</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Item Type"
            autoComplete="off"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Purchase Price</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Purchase Price"
            autoComplete="off"
            value={itemPurchasePrice}
            onChange={(e) => setItemPurchasePrice(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Supplier ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Supplier ID"
            autoComplete="off"
            value={itemSupplierID}
            onChange={(e) => setItemSupplierID(e.target.value)}
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

export default EditItem;