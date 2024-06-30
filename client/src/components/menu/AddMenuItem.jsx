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
        decSellingPrice: sellingPrice
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
    <div className="container mt-4">
      <div className="card shadow">
        <h2 className="card-header">Add Menu Item</h2>
        <div className="card-body">
          <form onSubmit={createMenuItem}>
            <table className="table table-bordered">
              <tbody>
                {/* Menu Item Name */}
                <tr>
                  <th>Menu Item Name</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Menu Item Name"
                      autoComplete="off"
                      value={menuItemName}
                      onChange={(e) => setMenuItemName(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Description */}
                <tr>
                  <th>Description</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Description"
                      autoComplete="off"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Selling Price */}
                <tr>
                  <th>Selling Price</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Selling Price"
                      step="10"
                      autoComplete="off"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="btn btn-danger">
              Add Menu Item
            </button>
            {registerStatus && <p className="mt-3">{registerStatus}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMenuItem;
