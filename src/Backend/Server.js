const express = require("express");
const session = require('express-session');
const mysql = require("mysql");
const { v4: uuidv4 } = require('uuid'); // Import uuidv4
const cors = require("cors");
const qr = require("qrcode");
const PDFDocument = require("pdfkit");
const fs = require("fs");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// *******SQL CONNECTION**********
const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "Sanjivan",
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});


// ********** DOCTORS LOGIN REGISTER***********
app.post("/doctRegister", (req, res) => {
  const { email, username, password } = req.body;
  const uuid = uuidv4();

  con.query(
    "INSERT INTO doctor (email, username, password , uuid) VALUES (?, ?, ?,?)",
    [email, username, password , uuid],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
        return;
      }
      res.send({ message: "Account created successfully" });
    }
  );
});

app.post("/doctLogin", (req, res) => {
  const { username, password } = req.body;
  con.query(
    "SELECT * FROM doctor WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Failed to login" });
        return;
      }
      if (result.length > 0) {
        req.session.doctorId = result[0].id;
        res.send(result);
      } else {
        res.status(400).json({ message: "Wrong username or password" });
      }
    }
  );
});



// *********** USERS LOGIN REGISTER***********

app.post("/userRegister", (req, res) => {
  const { email, username, password } = req.body;
  const uuid = uuidv4();
  con.query(
    "INSERT INTO users (email, username, password , uuid) VALUES (?, ?, ?,?)",
    [email, username, password,uuid],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
        return;
      }
      res.send({ message: "Account created successfully" });
    }
  );
});


app.post("/userLogin", (req, res) => {
  const { username, password } = req.body;
  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Failed to login" });
        return;
      }
      if (result.length > 0) {
        req.session.userId = result[0].id;
        req.session.userUUID = result[0].uuid;
        res.send(result);
      } else {
        res.status(400).json({ message: "Wrong username or password" });
      }
    }
  );
});







app.post("/generateQR", async (req, res) => {
  const { username, email } = req.body;
  const uuid = uuidv4();
  const dataToEncode = `${uuid}`;

  try {
    const qrCode = await new Promise((resolve, reject) => {
      qr.toDataURL(dataToEncode, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
    console.log("QR code generated successfully.");

   

    const doc = new PDFDocument();
    const outputPath = `./qr-codes/${username}_card.pdf`;

    // Write the PDF to a file
    doc.pipe(fs.createWriteStream(outputPath));

    // QR Code
    doc.image(qrCode, 50, 100, { width: 250 });

    

    doc.end();

    doc.on("finish", () => {
      console.log("PDF generated successfully.");
      res
        .status(200)
        .json({ message: "Card generated as PDF.", pdfPath: outputPath });
    });

    con.query(
      "UPDATE users SET uuid = ? WHERE username = ?",
      [uuid, username],
      (err, result) => {
        if (err) {
          console.error("Error updating user UUID:", err);
          return;
        }
        console.log("User UUID updated successfully.");
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to generate QR code or PDF" });
  }
});

// ********** SCAN QR CODE ***********
app.get("/scan/:uuid", (req, res) => {
  const { uuid } = req.params;

  con.query("SELECT * FROM users WHERE uuid = ?", [uuid], (err, result) => {
    if (err) {
      console.error("Error fetching user by UUID:", err);
      res.status(500).json({ error: "Failed to fetch user" });
      return;
    }
    if (result.length > 0) {
      if (req.session.userId && req.session.userUUID === uuid) {
        res.redirect(`/profile/${uuid}`);
      } else {
        req.session.scanUUID = uuid;
        res.redirect('/loginOpt');
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});


// ********** USER PROFILE ***********
app.get("/profile/:uuid", (req, res) => {
  const { uuid } = req.params;

  con.query("SELECT * FROM users WHERE uuid = ?", [uuid], (err, result) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      res.status(500).json({ error: "Failed to fetch user profile" });
      return;
    }
    if (result.length > 0 && req.session.userId && req.session.userUUID === uuid) {
      res.json(result[0].profile);
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running backend server on port ${PORT}`);
});
// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'Sanjivan'
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('MySQL connected...');
// });

// // Endpoint to handle update operation
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

//   db.query(updateQuery, [
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
//     console.log(res.result);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });