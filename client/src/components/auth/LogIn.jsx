import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import loginimg from "../../assets/signup.png";

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
          navigate('/');
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={loginimg} alt="Login" className="img-fluid" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Login to your account</p>
              </div>
              <h1 style={{ color: "red", fontSize: "15px", textAlign: "center", marginTop: "20px" }}>
                {error && error}
              </h1>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="form-label">Email address</label>
              </div>
              <div className="form-outline mb3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="form-label">Password</label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" />
                  <label className="form-check-label">Remember me</label>
                </div>
                <a href="#" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg" onClick={login}>
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  New user? <a href="signup" className="link-danger">Sign Up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;