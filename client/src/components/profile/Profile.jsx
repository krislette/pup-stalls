import React, { useState, useEffect } from "react";
import Axios from "axios";
import { format } from "date-fns";
import "../../styles/profile.css";

function Profile() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const ownerID = localStorage.getItem("ownerID");
        const response = await Axios.get(`http://localhost:3001/owners/profile/${ownerID}`);
        
        if (response.data.status === "Success") {
          setProfileData(response.data.data[0]);
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const formatDate = (date) => {
    if (date) {
      return format(new Date(date), "yyyy/MM/dd");
    } else {
      return "-";
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Owner Details */}
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{profileData.strOwnerName}</h2>
              <p className="card-text"><strong>Owner ID:</strong> {profileData.strOwnerID}</p>
              <p className="card-text"><strong>Gender:</strong> {profileData.strGender}</p>
              <p className="card-text"><strong>Email:</strong> {profileData.strEmailAddress}</p>
              <p className="card-text"><strong>Mobile:</strong> {profileData.strMobileNumber}</p>
              <p className="card-text"><strong>Birth Date:</strong> {formatDate(profileData.datBirth)}</p>
            </div>
          </div>
        </div>

        {/* Rent Details */}
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rent Details</h5>
              <p className="card-text"><strong>Rent ID:</strong> {profileData.strRentID}</p>
              <p className="card-text"><strong>Lease Start:</strong> {formatDate(profileData.datLeaseStart)}</p>
              <p className="card-text"><strong>Lease End:</strong> {formatDate(profileData.datLeaseEnd)}</p>
              <p className="card-text"><strong>Rent Amount:</strong> ₱{profileData.decRentAmount}</p>
            </div>
          </div>
        </div>

        {/* Stall Details */}
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stall Details</h5>
              <p className="card-text"><strong>Stall ID:</strong> {profileData.strStallID}</p>
              <p className="card-text"><strong>Stall Name:</strong> {profileData.strStallName}</p>
              <p className="card-text"><strong>Stall Type:</strong> {profileData.strStallType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;