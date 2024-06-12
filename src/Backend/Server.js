const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const qr = require("qrcode");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "register",
});

app.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  con.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.status(400).json({ message: "WRONG USERNAME OR PASSWORD!" });
        }
      }
    }
  );
});

app.post("/generateQR", (req, res) => {
  const { username, email } = req.body;
  const dataToEncode = `Username: ${username}, Email: ${email}`;

  qr.toDataURL(dataToEncode, (err, qrCode) => {
    if (err) {
      res.status(500).json({ error: "Failed to generate QR code" });
    } else {
      const doc = new PDFDocument();
      const outputPath =`qr-codes/${username}_qr.pdf`;

      doc.pipe(fs.createWriteStream(outputPath));
      doc.text("QR Code:");
      doc.image(qrCode, { fit: [250, 250], align: "center" });
      doc.end();

      res
        .status(200)
        .json({ message: "Login successful. QR code generated as PDF.", pdfPath: outputPath });
    }
  });
});

app.listen(3001, () => {
  console.log("Running backend server");
});