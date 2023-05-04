const dotenv = require('dotenv');
dotenv.config();
// Grab the server we created over in server.js

const server = require('./server');

// Set PORT to a constant equal to the port defined in our .env or a fallback port of 5000.
const PORT = process.env.PORT || 5000;

// const PORT = 5000

// This initialized our server to begin listening to requests on the pre defined port.
server.listen(PORT, () => {
  // Temporary console log until we decide what information we want logged and display.
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});