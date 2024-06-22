import React, { useState, useEffect } from 'react';
import './DoctorProfile.css';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const DoctorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { uuid } = useParams(); // Extract UUID from URL
 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const response = await axios.get(`http://localhost:3001/api/doctor/${uuid}`, {
          withCredentials: true // Ensure credentials are sent with the request
        });
        const profile = response.data.profile;
        setProfileData(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [uuid]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="pro-container">
        <div className="pro-main-body">
          <div className="row gutters-sm gutters-smx">
            <div className="col-md-4 colx-md-4 mbx-3">
              <div className="cardx pro-square-card">
                <div className="card-body card-bodyx">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{profileData.firstName} {profileData.lastName}</h4>
                      <p className="text-secondary mb-1">Mobile Number: {profileData.mobileNumber}</p>
                      <p className="text-muted font-size-sm">Address: {profileData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 colx-md-8">
              <div className="cardx mbx-3">
                <div className="card-bodyx">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{profileData.firstName} {profileData.middleName} {profileData.lastName}</h6>
                    </div>
                  </div>
                  <hr />
                  
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date of Birth</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{profileData.dob}</h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Age</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{profileData.age}</h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{profileData.gender}</h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Type of</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{profileData.emergencyMobileNumber}</h6>
                    </div>
                  </div>
                    
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Blood Group</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{profileData.bloodGroup}</h6>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          </div>
        </div>
      
      <Footer />
    </>
  );
};

export default DoctorProfile;