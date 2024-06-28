import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
          alert("Error");
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Item List</h3>
      </div>
      <Link to="/add-item" className="btn btn-dark">Add Item</Link>
      <div className="mt-3">
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Type</th>
              <th>Purchase Price</th>
              <th>Supplier ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.strItemID}</td>
                  <td>{item.strItemName}</td>
                  <td>{item.strItemType}</td>
                  <td>{item.decPurchasePrice}</td>
                  <td>{item.strSupplierID}</td>
                  <td>
                    <Link to={`edit/${item.strItemID}`} className="btn btn-success btn-sm me-2">Edit</Link>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>        
      </div>
    </div>
  )
}

export default Items;