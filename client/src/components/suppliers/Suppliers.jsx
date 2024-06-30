import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Suppliers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/suppliers")
      .then(res => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          alert("Error fetching suppliers");
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container-fluid">
      <div className="px-5 py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>PUP-Accredited Supplier List</h3>
          <Link to="/add-supplier" className="btn btn-dark">Add Supplier</Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Supplier ID</th>
                <th scope="col">Supplier Name</th>
                <th scope="col">Contact Information</th>
                <th scope="col">Supply Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.strSupplierID}</td>
                  <td>{supplier.strSupplierName}</td>
                  <td>{supplier.strContactInformation}</td>
                  <td>{supplier.strSupplyType}</td>
                  <td>
                    <Link to={`edit/${supplier.strSupplierID}`} className="btn btn-danger btn-sm me-2">Edit</Link>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No suppliers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
