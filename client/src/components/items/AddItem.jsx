import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [itemID, setItemID] = useState("");
  const [stallID, setStallID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemPurchasePrice, setItemPurchasePrice] = useState("");
  const [itemSupplierID, setItemSupplierID] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch the next item ID
    Axios
      .get("http://localhost:3001/items/getID/nextItem")
      .then((response) => {
        if (response.data.status === "Success") {
          setItemID(response.data.result);
        } else {
          console.log("Error fetching next item ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios
      .get(`http://localhost:3001/items/stalls/${ownerID}`)
      .then((response) => {
        if (response.data.status === "Success") {
          setStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const create = (e) => {
    e.preventDefault();
    Axios
      .post("http://localhost:3001/items/create", {
        strItemID: itemID,
        strStallID: stallID,
        strItemName: itemName,
        strItemType: itemType,
        decPurchasePrice: itemPurchasePrice,
        strSupplierID: itemSupplierID,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setRegisterStatus(response.data.message);
          navigate("/items"); // Navigate to the items page on success
          alert("Item added successfully");
        } else {
          console.log("Error adding item:", response.data.error);
          alert("Failed to add item");
        }
      })
      .catch((error) => {
        console.log("Error adding item:", error);
        alert("Failed to add item");
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Item</h2>
      <form className="row g-3 w-50">
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
          {registerStatus}
        </h1>
        <div className="col-12">
          <label className="form-label">Enter Item Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Item Name"
            autoComplete="off"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Item Type</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Item Type"
            autoComplete="off"
            onChange={(e) => {
              setItemType(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Purchase Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Purchase Price"
            step="10"
            autoComplete="off"
            onChange={(e) => {
              setItemPurchasePrice(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Supplier ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Supplier ID"
            autoComplete="off"
            onChange={(e) => {
              setItemSupplierID(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={create}>
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;