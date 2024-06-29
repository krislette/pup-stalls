import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ backgroundColor: "#550000" }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                PUPStols
              </span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link to="/" className="nav-link text-white px-0 align-middle">
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/suppliers"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-1 d-none d-sm-inline">Suppliers</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/items"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-1 d-none d-sm-inline">Items</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="nav-link px-0 align-middle text-white">
                  <span className="ms-1 d-none d-sm-inline">Menu</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/sales-and-transactions"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-1 d-none d-sm-inline">
                    Sales and Transaction
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/finance"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-1 d-none d-sm-inline">Finance</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/employees"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-1 d-none d-sm-inline">Employees</span>
                </Link>
              </li>
              <li>
                <Link to="/rent" className="nav-link px-0 align-middle text-white">
                  <span className="ms-1 d-none d-sm-inline">Rent</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-1 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Stall Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;