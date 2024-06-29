import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function Suppliers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios
      .get("http://localhost:3001/suppliers")
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
        <h3>PUP-Accredited Supplier List</h3>
      </div>
      <Link to="/add-supplier" className="btn btn-dark">Add Supplier</Link>
      <div className="mt-3">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>Contact Information</th>
              <th>Supply Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((supplier, index) => {
              return (
                <tr key={index}>
                  <td>{supplier.strSupplierID}</td>
                  <td>{supplier.strSupplierName}</td>
                  <td>{supplier.strContactInformation}</td>
                  <td>{supplier.strSupplyType}</td>
                  <td>
                    <Link to={`edit/${supplier.strSupplierID}`} className="btn btn-success btn-sm me-2">Edit</Link>
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

export default Suppliers;