import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
      Axios.delete(`http://localhost:3001/menu/delete/${strMenuItemID}`)
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
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Your Menu</h3>
      </div>
      <Link to="/add-menu-item" className="btn btn-dark">Add Menu Item</Link>
      <div className="mt-3">
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th>Menu Item ID</th>
              <th>Menu Item Name</th>
              <th>Description</th>
              <th>Selling Price</th>
              <th>Action</th>
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
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteMenuItem(item.strMenuItemID)}
                    >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Menu;