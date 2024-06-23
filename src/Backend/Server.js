const express = require("express");
const session = require('express-session');
const mysql = require("mysql");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
const qr = require("qrcode");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from localhost:3000
  credentials: true  // Enable CORS credentials
}));

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

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
        req.session.doctorUUID = result[0].uuid;
        res.send(result);
      } else {
        res.status(400).json({ message: "Wrong username or password" });
      }
    }
  );
});

app.post("/userRegister", async (req, res) => {
  const { email, username, password } = req.body;
  const uuid = uuidv4();
  con.query(
    "INSERT INTO users (email, username, password , uuid) VALUES (?, ?, ?,?)",
    [email, username, password, uuid],
    async (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
        return;
      }else{
        res.send({ uuid: uuid, message: "User registered successfully!" });
      }
      try {
        const qrPath = await generateQR(uuid, username);
        res.send({ message: "Account created successfully", pdfPath: qrPath });
      } catch (qrErr) {
        console.error("Error generating QR code:", qrErr);
        res.status(500).json({ error: "Failed to generate QR code" });
      }
    }
  );
});

// app.post("/userRegister", async (req, res) => {
//   const { email, username, password } = req.body;
//   const uuid = uuidv4();
//   con.query(
//     "INSERT INTO users (email, username, password , uuid) VALUES (?, ?, ?,?)",
//     [email, username, password, uuid],
//     async (err, result) => {
//       if (err) {
//         console.error("Error registering user:", err);
//         res.status(500).json({ error: "Failed to register user" });
//         return;
//       }
//       try {
//         const qrPath = await generateQR(uuid, username);
//         res.send({ message: "Account created successfully", pdfPath: qrPath });
//       } catch (qrErr) {
//         console.error("Error generating QR code:", qrErr);
//         res.status(500).json({ error: "Failed to generate QR code" });
//       }
//     }
//   );
// });

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

const generateQR = async (uuid, username) => {
  const dataToEncode = `http://localhost:3001/scan/${uuid}`;

  const qrCode = await new Promise((resolve, reject) => {
    qr.toDataURL(dataToEncode, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });

  const doc = new PDFDocument();
  const outputPath = `./qr-codes/${username}_card.pdf`;

  doc.pipe(fs.createWriteStream(outputPath));
  doc.image(qrCode, 50, 100, { width: 250 });
  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("finish", () => {
      resolve(outputPath);
    });
    doc.on("error", (err) => {
      reject(err);
    });
  });
};

app.get("/scan/:uuid", (req, res) => {
  const { uuid } = req.params;

  con.query("SELECT * FROM users WHERE uuid = ?", [uuid], (err, result) => {
    if (err) {
      console.error("Error fetching user by UUID:", err);
      res.status(500).json({ error: "Failed to fetch user" });
      return;
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userProfile = {
      firstName: result[0].firstName,
      middleName: result[0].middleName,
      lastName: result[0].lastName,
      age: result[0].age,
      gender: result[0].gender,
      mobileNumber: result[0].mobileNumber,
      emergencyMobileNumber: result[0].emergencyMobileNumber,
      dob: result[0].dob,
      address: result[0].address,
      bloodGroup: result[0].bloodGroup,
    };

    res.json({ profile: userProfile });
  });
});

app.get('/api/user/:uuid', (req, res) => {
  const { uuid } = req.params;
  const sql = 'SELECT * FROM users WHERE uuid = ?';
  con.query(sql, [uuid], (err, result) => {
    if (err) {
      console.error('Error fetching user by UUID:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
      return;
    }
    if (result.length > 0) {
      const userProfile = {
        firstName: result[0].firstName,
        middleName: result[0].middleName,
        lastName: result[0].lastName,
        age: result[0].age,
        gender: result[0].gender,
        mobileNumber: result[0].mobileNumber,
        emergencyMobileNumber: result[0].emergencyMobileNumber,
        dob: result[0].dob,
        address: result[0].address,
        bloodGroup: result[0].bloodGroup,
      };
      res.json({ profile: userProfile });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
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

  con.query(updateQuery, [
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
  });
});
app.get('/api/doctor/:uuid', (req, res) => {
  const { uuid } = req.params;
  const sql = 'SELECT * FROM doctor WHERE uuid = ?';
  con.query(sql, [uuid], (err, result) => {
    if (err) {
      console.error('Error fetching user by UUID:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
      return;
    }
    if (result.length > 0) {
      const userProfile = {
        firstName: result[0].firstName,
        middleName: result[0].middleName,
        lastName: result[0].lastName,
        age: result[0].age,
        gender: result[0].gender,
        mobileNumber: result[0].mobileNumber,
        emergencyMobileNumber: result[0].emergencyMobileNumber,
        dob: result[0].dob,
        address: result[0].address,
        bloodGroup: result[0].bloodGroup,
      };
      res.json({ profile: doctorProfile });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running backend server on port ${PORT}`);
});