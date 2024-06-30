import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemPurchasePrice, setItemPurchasePrice] = useState("");
  const [itemSupplierID, setItemSupplierID] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Fetch the next item ID
    Axios.get("http://localhost:3001/items/getID/nextItem")
      .then((response) => {
        if (response.data.status === "Success") {
          // No need to store itemID in state, directly use in the form
        } else {
          console.log("Error fetching next item ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/items/stalls/${ownerID}`)
      .then((response) => {
        if (response.data.status === "Success") {
          // No need to store stallID in state, directly use in the form
        } else {
          console.log("Error fetching stall ID");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const create = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/items/create", {
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
    <div className="container mt-4">
      <div className="card shadow">
        <h2 className="card-header">Add Item</h2>
        <div className="card-body">
          <form onSubmit={create}>
            <table className="table table-bordered">
              <tbody>
                {/* Item Name */}
                <tr>
                  <th>Item Name</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Item Name"
                      autoComplete="off"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Item Type */}
                <tr>
                  <th>Item Type</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Item Type"
                      autoComplete="off"
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Purchase Price */}
                <tr>
                  <th>Purchase Price</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Purchase Price"
                      step="10"
                      autoComplete="off"
                      value={itemPurchasePrice}
                      onChange={(e) => setItemPurchasePrice(e.target.value)}
                    />
                  </td>
                </tr>

                {/* Supplier ID */}
                <tr>
                  <th>Supplier ID</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Supplier ID"
                      autoComplete="off"
                      value={itemSupplierID}
                      onChange={(e) => setItemSupplierID(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="btn btn-danger">Add Item</button>
            {registerStatus && <p className="mt-3">{registerStatus}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
