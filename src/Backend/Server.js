// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const qr = require("qrcode");
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// // *******SQL CONNECTION**********
// const con = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "Sanjivan",
// });

// con.connect((err) => {
//   if (err) {
//     console.error("Error connecting to database:", err);
//     return;
//   }
//   console.log("Connected to database");
// });


// // ********** DOCTORS LOGIN REGISTER***********
// app.post("/doctRegister", (req, res) => {
//   const { email, username, password } = req.body;

//   con.query(
//     "INSERT INTO doctor (email, username, password) VALUES (?, ?, ?)",
//     [email, username, password],
//     (err, result) => {
//       if (err) {
//         console.error("Error registering user:", err);
//         res.status(500).json({ error: "Failed to register user" });
//         return;
//       }
//       res.send({ message: "Account created successfully" });
//     }
//   );
// });
// app.put('/api/profile/:email', (req, res) => {
//   const email = req.params.email; // Extract email from request params
//   const {
//     firstName,
//     middleName,
//     lastName,
//     age,
//     gender,
//     mobileNumber,
//     emergencyMobileNumber,
//     bloodGroup,
//     dob,
//     address
//   } = req.body;

//   const updateQuery = `
//     UPDATE users
//     SET 
//       firstName = ?,
//       middleName = ?,
//       lastName = ?,
//       age = ?,
//       gender = ?,
//       mobileNumber = ?,
//       emergencyMobileNumber = ?,
//       bloodGroup = ?,
//       dob = ?,
//       address = ?
//     WHERE
//       email = ?
//   `;

//   con.query(updateQuery, [
//     firstName,
//     middleName,
//     lastName,
//     age,
//     gender,
//     mobileNumber,
//     emergencyMobileNumber,
//     bloodGroup,
//     dob,
//     address,
//     email
//   ], (err, result) => {
//     if (err) {
//       console.error('Error updating profile:', err);
//       return res.status(500).send({ message: 'Failed to update profile.' });
//     }
//     res.send({ message: 'Profile updated successfully!' });
//   });
// });
// app.post("/doctLogin", (req, res) => {
//   const { username, password } = req.body;
//   con.query(
//     "SELECT * FROM doctor WHERE username = ? AND password = ?",
//     [username, password],
//     (err, result) => {
//       if (err) {
//         console.error("Error logging in:", err);
//         res.status(500).json({ error: "Failed to login" });
//         return;
//       }
//       if (result.length > 0) {
//         res.send(result);
//       } else {
//         res.status(400).json({ message: "Wrong username or password" });
//       }
//     }
//   );
// });



// // *********** USERS LOGIN REGISTER***********

// app.post("/userRegister", (req, res) => {
//   const { email, username, password } = req.body;

//   con.query(
//     "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
//     [email, username, password],
//     (err, result) => {
//       if (err) {
//         console.error("Error registering user:", err);
//         res.status(500).json({ error: "Failed to register user" });
//         return;
//       }
//       res.send({ message: "Account created successfully" });
//     }
//   );
// });


// app.post("/userLogin", (req, res) => {
//   const { username, password } = req.body;
//   con.query(
//     "SELECT * FROM users WHERE username = ? AND password = ?",
//     [username, password],
//     (err, result) => {
//       if (err) {
//         console.error("Error logging in:", err);
//         res.status(500).json({ error: "Failed to login" });
//         return;
//       }
//       if (result.length > 0) {
//         res.send(result);
//       } else {
//         res.status(400).json({ message: "Wrong username or password" });
//       }
//     }
//   );
// });







// app.post("/generateQR", async (req, res) => {
//   const { username, email } = req.body;
//   const dataToEncode = `Username: ${username}, Email: ${email}`;

//   try {
//     const qrCode = await new Promise((resolve, reject) => {
//       qr.toDataURL(dataToEncode, (err, url) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(url);
//         }
//       });
//     });
//     console.log("QR code generated successfully.");

//     const photoPath = "./userphoto/isha.jpg"; // Replace this with the actual path
//     const photoImage = await fs.promises.readFile(photoPath);
//     console.log("User photo loaded successfully.");

//     const doc = new PDFDocument();
//     const outputPath = `./qr-codes/${username}_card.pdf`;

//     // Write the PDF to a file
//     doc.pipe(fs.createWriteStream(outputPath));

//     // QR Code
//     doc.image(qrCode, 50, 100, { width: 250 });

//     // User Photo
//     doc.image(photoImage, 350, 100, { width: 150 });

//     // User Name (centered)
//     doc.fontSize(20).text(username, 50, 300, { align: "center" });

//     doc.end();

//     doc.on("finish", () => {
//       console.log("PDF generated successfully.");
//       res
//         .status(200)
//         .json({ message: "Card generated as PDF.", pdfPath: outputPath });
//     });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).json({ error: "Failed to generate QR code or PDF" });
//   }
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Running backend server on port ${PORT}`);
// });
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Sanjivan'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Endpoint to handle update operation
app.put('/api/profile/:email', (req, res) => {
  const email = req.params.email; // Extract email from request params
  const {
    firstName,
    middleName,
    lastName,
    age,
    gender,
    mobileNumber,
    emergencyMobileNumber,
    bloodGroup,
    dob,
    address
  } = req.body;

  const updateQuery = `
    UPDATE users
    SET 
      firstName = ?,
      middleName = ?,
      lastName = ?,
      age = ?,
      gender = ?,
      mobileNumber = ?,
      emergencyMobileNumber = ?,
      bloodGroup = ?,
      dob = ?,
      address = ?
    WHERE
      email = ?
  `;

  db.query(updateQuery, [
    firstName,
    middleName,
    lastName,
    age,
    gender,
    mobileNumber,
    emergencyMobileNumber,
    bloodGroup,
    dob,
    address,
    email
  ], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).send({ message: 'Failed to update profile.' });
    }
    res.send({ message: 'Profile updated successfully!' });
    console.log(res.result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});