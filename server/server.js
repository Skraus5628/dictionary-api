const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');





// This is now the express webserver itself.
const server = express();

server.use(express.json());
// server.use(bodyParser.json());

server.use(express.urlencoded({extended: true}));




// Helmet middleware to automatically set security HTTP response headers.
server.use(helmet());

// Cors middleware for quick configuration of CORS policy and to be CORS-enabled for all origins by default
server.use(cors());





// Include the router
const dictRouter = require('./router');

server.use('/dict', dictRouter);




module.exports = server;