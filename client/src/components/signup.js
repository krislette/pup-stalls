import signupLogo from "../assets/signup.png";
import { useState } from "react";
import Axios from "axios";

const SignUp = () => {
  const [ownerID, setOwnerID] = useState(""); 
  const [ownerName, setOwnerName] = useState(""); 
  const [ownerLandline, setOwnerLandline] = useState(""); 
  const [ownerMobile, setOwnerMobile] = useState(""); 
  const [ownerEmail, setOwnerEmail] = useState(""); 
  const [ownerBirth, setOwnerBirth] = useState(""); 
  const [ownerGender, setOwnerGender] = useState(""); 
  const [ownerPassword, setOwnerPassword] = useState(""); 

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/owners/register", {
      strOwnerID: ownerID,
      strOwnerName: ownerName,
      strLandlineNumber: ownerLandline,
      strMobileNumber: ownerMobile,
      strEmailAddress: ownerEmail,
      datBirth: ownerBirth,
      strGender: ownerGender,
      strPassword: ownerPassword
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        alert(response.data.message); // Display any error message from the server
      } else {
        alert("Account created successfully!"); // Alert for successful registration
        // Optionally clear form fields after successful registration
        setOwnerID("");
        setOwnerName("");
        setOwnerLandline("");
        setOwnerMobile("");
        setOwnerEmail("");
        setOwnerBirth("");
        setOwnerGender("");
        setOwnerPassword("");
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="container" style={{paddingTop: 60}}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-x1-4 offset-x1-1">
            <form onSubmit={register}>
              {/* Form heading */}
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
              </div>

              {/* Owner ID input field */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Owner ID"
                  required
                  value={ownerID}
                  onChange={(e) => setOwnerID(e.target.value)} 
                />
                <label className="form-label">Owner ID</label>
              </div>

              {/* Name input field */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Name"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)} 
                />
                <label className="form-label">Name</label>
              </div>

              {/* Landline number input field (Optional) */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Landline Number (Optional)"
                  value={ownerLandline}
                  onChange={(e) => setOwnerLandline(e.target.value)} 
                />
                <label className="form-label">Landline Number</label>
              </div>

              {/* Mobile number input field */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Mobile Number"
                  required
                  value={ownerMobile}
                  onChange={(e) => setOwnerMobile(e.target.value)} 
                />
                <label className="form-label">Mobile Number</label>
              </div>

              {/* Email input field */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Email Address"
                  required
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)} 
                />
                <label className="form-label">Email Address</label>
              </div>

              {/* Date of Birth input field */}
              <div className="form-outline mb-4">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  required
                  value={ownerBirth}
                  onChange={(e) => setOwnerBirth(e.target.value)} 
                />
                <label className="form-label">Date of Birth</label>
              </div>

              {/* Gender input field (Optional) */}
              <div className="form-outline mb-4">
                <select className="form-control form-control-lg" value={ownerGender} onChange={(e) => setOwnerGender(e.target.value)}>
                  <option value="">Select Gender (Optional)</option>
                  <option value="F">F</option>
                  <option value="M">M</option>
                </select>
                <label className="form-label">Gender</label>
              </div>

              {/* Password input field */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Password"
                  required
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)} 
                />
                <label className="form-label">Password</label>
              </div>

              {/* Remember me and forgot password */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value=""/>
                  <label className="form-check-label">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-body">Forgot password?</a>
              </div>

              {/* Sign up button and link to login */}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Login to your account <a href="login" className="link-danger">Login</a>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-9 col-lg-6 col-x1-5">
            <img src={signupLogo} className="img-fluid" alt="Signup"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;