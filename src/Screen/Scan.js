// import React, { useState, useContext, useEffect } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 

// export default function Scan() {
//   const[scanResult , setScanResult]=useState(null);

   

//   const navigate = useNavigate(); 
 
// useEffect(()=>{
//   const scanner=new Html5QrcodeScanner('reader', {
//     qrbox:{
//       width:250,
//       height:250,
//     },
//     fps:5,
  
//   })
//   scanner.render(success , error);
  
//   function success(result){
//        scanner.clear();
//        setScanResult(result);
//   }
//   function error(err){
//      console.log(err)
//   }
  
// },[]);


  
 

//   return (
//     <div>
//       <Navbar />
//       <h1 style={{ marginTop: '5%' }}>QR Code Scanner</h1>
//       {
//         scanResult
//         ? <div>Success:{scanResult}</div>
//         :<div id='reader'></div>
//       }
      
//       <Footer />
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Scan() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(qrCodeMessage) {
      // Update state with the scanned QR code message (UUID)
      setScanResult(qrCodeMessage);
      // Send a request to your backend with the scanned UUID
      const uuid = qrCodeMessage.split('/').pop();

// Output the UUID
console.log(uuid);
      axios.get(`/scan/${uuid}`)
        .then(response => {
          const { data } = response;
          if (data.redirect) {
            if (data.profileUrl) {
              navigate(data.profileUrl);
            } else {
              navigate('/loginOpt');
            }
          }
        })
        .catch(error => {
          console.error('Error scanning QR code:', error);
        });
    }

    function onScanError(error) {
      console.error('QR code scanning error:', error);
    }

  }, []);

  return (
    <div>
      <Navbar />
      <h1 style={{ marginTop: '5%' }}>QR Code Scanner</h1>
      {scanResult ? <div>Success: {scanResult}</div> : <div id='reader'></div>}
      <Footer />
    </div>
  );
}
