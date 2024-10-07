const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all origins

let latestTemperature = null; // To store the temperature sent by the server

// Route to receive POST requests with the temperature in the header
app.post('/set-temperature', (req, res) => {
  const temperature = req.headers['x-temperature']; // Get the temperature from the custom HTTP header

  if (!temperature) {
    return res.status(400).send('Temperature header not provided');
  }

  latestTemperature = temperature; // Store the temperature
  console.log(`Received temperature: ${temperature}`);
  res.status(200).send('Temperature received');
});

// Route to allow the frontend to get the latest temperature
app.get('/get-temperature', (req, res) => {
  if (latestTemperature === null) {
    return res.status(404).send('No temperature data available');
  }

  res.json({ temperature: latestTemperature });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
