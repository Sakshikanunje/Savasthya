import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import './Scan.css';
export default function Scan() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 300, height: 250 },
      fps: 15,
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(qrCodeMessage) {
      setScanResult(qrCodeMessage);
      const uuid = qrCodeMessage.split("/").pop();

      console.log("Scanned UUID:", uuid);
      axios
        .get(`http://localhost:3001/scan/${uuid}`, { withCredentials: true })
        .then((response) => {
          const { data } = response;
          console.log("API response:", data);
          if (data.profile) {
            navigate(`/profile/${uuid}`);
          } else {
            navigate("/loginOpt");
          }
        })
        .catch((error) => {
          console.error("Error scanning QR code:", error);
        });
    }

    function onScanError(error) {
      console.error("QR code scanning error:", error);
    }
  }, [navigate]);

  return (

    <div>
      <Navbar />
      <div className="containerk">
        <h1>QR Code Scanner</h1>
        {scanResult ? (
          <div className="success-message">Success: {scanResult}</div>
        ) : (
          <div id="reader"></div>
        )}
      </div>
      <Footer />
    </div>


    // <div>
    //   <Navbar />
    //   <h1 style={{ marginTop: "5%" }}>QR Code Scanner</h1>
    //   {scanResult ? <div>Success: {scanResult}</div> : <div id="reader"></div>}
    //   <Footer />
    // </div>
  );
}