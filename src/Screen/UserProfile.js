import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import "./UserProfile.css";

function UserProfile() {
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

  const [userProfStatus, setUserProfStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/userProf", formData)
      .then((response) => {
        if (response.data.message) {
          setUserProfStatus(response.data.message);
        } else {
          setUserProfStatus("ACCOUNT CREATED SUCCESSFULLY");
        }
      })
      .catch((error) => {
        setUserProfStatus("Error creating account: " + error.message);
      });
  };

  return (

   <Container>
      
      <div className="outside-container">
        <Form onSubmit={handleSubmit} className="styled-form">
          {/* Name Section */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="firstName" className="form-group">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="middleName" className="form-group">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="lastName" className="form-group">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Date of Birth and Gender */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="dob" className="form-group">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="gender" className="form-group">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Age and Blood Group */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="age" className="form-group">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="bloodGroup" className="form-group">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Email and Mobile Numbers */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="email" className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="mobileNumber" className="form-group">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Emergency Mobile Number */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="emergencyMobileNumber" className="form-group">
                <Form.Label>Emergency Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="emergencyMobileNumber"
                  value={formData.emergencyMobileNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Address */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="address" className="form-group">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="btn-primary">
            Submit
          </Button>
        </Form>
        {userProfStatus && <p>{userProfStatus}</p>}
      </div>
      </Container>
  );
}

export default UserProfile;