import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditMenuItem() {
  const { strMenuItemID } = useParams();
  const [menuStallID, setMenuStallID] = useState("");
  const [menuItemName, setMenuItemName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuSellingPrice, setMenuSellingPrice] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios.get(`http://localhost:3001/menu/${strMenuItemID}`)
      .then(response => {
        const menuItem = response.data.menuItem;
        setMenuItemName(menuItem.strMenuItemName);
        setMenuDescription(menuItem.strDescription);
        setMenuSellingPrice(menuItem.decSellingPrice);
      })
      .catch(error => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/menu/stalls/${ownerID}`)
      .then(response => {
        if (response.data.status === "Success") {
          setMenuStallID(response.data.stallID);
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch(error => console.log(error));
  }, [strMenuItemID]);

  const updateMenuItem = (e) => {
    e.preventDefault();
    Axios
      .put(`http://localhost:3001/menu/update/${strMenuItemID}`, {
        strStallID: menuStallID,
        strMenuItemName: menuItemName,
        strDescription: menuDescription,
        decSellingPrice: menuSellingPrice
      })
      .then(response => {
        console.log(response);
        if (response.data.status === "Success") {
          setUpdateStatus(response.data.message);
          navigate("/menu"); // Navigate to the menu page on success
          alert("Menu item updated successfully");
        } else {
          setUpdateStatus("Failed to update menu item");
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Menu Item</h2>
      <form className="row g-3 w-50" onSubmit={updateMenuItem}>
        <h1 style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>{updateStatus}</h1>
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
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
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
            value={menuSellingPrice}
            onChange={(e) => setMenuSellingPrice(e.target.value)}
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

export default EditMenuItem;