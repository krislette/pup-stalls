import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import loginimg from "../../assets/pup-logo.png";
import bgImage from "../../assets/pup-m1.jpg";

function LogIn() {
  const [ownerEmail, setEmail] = useState("");
  const [ownerPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    Axios
      .post("http://localhost:3001/owners/login", {
        strEmailAddress: ownerEmail,
        strPassword: ownerPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          // Store the owner ID and token in local storage
          localStorage.setItem("ownerID", res.data.ownerID);
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "60px 0",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Adjusted opacity for less intense blur
          backdropFilter: "blur(1px)", // Reduced blur effect
        }}
      ></div>
      <div className="container-fluid h-custom" style={{ position: "relative" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={loginimg} alt="Login" className="img-fluid" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div
              className="bg-white rounded p-4"
              style={{
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)", // Adjusted shadow intensity
              }}
            >
              {/* Box around the login heading */}
              <div className="border rounded p-3 mb-4">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <h4 className="text-center">Login to your account</h4>
                </div>
              </div>

              {/* Error message */}
              <h1 style={{ color: "red", fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
                {error && error}
              </h1>

              {/* Box around email and password inputs */}
              <div className="border rounded p-3 mb-4">
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Remember me and Forgot password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" />
                  <label className="form-check-label">Remember me</label>
                </div>
                <a href="#" className="text-danger">
                  Forgot password?
                </a>
              </div>

              {/* Login button and Sign Up link */}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-danger btn-lg" onClick={login}>
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  New user? <a href="signup" className="link-success">Sign up here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
