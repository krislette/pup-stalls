import React, { useState } from "react";
import Axios from "axios";
import bgImage from "../../assets/pup-lagoon.jpg";

function SignUp() {
  const [ownerID, setOwnerID] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerLandline, setOwnerLandline] = useState("");
  const [ownerMobile, setOwnerMobile] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerBirth, setOwnerBirth] = useState("");
  const [ownerGender, setOwnerGender] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [stallName, setStallName] = useState("");
  const [stallType, setStallType] = useState("");
  const [leaseStart, setLeaseStart] = useState("");
  const [leaseEnd, setLeaseEnd] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/owners/register", {
        strOwnerID: ownerID,
        strOwnerName: ownerName,
        strLandlineNumber: ownerLandline,
        strMobileNumber: ownerMobile,
        strEmailAddress: ownerEmail,
        datBirth: ownerBirth,
        strGender: ownerGender,
        strPassword: ownerPassword,
        strStallName: stallName,
        strStallType: stallType,
        datLeaseStart: leaseStart,
        datLeaseEnd: leaseEnd,
      });

      console.log(response.data);
      if (response.data.status === "Success") {
        alert("Account created successfully!");
        // Clear form fields
        setOwnerID("");
        setOwnerName("");
        setOwnerLandline("");
        setOwnerMobile("");
        setOwnerEmail("");
        setOwnerBirth("");
        setOwnerGender("");
        setOwnerPassword("");
        setStallName("");
        setStallType("");
        setLeaseStart("");
        setLeaseEnd("");
      } else {
        alert("Failed to create account: " + response.data.error);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Failed to register. Please try again.");
    }
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
          backgroundColor: "rgba(255, 255, 255, 0.3)", 
          backdropFilter: "blur(1.5px)",
        }}
      ></div>
      <div className="container" style={{ position: "relative" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          {/* First Section */}
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="bg-white p-4 rounded shadow-lg">
              <h4 className="text-center mb-4">Sign Up</h4>
              <p className="text-center small fw-bold mb-4">
                Already have an account? <a href="login" className="link-success">Login here</a>
              </p>
              <form onSubmit={register}>
                {/* Owner fields */}
                <div className="form-outline mb-1" >
                  <label htmlFor="ownerID" style={{ fontSize: "0.8rem" }}>Owner ID</label>
                  <input
                    type="text"
                    id="ownerID"
                    className="form-control form-control sm"
                    placeholder="Enter owner ID"
                    required
                    value={ownerID}
                    onChange={(e) => setOwnerID(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="ownerName" style={{ fontSize: "0.8rem" }}>Name</label>
                  <input
                    type="text"
                    id="ownerName"
                    className="form-control form-control sm"
                    placeholder="Enter your name"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="ownerLandline" style={{ fontSize: "0.8rem" }}>Landline Number</label>
                  <input
                    type="text"
                    id="ownerLandline"
                    className="form-control form-control sm"
                    placeholder="Enter your landline number"
                    value={ownerLandline}
                    onChange={(e) => setOwnerLandline(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="ownerMobile" style={{ fontSize: "0.8rem" }}>Mobile Number</label>
                  <input
                    type="text"
                    id="ownerMobile"
                    className="form-control form-control sm"
                    placeholder="Enter your mobile number"
                    required
                    value={ownerMobile}
                    onChange={(e) => setOwnerMobile(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="ownerEmail" style={{ fontSize: "0.8rem" }}>Email Address</label>
                  <input
                    type="email"
                    id="ownerEmail"
                    className="form-control form-control sm"
                    placeholder="Enter your email address"
                    required
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="ownerBirth" style={{ fontSize: "0.8rem" }}>Date of Birth</label>
                  <input
                    type="date"
                    id="ownerBirth"
                    className="form-control form-control sm"
                    required
                    value={ownerBirth}
                    onChange={(e) => setOwnerBirth(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Second Section */}
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="bg-white p-4 rounded shadow-lg">
              <form onSubmit={register}>
                <div className="form-outline mb-1">
                  <label htmlFor="ownerGender" style={{ fontSize: "0.8rem" }}>Gender</label>
                  <select
                    id="ownerGender"
                    className="form-control form-control sm"
                    value={ownerGender}
                    onChange={(e) => setOwnerGender(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="F">F</option>
                    <option value="M">M</option>
                  </select>
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="ownerPassword" style={{ fontSize: "0.8rem" }}>Password</label>
                  <input
                    type="password"
                    id="ownerPassword"
                    className="form-control form-control sm"
                    placeholder="Enter your password"
                    required
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="stallName" style={{ fontSize: "0.8rem" }}>Stall Name</label>
                  <input
                    type="text"
                    id="stallName"
                    className="form-control form-control sm"
                    placeholder="Enter your stall name"
                    required
                    value={stallName}
                    onChange={(e) => setStallName(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="stallType" style={{ fontSize: "0.8rem" }}>Stall Type</label>
                  <input
                    type="text"
                    id="stallType"
                    className="form-control form-control sm"
                    placeholder="Enter your stall type"
                    required
                    value={stallType}
                    onChange={(e) => setStallType(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="leaseStart" style={{ fontSize: "0.8rem" }}>Lease Start Date</label>
                  <input
                    type="date"
                    id="leaseStart"
                    className="form-control form-control sm"
                    required
                    value={leaseStart}
                    onChange={(e) => setLeaseStart(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-1">
                  <label htmlFor="leaseEnd" style={{ fontSize: "0.8rem" }}>Lease End Date</label>
                  <input
                    type="date"
                    id="leaseEnd"
                    className="form-control form-control sm"
                    required
                    value={leaseEnd}
                    onChange={(e) => setLeaseEnd(e.target.value)}
                  />
                </div>

                {/* Remember me and forgot password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: "0.9rem" }}>Remember me</label>
                  </div>
                  <a href="#" className="text-danger" style={{ fontSize: "0.9rem" }}>Forgot password?</a>
                </div>

                {/* Sign up button amd link to log in */}
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-danger btn-lg">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
