import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './Model.css';
import diseaseImg from '../Database/medication.jpeg';
import descriptionImg from '../Database/diet.jpeg';
import preventiveImg from '../Database/diet.jpeg';
import medicationImg from '../Database/medication.jpeg';
import dietImg from '../Database/diet.jpeg';
import workoutImg from '../Database/medication.jpeg';

export default function Model() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/predict', { symptoms });
      setResult(response.data);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  const openModal = (title, body) => {
    setModalContent({ title, body });
    new window.bootstrap.Modal(document.getElementById('resultModal')).show();
  };

  const cardData = [
    { title: 'Disease', body: result?.predicted_disease, img: diseaseImg },
    { title: 'Description', body: result?.dis_des, img: descriptionImg },
    { title: 'Preventive Measures', body: result?.dis_pre, img: preventiveImg },
    { title: 'Medications', body: result?.dis_med, img: medicationImg },
    { title: 'Diet Recommendations', body: result?.dis_die, img: dietImg },
    { title: 'Workout Recommendations', body: result?.dis_wrkout, img: workoutImg },
  ];

  return (
    <>
      <Navbar />
      <div className='model'>
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>HealthComrade AI</span>
        </h3>

        <p className="dt-description">
        The HealthComrade AI model utilizes algorithms to predict diseases and offer comprehensive guidance, including disease descriptions, precautionary measures, medication recommendations, diet plans, and workout routines based on reported symptoms. 
        </p>
      </div>
        <div className="container-fluid container-fluida ">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              name="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter symptoms separated by commas"
              aria-label="Search"
            />
            <button className="btn btn-info" type="submit">Predict</button>
          </form>
        </div>
        
          
        {result && (
         
          <div className="result-cards result-cardsa ">
           
            {cardData.map((item, index) => (
              <div className="card mb-3 carda" style={{ maxWidth: '540px' }} key={index}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.img} className="img-fluid img-fluida rounded-start" alt={`${item.title}`} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">Click the button below to view details.</p>
                      <button 
                        type="button" 
                        className="btn btn-info toggle-button" 
                        onClick={() => openModal(item.title, item.body)}
                      >
                        View {item.title}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="modal fade" id="resultModal" tabIndex="-1" aria-labelledby="resultModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{backgroundColor:"skyblue"}}>
                <h5 className="modal-title" id="resultModalLabel">{modalContent.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {Array.isArray(modalContent.body) ? (
                  <ul>
                    {modalContent.body.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{modalContent.body}</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  style={{backgroundColor:"skyblue" , color:"black"}}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}