import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMenuItem() {
  const [menuItemID, setMenuItemID] = useState("");
  const [stallID, setStallID] = useState("");
  const [menuItemName, setMenuItemName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch the next menu item ID
    Axios
      .get("http://localhost:3001/menu/getID/nextItem")
      .then((response) => {
        if (response.data.status === "Success") {
          setMenuItemID(response.data.result);
        } else {
          console.log("Error fetching next menu item ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios
      .get(`http://localhost:3001/menu/stalls/${ownerID}`)
      .then((response) => {
        if (response.data.status === "Success") {
          setStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const createMenuItem = (e) => {
    e.preventDefault();
    Axios
      .post("http://localhost:3001/menu/create", {
        strMenuItemID: menuItemID,
        strStallID: stallID,
        strMenuItemName: menuItemName,
        strDescription: description,
        decSellingPrice: sellingPrice,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setRegisterStatus(response.data.message);
          navigate("/menu"); // Navigate to the menu page on success
          alert("Menu item added successfully");
        } else {
          console.log("Error adding menu item:", response.data.error);
          alert("Failed to add menu item");
        }
      })
      .catch((error) => {
        console.log("Error adding menu item:", error);
        alert("Failed to add menu item");
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Menu Item</h2>
      <form className="row g-3 w-50">
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
          {registerStatus}
        </h1>
        <div className="col-12">
          <label className="form-label">Enter Menu Item Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Menu Item Name"
            autoComplete="off"
            value={menuItemName}
            onChange={(e) => setMenuItemName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Enter Selling Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Selling Price"
            step="10"
            autoComplete="off"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={createMenuItem}>
            Add Menu Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMenuItem;