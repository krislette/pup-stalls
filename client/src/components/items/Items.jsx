import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Items() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios
      .get(`http://localhost:3001/items/${ownerID}`)
      .then(res => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          alert("Error fetching items");
        }
      })
      .catch(error => console.log(error));
  }, []);

  const deleteItem = (strItemID) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      Axios
        .delete(`http://localhost:3001/items/delete/${strItemID}`)
        .then(res => {
          if (res.data.status === "Success") {
            // Update the state to remove the deleted item
            setData(data.filter(item => item.strItemID !== strItemID));
            alert("Item deleted successfully");
          } else {
            alert("Failed to delete item");
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="container-fluid">
      <div className="px-5 py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Item List</h3>
          <Link to="/add-item" className="btn btn-dark">Add Item</Link>
        </div>
        <div className="table-responsive" style={{ maxHeight: '580px', overflowY: 'auto' }}>
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Item ID</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Type</th>
                <th scope="col">Purchase Price</th>
                <th scope="col">Supplier ID</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.strItemID}</td>
                  <td>{item.strItemName}</td>
                  <td>{item.strItemType}</td>
                  <td>{item.decPurchasePrice}</td>
                  <td>{item.strSupplierID}</td>
                  <td>
                    <Link to={`edit/${item.strItemID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.strItemID)}>Delete</button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Items;
