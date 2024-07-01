import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Menu() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    Axios
      .get(`http://localhost:3001/menu/${ownerID}`)
      .then(res => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          alert("Error fetching menu items");
        }
      })
      .catch(error => console.log(error));
  }, []);

  const deleteMenuItem = (strMenuItemID) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      Axios
        .delete(`http://localhost:3001/menu/delete/${strMenuItemID}`)
        .then(res => {
          if (res.data.status === "Success") {
            // Update the state to remove the deleted menu item
            setData(data.filter(item => item.strMenuItemID !== strMenuItemID));
            alert("Menu item deleted successfully");
          } else {
            alert("Failed to delete menu item");
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="container-fluid">
      <div className="px-5 py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Menu</h3>
          <Link to="/add-menu-item" className="btn btn-dark">Add Menu Item</Link>
        </div>
        <div className="table-responsive" style={{ maxHeight: '580px', overflowY: 'auto' }}>
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Menu Item ID</th>
                <th scope="col">Menu Item Name</th>
                <th scope="col">Description</th>
                <th scope="col">Selling Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.strMenuItemID}</td>
                  <td>{item.strMenuItemName}</td>
                  <td>{item.strDescription}</td>
                  <td>{item.decSellingPrice}</td>
                  <td>
                    <Link to={`edit/${item.strMenuItemID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteMenuItem(item.strMenuItemID)}>Delete</button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No menu items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Menu;
