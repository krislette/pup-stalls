import signupLogo from "../assets/signup.png";

const SignUp = () => {
  return (
    <div className="container" style={{paddingTop: 60}}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-x1-4 offset-x1-1">
            <form>
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
                />
                <label className="form-label">Name</label>
              </div>

              {/* Landline number input field (Optional) */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Landline Number (Optional)"
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
                />
                <label className="form-label">Email Address</label>
              </div>

              {/* Date of Birth input field */}
              <div className="form-outline mb-4">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Date of Birth"
                  required
                />
                <label className="form-label">Date of Birth</label>
              </div>

              {/* Gender input field (Optional) */}
              <div className="form-outline mb-4">
                <select className="form-control form-control-lg">
                  <option value="">Select Gender (Optional)</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
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
                <button type="button" className="btn btn-primary btn-lg">Sign Up</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Login to your account <a href="login" className="link-danger">Login</a>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-9 col-lg-6 col-x1-5">
            <img src={signupLogo} className="img-fluid"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;