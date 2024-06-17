import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import "./Updateform.css";

export default function Updateform() {
  const [formData, setFormData] = useState({
    comp1: "",
    comp2: "",
    comp3: "",
    med1: "",
    med2: "",
    med3: "",
    doctorname: "",
   
    dob: ""
    
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
  };
  return (
    <>
      <div className="updateform">
        <Container className="form-container mt-5">
          <Form onSubmit={handleSubmit} className="styled-form">
            <h6>Chief Complaints:</h6>
            <Row>
              <Col md={6}>
                <Form.Group controlId="comp1" className="form-group">
                  <Form.Label>Complaint 1:</Form.Label>
                  <Form.Control
                    type="text"
                    name="comp1"
                    value={formData.comp1}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="comp2" className="form-group">
                  <Form.Label>Complaint 2:</Form.Label>
                  <Form.Control
                    type="text"
                    name="comp2"
                    value={formData.comp2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="comp3" className="form-group">
                  <Form.Label>Complaint 3:</Form.Label>
                  <Form.Control
                    type="text"
                    name="comp3"
                    value={formData.comp3}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <p>Name of medicine suggested:</p>
            <Row>
              <Col md={6}>
                <Form.Group controlId="med1" className="form-group">
                  <Form.Label>Medicine 1:</Form.Label>
                  <Form.Control
                    type="text"
                    name="med1"
                    value={formData.med1}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="med2" className="form-group">
                  <Form.Label>Medicine 2:</Form.Label>
                  <Form.Control
                    type="text"
                    name="med2"
                    value={formData.med2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="med3" className="form-group">
                  <Form.Label>Medicine 3:</Form.Label>
                  <Form.Control
                    type="text"
                    name="med3"
                    value={formData.med3}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="dob" className="form-group">
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="doctorname" className="form-group">
                  <Form.Label>Name of Doctor:</Form.Label>
                  <Form.Control
                    type="text"
                    name="doctorname"
                    value={formData.doctorname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div class="col-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  I have confirm all details filled by me.
                </label>
              </div>
            </div>
            <Button variant="primary" type="submit" className="btn-primary">
              Submit
            </Button>
          </Form>
          {userProfStatus && <p>{userProfStatus}</p>}
        </Container>
      </div>
    </>
  );
}
