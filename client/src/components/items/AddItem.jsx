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
    Axios.get("http://localhost:3001/items/getID/nextItem")
      .then((response) => {
        if (response.data.status === "Success") {
          setItemID(response.data.result);
        } else {
          console.log("Error fetching next item ID");
        }
      })
      .catch((error) => console.log(error));

    // Fetch the stall ID based on owner ID
    Axios.get(`http://localhost:3001/items/stalls/${ownerID}`)
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
    Axios.post("http://localhost:3001/items/create", {
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
    <div className="container mt-4">
      <div className="card shadow">
        <h2 className="card-header">Add Item</h2>
        <div className="card-body">
          <form onSubmit={create}>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Item ID</th>
                  <td>{itemID}</td>
                </tr>
                <tr>
                  <th>Stall ID</th>
                  <td>{stallID}</td>
                </tr>
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
