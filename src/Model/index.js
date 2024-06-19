const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;

app.use(express.json());

app.post('/predict', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5001/predict', req.body);
    console.log("Request forwarded from index.js");
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
