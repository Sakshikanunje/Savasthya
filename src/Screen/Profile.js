import React, { useState } from 'react';
import './Profile.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: 'Sakshi Kanunje',
    email: 'sakshikanunje@gmail.com',
    phone: '7083905604',
    address: 'Atit',
    bloodGroup: 'B+',
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div>
    <Navbar/>
    <div className="container main-body">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="cardz text-center square-cardz">
            <div className="cardz-body">
              <div className="profile-image-container">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="User"
                  className="profile-image rounded-circle img-fluid"
                />
              </div>
              <h5 className="mt-3">Sakshi Kanunje</h5>
              <h6 className="mb-2 text-muted">Full Stack Developer</h6>
              <p>Bay Area, San Francisco, CA</p>
              <button className="btn btn-primary">Follow</button>
              <button className="btn btn-outline-primary">Message</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="cardz mb-3">
            <div className="cardz-body">
              <form>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Full Name</label>
                  <div className="col-sm-9">
                    {editMode ? (
                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        value={formValues.fullName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-secondary">{formValues.fullName}</p>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-secondary">{formValues.email}</p>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Phone</label>
                  <div className="col-sm-9">
                    {editMode ? (
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formValues.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-secondary">{formValues.phone}</p>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Address</label>
                  <div className="col-sm-9">
                    {editMode ? (
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={formValues.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-secondary">{formValues.address}</p>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Blood Group</label>
                  <div className="col-sm-9">
                    {editMode ? (
                      <input
                        type="text"
                        name="bloodGroup"
                        className="form-control"
                        value={formValues.bloodGroup}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-secondary">{formValues.bloodGroup}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button type="button" onClick={toggleEditMode} className="btn btn-info">
                      {editMode ? 'Save Changes' : 'Edit'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Section</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>16</td>
              <td>10th</td>
              <td>A</td>
              <td>john.doe@example.com</td>
              <td>(123) 456-7890</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>15</td>
              <td>9th</td>
              <td>B</td>
              <td>jane.smith@example.com</td>
              <td>(987) 654-3210</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mike Johnson</td>
              <td>17</td>
              <td>11th</td>
              <td>C</td>
              <td>mike.johnson@example.com</td>
              <td>(555) 123-4567</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Profile;
