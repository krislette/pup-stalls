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
          console.error("Failed to fetch profile data from server");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const formatDate = (date) => {
    return date ? format(new Date(date), "yyyy/MM/dd") : "-";
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{profileData.strOwnerName}</h2>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Owner ID</th>
                    <td>{profileData.strOwnerID}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{profileData.strGender}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{profileData.strEmailAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobile</th>
                    <td>{profileData.strMobileNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Birth Date</th>
                    <td>{formatDate(profileData.datBirth)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rent Details</h5>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Rent ID</th>
                    <td>{profileData.strRentID}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lease Start</th>
                    <td>{formatDate(profileData.datLeaseStart)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lease End</th>
                    <td>{formatDate(profileData.datLeaseEnd)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Rent Amount</th>
                    <td>₱{profileData.decRentAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stall Details</h5>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Stall ID</th>
                    <td>{profileData.strStallID}</td>
                  </tr>
                  <tr>
                    <th scope="row">Stall Name</th>
                    <td>{profileData.strStallName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Stall Type</th>
                    <td>{profileData.strStallType}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
