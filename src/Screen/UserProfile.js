// import './UserProfile.css';
// // src/ProfileForm.js
// import React, { useState } from 'react';
// // import './ProfileForm.css';
// import axios from 'axios';

// const ProfileForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     age: "",
//     gender: "",
//     mobileNumber: "",
//     emergencyMobileNumber: "",
//     bloodGroup: "",
//     dob: "",
//     email: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleFileChange = (e) => {
//   //   setFormData({ ...formData, profilePicture: e.target.files[0] });
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create a FormData object to handle file upload
//     const formDataObj = new FormData();
//     Object.keys(formData).forEach(key => {
//       formDataObj.append(key, formData[key]);
//     });

//     // Post form data to the server
//     axios.post('http://localhost:5000/api/profile', formDataObj, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error('There was an error!', error);
//     });
//   };

//   return (
//     <div className="profile-form-container">
//       <form className="profile-form" onSubmit={handleSubmit}>
//         <h2>Create Your Profile</h2>

//         <div className="form-row">
//           <div className="form-group">
//             <label>First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Middle Name</label>
//             <input
//               type="text"
//               name="middleName"
//               value={formData.middleName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Age</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Blood Group</label>
//             <input
//               type="text"
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label>Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Mobile Number</label>
//             <input
//               type="tel"
//               name="mobileNumber"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Emergency Mobile Number</label>
//             <input
//               type="tel"
//               name="emergencyMobileNumber"
//               value={formData.emergencyMobileNumber}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label>Address</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <button type="submit" className="submit-button">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 12px);
  padding: 6px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 12px);
  padding: 6px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
`;

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    gender: "",
    mobileNumber: "",
    emergencyMobileNumber: "",
    bloodGroup: "",
    dob: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/profile/${formData.email}`,
        formData
      );
      console.log(response.data);
      // Handle success, reset form, show success message, etc.
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error, show error message, etc.
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
      </FormGroup>
      <FormGroup>
        <Label>Middle Name</Label>
        <Input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Middle Name"
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </FormGroup>
      <FormGroup>
        <Label>Age</Label>
        <Input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
      </FormGroup>
      <FormGroup>
        <Label>Gender</Label>
        <Input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
      </FormGroup>
      <FormGroup>
        <Label>Mobile Number</Label>
        <Input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
        />
      </FormGroup>
      <FormGroup>
        <Label>Emergency Mobile Number</Label>
        <Input
          type="text"
          name="emergencyMobileNumber"
          value={formData.emergencyMobileNumber}
          onChange={handleChange}
          placeholder="Emergency Mobile Number"
        />
      </FormGroup>
      <FormGroup>
        <Label>Blood Group</Label>
        <Input
          type="text"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          placeholder="Blood Group"
        />
      </FormGroup>
      <FormGroup>
        <Label>Date of Birth</Label>
        <Input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <TextArea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        ></TextArea>
      </FormGroup>
      <Button type="submit">Update Profile</Button>
    </Form>
  );
};

export default UserProfile;