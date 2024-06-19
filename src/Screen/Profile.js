


import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
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
    <Container className="main-body">
      <Row className="gutters-sm">
        <Col md={4} className="mb-3">
          <Card className="text-center square-card">
            <Card.Body>
              <div className="profile-image-container">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="User" className="profile-image rounded-circle" />
              </div>
              <Card.Title className="mt-3">Sakshi Kanunje</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Full Stack Developer</Card.Subtitle>
              <Card.Text>
                Bay Area, San Francisco, CA
              </Card.Text>
              <Button variant="primary">Follow</Button>
              <Button variant="outline-primary">Message</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Form>
                <Row>
                  <Col sm={3}>
                    <Form.Label>Full Name</Form.Label>
                  </Col>
                  <Col sm={9}>
                    {editMode ? (
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Form.Text className="text-secondary">{formValues.fullName}</Form.Text>
                    )}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Form.Label>Email</Form.Label>
                  </Col>
                  <Col sm={9}>
                    {editMode ? (
                      <Form.Control
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Form.Text className="text-secondary">{formValues.email}</Form.Text>
                    )}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Form.Label>Phone</Form.Label>
                  </Col>
                  <Col sm={9}>
                    {editMode ? (
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Form.Text className="text-secondary">{formValues.phone}</Form.Text>
                    )}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Form.Label>Address</Form.Label>
                  </Col>
                  <Col sm={9}>
                    {editMode ? (
                      <Form.Control
                        type="text"
                        name="address"
                        value={formValues.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Form.Text className="text-secondary">{formValues.address}</Form.Text>
                    )}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Form.Label>Blood Group</Form.Label>
                  </Col>
                  <Col sm={9}>
                    {editMode ? (
                      <Form.Control
                        type="text"
                        name="bloodGroup"
                        value={formValues.bloodGroup}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Form.Text className="text-secondary">{formValues.bloodGroup}</Form.Text>
                    )}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={12}>
                    <Button onClick={toggleEditMode} className="btn btn-info">
                      {editMode ? 'Save Changes' : 'Edit'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Table responsive>
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
        <tr>
          <td>3</td>
          <td>Mike Johnson</td>
          <td>17</td>
          <td>11th</td>
          <td>C</td>
          <td>mike.johnson@example.com</td>
          <td>(555) 123-4567</td>
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
    </Table>
    </Container>
    <Footer/>
    </div>
  );
};

export default Profile;
