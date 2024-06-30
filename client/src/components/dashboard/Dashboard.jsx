import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  BiCategory, BiNetworkChart, BiCart, BiBookOpen, BiBarChartAlt2,
  BiData, BiGroup, BiHourglass, BiUser // Import the BiUser icon
} from "react-icons/bi";
import PUP11 from "../../assets/PUP11.png"; // Updated logo image

function Dashboard() {
  const navigate = useNavigate();

  const signOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      localStorage.removeItem("Token");
      navigate("/login");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{
          backgroundColor: '#2e2e2e', // Dark gray background
          borderRadius: '10px', // Rounded corners
          boxShadow: '0 8px 16px rgba(0,0,0,0.4)', // Shadow effect
          padding: '1rem', // Padding for visual appeal
          margin: '0.5rem', // Margin to ensure it doesn't touch screen edges
          flexShrink: 0 // Prevent the panel from shrinking when zooming
        }}>
          <div className="d-flex flex-column align-items-start px-3 pt-2 text-white min-vh-100">
            <Link to="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <img src={PUP11} alt="Logo" className="img-fluid me-3" style={{ height: "4rem" }} /> {/* Larger logo size */}
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Stall Dashboard {/* Renamed from PUPStols */}
              </span>
            </Link>
            <div className="mb-3 text-white fw-bold small">Main Menu</div>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
              {/* Menu items with hover effect */}
              {[
                { to: "/", icon: <BiCategory />, label: "Dashboard" },
                { to: "/suppliers", icon: <BiNetworkChart />, label: "Suppliers" },
                { to: "/items", icon: <BiCart />, label: "Items" },
                { to: "/menu", icon: <BiBookOpen />, label: "Menu Items" },
                { to: "/sales-and-transactions", icon: <BiBarChartAlt2 />, label: "Sales and Transactions" },
                { to: "/finances", icon: <BiData />, label: "Finance" },
                { to: "/employees", icon: <BiGroup />, label: "Employees" },
                { to: "/rents", icon: <BiHourglass />, label: "Rent History" },
                { to: "/profile", icon: <BiUser />, label: "Profile" }, // Added Profile menu item
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.5rem', width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Link to={item.to} className="nav-link text-white px-0 align-middle d-flex align-items-center" style={{ padding: '0.5rem 1rem', width: '100%', paddingLeft: '2rem' }}>
                    {item.icon}
                    <span className="ms-1 d-none d-sm-inline">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto d-flex justify-content-center w-100">
              <button type="button" className="btn btn-outline-light rounded-pill mb-3" style={{ width: '100%' }} onClick={signOut}>Sign Out</button>
            </div>
          </div>
        </div>
        <div className="col py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
